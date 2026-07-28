# Home Page TOC Rail Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the header's in-page anchor links with a sticky, scroll-spy table-of-contents rail on the home page.

**Architecture:** A new `toc.html` partial renders a fixed right-edge rail on the home page only, with entries gated by the same data conditions that render each section. A small IntersectionObserver script highlights the section in view. The header keeps only real destinations (Projects page, CV, theme toggle).

**Tech Stack:** Hugo templates, Tailwind CSS v4 (via `css.TailwindCSS`), vanilla JS. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-07-27-home-toc-rail-design.md`

## Global Constraints

- The theme must stay generic: no personal strings in templates, every UI string through `T "<key>"`, every entry conditional on site data. A bare site with no data files must build with no rail and no errors.
- Commit messages: plain imperative mood, matching repo history ("Add table-of-contents rail to home page"). Do NOT add a `Co-Authored-By` trailer.
- Never use the em dash character in any copy, comment, or doc text.
- All work happens on the branch `theme/lorena-design-review`.
- Verification builds: run `hugo --quiet` from the repo root; output goes to the gitignored `public/`. A grep count of 0 means the pattern is absent (grep exits 1; that is the expected "pass" for absence checks).

---

### Task 1: TOC rail partial on the home page

**Files:**
- Create: `themes/indigo-night/layouts/partials/toc.html`
- Modify: `themes/indigo-night/layouts/home.html`
- Modify: `themes/indigo-night/layouts/partials/featured-projects.html:4`
- Modify: `themes/indigo-night/i18n/en.toml`

**Interfaces:**
- Consumes: existing i18n keys `nav_experience`, `nav_projects`, `nav_skills`, `nav_education`; section IDs `#experience`, `#skills`, `#education`.
- Produces: `<nav id="toc" class="toc">` containing `a[href^="#"]` links and a `p.toc-label` heading; section id `projects` on the featured projects section; i18n key `toc_label`. Tasks 3 and 4 rely on the `toc` id, the `.toc`/`.toc-label` classes, and the anchor hrefs exactly as written here.

- [ ] **Step 1: Verify the rail does not exist yet (failing check)**

Run: `hugo --quiet && grep -c 'id="toc"' public/index.html`
Expected: `0` (grep exits with status 1)

- [ ] **Step 2: Add the `toc_label` i18n string**

In `themes/indigo-night/i18n/en.toml`, after the `[nav_education]` block, add:

```toml
[toc_label]
other = "On this page"
```

- [ ] **Step 3: Give the featured projects section its anchor id**

In `themes/indigo-night/layouts/partials/featured-projects.html`, line 4, change:

```html
<section class="wrap pt-16 reveal">
```

to:

```html
<section id="projects" class="wrap pt-16 reveal">
```

- [ ] **Step 4: Create the partial**

Create `themes/indigo-night/layouts/partials/toc.html` with exactly:

```html
{{ $entries := slice }}
{{ if where site.RegularPages "Section" "experience" }}{{ $entries = $entries | append (dict "id" "experience" "label" (T "nav_experience")) }}{{ end }}
{{ if where (where site.RegularPages "Section" "projects") "Params.featured" true }}{{ $entries = $entries | append (dict "id" "projects" "label" (T "nav_projects")) }}{{ end }}
{{ if site.Data.skills }}{{ $entries = $entries | append (dict "id" "skills" "label" (T "nav_skills")) }}{{ end }}
{{ $edu := site.Data.education | default dict }}
{{ if or $edu.degree $edu.certifications $edu.publications site.Data.achievements }}{{ $entries = $entries | append (dict "id" "education" "label" (T "nav_education")) }}{{ end }}
{{ if ge (len $entries) 2 }}
<nav id="toc" class="toc" aria-label="{{ T "toc_label" }}">
  <p class="toc-label">{{ T "toc_label" }}</p>
  <ul>
    {{ range $entries }}<li><a href="#{{ .id }}">{{ .label }}</a></li>
    {{ end }}
  </ul>
</nav>
{{ end }}
```

Each entry's condition is copied from the partial that renders the matching section (`header.html` used the same gates). The `ge (len $entries) 2` guard keeps a one-entry TOC from rendering.

- [ ] **Step 5: Include the partial from the home template**

Change `themes/indigo-night/layouts/home.html` from:

```html
{{ define "main" }}
<main id="home">{{ partial "hero.html" . }}{{ partial "experience.html" . }}{{ partial "featured-projects.html" . }}{{ partial "skills.html" . }}{{ partial "education.html" . }}</main>
{{ end }}
```

to:

```html
{{ define "main" }}
<main id="home">{{ partial "toc.html" . }}{{ partial "hero.html" . }}{{ partial "experience.html" . }}{{ partial "featured-projects.html" . }}{{ partial "skills.html" . }}{{ partial "education.html" . }}</main>
{{ end }}
```

- [ ] **Step 6: Verify the rail renders on the home page only**

Run: `hugo --quiet && grep -c 'id="toc"' public/index.html && grep -c 'id="projects"' public/index.html`
Expected: `1` and `1`

Run: `grep -c 'id="toc"' public/projects/index.html`
Expected: `0` (grep exits 1; the rail must not appear outside the home page)

Run: `grep -o 'href="#[a-z]*"' public/index.html | sort -u`
Expected output includes: `href="#education"`, `href="#experience"`, `href="#projects"`, `href="#skills"`

- [ ] **Step 7: Commit**

```bash
git add themes/indigo-night/layouts/partials/toc.html themes/indigo-night/layouts/home.html themes/indigo-night/layouts/partials/featured-projects.html themes/indigo-night/i18n/en.toml
git commit -m "Add table-of-contents rail to home page"
```

---

### Task 2: Slim the header to real destinations

**Files:**
- Modify: `themes/indigo-night/layouts/partials/header.html:5-9`

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: a header nav containing only the Projects page link and the CV button. No other task depends on the header.

- [ ] **Step 1: Verify the anchor links currently exist (failing check)**

Run: `hugo --quiet && grep -c '/#experience' public/index.html`
Expected: `1` or more

- [ ] **Step 2: Remove the three anchor links**

In `themes/indigo-night/layouts/partials/header.html`, the nav currently reads:

```html
  <nav class="order-last basis-full flex flex-wrap items-center gap-x-4 gap-y-3 text-sm sm:order-none sm:basis-auto sm:gap-x-6 sm:mr-6">
    {{ if where site.RegularPages "Section" "experience" }}<a class="no-underline font-medium" style="color:var(--muted)" href="{{ site.Home.RelPermalink }}#experience">{{ T "nav_experience" }}</a>{{ end }}
    {{ with site.GetPage "/projects" }}{{ if .RegularPages }}<a class="no-underline font-medium" style="color:var(--muted)" href="{{ .RelPermalink }}">{{ T "nav_projects" }}</a>{{ end }}{{ end }}
    {{ if site.Data.skills }}<a class="no-underline font-medium" style="color:var(--muted)" href="{{ site.Home.RelPermalink }}#skills">{{ T "nav_skills" }}</a>{{ end }}
    {{ $edu := site.Data.education | default dict }}
    {{ if or $edu.degree $edu.certifications $edu.publications site.Data.achievements }}<a class="no-underline font-medium" style="color:var(--muted)" href="{{ site.Home.RelPermalink }}#education">{{ T "nav_education" }}</a>{{ end }}
    {{ with site.Params.cvPath }}<a class="btn-solid" href="{{ . | relURL }}" download>{{ T "download_cv" }}</a>{{ end }}
  </nav>
```

Replace it with:

```html
  <nav class="order-last basis-full flex flex-wrap items-center gap-x-4 gap-y-3 text-sm sm:order-none sm:basis-auto sm:gap-x-6 sm:mr-6">
    {{ with site.GetPage "/projects" }}{{ if .RegularPages }}<a class="no-underline font-medium" style="color:var(--muted)" href="{{ .RelPermalink }}">{{ T "nav_projects" }}</a>{{ end }}{{ end }}
    {{ with site.Params.cvPath }}<a class="btn-solid" href="{{ . | relURL }}" download>{{ T "download_cv" }}</a>{{ end }}
  </nav>
```

Do not remove the `nav_experience`, `nav_skills`, or `nav_education` strings from `i18n/en.toml`; the TOC partial uses them.

- [ ] **Step 3: Verify the anchors are gone from the header on every page**

Run: `hugo --quiet && grep -rc -- '/#experience' public/index.html public/projects/index.html`
Expected: `public/index.html:0` and `public/projects/index.html:0` (the home page's own TOC links use `href="#experience"` with no slash, so this pattern only matches the old header links)

Run: `grep -c 'href="#experience"' public/index.html`
Expected: `1` (the TOC rail link is still there)

- [ ] **Step 4: Commit**

```bash
git add themes/indigo-night/layouts/partials/header.html
git commit -m "Remove in-page anchor links from header"
```

---

### Task 3: Rail styling and anchor scroll behavior

**Files:**
- Modify: `themes/indigo-night/assets/css/main.css` (after the `.journey` rules, around line 71)

**Interfaces:**
- Consumes: `.toc`, `.toc-label`, `nav#toc` markup from Task 1.
- Produces: an `aria-current` attribute selector (`.toc a[aria-current]`) that Task 4's script triggers. Task 4 must set the attribute `aria-current="true"` on the active link.

- [ ] **Step 1: Add the rail CSS**

In `themes/indigo-night/assets/css/main.css`, directly after the line:

```css
@media (max-width:1023px) { .journey { display:none; } }
```

add:

```css
.toc { display:none; }
@media (min-width:1280px) {
  .toc { display:block; position:fixed; right:1.25rem; top:50%; transform:translateY(-50%); }
}
.toc-label { color:var(--muted); font-family:var(--font-mono); font-size:.6875rem; letter-spacing:2px; text-transform:uppercase; opacity:.75; margin-bottom:.875rem; }
.toc ul { display:flex; flex-direction:column; gap:.625rem; }
.toc a { display:flex; align-items:center; gap:.5rem; color:var(--muted); font-family:var(--font-mono); font-size:.75rem; text-decoration:none; transition:color .2s ease; }
.toc a::before { content:''; flex:none; width:7px; height:7px; border-radius:9999px; border:1.5px solid currentColor; transition:background .2s ease; }
.toc a:hover { color:var(--accent); }
.toc a[aria-current] { color:var(--accent); }
.toc a[aria-current]::before { background:currentColor; }

@media (prefers-reduced-motion: no-preference) { html { scroll-behavior:smooth; } }
main section[id] { scroll-margin-top:2rem; }
```

Notes for the implementer: the dot marker inherits `currentColor`, so the muted/accent state needs no extra selectors. Tailwind v4 preflight already strips `ul` margins, padding, and list markers. Smooth scrolling is opted into only when the user has no reduced-motion preference, matching the spec. `scroll-margin-top` keeps anchor jumps from clipping section headings.

- [ ] **Step 2: Verify the build compiles the new CSS**

Run: `hugo --quiet && grep -c 'toc-label' public/index.html`
Expected: `1` (build passes; the class is in the markup and the stylesheet compiled without Tailwind errors)

- [ ] **Step 3: Visual spot-check**

Run: `hugo server --port 1414` in the background, open `http://localhost:1414/`.
Expected: at a window 1280px or wider, a small mono-font rail sits at the right edge, vertically centered, reading "ON THIS PAGE" over Experience, Projects, Skills, Education with hollow dots. Below 1280px it disappears. Clicking "Skills" scrolls smoothly to the skills section with its heading fully visible. Stop the server after checking.

- [ ] **Step 4: Commit**

```bash
git add themes/indigo-night/assets/css/main.css
git commit -m "Style TOC rail and smooth anchor scrolling"
```

---

### Task 4: Scroll-spy highlighting

**Files:**
- Create: `themes/indigo-night/assets/js/toc.js`
- Modify: `themes/indigo-night/layouts/baseof.html:13-15`

**Interfaces:**
- Consumes: `nav#toc` with `a[href^="#"]` links (Task 1); the `.toc a[aria-current]` styles (Task 3).
- Produces: `aria-current="true"` set on exactly one rail link while its section is in view.

- [ ] **Step 1: Create the script**

Create `themes/indigo-night/assets/js/toc.js` with exactly:

```js
const toc = document.getElementById("toc");
if (toc && "IntersectionObserver" in window) {
  const links = Array.from(toc.querySelectorAll('a[href^="#"]'));
  const byId = new Map(links.map(a => [a.getAttribute("href").slice(1), a]));
  const io = new IntersectionObserver(entries => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      links.forEach(a => a.removeAttribute("aria-current"));
      byId.get(e.target.id).setAttribute("aria-current", "true");
    }
  }, { rootMargin: "-25% 0px -65% 0px" });
  byId.forEach((a, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
}
```

How it works: the rootMargin shrinks the observation area to a horizontal band between 25% and 35% of the viewport height. A section "intersects" only while it crosses that band, so at most one section is active at a time and the highlight hands over as the next section's top reaches the band. The script exits immediately on pages without the rail, and without JS the rail is plain working anchor links.

- [ ] **Step 2: Load the script**

In `themes/indigo-night/layouts/baseof.html`, after the `reveal.js` block:

```html
  {{ with resources.Get "js/reveal.js" | minify | fingerprint }}
    <script src="{{ .RelPermalink }}" integrity="{{ .Data.Integrity }}" defer></script>
  {{ end }}
```

add:

```html
  {{ with resources.Get "js/toc.js" | minify | fingerprint }}
    <script src="{{ .RelPermalink }}" integrity="{{ .Data.Integrity }}" defer></script>
  {{ end }}
```

- [ ] **Step 3: Verify the script ships**

Run: `hugo --quiet && grep -c 'js/toc' public/index.html`
Expected: `1`

- [ ] **Step 4: Visual spot-check**

Run: `hugo server --port 1414` in the background, open `http://localhost:1414/` at 1280px+ width.
Expected: while scrolling down, the highlight (accent color, filled dot) moves through Experience, Projects, Skills, Education in order; scrolling back up reverses it; clicking an entry both jumps and highlights it. Stop the server after checking.

- [ ] **Step 5: Commit**

```bash
git add themes/indigo-night/assets/js/toc.js themes/indigo-night/layouts/baseof.html
git commit -m "Highlight active section in TOC rail"
```

---

### Task 5: Generic-site regression check

**Files:** none modified; verification only.

**Interfaces:**
- Consumes: the complete feature from Tasks 1 to 4.
- Produces: confirmation that a bare site builds with no rail and no errors (spec's genericity requirement).

- [ ] **Step 1: Build a bare site against the theme**

```bash
tmp=$(mktemp -d)
hugo new site "$tmp/bare" --format toml
ln -s /mnt/Data/work/portfolio/themes/indigo-night "$tmp/bare/themes/indigo-night"
ln -s /mnt/Data/work/portfolio/node_modules "$tmp/bare/node_modules"
ln -s /mnt/Data/work/portfolio/package.json "$tmp/bare/package.json"
echo 'theme = "indigo-night"' >> "$tmp/bare/hugo.toml"
hugo -s "$tmp/bare" --quiet
```

Expected: exit 0, no errors. (The node_modules symlink gives `css.TailwindCSS` its CLI binary.)

- [ ] **Step 2: Confirm the bare site has no rail**

Run: `grep -c 'id="toc"' "$tmp/bare/public/index.html"`
Expected: `0` (grep exits 1; with no data files and no content there are fewer than two entries, so the guard suppresses the rail). Then `rm -rf "$tmp"`.

- [ ] **Step 3: Full-site final build**

Run: `hugo --quiet`
Expected: exit 0. The branch now holds the color commit, the spec, and Tasks 1 to 4, ready for a PR after review.
