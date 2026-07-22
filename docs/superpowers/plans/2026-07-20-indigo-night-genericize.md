# Indigo Night Theme Genericization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove every personal specificity from `themes/indigo-night/` so any Hugo site can use it, while Loraine's site renders unchanged.

**Architecture:** Five independent workstreams against the theme directory only: a `logoText` param with a smart default, extraction of all UI strings into the theme's `i18n/en.toml`, `with`/`if` guards plus URL helpers so a bare site builds cleanly, an `accentColor` param whose companion shades are derived in OKLCH via an inline style override, and theme metadata (theme.toml, LICENSE, README). Site files (`hugo.toml`, `content/`, `data/`) are not modified.

**Tech Stack:** Hugo (>= 0.148, extended templates), Tailwind CSS 4 via `css.TailwindCSS`, Hugo i18n (`T` function), CSS relative color syntax (`oklch(from ...)`).

**Spec:** `docs/superpowers/specs/2026-07-20-indigo-night-genericize-design.md`

## Global Constraints

- Only files under `themes/indigo-night/` are created or modified. Never touch `hugo.toml`, `content/`, `data/`, or `public/` in the site root.
- Loraine's rendered site must not change. Verification is a minified-build diff (procedure in Task 1, Step 1); after every task the diff must show no text or attribute changes. Whitespace-only differences are acceptable; any other difference is a failure.
- The character `—` (em dash) must not appear in any authored content: README, i18n strings, comments, commit messages.
- Commit messages: short imperative sentence matching repo style (e.g. "Parametrize hero content via hugo.toml"). NEVER add a `Co-Authored-By` trailer.
- i18n string values must reproduce the current rendered text exactly, including case (e.g. `CERTIFICATIONS`, not `Certifications`). The `.eyebrow` CSS class uppercases visually regardless, but exact-case values keep the build diff clean.
- All builds run from `/mnt/Data/work/portfolio`. Scratch output goes under `/tmp/claude-1000/-mnt-Data-work-portfolio/76fba551-0295-4cf4-915a-4a09614bf399/scratchpad` (referred to as `$SCRATCH` below; expand it literally in commands, the executing shell may not have it set).

---

### Task 1: Baseline build and logo parametrization

**Files:**
- Modify: `themes/indigo-night/layouts/partials/header.html:2`

**Interfaces:**
- Produces: baseline build at `$SCRATCH/baseline` used by every later task's verification step; new optional site param `logoText` (string).

- [ ] **Step 1: Create the baseline build**

```bash
cd /mnt/Data/work/portfolio
mkdir -p $SCRATCH
hugo --minify --quiet --destination $SCRATCH/baseline
```

Expected: exit code 0. `$SCRATCH/baseline/index.html` exists.

- [ ] **Step 2: Verify the current hardcoded logo (the "failing test")**

```bash
grep -c 'loraine<span' $SCRATCH/baseline/index.html
```

Expected: `1` (the logo is a hardcoded literal; after our change it must still render as `loraine` but come from the title).

- [ ] **Step 3: Replace the hardcoded logo**

In `themes/indigo-night/layouts/partials/header.html`, replace line 2:

```html
  <a href="/" class="font-display font-bold text-lg no-underline" style="color:var(--heading)">loraine<span style="color:var(--accent)">.</span></a>
```

with:

```html
  {{ $logo := site.Params.logoText | default (lower (index (split site.Title " ") 0)) }}
  <a href="/" class="font-display font-bold text-lg no-underline" style="color:var(--heading)">{{ $logo }}<span style="color:var(--accent)">.</span></a>
```

(`site.Title` is "Loraine Monteagudo", so the default yields `loraine`. The `href` stays `/` for now; Task 3 genericizes URLs.)

- [ ] **Step 4: Rebuild and verify identical output**

```bash
cd /mnt/Data/work/portfolio
hugo --minify --quiet --destination $SCRATCH/task1
grep -c 'loraine<span' $SCRATCH/task1/index.html
diff -r $SCRATCH/baseline $SCRATCH/task1 | head -50
```

Expected: grep prints `1`; diff prints nothing (or whitespace-only hunks). Any text/attribute change is a failure.

- [ ] **Step 5: Commit**

```bash
git add themes/indigo-night/layouts/partials/header.html
git commit -m "Derive nav logo from site title with logoText override"
```

---

### Task 2: Move all UI strings to theme i18n

**Files:**
- Create: `themes/indigo-night/i18n/en.toml`
- Modify: `themes/indigo-night/layouts/partials/header.html`
- Modify: `themes/indigo-night/layouts/partials/footer.html`
- Modify: `themes/indigo-night/layouts/partials/hero.html`
- Modify: `themes/indigo-night/layouts/partials/experience.html`
- Modify: `themes/indigo-night/layouts/partials/experience-item.html`
- Modify: `themes/indigo-night/layouts/partials/featured-projects.html`
- Modify: `themes/indigo-night/layouts/partials/skills.html`
- Modify: `themes/indigo-night/layouts/partials/education.html`
- Modify: `themes/indigo-night/layouts/partials/journey.html`
- Modify: `themes/indigo-night/layouts/page.html`
- Modify: `themes/indigo-night/layouts/section.html`
- Modify: `themes/indigo-night/layouts/taxonomy.html`
- Modify: `themes/indigo-night/layouts/term.html`

**Interfaces:**
- Produces: i18n keys listed in Step 1; later tasks (3) write template code that calls `T` with these exact key names.

- [ ] **Step 1: Create `themes/indigo-night/i18n/en.toml`**

```toml
[nav_experience]
other = "Experience"

[nav_projects]
other = "Projects"

[nav_skills]
other = "Skills"

[nav_education]
other = "Education"

[download_cv]
other = "Download CV"

[toggle_theme]
other = "Toggle color theme"

[section_experience]
other = "Experience"

[section_featured_projects]
other = "Featured projects"

[all_projects]
other = "All {{ .Count }} →"

[section_skills]
other = "Tools I work with"

[all_skills]
other = "All skills →"

[section_education]
other = "Education & achievements"

[certifications]
other = "CERTIFICATIONS"

[publications]
other = "PUBLICATIONS"

[achievements]
other = "ACHIEVEMENTS"

[gpa]
other = "GPA"

[present]
other = "present"

[now]
other = "now"

[yr]
one = "yr"
other = "yrs"

[mo]
one = "mo"
other = "mos"

[email]
other = "Email"

[github]
other = "GitHub"

[linkedin]
other = "LinkedIn"

[view_on_github]
other = "View on GitHub"

[facts]
other = "FACTS"

[stack]
other = "STACK"

[links]
other = "LINKS"

[category]
other = "Category"

[source_link]
other = "Source ↗"

[prev]
other = "← prev"

[next]
other = "next →"

[skills_title]
other = "Skills"

[where_used]
other = "Where I've used it:"

[experience_heading]
other = "EXPERIENCE"

[projects_heading]
other = "PROJECTS"

[filter_all]
other = "all"
```

- [ ] **Step 2: Swap strings in `header.html`**

Replace the four nav links, the CV button text, and the toggle aria-label:

```html
    <a class="no-underline font-medium" style="color:var(--muted)" href="/#experience">{{ T "nav_experience" }}</a>
    <a class="no-underline font-medium" style="color:var(--muted)" href="/projects/">{{ T "nav_projects" }}</a>
    <a class="no-underline font-medium" style="color:var(--muted)" href="/#skills">{{ T "nav_skills" }}</a>
    <a class="no-underline font-medium" style="color:var(--muted)" href="/#education">{{ T "nav_education" }}</a>
    {{ with site.Params.cvPath }}<a class="btn-solid" href="/{{ . }}" download>{{ T "download_cv" }}</a>{{ end }}
    <button id="theme-toggle" aria-label="{{ T "toggle_theme" }}" aria-pressed="false" class="chip cursor-pointer">◐</button>
```

- [ ] **Step 3: Swap strings in `footer.html`**

The three link labels become:

```html
    {{ with site.Params.social.github }}<a style="color:var(--accent)" class="no-underline" href="{{ . }}">{{ T "github" }}</a>{{ end }}
    {{ with site.Params.social.linkedin }}<a style="color:var(--accent)" class="no-underline" href="{{ . }}">{{ T "linkedin" }}</a>{{ end }}
    {{ with site.Params.social.email }}<a style="color:var(--accent)" class="no-underline" href="mailto:{{ . }}">{{ T "email" }}</a>{{ end }}
```

- [ ] **Step 4: Swap strings in `hero.html`**

The three chip labels: `Email` becomes `{{ T "email" }}`, `GitHub` becomes `{{ T "github" }}`, `LinkedIn` becomes `{{ T "linkedin" }}` (the text node after each `<svg>`, inside the three `<a class="chip ...">` elements).

- [ ] **Step 5: Swap strings in `experience.html`**

```html
    <h2 class="font-display text-3xl font-bold" style="color:var(--heading)">{{ T "section_experience" }}</h2>
```

- [ ] **Step 6: Swap strings in `experience-item.html`**

Replace the duration computation block (lines 6-9 of the current file):

```html
  {{ $dur := "" }}
  {{ if gt $yrs 0 }}{{ $dur = printf "%d %s" $yrs (T "yr" $yrs) }}{{ end }}
  {{ if gt $mos 0 }}{{ $dur = trim (printf "%s %d %s" $dur $mos (T "mo" $mos)) " " }}{{ end }}
  {{ if eq $dur "" }}{{ $dur = printf "1 %s" (T "mo" 1) }}{{ end }}
```

And in the date line, replace `present` with `{{ T "present" }}`:

```html
    {{ .Params.startDate | time.Format "2006.01" }} - {{ with .Params.endDate }}{{ . | time.Format "2006.01" }}{{ else }}{{ T "present" }}{{ end }}<span style="color:var(--muted)"> · {{ $dur }}</span>
```

- [ ] **Step 7: Swap strings in `featured-projects.html`**

```html
    <h2 class="font-display text-3xl font-bold" style="color:var(--heading)">{{ T "section_featured_projects" }}</h2>
    <div class="flex-1 h-px" style="background:var(--border)"></div>
    <a class="text-sm no-underline" style="color:var(--accent)" href="/projects/">{{ T "all_projects" (dict "Count" (len (where site.RegularPages "Section" "projects"))) }}</a>
```

- [ ] **Step 8: Swap strings in `skills.html`**

```html
    <h2 class="font-display text-3xl font-bold" style="color:var(--heading)">{{ T "section_skills" }}</h2>
    <div class="flex-1 h-px" style="background:var(--border)"></div>
    <a class="text-sm no-underline" style="color:var(--accent)" href="/skills/">{{ T "all_skills" }}</a>
```

- [ ] **Step 9: Swap strings in `education.html`**

- `Education &amp; achievements` heading becomes `{{ T "section_education" }}` (Hugo HTML-escapes the `&` automatically, output stays `Education &amp; achievements`).
- `CERTIFICATIONS` becomes `{{ T "certifications" }}`, `PUBLICATIONS` becomes `{{ T "publications" }}`, `ACHIEVEMENTS` becomes `{{ T "achievements" }}`.
- The GPA line becomes:

```html
        <p class="font-mono text-xs mt-1" style="color:var(--muted)">{{ .years }} · {{ T "gpa" }} {{ .gpa }}</p>
```

- [ ] **Step 10: Swap strings in `journey.html`**

Replace `{{ $end := "now" }}` with `{{ $end := T "now" }}`.

- [ ] **Step 11: Swap strings in `page.html`**

- `View on GitHub` becomes `{{ T "view_on_github" }}`
- `FACTS` becomes `{{ T "facts" }}`, `STACK` becomes `{{ T "stack" }}`, `LINKS` becomes `{{ T "links" }}`
- `<b>Category</b>` becomes `<b>{{ T "category" }}</b>`
- `Source ↗` becomes `{{ T "source_link" }}`
- `← prev` becomes `{{ T "prev" }}`, `next →` becomes `{{ T "next" }}`

- [ ] **Step 12: Swap strings in `section.html`, `taxonomy.html`, `term.html`**

- `section.html`: the all-filter button text `all` becomes `{{ T "filter_all" }}`:

```html
    <button class="chip font-mono text-xs cursor-pointer on" data-filter="all">{{ T "filter_all" }}</button>
```

(the `data-filter="all"` attribute stays literal; `filter.js` matches on it.)
- `taxonomy.html`: `Skills` h1 becomes `{{ T "skills_title" }}`.
- `term.html`: `Where I've used it:` becomes `{{ T "where_used" }}`; `EXPERIENCE` becomes `{{ T "experience_heading" }}`; `PROJECTS` becomes `{{ T "projects_heading" }}`.

- [ ] **Step 13: Rebuild and verify identical output**

```bash
cd /mnt/Data/work/portfolio
hugo --minify --quiet --destination $SCRATCH/task2
diff -r $SCRATCH/baseline $SCRATCH/task2 | head -50
```

Expected: no output (or whitespace-only). Pay attention to a project detail page (e.g. `$SCRATCH/task2/projects/claude-sync/index.html`) and one skill term page; text must be unchanged.

- [ ] **Step 14: Commit**

```bash
git add themes/indigo-night/i18n/en.toml themes/indigo-night/layouts
git commit -m "Move theme UI strings to i18n"
```

---

### Task 3: Graceful degradation and URL genericization

**Files:**
- Modify: `themes/indigo-night/layouts/partials/header.html`
- Modify: `themes/indigo-night/layouts/partials/head.html`
- Modify: `themes/indigo-night/layouts/partials/hero.html`
- Modify: `themes/indigo-night/layouts/partials/education.html`
- Modify: `themes/indigo-night/layouts/partials/skills.html`
- Modify: `themes/indigo-night/layouts/partials/experience.html`
- Modify: `themes/indigo-night/layouts/partials/featured-projects.html`
- Modify: `themes/indigo-night/layouts/page.html`
- Modify: `themes/indigo-night/layouts/section.html`
- Modify: `themes/indigo-night/layouts/term.html`
- Create: `$SCRATCH/bare-site/` (throwaway test site, never committed)

**Interfaces:**
- Consumes: i18n keys from Task 2 (exact names as listed there).
- Produces: a theme that builds a bare site with zero params, zero data files, zero content. Also the bare test site at `$SCRATCH/bare-site`, reused by Task 4.

- [ ] **Step 1: Create the bare test site (the "failing test")**

```bash
BARE=$SCRATCH/bare-site
mkdir -p $BARE/assets $BARE/content
ln -s /mnt/Data/work/portfolio/node_modules $BARE/node_modules
cp /mnt/Data/work/portfolio/package.json $BARE/package.json
cat > $BARE/hugo.toml <<'EOF'
baseURL = "https://example.org/"
languageCode = "en-us"
title = "Jane Doe"
theme = "indigo-night"
themesDir = "/mnt/Data/work/portfolio/themes"

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
EOF
cd $BARE && hugo --quiet --destination $BARE/public; echo "exit: $?"
```

Expected NOW (before the fixes): non-zero exit with a template error such as `can't evaluate field eyebrow in type interface {}` (from `site.Params.hero.eyebrow` on a missing `hero` param). This failure is the point; the rest of the task makes this build pass.

- [ ] **Step 2: Genericize `header.html`**

Full new content:

```html
{{ $logo := site.Params.logoText | default (lower (index (split site.Title " ") 0)) }}
<header class="wrap flex items-center justify-between py-6">
  <a href="{{ site.Home.RelPermalink }}" class="font-display font-bold text-lg no-underline" style="color:var(--heading)">{{ $logo }}<span style="color:var(--accent)">.</span></a>
  <nav class="flex items-center gap-6 text-sm">
    {{ if where site.RegularPages "Section" "experience" }}<a class="no-underline font-medium" style="color:var(--muted)" href="{{ site.Home.RelPermalink }}#experience">{{ T "nav_experience" }}</a>{{ end }}
    {{ with site.GetPage "/projects" }}{{ if .RegularPages }}<a class="no-underline font-medium" style="color:var(--muted)" href="{{ .RelPermalink }}">{{ T "nav_projects" }}</a>{{ end }}{{ end }}
    {{ if site.Data.skills }}<a class="no-underline font-medium" style="color:var(--muted)" href="{{ site.Home.RelPermalink }}#skills">{{ T "nav_skills" }}</a>{{ end }}
    {{ if or site.Data.education site.Data.achievements }}<a class="no-underline font-medium" style="color:var(--muted)" href="{{ site.Home.RelPermalink }}#education">{{ T "nav_education" }}</a>{{ end }}
    {{ with site.Params.cvPath }}<a class="btn-solid" href="{{ . | relURL }}" download>{{ T "download_cv" }}</a>{{ end }}
    <button id="theme-toggle" aria-label="{{ T "toggle_theme" }}" aria-pressed="false" class="chip cursor-pointer">◐</button>
  </nav>
</header>
```

(For Loraine's site every condition is true and `site.Home.RelPermalink` is `/`, so output is unchanged. `relURL` on `cvPath` renders `/files/x.pdf` exactly as the old `/{{ . }}` did.)

- [ ] **Step 3: Guard `head.html` title/description and genericize font URLs**

Replace the title and description lines with:

```html
<title>{{ if .IsHome }}{{ site.Title }}{{ with site.Params.tagline }} · {{ . }}{{ end }}{{ else }}{{ .Title }} · {{ site.Title }}{{ end }}</title>
{{ with .Description | default site.Params.tagline }}<meta name="description" content="{{ . }}">{{ end }}
```

Replace the three font preload links with:

```html
<link rel="preload" as="font" type="font/woff2" crossorigin href="{{ "fonts/space-grotesk-v22-latin-700.woff2" | relURL }}">
<link rel="preload" as="font" type="font/woff2" crossorigin href="{{ "fonts/inter-v20-latin-regular.woff2" | relURL }}">
<link rel="preload" as="font" type="font/woff2" crossorigin href="{{ "fonts/jetbrains-mono-v24-latin-regular.woff2" | relURL }}">
```

- [ ] **Step 4: Guard `hero.html`**

Full new content for the top section (everything before the chips `div` stays structurally the same, with guards added), and the stats strip wrapped:

```html
{{ $hero := site.Params.hero | default dict }}
<section class="wrap relative pt-20 pb-16 overflow-hidden reveal">
  {{ partial "journey.html" . }}
  {{ if or $hero.eyebrow site.Params.location }}
  <p class="eyebrow mb-4">{{ $hero.eyebrow }}{{ with site.Params.location }}{{ if $hero.eyebrow }} · {{ end }}{{ . }}{{ end }}</p>
  {{ end }}
  <h1 class="font-display font-bold text-5xl md:text-7xl tracking-tight leading-[1.02] max-w-[12ch]" style="color:var(--heading)">
    {{ replaceRE `\*([^*]+)\*` `<span class="grad-text">$1</span>` ($hero.headline | default site.Title) | safeHTML }}
  </h1>
  {{ with $hero.intro }}
  <p class="hero-intro mt-5 text-lg leading-relaxed max-w-[52ch]" style="color:var(--muted)">
    {{ . | markdownify }}
  </p>
  {{ end }}
  <div class="mt-8 flex gap-3 flex-wrap">
```

(The three social chips keep their existing `{{ with site.Params.social.* }}` guards, which already handle absence; but `site.Params.social` itself may be nil, and chained access on nil errors. Change each to use a local: add `{{ $social := site.Params.social | default dict }}` right after the `$hero` line, then use `{{ with $social.email }}`, `{{ with $social.github }}`, `{{ with $social.linkedin }}` for the chips.)

Wrap the stats strip (the final `div.wrap` in the file):

```html
{{ with site.Data.stats }}
<div class="wrap flex flex-wrap gap-12 py-6" style="border-top:1px solid var(--border); border-bottom:1px solid var(--border)">
  {{ range . }}
  {{ $value := .value }}
  {{ if eq .count "projects" }}{{ $value = len (where site.RegularPages "Section" "projects") }}{{ end }}
  {{ if eq .count "skills" }}{{ $n := 0 }}{{ range site.Data.skills }}{{ $n = add $n (len .items) }}{{ end }}{{ $value = printf "%d+" $n }}{{ end }}
  <div><b class="font-display text-2xl block" style="color:var(--heading)">{{ $value }}</b>
  <span class="text-[13px]" style="color:var(--muted)">{{ .label }}</span></div>
  {{ end }}
</div>
{{ end }}
```

Apply the same `$social` treatment in `footer.html`: add `{{ $social := site.Params.social | default dict }}` as the first line and change the three `{{ with site.Params.social.* }}` to `{{ with $social.* }}`.

- [ ] **Step 5: Guard `education.html`**

Full new content:

```html
{{ $edu := site.Data.education | default dict }}
{{ $ach := site.Data.achievements | default slice }}
{{ if or $edu.degree $edu.certifications $edu.publications $ach }}
<section id="education" class="wrap pt-16 reveal">
  <div class="flex items-baseline gap-4 mb-8">
    <h2 class="font-display text-3xl font-bold" style="color:var(--heading)">{{ T "section_education" }}</h2>
    <div class="flex-1 h-px" style="background:var(--border)"></div>
  </div>
  <div class="grid gap-10 md:grid-cols-2">
    {{ if or $edu.degree $edu.certifications $edu.publications }}
    <div>
      {{ with $edu.degree }}
      <div class="card mb-6">
        <h3 class="font-semibold" style="color:var(--heading)">{{ .title }}</h3>
        <p class="font-mono text-xs mt-1" style="color:var(--accent)">{{ .institution }}</p>
        <p class="font-mono text-xs mt-1" style="color:var(--muted)">{{ .years }}{{ with .gpa }} · {{ T "gpa" }} {{ . }}{{ end }}</p>
        {{ with .note }}<p class="text-sm mt-2" style="color:var(--muted)">{{ . }}</p>{{ end }}
      </div>
      {{ end }}
      {{ with $edu.certifications }}
      <p class="eyebrow mb-3">{{ T "certifications" }}</p>
      <ul class="list-none space-y-2 mb-6">
        {{ range . }}
        <li><span class="text-sm font-semibold" style="color:var(--text)">{{ if .url }}<a href="{{ .url }}" style="color:var(--accent)" class="no-underline">{{ .name }} ↗</a>{{ else }}{{ .name }}{{ end }}</span>
        <span class="text-sm block" style="color:var(--muted)">{{ .issuer }} · {{ .year }}</span></li>
        {{ end }}
      </ul>
      {{ end }}
      {{ with $edu.publications }}
      <p class="eyebrow mb-3">{{ T "publications" }}</p>
      <ul class="list-none space-y-2">
        {{ range . }}<li class="text-sm italic" style="color:var(--muted)">{{ if .url }}<a href="{{ .url }}" class="no-underline" style="color:var(--accent)">{{ .name }} ↗</a>{{ else }}{{ .name }}{{ end }}</li>{{ end }}
      </ul>
      {{ end }}
    </div>
    {{ end }}
    {{ with $ach }}
    <div>
      <p class="eyebrow mb-3">{{ T "achievements" }}</p>
      <ul class="list-none space-y-3">
        {{ range . }}
        <li><span class="text-sm font-semibold" style="color:var(--text)">{{ if .url }}<a href="{{ .url }}" style="color:var(--accent)" class="no-underline">{{ .title }}</a>{{ else }}{{ .title }}{{ end }}</span>
        <span class="text-sm block" style="color:var(--muted)">{{ .event }}</span></li>
        {{ end }}
      </ul>
    </div>
    {{ end }}
  </div>
</section>
{{ end }}
```

Note: the degree card gains `with` guards on `.gpa` and `.note`. For Loraine's data both are set, so output is unchanged.

- [ ] **Step 6: Guard `skills.html`, `experience.html`, `featured-projects.html`**

`skills.html` full new content:

```html
{{ with site.Data.skills }}
<section id="skills" class="wrap pt-16 reveal">
  <div class="flex items-baseline gap-4 mb-8">
    <h2 class="font-display text-3xl font-bold" style="color:var(--heading)">{{ T "section_skills" }}</h2>
    <div class="flex-1 h-px" style="background:var(--border)"></div>
    {{ with site.GetPage "/skills" }}<a class="text-sm no-underline" style="color:var(--accent)" href="{{ .RelPermalink }}">{{ T "all_skills" }}</a>{{ end }}
  </div>
  {{ range . }}
  <p class="eyebrow mt-6 mb-3">{{ upper .group }}</p>
  <div class="flex gap-2.5 flex-wrap">
    {{ range .items }}
      {{ $s := . }}
      {{ with index site.Taxonomies.skills (lower .) }}
        <a class="chip" href="{{ .Page.RelPermalink }}">{{ $s }}</a>
      {{ else }}
        <span class="chip" style="opacity:.6">{{ $s }}</span>
      {{ end }}
    {{ end }}
  </div>
  {{ end }}
</section>
{{ end }}
```

`experience.html`: wrap the `<section>` in `{{ if $roles }}` ... `{{ end }}` (after the existing three variable assignments at the top; the closing `{{ end }}` goes after `</section>`).

`featured-projects.html` full new content:

```html
{{ $projects := where site.RegularPages "Section" "projects" }}
{{ $featured := where $projects "Params.featured" true }}
{{ if $featured }}
<section class="wrap pt-16 reveal">
  <div class="flex items-baseline gap-4 mb-8">
    <h2 class="font-display text-3xl font-bold" style="color:var(--heading)">{{ T "section_featured_projects" }}</h2>
    <div class="flex-1 h-px" style="background:var(--border)"></div>
    {{ with site.GetPage "/projects" }}<a class="text-sm no-underline" style="color:var(--accent)" href="{{ .RelPermalink }}">{{ T "all_projects" (dict "Count" (len $projects)) }}</a>{{ end }}
  </div>
  <div class="grid gap-4" style="grid-template-columns:repeat(auto-fit,minmax(280px,1fr))">
    {{ range $featured.ByWeight }}{{ partial "project-card.html" . }}{{ end }}
  </div>
</section>
{{ end }}
```

- [ ] **Step 7: Genericize breadcrumbs and guard optional cards in `page.html`, `section.html`, `term.html`**

`page.html`:
- Breadcrumb line becomes:

```html
    <p class="font-mono text-[12.5px] mb-4" style="color:var(--muted)"><a href="{{ site.Home.RelPermalink }}" style="color:var(--accent)" class="no-underline">~</a> / <a href="{{ .Parent.RelPermalink }}" style="color:var(--accent)" class="no-underline">{{ lower .Parent.Title }}</a> / {{ .File.ContentBaseName }}</p>
```

- The FACTS card gains a guard so a page without `category` renders no empty card:

```html
    {{ with .Params.category }}<div class="card"><h4 class="eyebrow mb-3">{{ T "facts" }}</h4>
      <p class="text-sm" style="color:var(--text)"><b>{{ T "category" }}</b>: {{ . }}</p></div>{{ end }}
```

- The STACK card gains `{{ with .Params.skills }}` around it (the existing `range .Params.skills` moves inside as `range .`):

```html
    {{ with .Params.skills }}<div class="card"><h4 class="eyebrow mb-3">{{ T "stack" }}</h4>
      <div class="flex gap-2 flex-wrap">{{ range . }}{{ with index site.Taxonomies.skills (lower .) }}<a class="tag" href="{{ .Page.RelPermalink }}">{{ .Page.Title }}</a>{{ else }}<span class="tag">{{ . }}</span>{{ end }}{{ end }}</div></div>{{ end }}
```

`section.html`:
- Breadcrumb `~` link: `href="{{ site.Home.RelPermalink }}"`.
- Description paragraph guarded: `{{ with .Description }}<p class="mt-3 max-w-[56ch] leading-relaxed" style="color:var(--muted)">{{ . }}</p>{{ end }}`.

`term.html`:
- Breadcrumb becomes:

```html
    <p class="font-mono text-[12.5px] mb-4" style="color:var(--muted)"><a href="{{ site.Home.RelPermalink }}" style="color:var(--accent)" class="no-underline">~</a> / <a href="{{ .Parent.RelPermalink }}" style="color:var(--accent)" class="no-underline">{{ lower .Parent.Title }}</a> / {{ lower .Title }}</p>
```

- [ ] **Step 8: Verify Loraine's site is unchanged**

```bash
cd /mnt/Data/work/portfolio
hugo --minify --quiet --destination $SCRATCH/task3
diff -r $SCRATCH/baseline $SCRATCH/task3 | head -80
```

Expected: no output (or whitespace-only). Check specifically that `index.html`, one project page, one term page, and `projects/index.html` show no text or href changes.

- [ ] **Step 9: Verify the bare site now builds**

```bash
cd $SCRATCH/bare-site && hugo --quiet --destination public; echo "exit: $?"
grep -o 'jane<span' public/index.html
grep -c '#skills' public/index.html || echo "no skills anchor (correct)"
grep -o '<h1[^>]*>[^<]*Jane Doe' public/index.html
```

Expected: exit 0; `jane<span` found (logo derived from "Jane Doe"); no `#skills` anchor; hero h1 contains "Jane Doe" (headline falls back to site title).

- [ ] **Step 10: Commit**

```bash
cd /mnt/Data/work/portfolio
git add themes/indigo-night/layouts
git commit -m "Make theme render cleanly without site data, params, or content"
```

---

### Task 4: Configurable accent color

**Files:**
- Modify: `themes/indigo-night/layouts/partials/head.html`

**Interfaces:**
- Consumes: bare test site at `$SCRATCH/bare-site` from Task 3.
- Produces: new optional site param `accentColor` (any CSS color value, e.g. `"#e11d48"`).

- [ ] **Step 1: Add the override block to `head.html`**

Append after the closing `{{ end }}` of the `resources.Get "css/main.css"` block (end of file):

```html
{{ with site.Params.accentColor }}
{{ $c := . | safeCSS }}
<style>
  html[data-theme="dark"] {
    --accent: {{ $c }};
    --accent-deep: oklch(from {{ $c }} calc(l - 0.17) calc(c * 1.4) h);
    --accent-hover: oklch(from {{ $c }} calc(l - 0.10) calc(c * 1.25) h);
    --violet: oklch(from {{ $c }} calc(l + 0.08) calc(c * 0.85) calc(h + 25));
  }
  html[data-theme="light"] {
    --accent: oklch(from {{ $c }} calc(l - 0.17) calc(c * 1.4) h);
    --accent-deep: oklch(from {{ $c }} calc(l - 0.17) calc(c * 1.4) h);
    --accent-hover: oklch(from {{ $c }} calc(l - 0.10) calc(c * 1.25) h);
    --violet: oklch(from {{ $c }} calc(l - 0.05) c calc(h + 25));
  }
</style>
{{ end }}
```

Rationale for the numbers: in the stock palette, dark-mode `--accent-deep` (#4f46e5) sits about 0.17 OKLCH lightness below `--accent` (#818cf8) with higher chroma, `--accent-hover` (#6366f1) about 0.10 below, and `--violet` (#bb9af7) is lighter, softer, and hue-rotated toward purple. Light mode reuses the deep shade as its accent, mirroring the stock relationship where light `--accent` equals dark `--accent-deep`. The chroma multipliers may push saturated inputs out of gamut; browsers gamut-map oklch() automatically, so this is safe.

- [ ] **Step 2: Verify no change when the param is unset**

```bash
cd /mnt/Data/work/portfolio
hugo --minify --quiet --destination $SCRATCH/task4
diff -r $SCRATCH/baseline $SCRATCH/task4 | head -20
grep -c 'oklch' $SCRATCH/task4/index.html || echo "no override emitted (correct)"
```

Expected: diff empty (or whitespace-only); no `oklch` in the output because `accentColor` is not set for this site.

- [ ] **Step 3: Verify the override on the bare site**

Append to `$SCRATCH/bare-site/hugo.toml` (the file has no `[params]` table yet):

```toml

[params]
  accentColor = "#e11d48"
```

Then:

```bash
cd $SCRATCH/bare-site && hugo --quiet --destination public; echo "exit: $?"
grep -o -- '--accent: #e11d48' public/index.html
grep -o 'oklch(from #e11d48' public/index.html | wc -l
```

Expected: exit 0; `--accent: #e11d48` present once; `oklch(from #e11d48` count is `7` (3 derived values in the dark block: accent-deep, accent-hover, violet; 4 in the light block: accent, accent-deep, accent-hover, violet).

- [ ] **Step 4: Visual spot check (dark and light)**

```bash
cd $SCRATCH/bare-site && hugo server --port 1414 &
```

Open `http://localhost:1414/`, confirm the logo dot, eyebrow text, and chips render in crimson tones instead of indigo; click the ◐ toggle and confirm light mode also uses crimson-derived colors. Kill the server afterwards.

- [ ] **Step 5: Commit**

```bash
cd /mnt/Data/work/portfolio
git add themes/indigo-night/layouts/partials/head.html
git commit -m "Add accentColor param with OKLCH-derived shades"
```

---

### Task 5: Theme metadata, LICENSE, README

**Files:**
- Modify: `themes/indigo-night/theme.toml`
- Create: `themes/indigo-night/LICENSE`
- Create: `themes/indigo-night/README.md`

**Interfaces:**
- Consumes: param and data-file conventions established in Tasks 1-4 (documented verbatim in the README).
- Produces: documentation contract for any consuming site.

- [ ] **Step 1: Flesh out `theme.toml`**

```toml
name = "Indigo Night"
license = "MIT"
licenselink = "https://github.com/lorainemg/portfolio/blob/main/themes/indigo-night/LICENSE"
description = "Dark indigo editor-theme portfolio for developers. Skills taxonomy links roles and projects."
homepage = "https://github.com/lorainemg/portfolio"
demosite = "https://lorainemg.github.io/"
tags = ["portfolio", "personal", "dark", "light", "responsive", "tailwind", "taxonomy"]
features = ["dark mode", "light mode", "skills taxonomy", "custom accent color", "i18n", "project filtering"]
min_version = "0.148.0"

[author]
  name = "Loraine Monteagudo"
  homepage = "https://github.com/lorainemg"
```

- [ ] **Step 2: Create `themes/indigo-night/LICENSE`**

Exact content:

```
MIT License

Copyright (c) 2026 Loraine Monteagudo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

- [ ] **Step 3: Create `themes/indigo-night/README.md`**

```markdown
# Indigo Night

A dark (and light) indigo, editor-inspired Hugo portfolio theme for developers.
Experience, projects, and skills are linked through a Hugo taxonomy, so every
skill chip leads to a page listing the roles and projects that used it.

## Features

- Dark and light mode with a persistent toggle
- Configurable accent color: one parameter, all shades derived automatically
- Skills taxonomy connecting experience entries and project pages
- Featured projects grid and filterable project index
- Timeline "journey" graphic generated from your experience entries
- All UI strings overridable via i18n
- Tailwind CSS 4, self-hosted fonts, no external requests

## Requirements

- Hugo >= 0.148.0 (extended not required)
- Node.js with the `tailwindcss` and `@tailwindcss/cli` packages installed in
  the site root (`npm install tailwindcss @tailwindcss/cli`)

## Installation

Copy or submodule this theme into `themes/indigo-night`, then set
`theme = "indigo-night"` in your `hugo.toml`.

## Required site configuration

The theme's stylesheet is built with Tailwind CSS 4, which scans
`hugo_stats.json` for used classes. Your site's `hugo.toml` MUST include:

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

Create an empty `assets/` directory in your site root if it does not exist.

## Parameters

All parameters are optional. Sections whose data is missing are simply not
rendered, and their nav links disappear with them.

    title = "Jane Doe"                # used for the hero fallback and logo

    [params]
      logoText = "jane"               # nav logo text; default: first word of
                                      # title, lowercased. The theme appends
                                      # an accent-colored dot.
      tagline = "..."                 # home <title> suffix and meta description
      location = "City, Country"      # shown next to the hero eyebrow
      cvPath = "files/cv.pdf"         # relative to static/; enables the
                                      # Download CV button
      accentColor = "#e11d48"         # any CSS color; replaces the indigo
                                      # accent. Hover/button/gradient shades
                                      # are derived automatically in OKLCH.

      [params.hero]
        eyebrow = "// your tagline"
        headline = "I build the *whole* product."   # *word* gets a gradient
        intro = "Markdown **allowed** here."

      [params.social]
        github = "https://github.com/you"
        linkedin = "https://www.linkedin.com/in/you"
        email = "you@example.org"

## Content

    content/
      experience/       # one file per role
      projects/         # one file per project

Experience front matter:

    ---
    title: Software Engineer
    company: Acme Corp
    website: https://acme.example      # optional, links the company name
    startDate: 2023-04-01
    endDate: 2025-01-31                # omit for a current role
    location: Remote                   # optional
    workMode: remote                   # optional
    employmentType: full-time          # optional
    skills: [Python, PostgreSQL]       # taxonomy terms
    softSkills: [Mentoring]            # rendered as non-linked tags
    ---
    - Bullet points become the role description.

Project front matter:

    ---
    title: My Project
    description: One-line summary shown on the card.
    category: web-apps                 # filter group on the projects page
    featured: true                     # include in the home page grid
    weight: 10                         # ordering (lower first)
    github: https://github.com/you/x   # optional
    skills: [TypeScript, Svelte]       # taxonomy terms
    links:                             # optional extra links
      - name: Live demo
        url: https://example.org
    ---
    Long-form write-up in Markdown (optional).

Give both sections an `_index.md` with a `title` and `description`.

## Data files

All four are optional; each drives one home-page block.

`data/skills.yaml` (the "Tools I work with" section):

    - group: Languages
      items: [Python, TypeScript]
    - group: Frontend
      items: [Svelte, React]

`data/education.yaml`:

    degree:
      title: BSc. Computer Science
      institution: Some University
      years: 2016-2021
      gpa: 4.8 / 5          # optional
      note: Extra detail.   # optional
    certifications:
      - name: Cert name
        issuer: Issuer
        year: 2022
        url: https://...    # optional
    publications:
      - name: Paper title
        url: https://...    # optional

`data/achievements.yaml`:

    - title: Silver Award
      event: Some conference, 2019
      url: https://...      # optional

`data/stats.yaml` (the strip under the hero):

    - value: "6+"
      label: years of experience
    - count: projects       # auto-counts content/projects/
      label: projects built
    - count: skills         # auto-counts items in data/skills.yaml
      label: technologies worked with

## Overriding UI strings

Copy any key from `themes/indigo-night/i18n/en.toml` into your site's
`i18n/en.toml` and change its value. Add other language files the same way.

## License

MIT. See LICENSE.
```

- [ ] **Step 4: Verify the build still passes and docs render nothing**

```bash
cd /mnt/Data/work/portfolio
hugo --minify --quiet --destination $SCRATCH/task5
diff -r $SCRATCH/baseline $SCRATCH/task5 | head -20
```

Expected: no output (README/LICENSE/theme.toml do not affect rendering).

- [ ] **Step 5: Commit**

```bash
git add themes/indigo-night/theme.toml themes/indigo-night/LICENSE themes/indigo-night/README.md
git commit -m "Add theme metadata, license, and usage documentation"
```

---

## Final verification (after all tasks)

- [ ] Full-run check, in order:

```bash
cd /mnt/Data/work/portfolio
hugo --minify --quiet --destination $SCRATCH/final
diff -r $SCRATCH/baseline $SCRATCH/final | head -20          # expect empty/whitespace-only
grep -rni "loraine\|monteagudo" themes/indigo-night/ --include="*.html" --include="*.toml" | grep -v "theme.toml\|README.md\|LICENSE"   # expect no matches
cd $SCRATCH/bare-site && hugo --quiet --destination public && echo BARE-OK
```

Expected: baseline diff clean; the only remaining occurrences of the author's name inside the theme are authorship metadata (theme.toml, LICENSE, README); bare site builds.
