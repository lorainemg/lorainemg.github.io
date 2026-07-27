# Home page TOC rail: move section links out of the header

**Date:** 2026-07-27
**Status:** Approved
**Origin:** Design review by Lorena (designer). Most header nav links are anchors into home page content, not pages; in-page content navigation belongs in a table of contents, not the site nav.

## Goal

Replace the header's in-page anchor links (Experience, Skills, Education) with a sticky table-of-contents rail on the home page that shows where you are while scrolling. The header keeps only real destinations. The theme stays fully generic: every rail entry is conditional on the same data that renders its section, and all strings go through i18n.

## Current state

- `layouts/partials/header.html` renders four nav links: Experience (`/#experience`), Projects (`/projects/`), Skills (`/#skills`), Education (`/#education`), plus the CV button and theme toggle. Three of the four are home page anchors.
- The home page (`layouts/home.html`) is a single scroll: hero, experience, featured projects, skills, education.
- Sections `#experience`, `#skills`, `#education` have anchor IDs; the featured projects section has none.
- `assets/js/reveal.js` already uses an IntersectionObserver; the scroll-spy mirrors its pattern.
- The 1080px `.wrap` column is centered, leaving free margin at the viewport edges on wide screens. The journey graphic already hides below 1024px; the rail follows the same show-only-when-there-is-room philosophy.

## Design

### 1. Header

Remove the Experience, Skills, and Education anchor links from `header.html`. Keep the logo, the Projects page link, the CV button, and the theme toggle. The `nav_experience`, `nav_skills`, and `nav_education` i18n strings remain; the rail reuses them.

### 2. TOC rail partial

New `layouts/partials/toc.html`, included only from `home.html` so it never renders on other pages. Entries, in page order, each gated by the same condition that renders its section:

| Entry | Anchor | Condition |
|---|---|---|
| Experience | `#experience` | experience regular pages exist |
| Projects | `#projects` | featured projects exist |
| Skills | `#skills` | `site.Data.skills` |
| Education | `#education` | education data or achievements data |

The featured projects section in `featured-projects.html` gains `id="projects"`. The rail renders only when it has at least two entries. A small heading above the entries uses one new i18n string, `toc_label` ("On this page").

### 3. Placement and appearance

A `<nav>` with an `aria-label`, fixed at the left viewport edge and vertically centered, hidden below 1280px via a plain CSS media query. Labels are `text-xs` JetBrains Mono in the muted color, echoing the `.eyebrow` style, each with a small dot marker. The active entry uses the accent color and a filled dot. At a 1280px viewport the free margin is about 100px, so labels hug the edge; if that proves cramped visually, the breakpoint moves up to 1440px (a one-line change, decided during implementation review in the browser).

### 4. Scroll-spy behavior

New `assets/js/toc.js` (~15 lines), loaded the same way as the existing scripts. It exits early if the rail is absent, otherwise observes the linked sections with an IntersectionObserver and sets `aria-current="true"` plus an active class on the rail link of the section currently in view.

Progressive enhancement: with JS disabled the rail still works as plain anchor links, only without highlighting. Sections get `scroll-margin-top` so anchor jumps do not clip headings at the top edge. `scroll-behavior: smooth` applies to anchor navigation, disabled under the existing `prefers-reduced-motion` media query.

### 5. Out of scope

- No mobile version of the rail; below 1280px the home page simply scrolls, and the header offers Projects and the CV.
- No TOC on other pages (project details, lists).
- No changes to section content or ordering.

## Testing

- `hugo` builds cleanly.
- Rail appears only at 1280px and wider; mobile and tablet show no rail and a header with only Projects, CV, and the theme toggle.
- Scrolling the home page moves the highlight through Experience, Projects, Skills, Education; clicking an entry jumps with correct offset.
- With JS disabled the rail renders and anchors work, with no highlight.
- A bare site with no data files and no content renders without errors and without a rail (fewer than two entries).
