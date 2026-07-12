# Loraine's Portfolio

Personal portfolio site for Loraine Monteagudo — software engineer specializing in
fullstack development and machine learning.

Built with [Hugo](https://gohugo.io/) and a custom theme (**indigo-night**): dark
editor-theme palette with a light mode toggle, Space Grotesk + Inter + JetBrains Mono
typography, TailwindCSS, and a skills taxonomy that cross-links roles and projects.

**Live site (after merging to `main`):** <https://lorainemg.github.io/>

## Local development

```sh
hugo server        # live-reload preview at http://localhost:1313
hugo --gc          # production build into public/
```

Requires Hugo ≥ 0.148 (installed at `~/.local/bin/hugo`) and Node 20 (used
automatically by Hugo for TailwindCSS; run `npm install` once after a fresh clone).

## Where to edit content

All content is data — you never need to touch the theme to update the site.

### ⚠️ Pending content updates (as of July 2026)

- [ ] **Current job**: the site still shows Jack's Flight Club as "present" — add the
      real end date and create a file for the current role (see below).
- [ ] **Arealec end date** if that role has also ended.
- [ ] **CV PDF** (see below) — the Download CV button stays hidden until this is done.
- [ ] **Remaining certifications** — only the DataCamp one is listed.

### Experience — `content/experience/*.md`

One file per role. Front matter:

```yaml
---
title: Senior Full Stack Developer
company: Jack's Flight Club
location: Tampa, Florida
website: https://jacksflightclub.com
startDate: 2024-09-01
endDate: null          # null = "present"; set a date when a role ends
skills: [Python, TypeScript, Docker]   # links the role to /skills/ pages
---

- Bullet points for the role go in the body as a Markdown list
```

The home timeline, the hero's journey graphic (one waypoint per company), and the
skills pages all update automatically from these files.

### Projects — `content/projects/*.md`

One file per project. Front matter: `title`, `description`, `category` (drives the
filter chips on /projects/), `skills`, `github`, optional `links` (name + url pairs
shown on the detail page), `featured` (`true` = shown on the home page), `weight`
(ordering).

**With body text** → the project gets its own detail page (write anything, free-form
Markdown). **Without body text** → the card links straight to GitHub; also add
`build: {render: link}` and `sitemap: {disable: true}` to the front matter (copy from
any existing body-less project) so no empty page is generated.

### Education & certifications — `data/education.yaml`

Degree, `certifications:` (name, issuer, year, url — url may be `""` for unlinked),
and `publications:`. **Add new online-course certifications here.**

### Achievements — `data/achievements.yaml`

List of `title`, `event`, optional `url`.

### Stats bar (hero) — `data/stats.yaml`

The "4+ years / 20+ projects / …" numbers. Plain value + label pairs — update these
when your experience data changes, they are not computed.

### Skills chips (home) — `data/skills.yaml`

Display groups for the home page only. Spellings must match the `skills:` values used
in experience/project front matter exactly, or the chip won't link to its page.
Skills used nowhere render dimmed and unlinked.

### CV — `static/files/` + `hugo.toml`

Put the PDF at `static/files/loraine-monteagudo-cv.pdf`, then set in `hugo.toml`:
`cvPath = "files/loraine-monteagudo-cv.pdf"`. The Download CV button appears
automatically (it is hidden while `cvPath` is empty).

### Site-wide settings — `hugo.toml`

Title, tagline, and social links (`params.social.github / linkedin / email`).

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and
publishes it to GitHub Pages. No manual steps.

## Repo map

```text
content/           projects + experience (Markdown)
data/              education, achievements, skills groups, stats (YAML)
static/files/      CV PDF (create when ready)
themes/indigo-night/  the custom theme (templates, CSS, JS)
docs/superpowers/  design spec, implementation plan, content inventory
```
