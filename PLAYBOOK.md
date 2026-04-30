# The SEO Manager Playbook

**An operating manual for SEO/AEO teams that ship.**

This is the system I install in the first 30 days as an SEO Manager. It replaces vibes with cadence, opinions with prioritization math, and "we should do that" with shipped work. It is opinionated on purpose. The point is consistency, speed, and output quality, not flexibility for its own sake.

It runs on three layers:

1. **Operating cadence** — what happens daily, weekly, monthly, and why.
2. **Prioritization framework** — how every piece of work gets scored before it enters the queue.
3. **Quality and reporting standards** — what "done" means, and how leadership knows.

Pair this with the AI worker stack in `/agents` and the executive report in `dashboard.html` and the function runs whether or not anyone is in a meeting that day.

---

## Operating Cadence

The team runs on a fixed weekly rhythm. Anything outside this rhythm needs a justification.

### Daily

- **Citation tracker** runs against priority queries across ChatGPT, Gemini, Perplexity, Claude. Output drops into the team channel by 9am.
- **Crawl monitor** checks for new 4xx/5xx, indexability regressions, schema breaks, Core Web Vitals drops on top 100 URLs. Anything critical pages the on-call specialist.
- **Standup** is async, three lines per person: shipped yesterday, shipping today, blocked by.

### Weekly

- **Monday 9am — executive report ships.** Same format every week (`dashboard.html` is the template). Headline number, KPI snapshot, three things shipped, three things moving, three things next, risks. One page. No narrative filler.
- **Monday 10am — team prioritization.** Walk the queue, score new requests, kill or defer anything below the threshold. 30 minutes, hard stop.
- **Wednesday — content review.** Every piece shipping this week passes through the QA checklist (below) before publish.
- **Friday — retro.** What moved, what didn't, what we'll change. 15 minutes.

### Monthly

- **First Monday — keyword and cluster refresh.** Pull current rankings, surface positions 4–20 (the fast-win band), rebuild the content roadmap. Drives the next four weeks of production.
- **Second Monday — competitor gap report.** Where competitors are eating us. Where we're invisible. What we're going to attack.
- **Third Monday — internal linking refresh.** Push authority to priority pages. Identify orphans. Run anchor diversity check.
- **Fourth Monday — QBR-lite to leadership.** Trajectory vs. forecast, attribution to revenue, what's next quarter.

### Quarterly

- **Strategy reset.** Re-baseline against the original 90-day plan. Update the forecast model. Surface the next set of bets.
- **Tooling audit.** Drop anything not pulling weight. The stack should shrink before it grows.

---

## Prioritization Framework

Nothing enters the production queue without a score. This is how we tell the difference between meaningful growth and random acts of optimization.

### The formula

Every candidate piece of work gets three scores from 1 to 10:

```
priority = (impact × 2) + winnability − effort
```

- **Impact (1–10):** projected revenue or pipeline lift if it lands. A new cornerstone for a high-volume commercial query is a 9. A meta description rewrite on a tail page is a 2.
- **Winnability (1–10):** likelihood of landing the result. Position 4–10 keyword refresh = 9. Net-new cornerstone vs. an entrenched competitor = 4.
- **Effort (1–10):** total team hours to ship. A schema fix is a 1. A cornerstone with original research is a 9.

The doubling on impact is intentional. Most teams underweight it and end up shipping 40 polished things that move nothing.

### Scoring rules

- Score in the open. The number is on the ticket.
- If two people score the same item more than 2 points apart, talk it out before queuing.
- Anything scoring under 8 doesn't ship this quarter. Park it.
- Re-score monthly. Things that were a 12 in January are often a 6 in March because rankings moved or the SERP changed.

### What doesn't go in the queue

- Work without a measurable outcome. "Refresh the about page" is not a ticket.
- Work where the metric we'd improve isn't already tracked. Instrument first, ship second.
- Anything someone wants because a competitor did it. Competitor presence is an input to scoring, not a reason on its own.

---

## Role Definitions

A team of four specialists plus a manager. Each role owns outputs, not activities.

### Manager (the person running this playbook)

- Owns the roadmap, the cadence, the executive report.
- Reviews everything that ships before it ships.
- Holds the prioritization line — kills work below threshold even when it's politically easier to let it through.
- Player-coach: jumps into high-priority work, doesn't hide behind the team.
- Manages stakeholders and protects the team from random asks.

### Technical SEO Specialist

- Crawl health, Core Web Vitals, schema, indexing, JS rendering, redirects.
- Owns the daily crawl monitor and the technical fix queue.
- Pairs with engineering on every shipped change.

### Content SEO Specialist

- On-page optimization, content briefs, FAQ blocks, internal linking inside articles.
- Owns the content production line: brief → draft → QA → publish → measure.
- Works upstream with the content team and downstream with the writer.

### Off-Page / Authority Specialist

- Link earning, digital PR, partnerships, expert quotes, citation building.
- Owns the relationship list and the outreach pipeline.
- Reports on link velocity and authority growth weekly.

### AEO / AI Visibility Specialist

- Tracks brand citations across ChatGPT, Gemini, Perplexity, Claude.
- Designs question-first content for LLM extraction.
- Maintains the structured data layer and the question bank.

If the team is smaller than four, the manager covers AEO and the technical specialist covers content. The cadence does not change based on headcount — only the volume per cycle does.

---

## Quality Standards

Nothing ships that fails this checklist. The specialist who drafted it does not approve it; another specialist or the manager does.

### Every page

- [ ] Primary keyword appears in H1, title, first 100 words, and at least one H2.
- [ ] Title under 60 characters, description under 155.
- [ ] Direct answer in the first 100 words. Two sentences max. This is what gets cited.
- [ ] At least one internal link in and one internal link out, both with descriptive anchor text.
- [ ] Schema validates against schema.org. JSON-LD only. No microdata.
- [ ] Core Web Vitals pass on mobile.
- [ ] No em dashes. No "in today's world." No "leverage." No "streamline." No filler.
- [ ] Every claim that can be backed up has a number, date, or specific example.
- [ ] FAQ block at the bottom on any page meant to rank for question queries.

### Every cornerstone

Everything above, plus:

- [ ] Original data point, framework, or asset that makes the page citation-worthy.
- [ ] Supporting cluster of 3–5 child pages linked to and from it.
- [ ] Question-first structure: each H2 is a real question.
- [ ] Image with descriptive alt text on every major section.
- [ ] Author byline with a credibility signal (years of experience, certifications, prior work).

### Every technical change

- [ ] Pre-ship: capture the metric we expect to move, with a baseline.
- [ ] Post-ship: capture the same metric 7 and 14 days after.
- [ ] If the metric didn't move, write down why before queuing the next change.

---

## Reporting Standards

The executive report is the product. If leadership doesn't trust the report, nothing else matters.

### What the report covers

1. **Headline number.** One sentence. The most important movement of the week.
2. **KPI snapshot.** Sessions, conversions, revenue, average position, AI citation rate, conversion rate. WoW and MoM. (See `dashboard.html`.)
3. **Three things shipped.** What got done. Specific URLs and metrics.
4. **Three things moving.** Pages or keywords trending in the right direction with numbers.
5. **Three things next.** What's queued for next week.
6. **Risks and watch items.** Anything trending the wrong way or needing a leadership decision.

### Reporting rules

- Lead with numbers, not narrative.
- Every metric has a source linked in a footnote. No black-box claims.
- If a metric moved, attribute the cause. If we don't know, say "cause not yet attributed" — never invent.
- Bad weeks get reported the same way good weeks do. The credibility of the report depends on this.

---

## What This Playbook Replaces

If you're inheriting an existing SEO function, this playbook is what you install in place of:

- Ad-hoc Slack requests that bypass the queue → **prioritization framework + Monday triage.**
- Specialists doing whatever feels urgent → **role definitions + scored queue.**
- Inconsistent content quality → **QA checklist + cross-review before publish.**
- Reports that bury the headline in 14 slides → **one-page weekly + monthly QBR-lite.**
- "We tried that, it didn't work" with no record → **pre-ship metric capture + 7/14-day post-ship review.**
- Tool sprawl → **quarterly tooling audit, default to subtract.**

---

## How This Connects to the Rest of the Repo

- **`/agents`** — the AI worker stack that automates the heavy lifting behind every cadence above. Each worker is a Claude Code skill with defined inputs, outputs, and a runnable prompt. The team uses them as force multipliers, not replacements for judgment.
- **`dashboard.html`** — the live template for the Monday executive report. Open it in a browser to see the format leadership gets every Monday at 9am.

The playbook tells the team what to do and when. The agents do the heavy lifting. The dashboard shows leadership the result. That's the system.
