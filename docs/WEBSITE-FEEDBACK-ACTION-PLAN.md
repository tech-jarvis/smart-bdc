# Website Feedback — Action Plan

**Date:** March 2026  
**Scope:** UI/UX, layout, content, and services based on stakeholder feedback.

---

## 1. Recommendation: **Yes — Update the Website**

**Rationale:** The feedback is aligned with conversion and retention goals (reduce bounce, increase engagement, clarify offerings). The current site is solid and professional but underplays visuals, doesn’t yet offer a “find everything on the homepage” experience, and is missing a clear **Pure Digital Services** story (SEO, Website Management, Lead Gen). Implementing the plan below will make the site more engaging, clearer, and better aligned with how you want to position Smart BDC (dealership-first + full digital services).

---

## 2. Feedback Summary

| Area | Ask |
|------|-----|
| **Vibe** | More attractive, “funky,” engaging to maximize retention and reduce bounce. |
| **Imagery** | High-quality, relevant photography (cars/dealerships, call center/Virtual BDC); Pinterest-inspired modern aesthetic; strong, eye-catching section backgrounds. |
| **Layout** | Homepage = single comprehensive view; users find what they need without excessive clicking; scrollable flow with value props above the fold and 2–3 additional service sections revealed on scroll. |
| **Content** | Prominently feature Smart BDC for **auto dealerships**; add a dedicated **“Pure Services”** section for digital offerings: **BD**, **SEO** (rank dealership site on top page), **Website Management**, **Lead Generation / Hunting**. |

---

## 3. Gap Analysis: Current vs Requested

| Feedback item | Current state | Gap |
|---------------|----------------|-----|
| Funky, engaging design | Clean, professional (navy/red, gradients, cards) | Design feels safe; limited “wow” visuals and background treatments. |
| High-quality imagery | One Unsplash image on services; hero uses particles only | No consistent use of cars/dealerships, call centers, or BDC teams. |
| Eye-catching backgrounds | Alternating white / `section--alt` (light gray) | No bold patterns, gradients, or section-specific background treatments. |
| Homepage comprehensive | Hero → Stats → 4 service cards → CRM strip → Why Us → Testimonials → CTA | Services are summarized in 4 cards; no in-page “service sections” (e.g. 2–3 scroll sections that mirror key service pages). |
| Scrollable architecture | Single services block, then links to Services page | Could add 2–3 distinct scroll sections (e.g. Dealership BDC, Pure Digital Services, Lead Gen) so more value is visible on one page. |
| Dealership prominence | “Why Dealers Choose” and dealership testimonials; services page features “Car Dealership BDC” first | Could strengthen on homepage (e.g. hero or first section explicitly “for dealerships,” clearer dealership-first messaging). |
| Pure Services section | Not present | No dedicated area for **BD**, **SEO**, **Website Management**, **Lead Generation / Hunting** as distinct digital services. |
| SEO / Website / Lead Gen | Not called out as standalone offerings | Need clear copy and placement (e.g. “Get your dealership on page one,” “Website Management,” “High-quality lead generation”). |

---

## 4. Phased Action Plan

### Phase 1 — Quick wins (1–2 weeks)

**Goal:** Improve clarity and layout without a full redesign.

| # | Action | Owner / notes |
|---|--------|----------------|
| 1.1 | **Homepage: Strengthen dealership focus** — Add a short line in hero or directly below (e.g. “Built for auto dealerships”) and ensure first value proposition is dealership-specific. | Content + dev |
| 1.2 | **Add “Pure Services” section (homepage)** — New section titled e.g. “Digital Services for Your Dealership” with 4 items: **Business Development (BD)**, **SEO** (“Rank your dealership website on page one”), **Website Management**, **Lead Generation / Hunting** (“High-quality leads to your door”). Reuse existing card/icon style; link to Services or new sub-pages if needed. | Content + dev |
| 1.3 | **Homepage: One more scroll section** — Add a second service block (e.g. “Dealership BDC in depth” or “From leads to sold units”) so the main page has 2–3 clear value sections on scroll, reducing need to click away. | Content + dev |
| 1.4 | **Services page: Add Pure Services** — Add a distinct “Digital & Marketing Services” or “Pure Services” block listing SEO, Website Management, Lead Gen, BD with short descriptions and CTAs. | Content + dev |

**Deliverables:** Updated `index.html` (hero tweak, Pure Services section, one extra scroll section), updated `services.html` (Pure Services block), any new copy in a single source (e.g. copy doc or comments).

---

### Phase 2 — Imagery and visual depth (2–3 weeks)

**Goal:** Make the site feel more “funky” and trustworthy with relevant visuals.

| # | Action | Owner / notes |
|---|--------|----------------|
| 2.1 | **Image audit and sourcing** — Define 5–7 key slots: hero (optional), 2–3 section backgrounds or cards, services page hero, testimonial/trust. Source from Pinterest-inspired references + stock (e.g. Unsplash, Pexels, or licensed): cars/dealerships, BDC/call center teams, virtual/remote work. Prefer consistent style (e.g. bright, modern, or muted premium). | Design / marketing |
| 2.2 | **Add imagery to homepage** — Hero background image or full-width section image; at least one section with a strong photo (e.g. “Why Dealers Choose” or new Dealership section). Use `assets/` and optimize (WebP + fallback, lazy load). | Dev + design |
| 2.3 | **Add imagery to services** — Ensure “Car Dealership BDC” and the new Pure Services block have appropriate images (dealership, laptop/SEO, lead gen). | Dev + design |
| 2.4 | **Section backgrounds** — Introduce 1–2 “eye-catching” section backgrounds (e.g. subtle gradient mesh, soft shapes, or branded pattern) on homepage and/or services, without cluttering readability. | Design + CSS |

**Deliverables:** Image list + final assets, updated HTML/CSS for hero and 2–3 sections, optimized image markup.

---

### Phase 3 — UI/UX polish and engagement (2–4 weeks)

**Goal:** Increase “funky” factor and retention (scroll depth, time on page, fewer bounces).

| # | Action | Owner / notes |
|---|--------|----------------|
| 3.1 | **Visual design refresh** — One design pass on typography, spacing, and color (e.g. one accent for CTAs, stronger section contrast) so the site feels more distinctive while staying on-brand. | Design |
| 3.2 | **Micro-interactions** — Subtle hover states, card lift, or button feedback already partially present; extend to new sections and ensure consistency. | Dev |
| 3.3 | **Above-the-fold clarity** — Ensure hero + first stat or value line answer “what is this and who is it for?” in under 5 seconds. A/B test headline/subhead if possible. | Content + optional analytics |
| 3.4 | **Navigation and discoverability** — If Pure Services or Lead Gen become key products, consider a nav item or mega-menu so “SEO / Website / Lead Gen” are one click away. | Dev + content |

**Deliverables:** Updated `styles.css` and component markup, optional A/B test plan, nav updates.

---

### Phase 4 — Content and SEO (ongoing / 1–2 sprints)

| # | Action | Owner / notes |
|---|--------|----------------|
| 4.1 | **Dedicated pages (optional)** — If you want separate landing pages: “SEO for Dealerships,” “Website Management,” “Lead Generation” with clear CTAs and schema. | Content + dev |
| 4.2 | **Meta and schema** — Update meta descriptions and structured data to include new services (SEO, Website Management, Lead Gen). | Dev |
| 4.3 | **Proof points** — Add one line or short testimonial per Pure Service where possible (e.g. “We got to page one for ‘used cars [city]’”). | Content |

**Deliverables:** New or updated pages, updated meta/JSON-LD, short proof snippets.

---

## 5. What to Defer or Skip

- **Full rebrand** — Not required by feedback; keep logo and core palette.
- **Replacing all industry verticals** — Keep solar, RV, roofing, etc.; add Pure Services *in addition* so dealerships see both BDC and digital services.
- **Heavy animation** — “Funky” can be achieved with imagery and layout first; avoid large motion or autoplay that hurts performance or accessibility.

---

## 6. Success Metrics (suggested)

- **Bounce rate** — Target decrease after Phase 2–3.
- **Scroll depth** — % of users reaching “Pure Services” and final CTA on homepage.
- **Clicks to Services / Contact** — Increase from homepage after adding sections and CTAs.
- **Time on site** — Slight increase as content and visuals improve.

---

## 7. Summary

| Question | Answer |
|----------|--------|
| Should we update the website? | **Yes.** |
| Priority order | (1) Pure Services + dealership emphasis + homepage layout → (2) Imagery and backgrounds → (3) UI/UX polish → (4) Content/SEO and optional pages. |
| Biggest gaps | No “Pure Services” section (SEO, Website Mgmt, Lead Gen, BD); homepage not yet “comprehensive” with 2–3 scroll sections; limited imagery and “funky” visual impact. |
| Lowest risk, high impact | Phase 1: add Pure Services section and one more scroll section on homepage; tighten dealership messaging. |

Use this document as the master checklist; adjust dates and owners to match your team and release schedule.
