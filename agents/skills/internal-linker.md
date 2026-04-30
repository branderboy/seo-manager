---
name: internal-linker
description: Map a site's content graph and recommend internal links that push authority to priority pages. Use monthly to refresh internal linking or after publishing new cornerstones.
---

# Internal Linking Strategist

## Purpose

Map the site's content graph and recommend internal links that push authority to priority pages. Most internal linking work is done by feel; this worker makes it data-driven.

## Inputs

- Full URL list with traffic, ranking keywords, and current internal link count.
- Priority page list (which pages need authority pushed to them).

## Outputs

- Per priority page: 5–10 source pages that should link to it.
- Suggested anchor text for each link.
- Orphan page list.
- Anchor text diversity check.

## Prompt

```
You are an internal linking strategist. Map the content graph and recommend
links that push authority to priority pages.

Inputs:
URL list with metrics: [PASTE]
Priority pages: [PASTE]

For each priority page:
1. Identify 5 to 10 source pages that should link to it.
2. Justify each suggestion using topical relevance, traffic, and authority.
3. Suggest anchor text that is natural, varied, and keyword relevant.
4. Flag any source page that already links to the priority page.
5. Note ideal placement on the source page (intro, body, related links).

Then output:
- Orphan page list (pages with zero internal links).
- Top 10 pages with highest authority that should be linked from more often.
- Anchor text diversity check (flag any priority page where 80%+ of links use
  the same anchor).

Output as a structured table sorted by priority page.
```

## Extensions

- **Topical cluster mode:** feed a cornerstone + its supporting cluster and ask the model to validate every link is bidirectional and the anchors form a complete topical signal.
- **Refresh mode:** run quarterly with last quarter's recommendations as input. Output flags which links got implemented vs. which never shipped.
- **Hand-off:** the per-page link list becomes a publish ticket. The orphan list becomes content roadmap input or a candidate list for noindex/redirect.
