# Theme Repo Split Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extract `themes/indigo-night/` into its own published repo (`github.com/lorainemg/hugo-theme-indigo-night`) with full history, and convert the site repo to consume it as a Hugo Module — with byte-identical build output.

**Architecture:** `git filter-repo` extracts the theme's history into a new repo, which gains a `go.mod` (making it a Hugo module) and an `exampleSite/` demo. The site repo replaces the vendored `themes/` directory with a pinned `[[module.imports]]` entry. CI gains a Go toolchain step so Hugo can fetch the module.

**Tech Stack:** Hugo 0.164.0 extended, Hugo Modules (Go), Tailwind CSS 4 via `css.TailwindCSS`, git-filter-repo, gh CLI, GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-08-03-theme-repo-split-design.md`

## Global Constraints

- Module path (exact, everywhere): `github.com/lorainemg/hugo-theme-indigo-night`
- Theme display name stays `Indigo Night` (`name` in `theme.toml`); Hugo config never uses the `hugo-theme-` prefix except as module path / repo dir name.
- Site build output must be **byte-identical** before vs after conversion (verified by `diff -r`).
- Build command for all verification builds: `hugo --gc --minify --baseURL "https://lorainemg.github.io/"` (plus `--destination`).
- Site repo: `/mnt/Data/work/portfolio` (remote `github.com/lorainemg/lorainemg.github.io`). New theme repo working copy: `/mnt/Data/work/hugo-theme-indigo-night`.
- Host is Arch Linux; hugo 0.164.0+extended and `gh` are installed; `go` and `git-filter-repo` are NOT yet installed.
- Scratch space: `/tmp/claude-1000/-mnt-Data-work-portfolio/f46a1937-9238-4203-8bf5-e259acd1a3ed/scratchpad` (referred to as `$SCRATCH` below; expand it literally in every command).
- Site-repo work happens on branch `theme-module`; merge to `main` only in the final task (pushing `main` deploys the live site).
- Commit messages end with: `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`

---

### Task 1: Baseline build snapshot

Capture the current site output before any changes. Every later verification diffs against this.

**Files:**
- Create: `$SCRATCH/baseline/` (build output, outside the repo)

**Interfaces:**
- Produces: `$SCRATCH/baseline/` — the reference `public/` tree Task 9 diffs against.

- [ ] **Step 1: Verify the working tree is clean**

Run: `git -C /mnt/Data/work/portfolio status --porcelain`
Expected: no output (untracked `.claude/settings.local.json` is acceptable; anything else, stop and ask the user).

- [ ] **Step 2: Build the baseline**

```bash
cd /mnt/Data/work/portfolio
hugo --gc --minify --baseURL "https://lorainemg.github.io/" \
  --destination "$SCRATCH/baseline"
```

Expected: exit 0, output ends with a page-count summary (roughly: ~40+ pages, no ERROR lines).

- [ ] **Step 3: Sanity-check the snapshot**

Run: `test -f "$SCRATCH/baseline/index.html" && find "$SCRATCH/baseline" -type f | wc -l`
Expected: a file count > 50. Record the number for Task 9.

---

### Task 2: Install prerequisites (go, git-filter-repo)

**Files:** none (system packages)

**Interfaces:**
- Produces: `go` and `git filter-repo` on `PATH` (used by Tasks 3 and 8).

- [ ] **Step 1: Install both packages**

Run: `sudo pacman -S --needed --noconfirm go git-filter-repo`

(This needs the user's password — if the sandbox blocks it, ask the user to run it themselves.)

- [ ] **Step 2: Verify**

Run: `go version && git filter-repo --version`
Expected: `go version go1.2x ...` and a filter-repo version string. Both must succeed before continuing.

---

### Task 3: Extract theme history into a new repo

**Files:**
- Create: `/mnt/Data/work/hugo-theme-indigo-night/` (new git repo: `layouts/`, `assets/`, `static/`, `i18n/`, `theme.toml`, `LICENSE`, `README.md` at root)

**Interfaces:**
- Produces: local repo at `/mnt/Data/work/hugo-theme-indigo-night` with rewritten history; `main` branch. No remote yet.

- [ ] **Step 1: Fresh clone (filter-repo refuses non-fresh clones by design)**

```bash
git clone https://github.com/lorainemg/lorainemg.github.io.git \
  "$SCRATCH/theme-extract"
```

- [ ] **Step 2: Rewrite history to the theme subdirectory**

```bash
cd "$SCRATCH/theme-extract"
git filter-repo --subdirectory-filter themes/indigo-night
```

Expected: completes with a "Rewrote the history" style message; `origin` remote is removed automatically.

- [ ] **Step 3: Verify the rewrite**

Run: `ls "$SCRATCH/theme-extract"` and `git -C "$SCRATCH/theme-extract" log --oneline | wc -l`
Expected: `assets  i18n  layouts  LICENSE  README.md  static  theme.toml` at root; commit count ≥ 10 (only commits that touched the theme survive).

- [ ] **Step 4: Move into place**

```bash
mv "$SCRATCH/theme-extract" /mnt/Data/work/hugo-theme-indigo-night
git -C /mnt/Data/work/hugo-theme-indigo-night branch -M main
```

---

### Task 4: Turn the theme into a Hugo module

**Files:**
- Create: `/mnt/Data/work/hugo-theme-indigo-night/go.mod`
- Modify: `/mnt/Data/work/hugo-theme-indigo-night/theme.toml` (repo URLs)

**Interfaces:**
- Produces: module `github.com/lorainemg/hugo-theme-indigo-night` — the exact path Task 8 imports.

- [ ] **Step 1: Write go.mod**

Create `/mnt/Data/work/hugo-theme-indigo-night/go.mod`:

```
module github.com/lorainemg/hugo-theme-indigo-night

go 1.23
```

(No Go code — this file alone makes the repo fetchable as a Hugo module.)

- [ ] **Step 2: Point theme.toml at the new repo**

In `/mnt/Data/work/hugo-theme-indigo-night/theme.toml` replace:

```toml
licenselink = "https://github.com/lorainemg/portfolio/blob/main/themes/indigo-night/LICENSE"
homepage = "https://github.com/lorainemg/portfolio"
```

with:

```toml
licenselink = "https://github.com/lorainemg/hugo-theme-indigo-night/blob/main/LICENSE"
homepage = "https://github.com/lorainemg/hugo-theme-indigo-night"
```

(`demosite = "https://lorainemg.github.io/"` stays.)

- [ ] **Step 3: Verify the module is well-formed**

Run: `cd /mnt/Data/work/hugo-theme-indigo-night && hugo mod verify 2>&1 | head -1 || true` — just confirm no parse error mentioning go.mod. (Full proof comes from the exampleSite build in Task 5.)

- [ ] **Step 4: Commit**

```bash
cd /mnt/Data/work/hugo-theme-indigo-night
git add go.mod theme.toml
git commit -m "Make the theme a standalone Hugo module

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 5: Add the exampleSite

A minimal site inside the theme repo that exercises every layout: hero (needs one current role), journey graph, featured projects, skills taxonomy, education/achievements, stats strip, Tailwind pipeline.

**Files (all under `/mnt/Data/work/hugo-theme-indigo-night/exampleSite/`):**
- Create: `hugo.toml`, `package.json`, `.gitignore`
- Create: `content/experience/_index.md`, `content/experience/acme.md`, `content/experience/globex.md`
- Create: `content/projects/_index.md`, `content/projects/orbit-tracker.md`, `content/projects/tidy-cli.md`
- Create: `data/skills.yaml`, `data/stats.yaml`, `data/education.yaml`, `data/achievements.yaml`

**Interfaces:**
- Consumes: theme at repo root via `--themesDir ../..` (repo directory name **is** the theme name — the clone must be named `hugo-theme-indigo-night`).
- Produces: a build-verified demo; README (Task 6) documents the run command.

- [ ] **Step 1: Write exampleSite/hugo.toml**

```toml
baseURL = "https://example.org/"
locale = "en-us"
title = "Alex Doe"
theme = "hugo-theme-indigo-night"

[taxonomies]
  skill = "skills"

[params]
  tagline = "Fullstack engineer building products end to end."
  location = "Springfield, USA"
  cvPath = ""
  [params.hero]
    name = "Alex *Doe*"
    role = "Fullstack engineer."
    focus = "Interfaces, APIs, data pipelines"
    openTo = "Fullstack and platform roles"
    intro = "I like owning a product all the way down: the pipeline, the API, the interface, and the model in the middle. This example site shows every section the Indigo Night theme renders."
  [params.social]
    github = "https://github.com/example"
    linkedin = "https://www.linkedin.com/in/example"
    email = "alex@example.org"

[build]
  [build.buildStats]
    enable = true
  [[build.cachebusters]]
    source = 'assets/notwatching/hugo_stats\.json'
    target = 'css'

[outputs]
  home = ["html"]
  section = ["html"]
  taxonomy = ["html"]
  term = ["html"]

[module]
  [[module.mounts]]
    source = 'assets'
    target = 'assets'
  [[module.mounts]]
    disableWatch = true
    source = 'hugo_stats.json'
    target = 'assets/notwatching/hugo_stats.json'
```

- [ ] **Step 2: Write exampleSite/package.json and .gitignore**

`package.json`:

```json
{
  "name": "indigo-night-example",
  "private": true,
  "devDependencies": {
    "@tailwindcss/cli": "^4.3.2",
    "tailwindcss": "^4.3.2"
  }
}
```

`.gitignore`:

```
node_modules/
public/
resources/
.hugo_build.lock
```

(`hugo_stats.json` is committed on purpose, mirroring the site repo — it's the cachebuster's mount source.)

- [ ] **Step 3: Write the sample content**

`content/experience/_index.md`:

```markdown
---
title: Experience
cascade:
  build:
    render: link
  sitemap:
    disable: true
---
```

`content/experience/acme.md` (the current role — `endDate: null` drives the hero's "now" line):

```markdown
---
title: Senior Fullstack Developer
company: Acme Corp
location: Springfield, USA
workMode: Remote
employmentType: Full-time
website: https://example.org/
startDate: 2024-05-01
endDate: null
skills: [Python, TypeScript, FastAPI, PostgreSQL, Docker]
softSkills: [Ownership & initiative, Technical documentation]
---

- Built the flagship dashboard end to end, from the data pipeline to the UI.
- Cut deploy times in half by moving CI to containerized builds.
```

`content/experience/globex.md`:

```markdown
---
title: Fullstack Developer
company: Globex
location: Shelbyville, USA
workMode: On-site
employmentType: Full-time
website: https://example.org/
startDate: 2021-02-01
endDate: 2024-04-01
skills: [JavaScript, Vue, MySQL, Redis]
softSkills: [Cross-team collaboration]
---

- Maintained the customer portal used by 10k monthly users.
- Introduced automated end-to-end tests, halving regression bugs.
```

`content/projects/_index.md`:

```markdown
---
title: Projects
description: A pair of sample projects showing the project cards, filtering, and the skills taxonomy.
---
```

`content/projects/orbit-tracker.md`:

```markdown
---
title: Orbit Tracker
description: "A dashboard that plots satellite passes over your location, with live map and alerts."
category: web
skills: [Python, FastAPI, TypeScript, PostgreSQL]
github: https://github.com/example/orbit-tracker
featured: true
weight: 1
---

Orbit Tracker ingests public TLE data, propagates orbits, and renders
upcoming passes on a live map. Built to show the full stack: ingestion
pipeline, API, and interface.
```

`content/projects/tidy-cli.md`:

```markdown
---
title: Tidy CLI
description: "A small command-line tool that organizes a downloads folder by file type and age."
category: tooling
skills: [Python, Docker]
github: https://github.com/example/tidy-cli
featured: false
weight: 10
---

Tidy CLI watches a folder and files everything into dated, typed
subfolders. Small on purpose — it exists to demo the non-featured
project card.
```

- [ ] **Step 4: Write the sample data files**

`data/skills.yaml`:

```yaml
- group: Languages
  items: [Python, TypeScript, JavaScript]
- group: Backend & Databases
  items: [FastAPI, PostgreSQL, MySQL, Redis]
- group: Frontend
  items: [Vue, TailwindCSS]
- group: DevOps & Cloud
  items: [Docker, GitHub Actions]
```

`data/stats.yaml`:

```yaml
# The stats strip under the hero.
# `count: projects` auto-computes from content/projects/;
# `count: skills` auto-computes from data/skills.yaml.
- value: "5+"
  label: years of experience
- count: projects
  label: projects built
- count: skills
  label: technologies worked with
```

`data/education.yaml`:

```yaml
degree:
  title: BSc. Computer Science
  institution: Springfield University
  location: Springfield, USA
  years: 2016-2020
  gpa: 3.9 / 4
  note: Placeholder degree entry for the example site.
```

`data/achievements.yaml`:

```yaml
- title: Hackathon Winner
  event: Springfield DevFest 2023, satellite-tracking dashboard
```

- [ ] **Step 5: Install Tailwind deps and build the example site**

```bash
cd /mnt/Data/work/hugo-theme-indigo-night/exampleSite
npm install
hugo --themesDir ../.. --gc
```

Expected: exit 0, no ERROR lines, `public/index.html` exists and contains `Alex`. If Hugo errors on a missing param or data key, fix the sample content (not the theme) — the theme must not change in this task.

- [ ] **Step 6: Verify the dev server runs**

Run: `cd /mnt/Data/work/hugo-theme-indigo-night/exampleSite && timeout 10 hugo server --themesDir ../.. --renderToMemory 2>&1 | grep -E "Web Server is available|ERROR" | head -5`
Expected: the "Web Server is available" line, no ERROR lines (timeout exit code 124 is the pass signal — the server ran until killed).

- [ ] **Step 7: Commit (including the generated hugo_stats.json)**

```bash
cd /mnt/Data/work/hugo-theme-indigo-night
git add exampleSite
git commit -m "Add an example site exercising every layout

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

Verify first with `git status --porcelain exampleSite` that `node_modules/`, `public/`, `resources/` are NOT staged (the .gitignore should exclude them) and `exampleSite/hugo_stats.json` IS.

---

### Task 6: Rewrite the theme README

**Files:**
- Modify: `/mnt/Data/work/hugo-theme-indigo-night/README.md` (full replacement)

**Interfaces:**
- Consumes: run commands verified in Task 5 Step 5/6.

- [ ] **Step 1: Replace README.md with:**

````markdown
# Indigo Night

Dark indigo, editor-inspired Hugo theme for developer portfolios. A
skills taxonomy links roles and projects; includes dark/light mode, a
career journey graph, project filtering, and i18n.

**Demo:** https://lorainemg.github.io/

## Requirements

- Hugo **extended**, v0.148.0+
- Node.js — the theme styles with Tailwind CSS 4 via Hugo's
  `css.TailwindCSS`, which runs the Tailwind CLI from *your site's*
  `node_modules`:

  ```sh
  npm install -D tailwindcss @tailwindcss/cli
  ```

## Installation

### As a Hugo module (recommended)

Requires Go. In your site:

```sh
hugo mod init github.com/<you>/<your-site>
hugo mod get github.com/lorainemg/hugo-theme-indigo-night
```

```toml
# hugo.toml
[module]
  [[module.imports]]
    path = "github.com/lorainemg/hugo-theme-indigo-night"
```

### As a plain clone (no Go needed)

```sh
git clone https://github.com/lorainemg/hugo-theme-indigo-night themes/hugo-theme-indigo-night
```

```toml
# hugo.toml
theme = "hugo-theme-indigo-night"
```

## Required site configuration

The theme reads Tailwind's build stats from your project, so copy this
into your `hugo.toml` (see `exampleSite/hugo.toml` for a complete,
working config):

```toml
[taxonomies]
  skill = "skills"

[build]
  [build.buildStats]
    enable = true
  [[build.cachebusters]]
    source = 'assets/notwatching/hugo_stats\.json'
    target = 'css'

[module]
  [[module.mounts]]
    source = 'assets'
    target = 'assets'
  [[module.mounts]]
    disableWatch = true
    source = 'hugo_stats.json'
    target = 'assets/notwatching/hugo_stats.json'
```

Content lives in `content/experience/` and `content/projects/`; data in
`data/skills.yaml`, `data/stats.yaml`, `data/education.yaml`,
`data/achievements.yaml`. The experience entry with `endDate: null` is
treated as your current role. All params are shown in
`exampleSite/hugo.toml`.

## Running the example site

```sh
cd exampleSite
npm install
hugo server --themesDir ../..
```

(The clone directory must be named `hugo-theme-indigo-night` for
`--themesDir ../..` to resolve.)

## License

[MIT](LICENSE)
````

- [ ] **Step 2: Commit**

```bash
cd /mnt/Data/work/hugo-theme-indigo-night
git add README.md
git commit -m "Rewrite the README for standalone publication

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 7: Publish the theme repo and tag v1.0.0

**Files:** none (GitHub operations)

**Interfaces:**
- Produces: public repo `github.com/lorainemg/hugo-theme-indigo-night` with tag `v1.0.0` — the version Task 8 pins.

- [ ] **Step 1: Check gh auth**

Run: `gh auth status`
Expected: logged in as `lorainemg`. If not, ask the user to run `gh auth login`.

- [ ] **Step 2: Create the repo and push**

```bash
cd /mnt/Data/work/hugo-theme-indigo-night
gh repo create lorainemg/hugo-theme-indigo-night --public \
  --description "Dark indigo, editor-inspired Hugo theme for developer portfolios" \
  --source . --push
```

- [ ] **Step 3: Add topics**

```bash
gh repo edit lorainemg/hugo-theme-indigo-night \
  --add-topic hugo-theme --add-topic hugo --add-topic portfolio --add-topic tailwindcss
```

- [ ] **Step 4: Tag and push v1.0.0**

```bash
cd /mnt/Data/work/hugo-theme-indigo-night
git tag v1.0.0
git push origin v1.0.0
```

- [ ] **Step 5: Verify the module resolves from GitHub**

Run: `curl -s "https://proxy.golang.org/github.com/lorainemg/hugo-theme-indigo-night/@v/list"`
Expected: `v1.0.0` (may take a minute to appear; retry once or twice — or skip, since Task 8's `hugo mod get` is the real test).

---

### Task 8: Convert the site repo to consume the module

**Files:**
- Delete: `themes/` (entire directory, via git)
- Modify: `/mnt/Data/work/portfolio/hugo.toml` (drop `theme`, add module import)
- Create: `/mnt/Data/work/portfolio/go.mod`, `/mnt/Data/work/portfolio/go.sum`

**Interfaces:**
- Consumes: tag `v1.0.0` from Task 7.
- Produces: branch `theme-module` where `hugo` builds using the fetched module.

- [ ] **Step 1: Branch**

```bash
cd /mnt/Data/work/portfolio
git switch -c theme-module
```

- [ ] **Step 2: Remove the vendored theme and the theme key**

```bash
git rm -r --quiet themes
```

In `hugo.toml`, delete the line:

```toml
theme = "indigo-night"
```

- [ ] **Step 3: Add the module import**

In `hugo.toml`, inside the existing `[module]` section, add the import **before** the `[[module.mounts]]` entries:

```toml
[module]
  [[module.imports]]
    path = "github.com/lorainemg/hugo-theme-indigo-night"
  [[module.mounts]]
    source = 'assets'
    target = 'assets'
  [[module.mounts]]
    disableWatch = true
    source = 'hugo_stats.json'
    target = 'assets/notwatching/hugo_stats.json'
```

- [ ] **Step 4: Init the site module and pin the theme**

```bash
cd /mnt/Data/work/portfolio
hugo mod init github.com/lorainemg/lorainemg.github.io
hugo mod get github.com/lorainemg/hugo-theme-indigo-night@v1.0.0
```

Expected: `go.mod` now lists the theme with `// indirect` or as a require; `go.sum` created. (If the proxy hasn't seen the tag yet: `GOPROXY=direct hugo mod get ...`.)

- [ ] **Step 5: Verify the module graph and build**

```bash
hugo mod graph
hugo --gc --minify --baseURL "https://lorainemg.github.io/" \
  --destination "$SCRATCH/converted"
```

Expected: graph shows `github.com/lorainemg/lorainemg.github.io github.com/lorainemg/hugo-theme-indigo-night@v1.0.0`; build exits 0 with the same page count as Task 1.

- [ ] **Step 6: Update the site README**

`README.md` references the vendored theme (lines 6, 24, 108 as of `main`). Make these edits:

1. Line 6 area — link the theme to its new home. Replace `a custom theme (**indigo-night**)` with `a custom theme ([**indigo-night**](https://github.com/lorainemg/hugo-theme-indigo-night))`.
2. In the repo-layout listing, replace the line `themes/indigo-night/  the custom theme (templates, CSS, JS)` with `go.mod / go.sum       pins the theme module (hugo-theme-indigo-night)`.
3. At the end of the layout/development section, add a short subsection:

````markdown
### Working on the theme

The theme lives in [hugo-theme-indigo-night](https://github.com/lorainemg/hugo-theme-indigo-night),
pinned here via `go.mod`. To iterate on it locally, clone it next to this
repo and run:

```sh
HUGO_MODULE_REPLACEMENTS="github.com/lorainemg/hugo-theme-indigo-night -> ../hugo-theme-indigo-night" hugo server
```

When it's ready, commit and tag in the theme repo, then update the pin
here: `hugo mod get github.com/lorainemg/hugo-theme-indigo-night@<tag>`.
````

- [ ] **Step 7: Commit**

```bash
cd /mnt/Data/work/portfolio
git add -A
git commit -m "Consume indigo-night as a Hugo module

The theme now lives at github.com/lorainemg/hugo-theme-indigo-night,
pinned to v1.0.0 via go.mod.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 9: Byte-identical output verification

**Files:** none (verification only)

**Interfaces:**
- Consumes: `$SCRATCH/baseline` (Task 1), `$SCRATCH/converted` (Task 8).

- [ ] **Step 1: Diff the two builds**

Run: `diff -r "$SCRATCH/baseline" "$SCRATCH/converted"`
Expected: **no output** (exit 0).

- [ ] **Step 2: If there IS a diff**

Do not rationalize differences away. Diagnose: a missing mount, a file that didn't survive extraction (`git -C /mnt/Data/work/hugo-theme-indigo-night ls-files` vs the old `git -C /mnt/Data/work/portfolio show main:themes/indigo-night` tree), or config drift in `hugo.toml`. Fix on the `theme-module` branch (or in the theme repo + retag) and re-run from Task 8 Step 5. Only proceed when the diff is empty.

- [ ] **Step 3: Confirm file counts match Task 1's recorded count**

Run: `find "$SCRATCH/converted" -type f | wc -l`
Expected: identical to the baseline count.

---

### Task 10: Update CI for module fetching

**Files:**
- Modify: `/mnt/Data/work/portfolio/.github/workflows/deploy.yml`

**Interfaces:**
- Consumes: `go.sum` from Task 8 (cache key).

- [ ] **Step 1: Add a Go setup step**

In `deploy.yml`, after the `actions/checkout@v5` step and before "Install Hugo", insert:

```yaml
      - uses: actions/setup-go@v5
        with:
          go-version: 'stable'
          cache-dependency-path: go.sum
```

(`setup-go` caches the Go module cache keyed on `go.sum`, so the theme download is cached between runs.)

- [ ] **Step 2: Validate the workflow locally**

Run: `cd /mnt/Data/work/portfolio && python -c "import yaml,sys; yaml.safe_load(open('.github/workflows/deploy.yml')); print('valid yaml')"`
Expected: `valid yaml`.

- [ ] **Step 3: Commit**

```bash
cd /mnt/Data/work/portfolio
git add .github/workflows/deploy.yml
git commit -m "Install Go in CI so Hugo can fetch the theme module

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 11: Merge, deploy, and verify live

**Files:** none (git/GitHub operations)

**Interfaces:**
- Consumes: branch `theme-module` (Tasks 8–10), all green.

- [ ] **Step 1: Final local build check on the branch**

```bash
cd /mnt/Data/work/portfolio
hugo --gc --minify --baseURL "https://lorainemg.github.io/" --destination "$SCRATCH/final"
diff -r "$SCRATCH/baseline" "$SCRATCH/final"
```

Expected: build exit 0, empty diff.

- [ ] **Step 2: Merge to main and push (this deploys the live site — confirm with the user first)**

```bash
git switch main
git merge --no-ff theme-module -m "Split the theme into its own repository

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
git push origin main
```

- [ ] **Step 3: Watch the deploy**

Run: `gh run watch --repo lorainemg/lorainemg.github.io --exit-status` (pick the newest run if prompted)
Expected: workflow concludes `success`. If the build job fails on module fetch, check the setup-go step ran before the Hugo build and that `go.sum` was committed.

- [ ] **Step 4: Verify the live site**

Run: `curl -s https://lorainemg.github.io/ | grep -c "Loraine"`
Expected: count ≥ 1, and spot-check that the page includes the compiled CSS link (`grep -o '/css/[^"]*' | head -1` on the same fetch).

- [ ] **Step 5: Clean up**

```bash
git branch -d theme-module
```

Also delete `$SCRATCH/baseline`, `$SCRATCH/converted`, `$SCRATCH/final` if desired (scratch is session-scoped anyway).
