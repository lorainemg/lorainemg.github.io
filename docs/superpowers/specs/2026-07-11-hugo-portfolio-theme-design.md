# Design: Hugo portfolio with custom "indigo-night" theme

**Date:** 2026-07-11
**Status:** Approved design, pending implementation plan
**Repo:** github.com/lorainemg/lorainemg.github.io (GitHub Pages)

## Goal

Replace Loraine's Framer portfolio (loraine-portfolio.framer.website) with a
self-hosted Hugo site using a fully custom theme. The design was validated
visually during brainstorming; approved mockups live in
`.superpowers/brainstorm/37292-1783808399/content/` (`design-b-indigo.html` =
home page, `projects-pages.html` = projects list + detail).

## Architecture

```
lorainemg.github.io/
├── hugo.toml                  site config; params: social links, CV path; skills taxonomy
├── content/
│   ├── projects/              one .md per project (21 at migration)
│   └── experience/            one .md per role (6 at migration)
├── data/
│   ├── skills.yaml            skill display groups/order for the home chips
│   ├── education.yaml         degree, certifications (several), publications
│   └── achievements.yaml      awards list
├── assets/                    CV PDF, images
├── docs/superpowers/specs/    design docs (this file)
└── themes/indigo-night/
    ├── layouts/               baseof, home, section (projects), page (detail), partials
    ├── assets/css/            Tailwind entry + theme tokens
    └── assets/js/             theme toggle, scroll reveal
```

- **Hugo** (extended), current layout conventions (v0.146+ flat `layouts/` structure).
- **TailwindCSS** via Hugo's asset pipeline (`css.TailwindCSS`); Node needed only at build.
- **Theme is employer-agnostic and reusable**: all personal content comes from
  `content/`, `data/`, and `hugo.toml` params — never hardcoded in templates.

## Pages

### Home (single scroll)
Sections in order:
1. **Nav** — logo (`loraine.`), links to page sections, Download CV button.
2. **Hero** — eyebrow, display headline (one word carries the indigo→violet
   gradient), short bio, two CTAs (View projects / Get in touch), and the
   **signature career-journey graphic**: an animated dashed SVG path with
   waypoints generated from the `content/experience/` pages (place + org per
   waypoint). Generic journey motif — no flight/employer branding.
3. **Stat bar** — years of experience, project count, publications, contest result.
4. **Experience** — vertical timeline, all roles from `content/experience/`
   (ordered by end date, current roles first).
5. **Featured projects** — cards for projects with `featured: true` (~3–6).
6. **Skills** — chip grid; groups/order from `skills.yaml`, each chip links to
   its `/skills/<skill>/` page.
7. **Education & achievements** — from their data files, three sub-blocks in
   the education column: **degree** (institution, years, GPA), **certifications**
   (name, issuer, year, optional credential link — several online-course certs
   expected), **publications** (title, venue). Achievements render alongside as
   a compact award list (title, event, year, optional link). Same card/row
   styling as the rest of the page — JetBrains Mono for years/labels, no new
   visual elements.
8. **Footer** — copyright + contact/social links from site params.

### /projects/
Filterable card grid of all projects. Filter chips derive from the `category`
front-matter values (client-side JS show/hide, no page reload). Each card:
category label, title, description, tech tags, GitHub link.

### Project detail pages (optional per project)
A project `.md` with body content gets a detail page: breadcrumb, title,
action buttons (GitHub, plus any extra links from front matter), **free-form
Markdown body** (no imposed section structure), facts sidebar (year, category,
result, stack, links), prev/next navigation. A project file with front matter
only (no body) renders as a card that links directly to its GitHub URL —
no detail page.

### Skills taxonomy (skills ↔ roles ↔ projects)

`skills` is a Hugo taxonomy shared by the `projects` and `experience`
sections. Every skill used anywhere gets an auto-generated term page at
`/skills/<skill>/` listing the roles and projects that used it (grouped:
"Experience" then "Projects"). Home skill chips link to these pages; project
cards render their skills as tags that link there too. Adding a skill anywhere
is just adding a string to a front-matter list — pages appear automatically.

### Project front matter

```yaml
title: eHealth-KD Challenge 2021
description: NER and Relation Extraction with ML — 5th place at IberLEF 2021.
category: ml-nlp          # drives the /projects/ filter chips (any value works)
skills: [Python, spaCy, Scikit-Learn]
github: https://github.com/lorainemg/ehealthkd
links:                    # optional extra links for detail sidebar
  - name: Workshop paper
    url: https://...
featured: true            # appears on home
weight: 1                 # ordering
```

### Experience front matter (body = responsibility bullets, Markdown)

```yaml
title: Senior Full Stack Developer
company: Jack's Flight Club
location: Tampa, Florida (remote)
website: https://jacksflightclub.com
startDate: 2024-09-01
endDate: null             # null = present
skills: [Python, TypeScript, Docker, FastAPI]
```

Experience pages exist for the taxonomy and timeline; they render on the home
timeline and skill pages but get no standalone detail pages (`build:
render: never`-style config or simply no single template link).

## Visual system

Approved via mockups; tokens are the single source of truth in CSS/Tailwind config.

**Dark (default):**
| token | value | use |
|---|---|---|
| bg | `#12131e` | page background |
| surface | `#191b2c` | cards, panels |
| border | `#252842` | card borders, rules |
| text | `#e3e6f5` | body text (headings `#ffffff`) |
| muted | `#8b90b5` | secondary text |
| indigo | `#818cf8` | accent (links, labels, timeline) |
| indigo-deep | `#4f46e5` | solid buttons (hover `#6366f1`) |
| violet | `#bb9af7` | gradient partner only |

**Light mode:** same structure, indigo-tinted light palette — bg `#f6f7fb`,
surface `#ffffff`, border `#e3e6f0`, text `#1e2135`, muted `#5b6183`, accent
`#4f46e5`. Fine-tuned visually during implementation (same browser-iteration
process as dark).

**Type:** Space Grotesk (display/headings) · Inter (body) · JetBrains Mono
(eyebrows, dates, category labels, breadcrumbs). Self-hosted via
`hugo mod`-free local font files in theme assets (no Google Fonts requests at
runtime — GDPR-friendly and faster).

**Signature:** the career-journey SVG path in the hero. Restraint elsewhere:
gradient appears only in the headline word and the journey path.

## Behavior

- **Theme toggle:** dark default, respects `prefers-color-scheme`, manual
  toggle persisted in `localStorage`, applied via `data-theme` on `<html>`
  (inline head script to avoid flash).
- **Scroll reveal:** sections fade/rise in via `IntersectionObserver` adding a
  class; CSS transitions only. Everything inside
  `@media (prefers-reduced-motion: reduce)` guards (path animation too).
- **Project filtering:** vanilla JS, filters cards by `data-category`; "all"
  default; no URL state needed.
- **No JS frameworks.** Total JS budget: toggle + reveal + filter, ~2 KB.

## Deployment

GitHub Actions workflow (official Hugo-on-Pages pattern): on push to `main`,
build with pinned Hugo + Node versions, deploy artifact to GitHub Pages.
`baseURL = "https://lorainemg.github.io/"`.

## Content migration

Source inventory: scratchpad `site-content.md` + `project-details.md`
(crawled from the Framer site; all 21 projects have GitHub links).

⚠️ **Known-stale data** (see memory `portfolio-content-outdated`): Loraine has
left Jack's Flight Club and her current role is different; Arealec dates may
also be stale. Migrate the crawled content as placeholder, structured so the
fix is a pure `data/experience.yaml` edit she'll make later. The journey
graphic and stat bar derive from data files, so they self-correct.

**Contact links (confirmed):** github.com/lorainemg ·
linkedin.com/in/lorainemg · lorainemonteagudo@gmail.com

**Pending inputs from Loraine (content, not design):**
- Current role details + end dates for stale roles (she'll provide later).
- CV PDF for the Download CV button (button hidden until the file exists).

## Testing / verification

- `hugo` builds clean with no warnings; `hugo server` used for visual checks
  against the approved mockups in both color modes and at mobile width (~375px).
- HTML validity spot-check on home, list, and one detail page.
- Lighthouse pass: accessibility (contrast on indigo-on-dark combinations,
  focus visibility, reduced-motion) and performance (fonts preloaded, no CLS
  from the journey SVG).
- Deploy workflow verified on a real push before calling it done.

## Out of scope (deliberate)

- Blog (user declined blog-ready templates).
- CMS/admin UI, analytics, comments.
- Multilingual (site is English-only, like the Framer original).
