# hack-scanner

Detects cloaked SEO-spam injection on WordPress sites that signature-based scanners (Sucuri, Wordfence, VirusTotal, Google Safe Browsing) miss.

## Why it exists

Japanese SEO spam (and similar cloaking hacks) only serve spam content when the request comes from Googlebot. To a regular browser, the page returns a 404 or the normal site. That is why a site can show "all clean" across 60+ security vendors on VirusTotal while Google Search Console is reporting hundreds of injected URLs as "Crawled — currently not indexed."

This tool fetches each URL twice — once as a normal browser, once as Googlebot — and flags any URL where the responses differ in known spam-fingerprint ways.

## Usage

No dependencies. Node 18+ (uses built-in `fetch`).

```bash
# Probe a domain using the built-in default spam paths
node agents/hack-scanner/scan.mjs midlandfloors.com

# Scan URLs from a GSC Coverage Drilldown export
node agents/hack-scanner/scan.mjs midlandfloors.com \
  --gsc clients/midlandfloors.com-Table.csv \
  --limit 100

# Scan from a plain text URL list
node agents/hack-scanner/scan.mjs midlandfloors.com \
  --urls suspicious-urls.txt
```

Output lands in `reports/<domain>/`:
- `findings.json` — full machine-readable result
- `report.md` — human-readable summary with remediation steps

## Verdicts

| Verdict | Meaning |
|---|---|
| `CLOAKED_SPAM` | Spam fingerprints found in the Googlebot response but not the browser response. Smoking-gun cloaking hack. |
| `OVERT_SPAM` | Spam fingerprints in both responses. Site is hacked, no cloaking layer. |
| `SIZE_DIVERGENCE` | Response sizes differ by >5KB between UAs. Worth manual review. |
| `clean` | No fingerprints, sizes match. |
| `unreachable` | Both requests failed. |

## Extending

Add new spam fingerprints to `SPAM_FINGERPRINTS` in `scan.mjs`. Anything that consistently appears in spam injections (brand names, foreign-language keywords, suspicious paths) is a valid fingerprint.

## Limitations

- Only catches cloaking aimed at Googlebot specifically. Hacks that cloak by IP rather than UA require fetching through a Google-owned IP, which this tool doesn't do.
- Doesn't find the malware on the server. Use it alongside `wp-cli` checksums and a file-system scan (`find wp-content/uploads -name "*.php"`).
- It hits real production URLs, so use sane `--limit` values and don't run it constantly.
