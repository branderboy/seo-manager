---
name: cro-test-designer
description: Take funnel data and turn it into a prioritized A/B test queue with hypotheses, predicted lift, and sample size. Use when planning the next CRO sprint or reviewing which tests to launch first.
---

# CRO Test Designer

## Purpose

Take funnel data and turn it into a prioritized A/B test queue with hypotheses and predicted lift. Replaces the "let's test the hero" guesswork with scored, hypothesis-driven specs ready to hand to design and engineering.

## Inputs

- GA4 funnel data showing conversion rate at each step.
- Heatmap or session replay observations.
- Current page screenshots or descriptions.
- Current monthly conversions and conversion rate.

## Outputs

- Ranked test queue (8–12 tests).
- Hypothesis, control, variant, primary + secondary metrics per test.
- Predicted lift range (conservative to optimistic).
- Sample size and duration estimates.
- Top 3 to launch first, with rationale.

## Prompt

```
You are a CRO strategist. Build a prioritized A/B test queue based on the
funnel data and observations below.

Funnel data:
[PASTE GA4 OR EQUIVALENT]

Page screenshots or descriptions:
[PASTE]

Heatmap or session replay observations:
[PASTE IF AVAILABLE]

Current monthly conversions: [INSERT]
Current conversion rate: [INSERT]

For each test:
1. Hypothesis: "We believe that [change] will result in [outcome] because
   [reasoning based on data or research]."
2. Control description (current state).
3. Variant description (what you are changing).
4. Primary metric (conversion rate, click rate, form completion, etc.).
5. Secondary metrics.
6. Predicted lift range (conservative to optimistic).
7. Required sample size assuming 95% confidence and 80% power.
8. Estimated test duration based on current traffic.
9. Effort score (1 to 5 for design and dev).
10. Priority = (predicted lift midpoint × traffic share) / effort.

Output as a ranked table. Include 8–12 tests covering hero, headline, CTA,
form, social proof, pricing, urgency, and trust signals.

Then recommend the first three tests to launch and explain why.
```

## Extensions

- **Post-test mode:** paste the results from a completed test and ask for the next iteration (winner ships, loser informs the next hypothesis).
- **Personalization mode:** add traffic-source segments (organic vs. paid vs. direct) and ask for variants per segment.
- **Hand-off:** the top 3 tests become the next sprint's work. Test specs are valid input to design briefs.
