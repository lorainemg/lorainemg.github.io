---
name: add-project
description: Use when adding a new project page to this portfolio (e.g. "add this repo to my projects"), repositioning a project, or when a project's skills are missing or unlinked on the homepage skills section.
---

# Add a Project

## Overview

One markdown file in `content/projects/` drives three surfaces at once: the
projects grid (ordered by `weight`), the homepage featured strip
(`featured: true`, ordered by `weight`), and the skills system. Most mistakes
come from treating the frontmatter as free-form when two fields — `skills`
and `weight` — have site-wide invariants.

## Steps

1. **Gather material.** `gh repo view <repo> --json description,languages`
   and `gh api repos/<owner>/<repo>/readme --jq .content | base64 -d`.

2. **Reuse exact skill names.** Before writing `skills:`, list every name
   already in use:

   ```bash
   grep -h '^skills:' content/projects/*.md content/experience/*.md \
     | tr -d '[]' | sed 's/^skills: //' | tr ',' '\n' \
     | sed 's/^ *//;s/ *$//' | sort -u
   ```

   A close-but-different name (`Docker Compose` vs `Docker`, `Cloudflare
   Tunnel` vs `Cloudflare`) creates a separate one-project taxonomy term
   instead of joining the existing page. Prefer the established name; only
   introduce a new one for a genuinely new skill.

3. **Update `data/skills.yaml` for new skills.** The homepage skills section
   renders only names in this file, and a chip links only when the exact
   name (case-insensitive) also appears in some page's `skills:` frontmatter.
   Add each genuinely new skill to the fitting group, or it will never show
   on the homepage.

4. **Pick a category.** Reuse one from
   `grep -h '^category:' content/projects/*.md | sort -u` when it fits. A new
   value needs no registration — the filter chip and card eyebrow render from
   the raw string (`-` becomes `&`/`·`).

5. **Choose weight; keep weights unique and consecutive.** Weights run 1..N
   with no duplicates (duplicates make grid order nondeterministic). Lower =
   earlier. To insert at position W, bump every existing project with
   `weight >= W` by one — a small Python loop over `content/projects/*.md`
   rewriting the `^weight: (\d+)$` line, skipping `_index.md` and the new
   file. `featured: true` also puts the card on the homepage; ask or use
   judgment sparingly.

6. **Write the body in house style.** Frontmatter `description` is one
   quoted sentence, usually "What it is: expansion with concrete specifics."
   Body: 3–4 prose paragraphs hard-wrapped near 72 characters — what it is
   and does, then how it works, then the most interesting engineering
   detail — closing with one short personal or wry line. Never use the em
   dash character; check prose against Orwell's six rules. Cross-reference
   sibling projects when they genuinely relate.

7. **Verify.** Build and check the three surfaces:

   ```bash
   grep -h '^weight:' content/projects/*.md | sort -n -k2 | uniq -d  # expect empty
   hugo --quiet --destination /tmp/portfolio-check
   ls /tmp/portfolio-check/projects/<slug>/
   ls /tmp/portfolio-check/skills/ | grep <new-skill-slug>
   ```

Do not commit unless asked.

## Common Mistakes

| Mistake | Consequence |
|---|---|
| Skill name variant of an existing one | Split taxonomy term; orphan chip |
| New skill not added to `data/skills.yaml` | Skill absent from homepage |
| Duplicate or gap in weights | Unstable/odd grid ordering |
| Em dashes or unwrapped lines in body | Breaks house prose style |
| Skipping the hugo build | Frontmatter typos ship silently |
