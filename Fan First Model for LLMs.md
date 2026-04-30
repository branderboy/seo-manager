Fan First Model for LLMs
Prepared by Kawani Ali
This system controls how live event demand is distributed across AI and search surfaces in real time.

Fan First is Live Nation's demand control system for AI discovery. It connects your existing data infrastructure—BigQuery, Databricks, Prophet, Ticketmaster inventory—to AI surfaces via a central MCP server. This turns proprietary fan and event data into real-time authoritative answers exactly when purchase decisions form.
No new builds. No GEO/SEO tactics. Pure platform play that owns the AI layer. Controls discovery, distribution, and conversion end-to-end.
The Gap
ChatGPT, Claude, Perplexity answer live entertainment queries now. Their data? Scraped, cached, wrong. No live inventory. No verified source.
Live Nation sits silent—not from lack of data, but lack of direct connection. Fan First is that wire. AI queries hit MCP endpoints. Your database responds. Every answer becomes yours. Shifts AI from inference to Live Nation dependency.
Architecture
Fan First layers on what you own. No new infrastructure.
Data Core (Existing):
BigQuery: Analytical core. Fan behavior, GSC intent, Ticketmaster transactions, server logs, email engagement. Unified schema, common fan ID across touchpoints.
Databricks: Modeling layer. Keyword clustering, intent classification, redirect mapping, Prophet environment.
Prophet: Trained on years of demand history. Outputs three signals—long-term artist growth, seasonal cycles, event-driven spikes. Currently feeds one channel. Fan First extends to AI.
SEO infrastructure: Programmatic page gen, structured data on millions of events, CI/CD via GitHub Actions, Screaming Frog validation.
Ticketmaster: Live inventory no competitor has. Real-time availability, pricing tiers, seat maps, on-sale status across 40M events globally.


MCP Control Layer (New):
Four live endpoints any AI queries directly:
search_events: Natural language query → real-time event data.
get_artist_context: Tour status, availability, pricing.
get_venue_info: Capacity, seating, schedule, logistics.
get_market_pulse: Demand density, trending genres, pricing distribution for any market.
AI pulls live data on demand. Scraped content dies. Dependency forms.

Three Core Functions
1. Source of Truth Control
AI cites what it accesses. Replaces scraped/incomplete data with direct structured connection to your live systems. Consistent verified data across Wikipedia, Wikidata, Google Knowledge Graph, MCP. One authoritative source: Live Nation. Data sovereignty over AI layer.
2. Predictive Demand Synchronization
Prophet forecasts trigger dual action simultaneously:
Traditional SEO: Title/meta/schema updates.
Fan First: MCP endpoint refreshes, entity data updates, AI citation priming.
Same signal. Two channels. No lag. Synchronized execution at peak demand.
3. Pre-Search Intent Capture
Catches earliest purchase intent in open AI chats—"exploratory" questions before search engines. Routes to Ticketmaster pre-Google. New intent signal type feeds BigQuery ETL. Invisible moment becomes yours.
LLM Distribution Layer
No single integration dependency. Live Nation data hits every AI retrieval path:
Direct MCP access: Real-time queries for events, pricing, availability.
Structured data layer: Event schema, entity relationships, knowledge graph alignment.
Indexable surfaces: Programmatic SEO pages mirror MCP output.
Entity consistency: Artist/venue/event relationships uniform everywhere.
Your data present regardless of how they retrieve.
Demand Signal Model
Prophet → Dual Action Flow:
Trend Signal → SEO prioritizes growing artists → Fan First deepens AI entity coverage.
Seasonality Signal → SEO preps campaign calendar → Fan First pre-loads citations.
Event Spike Signal → SEO pushes updates → Fan First refreshes MCP, primes indexes.
One forecast. Parallel execution. Full diagram: Data Layer → MCP → AI Systems → Demand Allocation → Conversion → Feedback Loop.

Demand Allocation Layer
Controls what wins. AI recommends few outcomes from many eligibles. This layer owns ranking/distribution. Revenue made here.
Core Inputs:
Prophet forecasts (trend/season/spike).
Ticketmaster inventory/sell-through.
Pricing tiers/margins.
BigQuery fan behavior/conversion data.
AI query geo/intent signals.

Scoring Model: Composite score per event:
Input Signal
Source
Controls
Demand Velocity
Prophet spike + sell rate
Urgency/momentum
Margin
Ticketmaster tiers
Revenue optimization
Inventory Risk
Sell-through + days to show
Sellout protection
Geo Relevance
Fan location + intent
Market alignment


Rank determines surface order/framing. Dynamic—conversions feedback-refine weights by market/genre/type.
Example: "Best concert DC weekend?"

Event A: High demand, near-sellout → #1, urgent frame.
Event B: Mid demand, high margin → #2 boost.
Event C: Low demand → Push for acceleration.
Transforms discovery into demand-shaping. Optimizes the entire inventory.
AI Advertising
No ad slots. Recommendations are the ads. Demand Allocation controls visibility via ranking logic—not purchased placement.
High-margin events: Weight boost.
Priority inventory/underperformers: Business-driven distribution.
No external bidding. Live Nation owns outcomes directly.
Shifts from buying placement to controlling recommendations.
Revenue Connection
New column in existing Search-to-GTV DOMO dashboard. Fan ID connects AI sessions to Ticketmaster transactions via BigQuery ETL. AI becomes direct revenue surface.
Precise intent data (fans' words at consideration moment) powers next-gen sponsorships. Sell demonstrated intent, not demographics.
Moat & Positioning
40M events, 150M fans, 400 venues, decades of Prophet training. ETL pipelines, fan ID, SEO stack took years to build. Competitors replicate stack first.
Fan First activates it all in AI channel. Gap widens daily.
Vision: Owns AI discovery. MCP defines truth. Allocation directs demand. Live Nation becomes the system they run on. Demand doesn't chase you, it flows through you.


