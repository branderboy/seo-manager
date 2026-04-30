---
name: schema-builder
description: Generate validated JSON-LD structured data for any page type. Use when shipping new pages or fixing schema gaps surfaced by the technical auditor.
---

# Schema & Structured Data Builder

## Purpose

Generate validated JSON-LD for any page type. Critical for AEO because LLMs and Google AI Overviews favor structured pages.

## Inputs

- Page URL and page type (Service, FAQ, HowTo, LocalBusiness, Product, Review, Article, BreadcrumbList).
- Page content (paste or describe).
- Business info (name, address, phone, hours, ratings).

## Outputs

- Validated JSON-LD ready to paste into the CMS.
- Required vs. recommended vs. optional field breakdown.
- Validation checklist.

## Prompt

```
You are a schema markup specialist. Generate clean, validated JSON-LD for
the page below.

Page URL: [INSERT]
Page type: [INSERT — Service, FAQ, HowTo, LocalBusiness, Product, Review,
  Article, BreadcrumbList, or combo]
Page content: [PASTE OR DESCRIBE]
Business info: [PASTE]

Rules:
1. Use schema.org vocabulary.
2. Include all required fields and recommended fields.
3. Nest types correctly (e.g. Service inside Organization).
4. Use ISO 8601 for dates and times.
5. Use full URLs for @id and url fields.
6. For ratings, only include if real data is provided. Never fabricate.

Output:
1. The JSON-LD code block ready to paste.
2. A bulleted list of which fields are required, recommended, or optional.
3. A validation checklist:
   - Does every @type match a real schema.org type?
   - Are all URLs absolute?
   - Are required fields populated with real data?
   - Does the markup match the visible content on the page?

If any data is missing that would prevent valid markup, list those gaps
clearly at the top before showing the code.
```

## Extensions

- **Combo pages:** for pages that should carry multiple schema types (e.g. Service + FAQ + BreadcrumbList), ask the model to nest into a single `@graph` array.
- **Validation mode:** paste an existing JSON-LD block and ask for a diff against schema.org spec. Surfaces fabricated fields and missing required ones.
- **Hand-off:** the validated JSON-LD is the publish artifact. Goes straight to the CMS or a Webflow embed block.
