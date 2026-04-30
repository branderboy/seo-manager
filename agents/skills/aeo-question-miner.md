---
name: aeo-question-miner
description: Surface the real questions people ask LLMs about a topic, with answer structure and schema recommendations. Use when starting an AEO content roadmap or building out FAQ banks for a service category.
---

# AEO Question Miner

## Purpose

Surface the actual questions people ask ChatGPT, Gemini, Perplexity, and Claude about a topic. This is the foundation of every AEO content strategy and almost nobody is doing it systematically.

## Inputs

- Topic or service category (e.g. smart home installation, small business insurance).
- Target audience (homeowner, property manager, renter, small business owner).
- Geography if relevant.

## Outputs

- 30–50 real questions ranked by likely search/citation value.
- Question type tag (definition, comparison, how-to, troubleshooting, recommendation).
- Suggested answer structure for each question.
- Schema markup recommendation per question.
- Top 10 flagged for booking/conversion intent.

## Prompt

```
You are an AEO research analyst. I am building content that wins citations
in ChatGPT, Gemini, Perplexity, and Claude.

Your job: surface the real questions people ask AI engines about this topic.

Topic: [INSERT TOPIC]
Audience: [INSERT AUDIENCE]
Geography: [INSERT IF RELEVANT]

Steps:
1. Generate 50 distinct questions a real user would type or speak into an AI
   engine about this topic. Mix definitional, comparison, how-to,
   troubleshooting, and recommendation questions.
2. Tag each question with its type.
3. For each, recommend the optimal answer structure:
   - Direct answer in 1–2 sentences
   - Supporting context (3–5 sentences)
   - Proof element (data, example, citation)
4. Recommend schema markup type (FAQ, HowTo, QAPage, etc.).
5. Flag the top 10 questions most likely to drive booking or conversion intent.

Output format:
| # | Question | Type | Answer Structure | Schema | Booking Intent |

Do not generate generic questions. Make them specific and naturally phrased,
the way a real person actually asks an AI assistant.
```

## Extensions

- **Competitor parity:** add a competitor name and ask the model to flag any question where the competitor is currently winning citations.
- **Long-tail mining:** swap "50 distinct questions" for "150 distinct questions" and split the output into pillar / supporting / long-tail tiers.
- **Hand-off:** flagged conversion-intent questions are valid input to the Content Writer.
