# Recursive Trail Landing Page — Design Spec

**Date:** 2026-07-29  
**Status:** Approved for implementation  
**Repo:** `RecursiveTrail.github.io` (GitHub Pages user site)

## Goal

A single-page marketing site for Recursive Trail, a two-person full-stack studio offering web, mobile, frontend, and backend development. Primary conversion: enquiry form that writes to a Google Sheet via Google Forms.

## Stack

- **Astro 5** + **Tailwind CSS** + TypeScript
- Static build to `dist/`, deployed via GitHub Actions to GitHub Pages
- Live URL: `https://recursivetrail.github.io`
- No analytics for launch

## Content as JSON

All editable website copy and structured data lives in JSON under `src/content/`, not in component files. **Prefer editing JSON over touching Astro/TS for content changes.**

| File | Purpose |
|------|---------|
| `src/content/site.json` | Brand, SEO, nav, hero, services, stack, why-us, process, team, contact copy, footer, social links |
| `src/content/form.json` | Google Form action URL, field `entry.*` IDs, options, labels, honeypot config |

Components import these files via `src/content/index.ts` (thin typed re-export). Changing headlines, services, team bios, or form wiring means editing JSON only — no markup changes for routine content updates.

## Page structure (single page)

Order:

1. **Header** — sticky; logo wordmark + section anchors + “Get in touch” CTA → `#contact`
2. **Hero** — brand name as hero signal, one headline, one short supporting line, one CTA
3. **Services** — website, app/frontend, backend, mobile
4. **Tech stack** — React, HTML/CSS/JS, React Native, Flutter, Node.js, Spring Boot, Python
5. **Why us** — senior pair, direct access, end-to-end delivery (no pricing)
6. **Process** — discovery → build → ship → support
7. **Team** — two named people with photos and short bios (placeholders until real assets provided)
8. **Contact** — custom-styled form matching site theme
9. **Footer** — brand, socials, copyright

**Out of scope for v1:** portfolio, testimonials, FAQ, pricing, light/dark toggle, analytics.

## Visual direction

- Dark, technical, developer-focused
- Near-black background with subtle depth (gradient / soft grid), single accent color, monospace accents on labels/section numbers
- Expressive typography (not Inter/Roboto/system-only); avoid purple-gradient “AI default” and cream/terracotta looks
- Brand “Recursive Trail” is a primary hero-level signal; generated logo mark + wordmark
- Mobile-first responsive layout; first viewport: brand, headline, supporting sentence, CTA — no stats/cards clutter in hero
- Motion: 2–3 intentional effects (e.g. fade-in on scroll for sections, subtle accent underline / CTA hover)

## Contact form

**Backend:** existing Google Form (public).

- Form title: Project Inquiry Form
- Action: `https://docs.google.com/forms/d/e/1FAIpQLSfLORp89PHbS0ZF1bHJRu17IcDLFWAuK6psVfBCmWgEWXf39Q/formResponse`
- Fields (from form):

| UI label | Google field | Entry ID | Control |
|----------|--------------|----------|---------|
| Full Name | Full Name | `entry.750210231` | text |
| Email Address | Email Address | `entry.846203511` | email |
| Primary goal | What is the primary goal… | `entry.273494085` | radio / select — Web Development, Mobile App Development, UI/UX Design, Consulting, Other |
| Requirements | Please describe… | `entry.1889579180` | textarea |
| Timeline | What is your estimated timeline… | `entry.254600995` | select — As soon as possible, Within 1 month, 1–3 months, 3–6 months, More than 6 months |

**Submission method:** native `<form>` POST into a hidden iframe (`target` = iframe name). On iframe `load` after submit, show success UI. Avoid opaque `no-cors` fetch.

**Anti-spam (light):** honeypot field (never sent as a real Google entry) + client-side min-time-before-submit. Document that determined spam can still hit the Sheet; upgrade path is Apps Script + captcha.

**Validation:** required name, valid email, goal, requirements, timeline; inline errors; accessible labels and focus states.

## SEO / meta

- Title, description, OG/Twitter tags from `site.json`
- Favicon from logo
- `sitemap.xml` + `robots.txt` via Astro integrations where practical

## Deployment

- GitHub Actions: build on push to `main`, upload `dist/` to Pages
- `astro.config` with `site: 'https://recursivetrail.github.io'` (no base path)

## Placeholders until provided

- Team full names, titles, bios, photos
- Business email, phone, social URLs, city/timezone
- Legal entity string for footer (studio vs registered company)
- Final logo pick (generate options; ship a default)

Use clearly marked placeholder strings in JSON so they are easy to find and replace.

## Verification

- `astro check` and production `astro build` succeed
- Manual: form submission appears in linked Google Sheet
- Spot-check mobile and desktop layout

## Non-goals

- CMS, blog, multi-page IA, portfolio section, rate cards
- Server-side runtime (fully static)
