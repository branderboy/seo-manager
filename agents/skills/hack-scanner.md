---
name: hack-scanner
description: Detect cloaked SEO-spam injection on hacked WordPress sites by comparing how the site responds to a browser vs. to Googlebot. Use when GSC reports a flood of "Crawled - currently not indexed" URLs that don't match real pages, especially when third-party scanners (Sucuri, VirusTotal, Wordfence) come back clean.
---

# Hack Scanner

## Purpose

Signature scanners miss cloaking hacks because the malware only serves spam to Googlebot. This skill detects that asymmetry directly: same URL, two user-agents, compare responses.

## Inputs

- Domain
- Optional: GSC Coverage Drilldown export (`Table.csv`) for the affected property
- Optional: explicit URL list to probe

## Outputs

- `findings.json` — per-URL verdict (cloaked / overt / divergent / clean)
- `report.md` — human-readable summary with remediation steps

## Tool

Implemented as a Node CLI at `agents/hack-scanner/scan.mjs`. Run:

```bash
node agents/hack-scanner/scan.mjs <domain> --gsc <Table.csv> --limit 100
```

## When to use

- A client property shows hundreds of unindexed URLs with patterns that don't match real pages (`/shopdetail/`, foreign-language paths, `/index.php/feature/...`).
- A third-party scan comes back clean but you can see junk URLs in `site:` search.
- Before recommending a paid cleanup service — confirm a hack exists and document the evidence.

## When NOT to use

- For finding the malware files on the server. This is a black-box detector; it tells you the site is cloaking but not where the injected PHP lives. Pair with `wp-cli verify-checksums` + filesystem search for that.
- For cloaking that targets Google by IP rather than user-agent. Detecting that requires fetching through a Google-owned IP.

## Follow-up actions

When the scanner returns `CLOAKED_SPAM`:

1. Apply 410 rewrite rules so Google de-indexes the spam fast (sample at `clients/midlandfloors-cleanup/htaccess-410-block.txt`).
2. Submit prefix removals via GSC URL Removal tool.
3. Find and remove the injection on the server (Wordfence, Sucuri, or manual `find`/`grep`).
4. Rotate credentials once clean.
