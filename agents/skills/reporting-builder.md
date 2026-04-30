---
name: reporting-builder
description: Pull GA4, GSC, ranking, citation, and CRO data into a one-page weekly executive report. Use every Monday morning to produce the leadership summary.
---

# Reporting & Dashboard Builder

## Purpose

Pull every data source into a single weekly executive summary that ties traffic, rankings, citations, and conversion to revenue. The report is the product. If leadership doesn't trust the report, nothing else matters.

## Inputs

- GA4 data export.
- Search Console data export.
- Ahrefs or SEMrush ranking data.
- AI citation tracker output (from `citation-tracker`).
- CRO test results.

## Outputs

- Weekly executive summary (one page).
- KPI snapshot with WoW and MoM comparisons.
- Three things shipped, three things moving, three things next.
- Risks and watch items.

## Prompt

```
You are an SEO reporting analyst. Build a weekly executive summary from the
data below.

Data sources:
[PASTE GA4]
[PASTE GSC]
[PASTE RANKING DATA]
[PASTE AI CITATION DATA]
[PASTE CRO TEST DATA]

Output structure:

# Weekly SEO and AEO Report
Week of [DATE]

## Headline number
One sentence summary of the most important movement this week.

## KPI snapshot
| Metric | This week | Last week | WoW % | MoM % |
| Organic sessions | | | | |
| Organic conversions | | | | |
| Organic revenue | | | | |
| Avg ranking position | | | | |
| AI citation rate | | | | |
| Conversion rate | | | | |

## Three things shipped
Bullet list of what got done this week.

## Three things moving
Bullet list of metrics or pages moving in the right direction with specifics.

## Three things next
Bullet list of what is being worked on next week.

## Risks and watch items
Anything trending the wrong way or anything that needs leadership input.

Keep it under one page. Lead with numbers, not narrative. No buzzwords.
```

## Extensions

- **Multi-brand mode:** feed data for each brand separately and ask for a portfolio-level summary plus per-brand rows.
- **Forecast mode:** include trailing 12-week data and ask for a forward 4-week projection with confidence intervals.
- **Hand-off:** the rendered output goes into `dashboard.html` as the live executive report. Manager writes the headline call; everything else is built from data.
