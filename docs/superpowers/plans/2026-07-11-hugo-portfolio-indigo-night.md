# Hugo Portfolio with indigo-night Theme — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build lorainemg.github.io: a Hugo site with the custom `indigo-night` theme, migrating content from Loraine's Framer portfolio, deployed to GitHub Pages.

**Architecture:** Hugo site (repo root) + named theme in `themes/indigo-night/`. Content in Markdown (`content/projects/`, `content/experience/`) and YAML (`data/`). A `skills` taxonomy spans projects and experience, generating `/skills/<skill>/` pages. TailwindCSS v4 through Hugo's `css.TailwindCSS` pipeline. Vanilla JS only (theme toggle, scroll reveal, project filter).

**Tech Stack:** Hugo ≥ 0.148 (pin 0.148.2), TailwindCSS v4 (`@tailwindcss/cli`), Node 20 (build-time only), GitHub Actions → GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-07-11-hugo-portfolio-theme-design.md` — read it first.
**Approved visual mockups (source of truth for look & feel):**
`.superpowers/brainstorm/37292-1783808399/content/design-b-indigo.html` (home),
`.superpowers/brainstorm/37292-1783808399/content/projects-pages.html` (projects list + detail).
**Content sources:** `docs/superpowers/content-inventory/site-content.md` and `project-details.md`.

## Global Constraints

- Dark palette (default): bg `#12131e`, surface `#191b2c`, border `#252842`, text `#e3e6f5`, headings `#ffffff`, muted `#8b90b5`, indigo `#818cf8`, indigo-deep `#4f46e5` (hover `#6366f1`), violet `#bb9af7` (gradients only).
- Light palette: bg `#f6f7fb`, surface `#ffffff`, border `#e3e6f0`, text `#1e2135`, muted `#5b6183`, accent `#4f46e5`.
- Fonts, self-hosted woff2: Space Grotesk (500,700) display · Inter (400,600) body · JetBrains Mono (400) labels/dates. No runtime Google Fonts requests.
- Gradient (indigo→violet) appears ONLY in: one hero headline word, the journey path stroke.
- All motion wrapped in `@media (prefers-reduced-motion: reduce)` guards.
- No JS frameworks; three small vanilla scripts total.
- Theme is employer-agnostic: no personal data hardcoded in `themes/indigo-night/` — everything from `content/`, `data/`, site params.
- `baseURL = "https://lorainemg.github.io/"`.
- Git commits: plain messages, **NO Co-Authored-By trailer** (user preference).
- Known-stale content (Jack's Flight Club dates, Arealec dates) is migrated as-is; Loraine updates later. Do not invent replacement facts.

## Verification pattern used by every task

Hugo has no unit tests; each task uses build-output assertions:
1. Write the check first (a `grep`/command against `public/`), run it, see it FAIL.
2. Implement.
3. `hugo --gc 2>&1` must exit 0 with no WARN lines, then the check PASSES.
4. Commit.

---

### Task 1: Install Hugo, scaffold site + theme skeleton

**Files:**
- Create: `hugo.toml`, `package.json` (via npm), `themes/indigo-night/theme.toml`, `themes/indigo-night/layouts/baseof.html`, `themes/indigo-night/layouts/home.html`
- Modify: `.gitignore` (append `hugo_stats.json`, `node_modules/` already present)

**Interfaces:**
- Produces: working `hugo` binary at `~/.local/bin/hugo`; site builds; theme named `indigo-night`; Tailwind deps installed; `hugo.toml` defines the `skills` taxonomy and site params later tasks read (`params.social.github|linkedin|email`, `params.cvPath`, `params.tagline`).

- [ ] **Step 1: Install Hugo (pinned)**

```bash
mkdir -p ~/.local/bin
curl -sL https://github.com/gohugoio/hugo/releases/download/v0.148.2/hugo_extended_0.148.2_linux-amd64.tar.gz \
  | tar -xz -C ~/.local/bin hugo
hugo version
```
Expected: `hugo v0.148.2+extended linux/amd64` (if `~/.local/bin` isn't on PATH, add it in the shell profile first).

- [ ] **Step 2: Failing check**

```bash
cd /mnt/Data/work/portfolio && hugo --gc && grep -q "<title>" public/index.html && echo OK
```
Expected: FAIL — "Unable to locate config file".

- [ ] **Step 3: Scaffold**

```bash
cd /mnt/Data/work/portfolio
hugo new site . --force
rm -rf archetypes/ layouts/ static/   # theme owns layouts; site-level dirs unused for now
mkdir -p themes/indigo-night/layouts/partials themes/indigo-night/assets/css themes/indigo-night/assets/js
npm init -y
npm install --save-dev tailwindcss @tailwindcss/cli
```

Write `hugo.toml` (replaces the generated one):

```toml
baseURL = "https://lorainemg.github.io/"
languageCode = "en-us"
title = "Loraine Monteagudo"
theme = "indigo-night"

[taxonomies]
  skill = "skills"

[params]
  tagline = "Software Engineer specializing in FullStack development and Machine Learning"
  cvPath = ""   # set to e.g. "files/loraine-monteagudo-cv.pdf" when the PDF exists
  [params.social]
    github = "https://github.com/lorainemg"
    linkedin = "https://www.linkedin.com/in/lorainemg"
    email = "lorainemonteagudo@gmail.com"

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

Write `themes/indigo-night/theme.toml`:

```toml
name = "Indigo Night"
license = "MIT"
description = "Dark indigo editor-theme portfolio for developers. Skills taxonomy links roles and projects."
min_version = "0.148.0"
```

Write `themes/indigo-night/layouts/baseof.html` (minimal; Tasks 2–3 complete it):

```html
<!DOCTYPE html>
<html lang="{{ site.Language.LanguageCode }}" data-theme="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{{ if .IsHome }}{{ site.Title }} — {{ site.Params.tagline }}{{ else }}{{ .Title }} · {{ site.Title }}{{ end }}</title>
</head>
<body>
  {{ block "main" . }}{{ end }}
</body>
</html>
```

Write `themes/indigo-night/layouts/home.html`:

```html
{{ define "main" }}
<main id="home"></main>
{{ end }}
```

Append to `.gitignore`:

```
hugo_stats.json
```

- [ ] **Step 4: Verify**

```bash
hugo --gc && grep -q "<title>Loraine Monteagudo" public/index.html && echo OK
```
Expected: build exits 0, prints `OK`.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "Scaffold Hugo site with indigo-night theme skeleton"
```

---

### Task 2: Design tokens, fonts, Tailwind pipeline

**Files:**
- Create: `themes/indigo-night/assets/css/main.css`, `themes/indigo-night/static/fonts/*.woff2` (5 files), `themes/indigo-night/layouts/partials/head.html`
- Modify: `themes/indigo-night/layouts/baseof.html`

**Interfaces:**
- Consumes: Task 1 scaffold.
- Produces: CSS custom properties `--bg --surface --border --text --heading --muted --accent --accent-deep --accent-hover --violet` switched by `html[data-theme]`; font families via Tailwind `@theme` (`font-display`, `font-body`, `font-mono` utilities); component classes `.wrap .btn-solid .btn-ghost .card .chip .tag .eyebrow .grad-text`; partial `head.html` emitting the compiled stylesheet + theme-restore inline script. All later templates style against these.

- [ ] **Step 1: Download fonts**

```bash
mkdir -p /mnt/Data/work/portfolio/themes/indigo-night/static/fonts
cd /mnt/Data/work/portfolio/themes/indigo-night/static/fonts
for spec in "space-grotesk:500,700" "inter:regular,600" "jetbrains-mono:regular"; do
  f=${spec%%:*}; v=${spec##*:}
  curl -sL "https://gwfh.mranftl.com/api/fonts/${f}?download=zip&subsets=latin&variants=${v}&formats=woff2" -o ${f}.zip
  unzip -o ${f}.zip && rm ${f}.zip
done
ls *.woff2 | wc -l
```
Expected: `5` woff2 files. (If gwfh.mranftl.com is down, download the same latin woff2 variants from fonts.google.com manually; then adjust the five `src:` filenames below to match.)

- [ ] **Step 2: Failing check**

```bash
cd /mnt/Data/work/portfolio && hugo --gc && grep -q 'stylesheet' public/index.html && echo OK
```
Expected: FAIL (no stylesheet link yet).

- [ ] **Step 3: Write `themes/indigo-night/assets/css/main.css`**

```css
@import "tailwindcss";

@theme {
  --font-display: "Space Grotesk", system-ui, sans-serif;
  --font-body: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}

@font-face { font-family:"Space Grotesk"; font-weight:500; font-display:swap;
  src:url("/fonts/space-grotesk-v21-latin-500.woff2") format("woff2"); }
@font-face { font-family:"Space Grotesk"; font-weight:700; font-display:swap;
  src:url("/fonts/space-grotesk-v21-latin-700.woff2") format("woff2"); }
@font-face { font-family:"Inter"; font-weight:400; font-display:swap;
  src:url("/fonts/inter-v20-latin-regular.woff2") format("woff2"); }
@font-face { font-family:"Inter"; font-weight:600; font-display:swap;
  src:url("/fonts/inter-v20-latin-600.woff2") format("woff2"); }
@font-face { font-family:"JetBrains Mono"; font-weight:400; font-display:swap;
  src:url("/fonts/jetbrains-mono-v24-latin-regular.woff2") format("woff2"); }
/* NOTE: verify actual downloaded filenames with `ls` and adjust the five src paths. */

:root, html[data-theme="dark"] {
  --bg:#12131e; --surface:#191b2c; --border:#252842;
  --text:#e3e6f5; --heading:#ffffff; --muted:#8b90b5;
  --accent:#818cf8; --accent-deep:#4f46e5; --accent-hover:#6366f1; --violet:#bb9af7;
}
html[data-theme="light"] {
  --bg:#f6f7fb; --surface:#ffffff; --border:#e3e6f0;
  --text:#1e2135; --heading:#0d0e18; --muted:#5b6183;
  --accent:#4f46e5; --accent-deep:#4f46e5; --accent-hover:#6366f1; --violet:#7c5cd6;
}

body { background:var(--bg); color:var(--text); font-family:var(--font-body); }
::selection { background:var(--accent); color:var(--bg); }

@layer components {
  .wrap { @apply max-w-[1080px] mx-auto px-8; }
  .btn-solid { background:var(--accent-deep); @apply text-white font-semibold text-sm px-5 py-3 rounded-lg no-underline inline-block; }
  .btn-solid:hover { background:var(--accent-hover); }
  .btn-ghost { border:1px solid var(--border); color:var(--text); @apply font-semibold text-sm px-5 py-3 rounded-lg no-underline inline-block; }
  .btn-ghost:hover { border-color:var(--accent); color:var(--accent); }
  .card { background:var(--surface); border:1px solid var(--border); @apply rounded-xl p-6 transition; }
  .card:hover { @apply -translate-y-1; box-shadow:0 12px 40px rgb(79 70 229 / 0.15); }
  .chip { background:var(--surface); border:1px solid var(--border); color:var(--text); @apply text-sm font-medium px-4 py-2 rounded-lg no-underline; }
  .chip:hover { border-color:var(--accent); color:var(--accent); }
  .tag { color:var(--accent); background:var(--bg); border:1px solid var(--border); @apply text-xs px-2.5 py-0.5 rounded-full no-underline; }
  .eyebrow { color:var(--accent); font-family:var(--font-mono); @apply text-xs tracking-[2px] uppercase; }
  .grad-text { background:linear-gradient(100deg,var(--accent),var(--violet)); -webkit-background-clip:text; background-clip:text; color:transparent; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration:0.01ms !important; transition-duration:0.01ms !important; }
}
```

Write `themes/indigo-night/layouts/partials/head.html`:

```html
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{ if .IsHome }}{{ site.Title }} — {{ site.Params.tagline }}{{ else }}{{ .Title }} · {{ site.Title }}{{ end }}</title>
<meta name="description" content="{{ .Description | default site.Params.tagline }}">
<script>
  (function(){var t=localStorage.getItem("theme")||(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");document.documentElement.setAttribute("data-theme",t);})();
</script>
{{ with resources.Get "css/main.css" }}
  {{ $opts := dict "minify" (not hugo.IsDevelopment) }}
  {{ with . | css.TailwindCSS $opts }}
    {{ if hugo.IsDevelopment }}
      <link rel="stylesheet" href="{{ .RelPermalink }}">
    {{ else }}
      {{ with . | fingerprint }}
        <link rel="stylesheet" href="{{ .RelPermalink }}" integrity="{{ .Data.Integrity }}" crossorigin="anonymous">
      {{ end }}
    {{ end }}
  {{ end }}
{{ end }}
```

In `baseof.html`, replace everything inside `<head>…</head>` with `{{ partial "head.html" . }}`.

- [ ] **Step 4: Verify**

```bash
hugo --gc && grep -q 'stylesheet' public/index.html && ls public/fonts/*.woff2 | wc -l
```
Expected: `OK`-equivalent — stylesheet link present, `5` fonts copied.

- [ ] **Step 5: Commit** — `git add -A && git commit -m "Add design tokens, self-hosted fonts, Tailwind pipeline"`

---

### Task 3: Nav, footer, theme toggle

**Files:**
- Create: `themes/indigo-night/layouts/partials/header.html`, `themes/indigo-night/layouts/partials/footer.html`, `themes/indigo-night/assets/js/theme-toggle.js`
- Modify: `themes/indigo-night/layouts/baseof.html`

**Interfaces:**
- Consumes: tokens + `head.html` (Task 2); `params.social.*`, `params.cvPath`.
- Produces: final `baseof.html` shape: head → `partial "header.html"` → `block "main"` → `partial "footer.html"` → scripts. Nav links `/#experience`, `/projects/`, `/#skills`; CV button only when `params.cvPath != ""`. Footer prints only the social links present in params. Button `#theme-toggle` flips `data-theme` and persists `localStorage.theme`.

- [ ] **Step 1: Failing check**

```bash
hugo --gc && grep -q 'id="theme-toggle"' public/index.html && grep -q 'linkedin.com/in/lorainemg' public/index.html && echo OK
```
Expected: FAIL.

- [ ] **Step 2: Implement**

`partials/header.html`:

```html
<header class="wrap flex items-center justify-between py-6">
  <a href="/" class="font-display font-bold text-lg no-underline" style="color:var(--heading)">loraine<span style="color:var(--accent)">.</span></a>
  <nav class="flex items-center gap-6 text-sm">
    <a class="no-underline font-medium" style="color:var(--muted)" href="/#experience">Experience</a>
    <a class="no-underline font-medium" style="color:var(--muted)" href="/projects/">Projects</a>
    <a class="no-underline font-medium" style="color:var(--muted)" href="/#skills">Skills</a>
    {{ with site.Params.cvPath }}<a class="btn-solid" href="/{{ . }}" download>Download CV</a>{{ end }}
    <button id="theme-toggle" aria-label="Toggle color theme" class="chip cursor-pointer">◐</button>
  </nav>
</header>
```

`partials/footer.html`:

```html
<footer class="wrap flex flex-wrap justify-between gap-3 py-8 mt-20 text-sm" style="border-top:1px solid var(--border); color:var(--muted)">
  <span>© {{ now.Year }} Loraine Monteagudo</span>
  <span class="flex gap-4">
    {{ with site.Params.social.github }}<a style="color:var(--accent)" class="no-underline" href="{{ . }}">GitHub</a>{{ end }}
    {{ with site.Params.social.linkedin }}<a style="color:var(--accent)" class="no-underline" href="{{ . }}">LinkedIn</a>{{ end }}
    {{ with site.Params.social.email }}<a style="color:var(--accent)" class="no-underline" href="mailto:{{ . }}">Email</a>{{ end }}
  </span>
</footer>
```

`assets/js/theme-toggle.js`:

```js
document.getElementById("theme-toggle").addEventListener("click", () => {
  const html = document.documentElement;
  const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});
```

`baseof.html` body:

```html
<body>
  {{ partial "header.html" . }}
  {{ block "main" . }}{{ end }}
  {{ partial "footer.html" . }}
  {{ with resources.Get "js/theme-toggle.js" | minify | fingerprint }}
    <script src="{{ .RelPermalink }}" integrity="{{ .Data.Integrity }}" defer></script>
  {{ end }}
</body>
```

- [ ] **Step 3: Verify** — Step 1 command prints `OK`. `hugo server` (`http://localhost:1313`): toggle flips colors and persists across reload.
- [ ] **Step 4: Commit** — `git add -A && git commit -m "Add nav, footer, dark/light toggle"`

---

### Task 4: Experience content + home timeline

**Files:**
- Create: `content/experience/_index.md` + 7 role files, `themes/indigo-night/layouts/partials/experience.html`, `themes/indigo-night/layouts/partials/experience-item.html`
- Modify: `themes/indigo-night/layouts/home.html`, `themes/indigo-night/assets/css/main.css`

**Interfaces:**
- Consumes: tokens (Task 2).
- Produces: experience pages with front matter `title, company, location, website, startDate, endDate (null = present), skills[]`; body = Markdown bullet list. No standalone /experience/ URLs (cascade `build.render: never`). Partial `experience.html` renders the timeline: current roles (endDate null) by startDate desc, then past roles by endDate desc. Tasks 5 and 9 also read these pages (`Params.company`, `skills`).

- [ ] **Step 1: Failing check**

```bash
hugo --gc && grep -q 'Arealec' public/index.html && ! test -d public/experience && echo OK
```
Expected: FAIL.

- [ ] **Step 2: Create content**

`content/experience/_index.md`:

```markdown
---
title: Experience
cascade:
  build:
    render: never
    list: local
---
```

Seven role files. **Copy every bullet verbatim** from `docs/superpowers/content-inventory/site-content.md` §Experience into the bodies. Front matter per file:

| file | title | company | location | website | startDate | endDate | skills |
|---|---|---|---|---|---|---|---|
| jfc-senior.md | Senior Full Stack Developer | Jack's Flight Club | Tampa, Florida | https://jacksflightclub.com | 2024-09-01 | null | [Python, TypeScript, Docker, FastAPI, SQLAlchemy] |
| jfc-fullstack.md | Full Stack Developer | Jack's Flight Club | Tampa, Florida | https://jacksflightclub.com | 2022-12-01 | 2024-09-01 | [Python, TypeScript, HTML/CSS, Linux, Docker, FastAPI, SQLAlchemy, Pandas, Playwright, Svelte] |
| arealec.md | Full Stack Developer | Arealec | Zaragoza, Spain | http://www.araelec.com/ | 2022-02-01 | null | [Python, JavaScript, HTML/CSS, Linux, Docker, Git, FastAPI, MySQL, Vue, TailwindCSS] |
| uh-professor.md | Assistant Professor and Researcher | University of Havana | Havana, Cuba | https://www.uh.cu | 2022-01-01 | 2022-08-01 | [Python, Scikit-Learn, Pandas, Git, C#] |
| uh-ta.md | Undergraduate Teaching Assistant | University of Havana | Havana, Cuba | https://www.uh.cu | 2018-09-01 | 2021-12-01 | [C#] |
| uh-researcher.md | Undergraduate Student Researcher | University of Havana | Havana, Cuba | https://www.uh.cu | 2017-09-01 | 2021-12-01 | [Python, Scikit-Learn, Pandas, Git] |
| deepdatatech.md | Full Stack Developer | Deepdatatech | Havana, Cuba | https://deepdatatech.com/ | 2021-06-01 | 2022-01-01 | [TailwindCSS, JavaScript, Flask, HTML/CSS, Git, Docker, Linux] |

Complete example (`jfc-senior.md`) — same shape for all seven:

```markdown
---
title: Senior Full Stack Developer
company: Jack's Flight Club
location: Tampa, Florida
website: https://jacksflightclub.com
startDate: 2024-09-01
endDate: null
skills: [Python, TypeScript, Docker, FastAPI, SQLAlchemy]
---

- Improved system performance, cutting processing time through better code and system design
- Optimized database queries and introduced caching mechanisms to handle increased data loads
- Added error monitoring with Sentry, reducing the time to fix issues through automated alerts
- Automated reporting workflows in Google Sheets and set up alerts for flight deals
- Collaborated across teams to align technical solutions with business objectives
```

`partials/experience.html`:

```html
{{ $roles := where site.RegularPages "Section" "experience" }}
{{ $current := where $roles "Params.endDate" nil }}
{{ $past := where $roles "Params.endDate" "ne" nil }}
<section id="experience" class="wrap pt-16 reveal">
  <div class="flex items-baseline gap-4 mb-8">
    <h2 class="font-display text-3xl font-bold" style="color:var(--heading)">Experience</h2>
    <div class="flex-1 h-px" style="background:var(--border)"></div>
  </div>
  <div class="ml-1.5" style="border-left:2px solid var(--border)">
    {{ range (sort $current "Params.startDate" "desc") }}{{ partial "experience-item.html" . }}{{ end }}
    {{ range (sort $past "Params.endDate" "desc") }}{{ partial "experience-item.html" . }}{{ end }}
  </div>
</section>
```

`partials/experience-item.html`:

```html
<article class="relative pb-9 pl-8 tl-item">
  <div class="font-mono text-xs" style="color:var(--accent)">
    {{ .Params.startDate | time.Format "2006.01" }} — {{ with .Params.endDate }}{{ . | time.Format "2006.01" }}{{ else }}present{{ end }}
  </div>
  <h3 class="text-lg font-semibold mt-1.5" style="color:var(--heading)">
    {{ .Title }} <span class="font-normal" style="color:var(--muted)">· {{ with .Params.website }}<a href="{{ . }}" class="no-underline" style="color:inherit">{{ $.Params.company }}</a>{{ else }}{{ .Params.company }}{{ end }}</span>
  </h3>
  <div class="mt-2 text-[14.5px] leading-relaxed max-w-[64ch]" style="color:var(--muted)">{{ .Content }}</div>
</article>
```

Add to `main.css` inside `@layer components`:

```css
.tl-item::before { content:''; position:absolute; left:-7px; top:9px; width:12px; height:12px;
  border-radius:9999px; background:var(--bg); border:2.5px solid var(--accent); }
```

`home.html` main block becomes: `{{ partial "experience.html" . }}`.

- [ ] **Step 3: Verify** — Step 1 check prints `OK`; timeline shows 7 roles, current first.
- [ ] **Step 4: Commit** — `git add -A && git commit -m "Add experience content and home timeline"`

---

### Task 5: Hero, journey graphic, stat bar

**Files:**
- Create: `themes/indigo-night/layouts/partials/hero.html`, `themes/indigo-night/layouts/partials/journey.html`, `data/stats.yaml`
- Modify: `themes/indigo-night/layouts/home.html`, `themes/indigo-night/assets/css/main.css`

**Interfaces:**
- Consumes: experience pages (Task 4: `Params.company`, `Params.startDate`).
- Produces: hero per mockup; journey SVG waypoints = experience companies deduped in startDate order; stat bar from `data/stats.yaml` (list of `{value, label}`).

- [ ] **Step 1: Failing check**

```bash
hugo --gc && grep -q 'grad-text' public/index.html && grep -q 'journey-path' public/index.html && echo OK
```
Expected: FAIL.

- [ ] **Step 2: Implement**

`data/stats.yaml`:

```yaml
- value: "4+"
  label: years of experience
- value: "20+"
  label: projects completed
- value: "3"
  label: publications in NLP & ML
- value: "5th"
  label: IberLEF eHealth-KD 2021
```

`partials/journey.html` (waypoints evenly spaced: x 20→500, y 270→30):

```html
{{ $roles := sort (where site.RegularPages "Section" "experience") "Params.startDate" "asc" }}
{{ $companies := slice }}{{ $seen := dict }}
{{ range $roles }}{{ if not (index $seen .Params.company) }}{{ $seen = merge $seen (dict .Params.company true) }}{{ $companies = $companies | append . }}{{ end }}{{ end }}
{{ $n := len $companies }}
{{ if gt $n 1 }}
<svg class="journey absolute right-[-40px] top-10 pointer-events-none" width="520" height="300" viewBox="0 0 520 300" aria-hidden="true">
  <defs><linearGradient id="grad" x1="0" y1="1" x2="1" y2="0">
    <stop offset="0" stop-color="#818cf8"/><stop offset="1" stop-color="#bb9af7"/>
  </linearGradient></defs>
  {{ $pts := slice }}
  {{ range $i, $p := $companies }}
    {{ $x := add 20 (div (mul $i 480) (sub $n 1)) }}
    {{ $y := sub 270 (div (mul $i 240) (sub $n 1)) }}
    {{ $pts = $pts | append (printf "%d,%d" $x $y) }}
  {{ end }}
  <polyline class="journey-path" points="{{ delimit $pts " " }}" fill="none" stroke="url(#grad)" stroke-width="2" stroke-dasharray="6 7"/>
  {{ range $i, $p := $companies }}
    {{ $x := add 20 (div (mul $i 480) (sub $n 1)) }}
    {{ $y := sub 270 (div (mul $i 240) (sub $n 1)) }}
    <circle cx="{{ $x }}" cy="{{ $y }}" r="5" fill="var(--accent)"/>
    <text x="{{ add $x 12 }}" y="{{ add $y 4 }}" class="journey-label">{{ $p.Params.company }}</text>
  {{ end }}
</svg>
{{ end }}
```

`partials/hero.html`:

```html
<section class="wrap relative pt-20 pb-16 overflow-hidden reveal">
  {{ partial "journey.html" . }}
  <p class="eyebrow mb-4">// fullstack engineer · machine learning</p>
  <h1 class="font-display font-bold text-5xl md:text-7xl tracking-tight leading-[1.02] max-w-[12ch]" style="color:var(--heading)">
    I build systems that track, <span class="grad-text">learn</span>&nbsp;and&nbsp;ship.
  </h1>
  <p class="mt-5 text-lg leading-relaxed max-w-[52ch]" style="color:var(--muted)">
    I'm <b style="color:var(--text)">Loraine Monteagudo</b> — a software engineer working across
    <b style="color:var(--text)">Python backends</b>, <b style="color:var(--text)">Vue &amp; Svelte frontends</b>,
    and <b style="color:var(--text)">ML models</b> in production.
  </p>
  <div class="mt-8 flex gap-3.5 flex-wrap">
    <a class="btn-solid" href="/projects/">View projects</a>
    <a class="btn-ghost" href="mailto:{{ site.Params.social.email }}">Get in touch</a>
  </div>
</section>
<div class="wrap flex flex-wrap gap-12 py-6" style="border-top:1px solid var(--border); border-bottom:1px solid var(--border)">
  {{ range site.Data.stats }}
  <div><b class="font-display text-2xl block" style="color:var(--heading)">{{ .value }}</b>
  <span class="text-[13px]" style="color:var(--muted)">{{ .label }}</span></div>
  {{ end }}
</div>
```

Note the hero bio deliberately names **no current employer** (stale-data guard per Global Constraints).

Add to `main.css`:

```css
.journey-label { fill:var(--muted); font-family:var(--font-mono); font-size:10.5px; }
.journey-path { animation:journey-dash 30s linear infinite; }
@keyframes journey-dash { to { stroke-dashoffset:-520; } }
@media (max-width:768px) { .journey { display:none; } }
```

`home.html`: `{{ partial "hero.html" . }}` before the experience partial.

- [ ] **Step 3: Verify** — Step 1 check `OK`; visually: 4 waypoints (U. of Havana, Deepdatatech, Arealec, Jack's Flight Club), gradient on "learn", 4 stats.
- [ ] **Step 4: Commit** — `git add -A && git commit -m "Add hero with journey graphic and stat bar"`

---

### Task 6: Projects content (21 files)

**Files:**
- Create: `content/projects/_index.md` + the 21 files below.

**Interfaces:**
- Produces: project pages with front matter `title, description, category, skills[], github, links[] (optional), featured, weight`. Body text ⇒ detail page (Task 8); front-matter-only ⇒ card links to GitHub (Task 7). Slugs, categories, featured flags and body decisions are fixed HERE.

- [ ] **Step 1: Failing check**

```bash
hugo --gc && test $(ls content/projects/*.md | grep -v _index | wc -l) -eq 21 && echo OK
```
Expected: FAIL.

- [ ] **Step 2: Create files**

`content/projects/_index.md`:

```markdown
---
title: Projects
description: From NLP research and AutoML to simulators, scrapers and an editor written in Assembly — everything links to source.
---
```

Descriptions and **exact GitHub/extra-link URLs come verbatim** from `docs/superpowers/content-inventory/project-details.md`. Fixed decisions:

| file | category | featured | weight | body? |
|---|---|---|---|---|
| ehealth-kd-challenge-2021.md | ml-nlp | yes | 1 | yes — 2–3 paragraphs: task, approach, 5th place result; links: task site + paper link from inventory |
| meta-learning-automl.md | ml-nlp | yes | 2 | yes — thesis summary; links: all 3 repos (autogoal, experiments-thesis, dissertation) |
| cryptocurrency-forecasting.md | web-data | yes | 3 | yes — pipeline summary from inventory |
| detection-of-negation.md | ml-nlp | no | 4 | yes — from inventory incl. SFU corpus link |
| vimasm.md | systems | yes | 5 | no |
| enrollment-automation.md | web-data | no | 6 | no |
| datacamp-projects.md | web-data | no | 7 | no |
| machine-learning-projects.md | ml-nlp | no | 8 | no |
| discrete-event-simulation.md | systems | no | 9 | no |
| sudoku-hidato.md | systems | no | 10 | no |
| schizophrenic-classification.md | ml-nlp | no | 11 | no |
| algorithms-analysis.md | systems | no | 12 | no |
| cpu-scheduling-simulator.md | systems | no | 13 | no |
| information-retrieval-system.md | ml-nlp | no | 14 | no |
| household-dataset-analysis.md | web-data | no | 15 | no |
| fuzzy-inference-system.md | ml-nlp | no | 16 | no |
| sensortower-scraper.md | web-data | no | 17 | no |
| type-inference.md | systems | no | 18 | no |
| grammar-analyzer.md | systems | no | 19 | no |
| chat-block.md | systems | no | 20 | no |
| simulation-agents.md | ml-nlp | no | 21 | no |

`skills` per project: the technology list from its inventory entry; where absent, derive from the description (sudoku-hidato → `[Haskell]`, vimasm → `[Assembly]`, type-inference → `[Python]`, etc. — use the language named in the description).

Complete example WITH body (`ehealth-kd-challenge-2021.md`; use the real URLs from the inventory):

```markdown
---
title: eHealth-KD Challenge 2021
description: Named Entity Recognition and Relation Extraction with ML — 5th place at IberLEF 2021.
category: ml-nlp
skills: [Python, spaCy, Keras, Scikit-Learn]
github: https://github.com/lorainemg/ehealthkd-2021
links:
  - name: Task site
    url: https://ehealthkd.github.io/2021
featured: true
weight: 1
---

Named Entity Recognition (NER) and Relation Extraction (RE) on Spanish health
documents, built for the IberLEF eHealth-KD 2021 shared task. Our team,
UH-MMM, placed **5th overall**.

The system combines recurrent models for entity tagging with a
dependency-guided relation classifier, sharing spaCy preprocessing and word
embeddings across both stages.

The run is documented in the workshop paper *UH-MMM at eHealth-KD Challenge 2021*.
```

Complete example WITHOUT body (`vimasm.md`):

```markdown
---
title: Vimasm
description: An implementation of the VIM editor written in NASM Assembly.
category: systems
skills: [Assembly]
github: https://github.com/lorainemg/vimasm
featured: true
weight: 5
---
```

- [ ] **Step 3: Verify** — Step 1 check `OK`; `hugo --gc` clean (no WARN).
- [ ] **Step 4: Commit** — `git add -A && git commit -m "Migrate all 21 projects from Framer site"`

---

### Task 7: Projects list page with filters + featured cards on home

**Files:**
- Create: `themes/indigo-night/layouts/section.html`, `themes/indigo-night/layouts/partials/project-card.html`, `themes/indigo-night/layouts/partials/featured-projects.html`, `themes/indigo-night/assets/js/filter.js`
- Modify: `themes/indigo-night/layouts/home.html`, `themes/indigo-night/assets/css/main.css`

**Interfaces:**
- Consumes: project pages (Task 6).
- Produces: `partial "project-card.html"` (context: one project page) — links to `.RelPermalink` when body non-empty else `.Params.github`; skill tags link `/skills/<urlize>/`. `/projects/` = filterable grid; chips derive from distinct `category` values. `.on` chip modifier class.

- [ ] **Step 1: Failing check**

```bash
hugo --gc && grep -q 'data-category="ml-nlp"' public/projects/index.html && [ $(grep -o 'data-category=' public/projects/index.html | wc -l) -eq 21 ] && echo OK
```
Expected: FAIL.

- [ ] **Step 2: Implement**

`partials/project-card.html`:

```html
{{ $hasBody := ne (trim .Content " \n") "" }}
{{ $href := cond $hasBody .RelPermalink .Params.github }}
<article class="card flex flex-col" data-category="{{ .Params.category }}">
  <div class="flex justify-between items-center mb-3.5">
    <span class="eyebrow">{{ replace (upper .Params.category) "-" " · " }}</span>
    {{ with .Params.github }}<a class="text-xs no-underline" style="color:var(--muted)" href="{{ . }}">github ↗</a>{{ end }}
  </div>
  <h3 class="font-semibold" style="color:var(--heading)"><a class="no-underline" style="color:inherit" href="{{ $href }}">{{ .Title }}</a></h3>
  <p class="text-sm mt-2 flex-1" style="color:var(--muted)">{{ .Description }}</p>
  <div class="flex gap-2 flex-wrap mt-4">
    {{ range .Params.skills }}<a class="tag" href="/skills/{{ . | urlize }}/">{{ . }}</a>{{ end }}
  </div>
</article>
```

`layouts/section.html` (renders `/projects/`):

```html
{{ define "main" }}
<main class="wrap">
  <header class="pt-14 pb-3">
    <p class="font-mono text-[12.5px] mb-4" style="color:var(--muted)"><a href="/" style="color:var(--accent)" class="no-underline">~</a> / {{ lower .Title }}</p>
    <h1 class="font-display font-bold text-5xl tracking-tight" style="color:var(--heading)">{{ .Title }} <i class="not-italic" style="color:var(--accent)">({{ len .RegularPages }})</i></h1>
    <p class="mt-3 max-w-[56ch] leading-relaxed" style="color:var(--muted)">{{ .Description }}</p>
  </header>
  <div class="flex gap-2.5 flex-wrap py-7" id="filters">
    <button class="chip font-mono text-xs cursor-pointer on" data-filter="all">all</button>
    {{ range .RegularPages.GroupByParam "category" }}
    <button class="chip font-mono text-xs cursor-pointer" data-filter="{{ .Key }}">{{ replace .Key "-" " & " }}</button>
    {{ end }}
  </div>
  <div class="grid gap-4 pb-20" style="grid-template-columns:repeat(auto-fill,minmax(300px,1fr))" id="project-grid">
    {{ range .RegularPages.ByWeight }}{{ partial "project-card.html" . }}{{ end }}
  </div>
</main>
{{ with resources.Get "js/filter.js" | minify | fingerprint }}<script src="{{ .RelPermalink }}" defer></script>{{ end }}
{{ end }}
```

`assets/js/filter.js`:

```js
const chips = document.querySelectorAll("#filters [data-filter]");
chips.forEach(chip => chip.addEventListener("click", () => {
  chips.forEach(c => c.classList.remove("on"));
  chip.classList.add("on");
  const f = chip.dataset.filter;
  document.querySelectorAll("#project-grid [data-category]").forEach(card => {
    card.style.display = (f === "all" || card.dataset.category === f) ? "" : "none";
  });
}));
```

Add to `main.css` components: `.on { background:var(--accent-deep) !important; border-color:var(--accent-deep) !important; color:#fff !important; }`

`partials/featured-projects.html`:

```html
{{ $featured := where (where site.RegularPages "Section" "projects") "Params.featured" true }}
<section class="wrap pt-16 reveal">
  <div class="flex items-baseline gap-4 mb-8">
    <h2 class="font-display text-3xl font-bold" style="color:var(--heading)">Featured projects</h2>
    <div class="flex-1 h-px" style="background:var(--border)"></div>
    <a class="text-sm no-underline" style="color:var(--accent)" href="/projects/">All {{ len (where site.RegularPages "Section" "projects") }} →</a>
  </div>
  <div class="grid gap-4" style="grid-template-columns:repeat(auto-fit,minmax(280px,1fr))">
    {{ range $featured.ByWeight }}{{ partial "project-card.html" . }}{{ end }}
  </div>
</section>
```

Include in `home.html` after experience.

- [ ] **Step 3: Verify** — Step 1 check `OK`. `hugo server`: chips filter the grid; vimasm's card links to GitHub, ehealth's card links to its detail page.
- [ ] **Step 4: Commit** — `git add -A && git commit -m "Add projects list with category filters and featured cards"`

---

### Task 8: Project detail template

**Files:**
- Create: `themes/indigo-night/layouts/page.html`
- Modify: `themes/indigo-night/assets/css/main.css`

**Interfaces:**
- Consumes: project pages with bodies (Task 6): `.Content`, `.Params.github|links|skills|category`.
- Produces: detail layout: breadcrumb, H1, buttons, prose left / facts sidebar right, prev-next. Free-form `.Content` — no imposed sections.

- [ ] **Step 1: Failing check**

```bash
hugo --gc && grep -q 'View on GitHub' public/projects/ehealth-kd-challenge-2021/index.html && echo OK
```
Expected: FAIL.

- [ ] **Step 2: Implement `layouts/page.html`**

```html
{{ define "main" }}
<main class="wrap">
  <header class="pt-14">
    <p class="font-mono text-[12.5px] mb-4" style="color:var(--muted)"><a href="/" style="color:var(--accent)" class="no-underline">~</a> / <a href="/projects/" style="color:var(--accent)" class="no-underline">projects</a> / {{ .File.ContentBaseName }}</p>
    <h1 class="font-display font-bold text-5xl tracking-tight" style="color:var(--heading)">{{ .Title }}</h1>
    <div class="flex gap-3.5 flex-wrap mt-5">
      {{ with .Params.github }}<a class="btn-solid" href="{{ . }}">View on GitHub ↗</a>{{ end }}
      {{ range .Params.links }}<a class="btn-ghost" href="{{ .url }}">{{ .name }} ↗</a>{{ end }}
    </div>
  </header>
  <div class="grid gap-12 py-12 md:grid-cols-[1fr_280px]">
    <article class="prose-indigo">{{ .Content }}</article>
    <aside>
      <div class="card mb-4"><h4 class="eyebrow mb-3">FACTS</h4>
        <p class="text-sm" style="color:var(--text)"><b>Category</b> — {{ .Params.category }}</p></div>
      <div class="card mb-4"><h4 class="eyebrow mb-3">STACK</h4>
        <div class="flex gap-2 flex-wrap">{{ range .Params.skills }}<a class="tag" href="/skills/{{ . | urlize }}/">{{ . }}</a>{{ end }}</div></div>
      {{ if or .Params.github .Params.links }}<div class="card"><h4 class="eyebrow mb-3">LINKS</h4><ul class="text-sm list-none space-y-1.5">
        {{ with .Params.github }}<li><a style="color:var(--accent)" class="no-underline" href="{{ . }}">Source ↗</a></li>{{ end }}
        {{ range .Params.links }}<li><a style="color:var(--accent)" class="no-underline" href="{{ .url }}">{{ .name }} ↗</a></li>{{ end }}
      </ul></div>{{ end }}
    </aside>
  </div>
  <nav class="flex justify-between py-7 pb-14 text-sm" style="border-top:1px solid var(--border)">
    {{ with .NextInSection }}<a class="no-underline" style="color:var(--accent)" href="{{ .RelPermalink }}"><span class="font-mono text-xs block" style="color:var(--muted)">← prev</span>{{ .Title }}</a>{{ else }}<span></span>{{ end }}
    {{ with .PrevInSection }}<a class="no-underline text-right" style="color:var(--accent)" href="{{ .RelPermalink }}"><span class="font-mono text-xs block" style="color:var(--muted)">next →</span>{{ .Title }}</a>{{ else }}<span></span>{{ end }}
  </nav>
</main>
{{ end }}
```

Add to `main.css`:

```css
.prose-indigo { color:var(--text); line-height:1.85; max-width:68ch; }
.prose-indigo h2 { font-family:var(--font-display); color:var(--heading); font-size:1.375rem; margin:2rem 0 .875rem; }
.prose-indigo p { margin-bottom:1rem; color:var(--muted); }
.prose-indigo strong { color:var(--text); }
.prose-indigo code { font-family:var(--font-mono); font-size:.8125rem; background:var(--surface); border:1px solid var(--border); padding:.125rem .4375rem; border-radius:5px; color:var(--accent); }
.prose-indigo a { color:var(--accent); }
```

- [ ] **Step 3: Verify** — Step 1 check `OK`; the 4 body-carrying projects render detail pages; nothing links to detail pages of body-less projects.
- [ ] **Step 4: Commit** — `git add -A && git commit -m "Add project detail template"`

---

### Task 9: Skills taxonomy pages + home skills section

**Files:**
- Create: `themes/indigo-night/layouts/taxonomy.html`, `themes/indigo-night/layouts/term.html`, `data/skills.yaml`, `themes/indigo-night/layouts/partials/skills.html`
- Modify: `themes/indigo-night/layouts/home.html`

**Interfaces:**
- Consumes: `skills` front matter (Tasks 4+6); taxonomy config (Task 1).
- Produces: `/skills/<term>/` pages (roles grouped under EXPERIENCE, projects under PROJECTS); `/skills/` term cloud with counts; home skills section from `data/skills.yaml` (`group`, `items[]`), each chip linking to its term page — rendered as plain text when the term has no page (unused skill).

- [ ] **Step 1: Failing check**

```bash
hugo --gc && grep -q 'Arealec' public/skills/python/index.html && echo OK
```
Expected: FAIL.

- [ ] **Step 2: Implement**

`data/skills.yaml` (spellings must match front-matter exactly):

```yaml
- group: Languages
  items: [Python, TypeScript, JavaScript, HTML/CSS, C#]
- group: Backend & Data
  items: [FastAPI, Flask, Django, SQLAlchemy, PostgreSQL, MySQL, Redis, Pandas]
- group: Machine Learning
  items: [Scikit-Learn, TensorFlow, Keras, NumPy, NLP, spaCy]
- group: Frontend
  items: [Vue, Svelte, TailwindCSS]
- group: DevOps & Cloud
  items: [Docker, GitHub Actions, Git, Linux, Kubernetes, Terraform, AWS]
- group: Testing & Tools
  items: [Pytest, Playwright, Selenium, Plotly, Streamlit]
```

`layouts/term.html`:

```html
{{ define "main" }}
<main class="wrap">
  <header class="pt-14 pb-8">
    <p class="font-mono text-[12.5px] mb-4" style="color:var(--muted)"><a href="/" style="color:var(--accent)" class="no-underline">~</a> / <a href="/skills/" style="color:var(--accent)" class="no-underline">skills</a> / {{ lower .Title }}</p>
    <h1 class="font-display font-bold text-5xl tracking-tight" style="color:var(--heading)">{{ .Title }}</h1>
    <p class="mt-3" style="color:var(--muted)">Where I've used it:</p>
  </header>
  {{ $exp := where .Pages "Section" "experience" }}
  {{ $proj := where .Pages "Section" "projects" }}
  {{ with $exp }}
  <h2 class="eyebrow mb-4">EXPERIENCE</h2>
  <ul class="list-none space-y-2 mb-10">
    {{ range . }}<li class="text-[15px]"><span style="color:var(--heading)" class="font-semibold">{{ .Title }}</span> <span style="color:var(--muted)">· {{ .Params.company }}</span></li>{{ end }}
  </ul>
  {{ end }}
  {{ with $proj }}
  <h2 class="eyebrow mb-4">PROJECTS</h2>
  <div class="grid gap-4 pb-20" style="grid-template-columns:repeat(auto-fill,minmax(300px,1fr))">
    {{ range . }}{{ partial "project-card.html" . }}{{ end }}
  </div>
  {{ end }}
</main>
{{ end }}
```

`layouts/taxonomy.html`:

```html
{{ define "main" }}
<main class="wrap">
  <header class="pt-14 pb-8"><h1 class="font-display font-bold text-5xl tracking-tight" style="color:var(--heading)">Skills</h1></header>
  <div class="flex gap-2.5 flex-wrap pb-20">
    {{ range .Data.Terms.Alphabetical }}
    <a class="chip" href="{{ .Page.RelPermalink }}">{{ .Page.Title }} <span style="color:var(--muted)">({{ .Count }})</span></a>
    {{ end }}
  </div>
</main>
{{ end }}
```

`partials/skills.html`:

```html
<section id="skills" class="wrap pt-16 reveal">
  <div class="flex items-baseline gap-4 mb-8">
    <h2 class="font-display text-3xl font-bold" style="color:var(--heading)">Tools I work with</h2>
    <div class="flex-1 h-px" style="background:var(--border)"></div>
    <a class="text-sm no-underline" style="color:var(--accent)" href="/skills/">All skills →</a>
  </div>
  {{ range site.Data.skills }}
  <p class="eyebrow mt-6 mb-3">{{ upper .group }}</p>
  <div class="flex gap-2.5 flex-wrap">
    {{ range .items }}
      {{ with site.GetPage (printf "/skills/%s" (. | urlize)) }}
        <a class="chip" href="{{ .RelPermalink }}">{{ .Title }}</a>
      {{ else }}
        <span class="chip" style="opacity:.6">{{ . }}</span>
      {{ end }}
    {{ end }}
  </div>
  {{ end }}
</section>
```

Include in `home.html` after featured projects.

- [ ] **Step 3: Verify** — Step 1 check `OK` (`/skills/python/` lists Arealec role + Python projects). Home chip → term page → project card round-trip works; unused skills (e.g. Kubernetes) render dimmed, not linked.
- [ ] **Step 4: Commit** — `git add -A && git commit -m "Add skills taxonomy pages and home skills section"`

---

### Task 10: Education & achievements section

**Files:**
- Create: `data/education.yaml`, `data/achievements.yaml`, `themes/indigo-night/layouts/partials/education.html`
- Modify: `themes/indigo-night/layouts/home.html`

**Interfaces:**
- Consumes: tokens/cards.
- Produces: two-column section — left: degree card, CERTIFICATIONS rows, PUBLICATIONS list; right: ACHIEVEMENTS rows. Schemas below are the contract; Loraine extends `certifications` herself later.

- [ ] **Step 1: Failing check**

```bash
hugo --gc && grep -q 'DataCamp' public/index.html && echo OK
```
Expected: FAIL.

- [ ] **Step 2: Implement**

`data/education.yaml` (verbatim from inventory §Education):

```yaml
degree:
  title: BSc. Computer Science
  institution: University of Havana
  location: Havana, Cuba
  years: 2016–2021
  gpa: 4.81 / 5
  note: Member of the Artificial Intelligence research group — publications, conferences, competitions.
certifications:
  - name: Associate Data Scientist in Python
    issuer: DataCamp
    year: 2022
    url: ""
  # Loraine adds her other online-course certifications here (name, issuer, year, url)
publications:
  - "Detección de la negación y su ámbito en textos escritos en español"
  - "UH-MMM at eHealth-KD Challenge 2021"
  - "Una estrategia de Meta-Learning para flujos genéricos de AutoML"
```

`data/achievements.yaml` (verbatim from inventory §Achievements):

```yaml
- title: Silver Award
  event: National Computer Conference — annotation model for health-tech knowledge discovery
- title: Gold Diploma
  event: 2018 Student Scientific Conference — ML negation detection in Spanish
- title: Silver Diploma
  event: 2019 Student Scientific Conference — general-purpose annotation model
- title: Conference publication
  event: XVI COMPUMAT 2019 International Congress — negation detection paper
- title: 5th Place
  event: IberLEF eHealth Knowledge Discovery Challenge 2021
  url: https://ehealthkd.github.io/2021
- title: Scientific Merit Award
  event: For excellent academic and research results (undergraduate)
- title: Gold Diploma
  event: Graduated with top academic scores
```

`partials/education.html`:

```html
<section id="education" class="wrap pt-16 reveal">
  <div class="flex items-baseline gap-4 mb-8">
    <h2 class="font-display text-3xl font-bold" style="color:var(--heading)">Education &amp; achievements</h2>
    <div class="flex-1 h-px" style="background:var(--border)"></div>
  </div>
  <div class="grid gap-10 md:grid-cols-2">
    <div>
      {{ with site.Data.education.degree }}
      <div class="card mb-6">
        <h3 class="font-semibold" style="color:var(--heading)">{{ .title }}</h3>
        <p class="font-mono text-xs mt-1" style="color:var(--accent)">{{ .institution }} · {{ .years }} · GPA {{ .gpa }}</p>
        <p class="text-sm mt-2" style="color:var(--muted)">{{ .note }}</p>
      </div>
      {{ end }}
      <p class="eyebrow mb-3">CERTIFICATIONS</p>
      <ul class="list-none space-y-2 mb-6">
        {{ range site.Data.education.certifications }}
        <li class="text-sm" style="color:var(--text)">{{ if .url }}<a href="{{ .url }}" style="color:var(--accent)" class="no-underline">{{ .name }}</a>{{ else }}{{ .name }}{{ end }} <span style="color:var(--muted)">— {{ .issuer }} · {{ .year }}</span></li>
        {{ end }}
      </ul>
      <p class="eyebrow mb-3">PUBLICATIONS</p>
      <ul class="list-none space-y-2">
        {{ range site.Data.education.publications }}<li class="text-sm italic" style="color:var(--muted)">{{ . }}</li>{{ end }}
      </ul>
    </div>
    <div>
      <p class="eyebrow mb-3">ACHIEVEMENTS</p>
      <ul class="list-none space-y-3">
        {{ range site.Data.achievements }}
        <li><span class="text-sm font-semibold" style="color:var(--text)">{{ if .url }}<a href="{{ .url }}" style="color:var(--accent)" class="no-underline">{{ .title }}</a>{{ else }}{{ .title }}{{ end }}</span>
        <span class="text-sm block" style="color:var(--muted)">{{ .event }}</span></li>
        {{ end }}
      </ul>
    </div>
  </div>
</section>
```

Include in `home.html` after skills.

- [ ] **Step 3: Verify** — Step 1 check `OK`.
- [ ] **Step 4: Commit** — `git add -A && git commit -m "Add education, certifications, publications and achievements"`

---

### Task 11: Scroll reveal

**Files:**
- Create: `themes/indigo-night/assets/js/reveal.js`
- Modify: `themes/indigo-night/layouts/baseof.html`, `themes/indigo-night/assets/css/main.css`

**Interfaces:**
- Consumes: `.reveal` on home sections (hero, experience, featured, skills, education — added in their tasks).
- Produces: sections fade/rise in once on first intersection; instant-visible under reduced motion.

- [ ] **Step 1: Failing check**

```bash
hugo --gc && grep -q 'js/reveal' public/index.html && echo OK
```
Expected: FAIL.

- [ ] **Step 2: Implement**

`main.css`:

```css
.reveal { opacity:0; transform:translateY(16px); transition:opacity .6s ease, transform .6s ease; }
.reveal.revealed { opacity:1; transform:none; }
@media (prefers-reduced-motion: reduce) { .reveal { opacity:1; transform:none; } }
```

`assets/js/reveal.js`:

```js
if (!matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window) {
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("revealed"); io.unobserve(e.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach(el => el.classList.add("revealed"));
}
```

Include in `baseof.html` next to `theme-toggle.js` with the same minify+fingerprint pattern. Confirm every home section carries `reveal`.

- [ ] **Step 3: Verify** — Step 1 check `OK`; `hugo server`: sections animate in on scroll; with OS reduced-motion, all content visible immediately.
- [ ] **Step 4: Commit** — `git add -A && git commit -m "Add scroll-reveal animations with reduced-motion guard"`

---

### Task 12: GitHub Actions deploy to Pages

**Files:**
- Create: `.github/workflows/deploy.yml`

**Interfaces:**
- Consumes: everything.
- Produces: live site at https://lorainemg.github.io/ on every push to `main`.

- [ ] **Step 1: Write `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: false
jobs:
  build:
    runs-on: ubuntu-latest
    env:
      HUGO_VERSION: 0.148.2
    steps:
      - uses: actions/checkout@v4
      - name: Install Hugo
        run: |
          curl -sL "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.tar.gz" | sudo tar -xz -C /usr/local/bin hugo
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - uses: actions/configure-pages@v5
      - name: Build
        run: hugo --gc --minify --baseURL "https://lorainemg.github.io/"
      - uses: actions/upload-pages-artifact@v3
        with: { path: ./public }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Enable Pages with Actions as source**

```bash
gh api -X POST repos/lorainemg/lorainemg.github.io/pages -f build_type=workflow 2>/dev/null \
  || gh api -X PUT repos/lorainemg/lorainemg.github.io/pages -f build_type=workflow
```

- [ ] **Step 3: Push and verify**

```bash
git add -A && git commit -m "Add GitHub Pages deploy workflow" && git push
gh run watch --exit-status
curl -sI https://lorainemg.github.io/ | head -1
```
Expected: workflow green; `HTTP/2 200`.

- [ ] **Step 4: Final visual pass** — open the live site: dark/light toggle, mobile width (~375px), project filters, a skill term page, the eHealth detail page. Compare against the two mockup files; fix small deviations and commit as `polish: <what>`.

---

## Self-review notes

- **Spec coverage:** hero/journey (T5), timeline (T4), featured/list/filters (T7), optional detail pages (T6+T8), skills taxonomy (T9), education+certifications+publications+achievements (T10), toggle (T3), reveal (T11), tokens/fonts (T2), deploy (T12). CV button conditional on `cvPath` (T3) — pending PDF per spec.
- **Stale-data guard:** hero bio names no current employer (T5); experience files migrate inventory verbatim; Loraine edits `content/experience/` later.
- **Type consistency:** `skills` front-matter key consumed by T7 cards, T8 sidebar, T9 taxonomy; `company/startDate/endDate` consumed by T4 timeline and T5 journey; `.on` chip class defined T7, used by filter.js; token names identical across all tasks.
