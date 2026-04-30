# Orchestrator

How the ten workers compose into a single operating system. This file is the rhythm that turns isolated prompts into a function.

## The principle

Running each worker in isolation is fine. Running them as a coordinated system is what creates leverage. The orchestrator is the cadence that connects them.

## Daily

| Worker | What runs | Output drops where |
|---|---|---|
| Citation Tracker | Priority queries against ChatGPT, Gemini, Perplexity, Claude | Team channel by 9am |
| Technical Auditor | Crawl + Core Web Vitals delta on top 100 URLs | On-call specialist if critical |

## Weekly

| Day | Worker | What runs |
|---|---|---|
| Mon 8am | Reporting Builder | Pulls GSC + GA4 + ranking + citation + CRO into the executive report |
| Mon 9am | (Manager) | Ships the report. Format = `dashboard.html`. |
| Mon 10am | (Team) | Prioritization triage. Score new requests. Kill anything below 8. |
| Tue–Thu | Content Writer | 2–3 articles per week, each passing QA before publish |
| Tue–Thu | Schema Builder | New pages get JSON-LD before they go live |
| Wed | (Manager) | Content review. Cross-reviewer signs off using the playbook QA checklist. |
| Thu | CRO Test Designer | Reviews live test data, recommends next moves |
| Fri | (Team) | Retro. 15 min. |

## Monthly

| Week | Worker | What runs |
|---|---|---|
| Week 1 | Keyword & Cluster Strategist | Refresh the content roadmap. Surface position 4–20 fast wins. |
| Week 2 | Gap Analyst | Competitor delta report. What we're losing, where we're invisible. |
| Week 3 | Internal Linker | Push authority to priority pages. Identify orphans. |
| Week 4 | (Manager) | QBR-lite to leadership. Trajectory vs. forecast. |

Also monthly: AEO Question Miner expands the question bank by 50 entries. These feed next month's content roadmap.

## Quarterly

- Re-baseline against the original 90-day plan.
- Update the forecast model from actuals.
- Drop one tool from the stack. The point is to subtract before adding.

## How outputs chain

The compounding only works because workers feed each other. The chains that matter most:

```
Keyword Strategist     → Content Writer (cluster + brief in)
AEO Question Miner     → Content Writer (questions in)
Content Writer         → Schema Builder (JSON-LD on every new page)
Content Writer         → Internal Linker (new node in the graph)
Citation Tracker       → Reporting Builder (AEO row in the report)
Technical Auditor      → Reporting Builder (site health row)
CRO Test Designer      → Reporting Builder (test results row)
Gap Analyst            → Keyword Strategist (gaps become next month's queue)
```

Every Monday the Reporting Builder has all five upstream feeds. That's why the report ships at 9am instead of "sometime."

## What the manager owns inside the orchestrator

- The prioritization line (nothing scoring under 8 enters the queue).
- The QA gate (cross-review every piece before publish).
- The narrative (the headline number on Monday is a human call, not an LLM call).
- The stakeholder loop (executives talk to the manager, not the agents).
- The kill switch (when an agent drifts, it gets pulled until the contract is fixed).

## What runs without the manager

- Daily citation tracking.
- Daily crawl monitoring.
- Drafting (content, briefs, schema, test specs, gap analyses).
- Pulling and shaping data for the Monday report.
- Internal link recommendations.

The split is on purpose: the agents handle the work that compounds with consistency. The manager handles the work that requires judgment. Reverse that and you ship faster but lose trust. Get it right and you ship at agency velocity without the agency cost.

## Wiring the stack

Three patterns work, in order of leverage:

**Lightweight — Claude Code skills.** Drop `/agents/skills` into `~/.claude/skills`. Run any worker with `/<skill-name>`. This is the fastest setup; no infra. Best for solo or 1–2 person teams.

**Medium — scheduled prompts.** Make.com or n8n schedule the daily and weekly workers. Outputs land in a Notion DB or a Slack channel. Best for 3–5 person teams where the manager wants the report waiting Monday morning.

**Heavy — agent graph.** LangGraph or a custom orchestrator with retries, validators, and a memory layer. Best when the team is 5+ and the workers are running against multiple brands or properties in parallel.

Start lightweight. Move to medium when daily runs are reliable. Move to heavy only when the brand portfolio justifies the engineering investment.
