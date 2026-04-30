# SEO/AEO Agent Infrastructure

The AI worker stack that runs the heavy lifting behind the playbook in `/PLAYBOOK.md`.

Each worker is a self-contained Claude Code skill: defined inputs, defined outputs, a prompt that has been hardened against drift, and notes on how to extend it. The point is leverage — one manager runs the output of a five-person team without sacrificing judgment, accuracy, or stakeholder trust.

## What's in here

```
agents/
├── README.md              ← you are here
├── orchestrator.md        ← how the workers run together (the operating cadence)
└── skills/
    ├── keyword-strategist.md
    ├── aeo-question-miner.md
    ├── content-writer.md
    ├── technical-auditor.md
    ├── schema-builder.md
    ├── cro-test-designer.md
    ├── citation-tracker.md
    ├── internal-linker.md
    ├── gap-analyst.md
    └── reporting-builder.md
```

## How to run a worker

You have three options. All produce the same output.

### 1. As a Claude Code skill (recommended)

Drop the `skills/` directory into `~/.claude/skills/` (or your project's `.claude/skills/`). Each `SKILL.md` has YAML frontmatter that tells Claude Code when to auto-invoke it. From any Claude Code session:

```
/keyword-strategist
```

Or trigger it conversationally: *"cluster these keywords by intent and funnel stage"* — Claude Code will pick up the skill from the description.

### 2. As a one-off prompt

Open the relevant `SKILL.md`, copy the prompt block (everything below the frontmatter), paste into Claude or ChatGPT, fill in the `[INSERT]` fields with your data, run.

### 3. As an automated agent

Wire the prompt into Make.com, n8n, or a LangGraph node. The `[INSERT]` fields become variables. Schedule the recurring ones (citation tracker, reporting, technical audit) on the cadence in `orchestrator.md`.

## The contract every worker honors

Every skill follows the same shape:

- **Purpose.** One paragraph. What it replaces and why.
- **Inputs.** Exactly what you need to feed it. No "context optional" hand-waving.
- **Outputs.** Exactly what comes back. Format included.
- **Prompt.** The hardened prompt with `[INSERT]` placeholders.
- **Extensions.** How to push it further when the basic version isn't enough.

This contract matters because it makes the workers composable. The output of the Keyword Strategist is a valid input to the Content Writer. The output of the Citation Tracker is a valid input to the Reporting Builder. The stack only compounds because the contracts hold.

## What these agents don't replace

- **Judgment on what to ship.** The prioritization framework in `/PLAYBOOK.md` is run by a human.
- **Stakeholder management.** The agents produce drafts; the manager owns the conversation.
- **Final QA before publish.** The QA checklist in the playbook is a human gate.
- **Anything where being wrong has a high cost.** Schema markup that misrepresents the business, public statements about competitors, anything legal-adjacent.

The pattern is: agents draft, humans decide. That's the line.

## Ten workers, one operating system

The full operating cadence — what runs daily vs. weekly vs. monthly — lives in [`orchestrator.md`](./orchestrator.md). Read that next if you want to see how the workers compose into a single team-of-one operating system.
