---
name: keyword-strategist
description: Cluster raw keyword data into a prioritized content roadmap by intent and funnel stage. Use when you have a keyword export from Ahrefs, SEMrush, or GSC and need a scored content plan.
---

# Keyword & Cluster Strategist

## Purpose

Take raw keyword data and turn it into a prioritized content roadmap clustered by intent and funnel stage. Replaces 2–3 days of manual analyst work with a 10-minute pass.

## Inputs

- CSV export from Ahrefs, SEMrush, or Google Search Console with keyword, search volume, difficulty, and current ranking.
- Business context: industry, target audience, primary services, conversion goals.
- Optional: list of competitor domains.

## Outputs

- Keywords clustered by topic and intent (informational, commercial, transactional, AEO question).
- Funnel stage tag (top, middle, bottom).
- Priority score 1–10.
- Recommended content format per cluster (cornerstone, supporting, FAQ, comparison).

## Prompt

```
You are a senior SEO strategist. I will give you keyword data and business context.

Your job:
1. Cluster keywords by topic and intent.
2. Tag each cluster with funnel stage (top, middle, bottom).
3. Score each cluster on a priority index (1–10) using:
   priority = (volume_score × 0.3) + (intent_score × 0.4) + (winnability_score × 0.3)
   where winnability accounts for difficulty and current ranking position.
4. Recommend the content format for each cluster.
5. Output as a structured table.

Business context:
[INSERT: industry, audience, services, goals]

Keyword data:
[PASTE: CSV data]

Format your output as:
| Cluster | Intent | Funnel Stage | Priority | Content Format | Notes |

Do not invent keywords. Only use what I provide. Flag any keyword that lacks
clear commercial intent so I can decide whether to keep it.
```

## Extensions

- **Multi-brand mode:** add a `brand` column and run once across the portfolio. Surfaces which brand should own which cluster.
- **Refresh mode:** feed last quarter's roadmap as a second input. Output flags which clusters changed priority and why.
- **Hand-off:** the output table is a valid input to the Content Writer. Pipe straight through.
