# Loraine's Portfolio

Personal portfolio site for Loraine Monteagudo — software engineer specializing in
fullstack development and machine learning.

Built with [Hugo](https://gohugo.io/) and a custom theme ([**indigo-night**](https://github.com/lorainemg/hugo-theme-indigo-night)): dark
editor-theme palette with a light mode toggle, Space Grotesk + Inter + JetBrains Mono
typography, TailwindCSS, and a skills taxonomy that cross-links roles and projects.

**Live site (after merging to `main`):** <https://lorainemg.github.io/>

## Local development

```sh
hugo server        # live-reload preview at http://localhost:1313
hugo --gc          # production build into public/
```

Prerequisites:

- **Hugo ≥ 0.158** — the theme's templates use `site.Language.Locale` and
  `hugo.Data.*`. The *extended* build is not required (there is no SCSS and no image
  processing), though it does no harm; CI installs 0.164.
- **Node ≥ 22.13** — Hugo runs the TailwindCSS CLI under Node's permission model,
  which needs 22.13+. CI uses Node 24. Run `npm install` once after a fresh clone.
- **Go** — required for local builds. The theme is a Hugo module, and Hugo shells out
  to the `go` binary to fetch it; without it the build fails with
  `binary with name "go" not found in PATH`.

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

The "6+ years / 20+ projects / …" numbers. Each entry is a `label` plus either a
literal `value` or a `count`: `count: projects` auto-computes from the pages in
`content/projects/` and `count: skills` from the items in `data/skills.yaml`. Only
the literal `value` entries need updating by hand.

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
go.mod / go.sum       pins the theme module (hugo-theme-indigo-night)
docs/superpowers/  design spec, implementation plan, content inventory
```

### Working on the theme

The theme lives in [hugo-theme-indigo-night](https://github.com/lorainemg/hugo-theme-indigo-night),
pinned here via `go.mod`. To iterate on it locally, clone it next to this
repo and run:

```sh
HUGO_MODULE_REPLACEMENTS="github.com/lorainemg/hugo-theme-indigo-night -> ../../hugo-theme-indigo-night" hugo server
```

(The replacement path is relative to `themesDir` — i.e. `./themes/` — not to the repo
root, so a sibling checkout is two levels up. With a single `../` Hugo fails with
`module "../hugo-theme-indigo-night" not found`.)

### Shipping a theme change

Pushing to the theme repo does **not** change this site. `go.mod` pins an
exact version, and the build — here and in CI — fetches only that version.
Three steps, in order:

```sh
# 1. in the theme repo: commit, then tag the release
git commit -am "what you changed" && git push
git tag v1.2.0 && git push origin v1.2.0

# 2. here: move the pin
hugo mod get github.com/lorainemg/hugo-theme-indigo-night@v1.2.0

# 3. here: commit the bump — this is the step that deploys
git commit -am "bump theme to v1.2.0" && git push
```

The tag matters. Without one, `hugo mod get ...@main` records a pseudo-version
(`v1.1.1-0.20260803203000-abc123def456`) — it works, but the pin stops telling
you which release is live.

The pin is the point: an unfinished theme commit can't reach production until
you deliberately bump it here.
