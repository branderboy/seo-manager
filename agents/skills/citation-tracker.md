---
name: citation-tracker
description: Track brand citations across ChatGPT, Gemini, Perplexity, and Claude for target queries. The AEO equivalent of rank tracking. Use daily for priority queries or weekly for the full set.
---

# AI Search Visibility Tracker

## Purpose

Track brand citations across ChatGPT, Gemini, Perplexity, and Claude for target queries. The AEO equivalent of rank tracking. Most teams have no system for this — running it weekly puts you ahead of 95% of the market.

## Inputs

- List of target queries (50–100).
- Brand name and primary competitor names.
- Frequency of tracking (daily for priority, weekly for full set).

## Outputs

- Citation log per query per LLM.
- Sentiment and context of each citation.
- Competitor citation tracking for the same queries.
- Week-over-week trend.
- Top 3 actions to take this week.

## Prompt

```
You are an AI visibility analyst. I will give you a list of queries. For
each query, simulate or actually run the query against ChatGPT, Gemini,
Perplexity, and Claude.

Inputs:
- Brand: [INSERT]
- Competitors: [INSERT LIST]
- Queries: [INSERT LIST]

For each query and each LLM, log:
1. Was the brand mentioned? Yes/No.
2. If yes, in what position (first, mid, last)?
3. What was the context (recommended, listed as option, mentioned in passing,
   compared favorably, compared unfavorably)?
4. Were any competitors mentioned? Which ones and in what context?
5. What sources did the LLM cite (if visible)?
6. Suggested action to improve citation rate for this query.

Output format:
| Query | LLM | Brand mentioned | Position | Context | Competitors | Sources | Action |

After the table, summarize:
- Total citation rate across all queries (% mentioned).
- Top 5 queries where brand wins.
- Top 5 queries where brand loses.
- Top 3 competitors winning the most citations.
- Top 3 actions to take this week.

Note: if you cannot actually run the queries, say so and provide a tracking
template the user can fill in manually.
```

## Extensions

- **Priority queue mode:** mark a subset of queries as "priority" and run them daily; run the full set weekly.
- **Source-citation mode:** when an LLM cites specific URLs, log them as a separate column. Surfaces which content is winning citations and informs the Internal Linker.
- **Hand-off:** the citation rate row goes to the Reporting Builder. The "actions to take" list goes to the Content Writer queue.
