---
name: technical-auditor
description: Run a full technical SEO audit on demand and output a prioritized fix list with effort and impact scores. Use when you have crawl data, Search Console coverage, and Core Web Vitals to triage.
---

# Technical SEO Auditor

## Purpose

Run a full technical audit on demand and output a prioritized fix list. Pairs with Screaming Frog, Sitebulb, or a custom Puppeteer crawl for input data.

## Inputs

- Crawl data export (CSV or JSON) with URL, status code, title, meta, H1, canonical, indexability, response time.
- PageSpeed Insights data for top URLs.
- Search Console coverage report.

## Outputs

- Categorized issue list (critical, high, medium, low).
- Effort vs. impact score per issue.
- Specific fix recommendation per issue.
- Suggested rollout order in three waves.

## Prompt

```
You are a technical SEO auditor. I will give you crawl data and Search
Console data. Output a prioritized fix list.

Crawl data:
[PASTE]

Search Console coverage:
[PASTE]

Core Web Vitals data:
[PASTE]

For each issue you find:
1. Category (Indexability, Crawlability, Speed, Schema, Internal Linking,
   Mobile, Duplication, Redirects).
2. Severity (Critical, High, Medium, Low).
3. Affected URLs (top 5 examples).
4. Root cause hypothesis.
5. Specific fix recommendation.
6. Effort score (1 to 5).
7. Impact score (1 to 5).
8. Priority = (impact × 2) − effort.

Sort by priority descending. Output as a table.

Then provide a recommended rollout in three waves:
- Wave 1: Critical and quick wins (effort 1–2, impact 4–5).
- Wave 2: High priority (impact 4–5, any effort).
- Wave 3: Cleanup and optimization.

Do not invent issues. Only flag what the data shows.
```

## Extensions

- **Daily monitor mode:** feed yesterday's crawl alongside today's. The model only surfaces deltas (new issues, resolved issues, regressions).
- **Pre-launch mode:** point at staging and require zero Critical issues before approving the launch ticket.
- **Hand-off:** the prioritized fix list is a valid input to the engineering ticketing flow. Wave 1 typically becomes the next sprint.
