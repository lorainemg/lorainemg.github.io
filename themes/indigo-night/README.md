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
