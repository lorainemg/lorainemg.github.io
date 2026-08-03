# Design: Split the indigo-night theme into its own repository

**Date:** 2026-08-03
**Status:** Approved

## Goal

Separate the Hugo theme (`themes/indigo-night/`) from the portfolio content so
each lives in its own repository with its own history. The theme becomes a
publishable, reusable Hugo theme; the site repo holds only content, data, site
config, and deployment.

**Mechanism:** Hugo Modules (chosen over git submodules for versioned releases
and a cleaner publishing story).

## Current state

- Theme is vendored as plain files at `themes/indigo-night/` (no submodule).
- Tailwind 4 is invoked through Hugo's `css.TailwindCSS` pipe
  (`themes/indigo-night/layouts/partials/head.html`); the `tailwindcss` CLI is
  resolved from the *site* root's `node_modules` (`package.json` at repo root).
- Fonts live in the theme (`static/fonts/`); all content (`content/`), data
  (`data/`), and site config (`hugo.toml`) live at the site root. The boundary
  is already clean.
- CI is `.github/workflows/deploy.yml`: installs Hugo extended via curl, runs
  `npm ci`, builds with `hugo --gc --minify`.

## 1. New theme repo — `github.com/lorainemg/hugo-theme-indigo-night`

The `hugo-theme-` prefix follows the ecosystem naming convention
(`hugo-theme-stack`, `hugo-theme-terminal`, …). Add the `hugo-theme` GitHub
topic. The theme's display name stays **indigo-night** in `theme.toml`.

**History:** seed the repo from a fresh clone of the site repo using
`git filter-repo --subdirectory-filter themes/indigo-night`, preserving every
commit that touched the theme (authorship and dates), re-rooted so `layouts/`,
`assets/`, `static/`, `i18n/`, `theme.toml`, `LICENSE`, `README.md` are at the
top level.

**Added on top of the extracted history:**

- `go.mod` — `module github.com/lorainemg/hugo-theme-indigo-night`. This one
  file makes it a Hugo module; no Go code is involved.
- `exampleSite/` — minimal demo and development harness:
  - `hugo.toml` with the params the layouts expect (`[params.hero]`,
    `[params.social]`, tagline/location, the `skill` taxonomy, and the
    `build.buildStats` + cachebuster + module mounts required by the Tailwind
    setup), filled with placeholder values.
  - A couple of sample content files (one experience entry, one project) and
    sample `data/` files (skills, stats) so every layout renders.
  - `package.json` with the two Tailwind dev-dependencies.
  - Run with a module replacement pointing at the repo root (documented in the
    README).
- README rewrite covering: install as a Hugo module *and* plain `git clone`
  into `themes/` for consumers who don't use Go; the Tailwind prerequisite
  (`npm i -D tailwindcss @tailwindcss/cli` in the consuming site); required
  params, data files, and taxonomies; running the example site.
- Tag `v1.0.0` once the example site builds.

## 2. Site repo (`lorainemg.github.io`) changes

- Delete `themes/`; drop `theme = "indigo-night"` from `hugo.toml`.
- Add a site `go.mod` (`module github.com/lorainemg/lorainemg.github.io`).
- In the existing `[module]` block (mounts stay as-is), add:

  ```toml
  [[module.imports]]
    path = "github.com/lorainemg/hugo-theme-indigo-night"
  ```

- `hugo mod get` and commit `go.mod` + `go.sum` — this pins the exact theme
  version. Upgrading is a deliberate `hugo mod get -u` + commit.
- `package.json` stays at the site root (Hugo's `css.TailwindCSS` only resolves
  the CLI from the project root).

## 3. CI (`.github/workflows/deploy.yml`)

- Add one step: `actions/setup-go`. Hugo fetches the module itself during the
  build; everything else is unchanged.
- Optionally cache `~/go/pkg/mod` keyed on `go.sum`.

## 4. Day-to-day workflows

- **Content edits:** unchanged — the theme arrives read-only from Hugo's
  module cache.
- **Theme edits:** clone the theme repo next to the site and override locally:

  ```sh
  HUGO_MODULE_REPLACEMENTS="github.com/lorainemg/hugo-theme-indigo-night -> ../hugo-theme-indigo-night" hugo server
  ```

  Iterate live, then commit and tag in the theme repo and `hugo mod get -u`
  in the site.

## 5. Verification

- Build `public/` before the split and after; diff the outputs — they must be
  byte-identical. Any diff flags a wiring mistake (e.g., a missing mount).
- Site repo CI goes green end-to-end (build + deploy).
- Theme repo: `hugo server` against `exampleSite/` renders every layout.

## Out of scope

- Submitting the theme to themes.gohugo.io (can follow later; the exampleSite
  and theme.toml already satisfy most requirements).
- Any visual or content changes — this is a pure restructuring; output must
  not change.
