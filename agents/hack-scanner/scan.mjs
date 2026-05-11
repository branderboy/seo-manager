#!/usr/bin/env node
// hack-scanner: detects cloaked SEO spam injection that signature-based
// scanners (Sucuri, Wordfence, VirusTotal) miss because the malware only
// serves spam content to Googlebot.
//
// Usage:
//   node scan.mjs <domain>                          # scan known spam patterns
//   node scan.mjs <domain> --urls path/to/urls.txt  # scan specific URL list
//   node scan.mjs <domain> --gsc path/to/Table.csv  # scan from GSC drilldown export
//
// Exit codes: 0 clean, 1 cloaked spam detected, 2 error

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const BROWSER_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const GOOGLEBOT_UA =
  'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';

// Spam fingerprints — substrings that, if present in the Googlebot response
// but NOT the browser response, prove cloaking. Extend as new patterns appear.
const SPAM_FINGERPRINTS = [
  'shopdetail',
  'kaitori',
  'honten',
  'osu_main',
  'shoplist',
  'surugaya',
  'safe_search',
  'campaign_uid',
  '駿河屋',
  '買取',
  '販売',
  'ブランド',
  'rolex',
  'gucci',
  'louis vuitton',
  'replica',
  'viagra',
  'cialis',
  'casino',
  'バカラ',
  'パチンコ',
];

// Common spam URL patterns to probe even if you don't supply a URL list.
// These are the most-seen Japanese-spam-injection probe paths.
const DEFAULT_PROBE_PATHS = [
  '/shopdetail/123',
  '/index.php?shopdetail=1',
  '/discount.php?shopdetail=1',
  '/index.php/feature/honten/index.html',
  '/index.php/feature/osu_main/index.html',
  '/index.php/man/kaitori/kaitoritop.html',
  '/index.php/safe_search/config',
  '/?shopdetail=1',
];

function parseArgs(argv) {
  const args = { domain: null, urls: null, gsc: null, out: null, limit: 100 };
  const positional = [];
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--urls') args.urls = argv[++i];
    else if (a === '--gsc') args.gsc = argv[++i];
    else if (a === '--out') args.out = argv[++i];
    else if (a === '--limit') args.limit = parseInt(argv[++i], 10);
    else if (a === '-h' || a === '--help') args.help = true;
    else positional.push(a);
  }
  args.domain = positional[0] || null;
  return args;
}

function usage() {
  console.log(`hack-scanner — cloaked-spam detector for hacked WordPress sites

Usage:
  scan.mjs <domain> [options]

Options:
  --urls <file>    Newline-delimited URL list to probe
  --gsc <file>     GSC Coverage Drilldown Table.csv (extracts URL column)
  --limit <n>      Max URLs to probe (default 100)
  --out <dir>      Output directory for report (default ./reports/<domain>)

Examples:
  scan.mjs midlandfloors.com
  scan.mjs midlandfloors.com --gsc clients/midland/Table.csv --limit 50
`);
}

function normalizeDomain(d) {
  return d.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

function loadUrlsFromList(file) {
  return readFileSync(file, 'utf8')
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'));
}

function loadUrlsFromGsc(file) {
  // CSV format: "URL,Last crawled" — strip header, take col 0
  const lines = readFileSync(file, 'utf8').split('\n').slice(1);
  return lines
    .map((l) => l.split(',')[0]?.trim())
    .filter((u) => u && u.startsWith('http'));
}

async function fetchAs(url, ua, timeoutMs = 10000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': ua, Accept: 'text/html,*/*' },
      redirect: 'follow',
      signal: ctrl.signal,
    });
    const body = await res.text();
    return { status: res.status, finalUrl: res.url, body, length: body.length };
  } catch (err) {
    return { error: err.message };
  } finally {
    clearTimeout(t);
  }
}

function detectSpam(body) {
  if (!body) return [];
  const lower = body.toLowerCase();
  return SPAM_FINGERPRINTS.filter((f) => lower.includes(f.toLowerCase()));
}

function scoreCloak(browserResp, googlebotResp) {
  // No response at all
  if (browserResp.error && googlebotResp.error) return { verdict: 'unreachable', score: 0 };

  const browserHits = detectSpam(browserResp.body);
  const googlebotHits = detectSpam(googlebotResp.body);

  const onlyGooglebot = googlebotHits.filter((h) => !browserHits.includes(h));

  // The smoking gun: spam fingerprints visible to Googlebot but not browser
  if (onlyGooglebot.length > 0) {
    return {
      verdict: 'CLOAKED_SPAM',
      score: 100,
      browserHits,
      googlebotHits,
      onlyGooglebot,
    };
  }

  // Both UAs see the same spam content — site is hacked but not cloaking
  if (googlebotHits.length > 0) {
    return {
      verdict: 'OVERT_SPAM',
      score: 80,
      browserHits,
      googlebotHits,
      onlyGooglebot: [],
    };
  }

  // Status code or length differs dramatically → suspicious, worth review
  if (
    browserResp.status &&
    googlebotResp.status &&
    Math.abs((browserResp.length || 0) - (googlebotResp.length || 0)) > 5000
  ) {
    return {
      verdict: 'SIZE_DIVERGENCE',
      score: 40,
      browserHits,
      googlebotHits,
      onlyGooglebot: [],
      detail: `browser=${browserResp.length}b, googlebot=${googlebotResp.length}b`,
    };
  }

  return { verdict: 'clean', score: 0, browserHits, googlebotHits, onlyGooglebot: [] };
}

async function probe(url) {
  const [b, g] = await Promise.all([fetchAs(url, BROWSER_UA), fetchAs(url, GOOGLEBOT_UA)]);
  const result = scoreCloak(b, g);
  return {
    url,
    browser: { status: b.status, length: b.length, error: b.error },
    googlebot: { status: g.status, length: g.length, error: g.error },
    ...result,
  };
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help || !args.domain) {
    usage();
    process.exit(args.help ? 0 : 2);
  }

  const domain = normalizeDomain(args.domain);
  const outDir = args.out || resolve(__dirname, '..', '..', 'reports', domain);
  mkdirSync(outDir, { recursive: true });

  let urls = [];
  if (args.urls) urls = loadUrlsFromList(args.urls);
  else if (args.gsc) urls = loadUrlsFromGsc(args.gsc);
  else urls = DEFAULT_PROBE_PATHS.map((p) => `https://${domain}${p}`);

  // Dedupe + limit
  urls = [...new Set(urls)].slice(0, args.limit);

  console.error(`Scanning ${urls.length} URLs on ${domain}...`);
  console.error(`Browser UA  : ${BROWSER_UA.slice(0, 60)}...`);
  console.error(`Googlebot UA: ${GOOGLEBOT_UA}\n`);

  const findings = [];
  let i = 0;
  for (const url of urls) {
    i++;
    process.stderr.write(`[${i}/${urls.length}] ${url} ... `);
    const r = await probe(url);
    findings.push(r);
    process.stderr.write(`${r.verdict}\n`);
  }

  const cloaked = findings.filter((f) => f.verdict === 'CLOAKED_SPAM');
  const overt = findings.filter((f) => f.verdict === 'OVERT_SPAM');
  const divergent = findings.filter((f) => f.verdict === 'SIZE_DIVERGENCE');

  const summary = {
    domain,
    scannedAt: new Date().toISOString(),
    totalProbed: findings.length,
    cloakedSpam: cloaked.length,
    overtSpam: overt.length,
    sizeDivergence: divergent.length,
    clean: findings.filter((f) => f.verdict === 'clean').length,
    unreachable: findings.filter((f) => f.verdict === 'unreachable').length,
  };

  writeFileSync(join(outDir, 'findings.json'), JSON.stringify({ summary, findings }, null, 2));
  writeFileSync(join(outDir, 'report.md'), renderMarkdown(summary, findings));

  console.error('\n' + '='.repeat(60));
  console.error(`Domain:           ${domain}`);
  console.error(`Cloaked spam:     ${summary.cloakedSpam}  ← smoking gun`);
  console.error(`Overt spam:       ${summary.overtSpam}`);
  console.error(`Size divergence:  ${summary.sizeDivergence}`);
  console.error(`Clean:            ${summary.clean}`);
  console.error(`Unreachable:      ${summary.unreachable}`);
  console.error(`Report:           ${join(outDir, 'report.md')}`);
  console.error('='.repeat(60));

  process.exit(cloaked.length + overt.length > 0 ? 1 : 0);
}

function renderMarkdown(summary, findings) {
  const lines = [];
  lines.push(`# Hack scan report: ${summary.domain}`);
  lines.push(`Scanned ${summary.scannedAt} · ${summary.totalProbed} URLs probed`);
  lines.push('');
  lines.push(`| Verdict | Count |`);
  lines.push(`|---|---|`);
  lines.push(`| **Cloaked spam** (smoking gun) | ${summary.cloakedSpam} |`);
  lines.push(`| Overt spam | ${summary.overtSpam} |`);
  lines.push(`| Size divergence | ${summary.sizeDivergence} |`);
  lines.push(`| Clean | ${summary.clean} |`);
  lines.push(`| Unreachable | ${summary.unreachable} |`);
  lines.push('');

  const cloaked = findings.filter((f) => f.verdict === 'CLOAKED_SPAM');
  if (cloaked.length) {
    lines.push(`## Cloaked spam (${cloaked.length})`);
    lines.push('These URLs serve different content to Googlebot than to a normal browser. That is the definition of a cloaking hack — and the reason Sucuri/VirusTotal scans came back clean.\n');
    for (const f of cloaked) {
      lines.push(`- \`${f.url}\``);
      lines.push(`  - Googlebot-only fingerprints: ${f.onlyGooglebot.join(', ')}`);
      lines.push(`  - Browser size: ${f.browser.length}b · Googlebot size: ${f.googlebot.length}b`);
    }
    lines.push('');
  }

  const overt = findings.filter((f) => f.verdict === 'OVERT_SPAM');
  if (overt.length) {
    lines.push(`## Overt spam (${overt.length})`);
    lines.push('Spam content visible to both UAs — site is hacked, no cloaking layer.\n');
    for (const f of overt) {
      lines.push(`- \`${f.url}\` — hits: ${f.googlebotHits.join(', ')}`);
    }
    lines.push('');
  }

  lines.push(`## Recommended next steps`);
  lines.push(`1. Apply the \`.htaccess\` 410 block in \`clients/midlandfloors-cleanup/htaccess-410-block.txt\` (or the equivalent for your domain) so Google de-indexes the spam URLs fast.`);
  lines.push(`2. SSH/SFTP into the site and search for the malware:`);
  lines.push('   ```');
  lines.push('   find public_html/wp-content/uploads -name "*.php"');
  lines.push('   grep -RIn "shopdetail\\|kaitori\\|base64_decode\\|eval(" public_html/wp-content/');
  lines.push('   wp core verify-checksums');
  lines.push('   wp plugin verify-checksums --all');
  lines.push('   ```');
  lines.push(`3. Submit prefix removals via Search Console for the affected URL patterns.`);
  lines.push(`4. Rotate all credentials (WP admin, hosting, FTP, DB) once clean.`);
  return lines.join('\n');
}

main().catch((err) => {
  console.error('FATAL:', err);
  process.exit(2);
});
