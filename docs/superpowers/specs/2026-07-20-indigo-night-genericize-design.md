# Indigo Night theme: genericize for reuse

**Date:** 2026-07-20
**Status:** Approved
**Scope decision:** Genericize the theme in place inside this repo. Repo extraction, exampleSite, and themes.gohugo.io submission are explicitly deferred.

## Goal

Remove every Loraine-specific string and structural assumption from `themes/indigo-night/` so the theme can be dropped into any Hugo site and produce a working portfolio, configured entirely through `hugo.toml`, data files, and content. Loraine's site must render identically before and after (same text, same colors).

## Current state

The theme is already mostly parametrized (tagline, location, hero copy, social links, and cvPath come from site params; experience and projects come from content pages; skills, education, achievements, and stats come from site data files). Remaining gaps:

1. The logo in `layouts/partials/header.html` is the hardcoded string `loraine` plus an accent-colored dot. This is the only literal personal string in the theme.
2. All UI strings (nav labels, section headings, sub-headings, button text) are hardcoded English in the templates.
3. The theme assumes the four data files and all hero params exist; a bare site may error or render broken sections.
4. `theme.toml` is minimal and there is no theme README documenting the configuration surface.
5. The accent palette is fixed indigo.

## Design

### 1. Logo

In `header.html`, render:

- `site.Params.logoText` when set;
- otherwise the first word of `site.Title`, lowercased ("Loraine Monteagudo" becomes "loraine").

The theme always appends the accent-colored dot span. No site config change is needed for the current site; the default reproduces today's output exactly.

### 2. UI strings via i18n

Create `themes/indigo-night/i18n/en.toml` containing every user-visible UI string currently hardcoded in templates, including at least:

- Nav labels: Experience, Projects, Skills, Education
- Download CV button
- Section headings: Experience, Featured projects, Tools I work with, Education & achievements
- Sub-headings: Certifications, Publications, Achievements, Facts, Stack, Links, and the Experience/Projects labels in `journey.html`
- Any remaining link or button text discovered during implementation (e.g. "View all projects")

Templates switch to `{{ T "key" }}`. Site owners override strings by shadowing keys in their own `i18n/en.toml`. The site's currently empty `i18n/` directory stays empty.

### 3. Graceful degradation for optional data and params

A fresh site with a bare `hugo.toml` must build without errors and render a sensible skeleton:

- Home sections backed by data files (skills, education/achievements, hero stats row) render only when their `site.Data.*` exists and is non-empty.
- Experience and Featured Projects sections hide when no content pages exist in their sections.
- Nav links render only when the target section will render (no `#skills` anchor when `skills.yaml` is absent).
- Hero params (`eyebrow`, `headline`, `intro`) are individually guarded with `with`; `headline` falls back to `site.Title` so the hero is never empty.

### 4. Theme metadata and README

- Flesh out `theme.toml`: author, homepage, tags, demo placeholder.
- Add `themes/indigo-night/README.md` documenting:
  - every `site.Params.*` key the theme reads (logoText, tagline, location, cvPath, accentColor, hero.*, social.*), with defaults;
  - the schema of each data file (skills.yaml, education.yaml, achievements.yaml, stats.yaml) with copy-paste YAML examples;
  - the required `skill` taxonomy configuration;
  - the required build config a consuming site must copy into its `hugo.toml`: the Tailwind `hugo_stats.json` module mounts, cachebuster block, and buildStats. This is the least obvious requirement, so it gets a dedicated "Required site configuration" section.

### 5. Configurable accent color

Add `site.Params.accentColor` (a CSS color, typically hex):

- When set, `head.html` emits a small inline `<style>` overriding `--accent` on `:root`.
- The stylesheet derives the companion values with CSS relative color syntax in OKLCH:
  - `--accent-deep` and `--accent-hover`: lightness reduced from `--accent`;
  - `--violet` (gradient partner): hue rotated from `--accent`.
- When unset, the current indigo palette applies unchanged: the existing fixed values remain the defaults, and the derivation rules only apply inside the override emitted when `accentColor` is set. The rendered site with no param set must be byte-identical CSS to today.
- Light mode derives from the same param; no separate light-mode override param.

## Testing

1. `hugo` build of the real site succeeds; rendered pages are unchanged (logo still "loraine.", headings identical, colors identical with no accentColor set).
2. A throwaway minimal site in the scratchpad using the theme with a near-empty `hugo.toml` builds without errors and renders: hero with site title, no broken nav anchors, data-backed sections absent, no template errors from missing params or data.
3. With `accentColor` set in the throwaway site, buttons, tags, eyebrows, and the hero gradient all follow the new color in both light and dark modes.

## Out of scope

- Extracting the theme to its own repository, git submodule/module packaging
- exampleSite directory and themes.gohugo.io submission
- Additional language files beyond en.toml
- Per-mode (light vs dark) accent overrides
