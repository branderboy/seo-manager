# Coverage Fix Plan — 3 clients

**Source:** GSC Coverage drilldown exports, 2026-05-11.
**What this is:** the actual work. Three sites, three different reasons pages are missing from Google, and the fix for each. Money pages first.

The pattern for all three: find why Google is skipping the page, remove the reason, then ask Google to recrawl. Same method I used on the midlandfloors hack cleanup.

---

## 1. allpurposeanytimeservices.com — 19 money pages Google has NEVER crawled

**GSC label:** Discovered - currently not indexed.

**The tell:** every URL shows `Last crawled: 1969-12-31`. That date is the computer equivalent of "never." Google found these pages (in a sitemap or a link) but has not bothered to visit them yet. They are not competing in search because Google has not even read them.

**Which pages:** these are the ones that make money.

```
/services/plumber-bethesda-md        /services/hvac-falls-church-va
/services/plumber-arlington-va       /services/hvac-repair-fairfax-va
/services/plumber-silver-spring-md   /services/hvac-rockville-md
/services/painter-alexandria-va      /services/hvac-repair-bowie-md
/services/painter-falls-church-va    /services/roofing
/services/painter-silver-spring-md   /washington-dc  /virginia
/services/painter-waldorf-md         /silver-spring  /waldorf
```

City + service pages. This is the exact inventory a local business ranks on.

**Why Google is ignoring them:** "Discovered but never crawled" almost always means one of three things, usually all three:
1. The pages are **orphans** — nothing on the site links to them, so Google has no path in and no reason to prioritize them.
2. **No clean XML sitemap** pushing them, or the sitemap lists a different host (note these are on `www.` while other crawled pages are non-`www`).
3. **Low site authority + thin internal linking**, so Google rations its crawl and these sit at the back of the queue.

**The fix (in order):**
1. **Pick one host and stick to it.** Decide `www` vs non-`www`, 301-redirect the other, and make every internal link and the sitemap use that one host. The site is currently split across both, which wastes crawl budget. (See the redirect snippet in `host-canonical.txt`.)
2. **Link to every one of these 19 pages from a page Google already indexes.** Build a "Service Areas" section in the footer or a `/locations` hub that links to each city/service page with descriptive anchor text (e.g. "Plumber in Bethesda, MD"). Orphan pages get crawled once they have internal links pointing at them.
3. **Submit one clean XML sitemap** containing only these canonical URLs. Resubmit in GSC.
4. **Request indexing** for the top 5 revenue pages by hand in GSC (URL Inspection → Request Indexing). Do the highest-value cities first.
5. **Add LocalBusiness + Service schema** to each page (template in `localbusiness-schema.json`). It does not force indexing, but it tells Google exactly what the page is.

**Expected result:** crawl dates change from 1969 to a real date within 1–2 weeks, then indexing follows for the pages that are genuinely unique.

---

## 2. divinecleaningdc.com — duplicate-URL mess (39 "Page with redirect")

**GSC label:** Page with redirect.

**The tell:** the same pages exist in four different addresses. Look at the home page alone:

```
http://divinecleaningdc.com/            http://www.divinecleaningdc.com/
https://divinecleaningdc.com/index      https://www.divinecleaningdc.com/index.html
http://divinecleaningdc.com/index.html  http://www.divinecleaningdc.com/index.html
```

Google is finding `http`/`https`, `www`/non-`www`, and `/index` vs `/index.html` variants of every page. They all redirect around to each other, so Google reports them as "Page with redirect" and wastes its time on duplicates instead of indexing real content.

**Why it matters:** ranking signals (links, authority) get split across four versions of each page instead of stacking on one. A local cleaning company cannot afford to dilute its authority four ways.

**The fix:**
1. **Choose one canonical form:** `https://divinecleaningdc.com/` (https, no www). That is the version GSC already shows being crawled most.
2. **301-redirect everything else to it, in one hop.** Force https, strip `www`, and pick either extensionless or `.html` (not both). One redirect, not a chain. Snippet in `host-canonical.txt`.
3. **Add a self-referencing canonical tag** to the `<head>` of every page pointing at its one true https/non-www URL. This is a static `.html` site, so each file needs the tag added once:
   ```html
   <link rel="canonical" href="https://divinecleaningdc.com/office-cleaning-dc.html">
   ```
4. **Rebuild the XML sitemap** with only the canonical URLs. No http, no www, no duplicate `/index` variants.
5. **Resubmit the sitemap** and let the "Page with redirect" count fall as Google settles on the canonical versions.

---

## 3. drywallprosdc.com — 12 pages crawled and rejected

**GSC label:** Crawled - currently not indexed.

This one is different from the other two. Google read these pages and **chose not to index them.** That is a quality/duplication judgment, not a crawl problem. Triage them into two piles.

**Pile A — should never have been candidates (leave them out, do not waste effort):**

| URL | Why it is fine to skip |
|---|---|
| `/jobs/certified-carpenter/`, `/jobs/professional-painters/`, `/jobs/project-manager/` | Recruitment pages, no search value. Add `noindex`. |
| `/thank-you-lead-2/` | Post-form thank-you page. Should be `noindex` always. |
| `/web-stories/feed/` | An RSS feed, not a page. Ignore. |
| `/category/drywall-repair-and-installation-services/` | Thin WordPress archive. `noindex` or point it at the real service page. |

Cleaning these up also makes the "not indexed" number drop, which makes the report honest.

**Pile B — these are money pages Google rejected, and that is the real problem:**

```
/falls-church-va-drywall-repair/     /mclean-va-drywall-repair/
/greenbelt-md-drywall-repair/        /hyattsville-md-drywall-repair/
/drywall-companies-to-hire-in-silver-spring-maryland/
```

City pages that should rank for "[city] drywall repair." Google saw them and said "not worth indexing." That verdict almost always means **near-duplicate, templated content** — same page with the city name swapped. The fix is to make each one genuinely different:

1. **Unique content per city:** real local detail, not a find-and-replace. Neighborhoods served, a local job example, city-specific pricing or permit notes, a relevant photo with alt text.
2. **A direct answer in the first 100 words** ("Drywall repair in Falls Church, VA starts at $X and most jobs finish in Y days"). This is what gets indexed and cited.
3. **LocalBusiness + Service schema** with `areaServed` set to the city (template in `localbusiness-schema.json`).
4. **Internal links** from the home page and main service page into each city page with the city in the anchor text.
5. **A unique title and meta** per city, under 60 / 155 characters.
6. After the rewrite, **Request Indexing** in GSC for each.

Pages that earn their own content get indexed. Pages that are clones do not. That is the whole story here.

---

## Priority order across all three

Scored with the playbook formula `priority = (impact × 2) + winnability − effort`:

| Rank | Action | Site | Why first |
|---|---|---|---|
| 1 | Internal-link + sitemap the 19 never-crawled pages | allpurpose | Highest impact. 19 money pages currently invisible, low effort to link them. |
| 2 | One-hop 301 to a single canonical host | divine | Stops authority leaking four ways. Mechanical, fast. |
| 3 | Rewrite the 5 city pages to be genuinely unique | drywallpros | High impact but real content effort. Worth it; these are core revenue queries. |
| 4 | `noindex` the jobs / thank-you / feed pages | drywallpros | Cleanup. Makes the index and the report honest. |

Files in this folder:
- `host-canonical.txt` — the redirect rules for sites 1 and 2.
- `localbusiness-schema.json` — fill-in-the-blanks schema for the city/service pages.
