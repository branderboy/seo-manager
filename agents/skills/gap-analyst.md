---
name: gap-analyst
description: Surface keyword and content gaps between the brand and competitors with opportunity scoring. Use monthly or whenever competitor activity changes.
---

# Competitor Gap Analyst

## Purpose

Continuously monitor competitors and surface keyword and content gaps with a quantified opportunity score. Replaces the "let's look at what they're doing" meeting with a ranked attack list.

## Inputs

- Competitor domain list.
- Brand domain.
- Ahrefs or SEMrush gap analysis export.

## Outputs

- Keywords competitors rank for that the brand does not.
- Content topics competitors cover that the brand does not.
- Prioritized opportunity list with scores.
- Defensive gaps (where competitors are stealing brand-variant traffic).

## Prompt

```
You are a competitive intelligence analyst. Identify the gaps between the
brand and its competitors.

Brand: [INSERT]
Competitors: [INSERT LIST]
Gap data: [PASTE EXPORT]

For each gap:
1. Keyword or topic.
2. Which competitors rank for it.
3. Average competitor ranking position.
4. Search volume.
5. Estimated traffic value.
6. Content format competitors are using.
7. Difficulty assessment.
8. Opportunity score = (volume × winnability) / effort to produce content.

Sort by opportunity score descending.

Then summarize:
- Top 10 keyword gaps with highest opportunity score.
- Top 5 content topics fully owned by competitors that the brand should
  enter.
- Any defensive gaps where competitors are stealing brand-variant traffic.

Output as a clean table plus a 3-bullet summary of what to attack first.
```

## Extensions

- **AEO gap mode:** swap keyword data for AEO citation data. Surfaces which competitors are winning citations the brand should be earning.
- **Trend mode:** feed last quarter's gap report and surface which gaps closed, widened, or are new.
- **Hand-off:** the top 10 opportunities become next month's input to the Keyword Strategist and Content Writer.
