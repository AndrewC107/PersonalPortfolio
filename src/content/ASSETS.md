# Assets Checklist (Phase 0)

This project expects a few static files in `public/`. Add these now (or later) so the site can reference them consistently.

## Required assets

- **`/public/headshot.jpg`**
  - Recommended: **800×800 or larger** (square works best)
  - Use a clean, centered portrait (face centered, minimal distractions)
- **`/public/resume.pdf`**
  - Keep it text-selectable if possible (better for accessibility/search)

## Optional assets

- **`/public/og-image.png`** (Open Graph preview)
  - Size: **1200×630**
  - Simple layout: name + headline + one visual accent
  - Meta reminder: this is referenced by `src/app/layout.tsx` for Open Graph + Twitter previews

## Project images (optional but recommended)

- **Folder**: `public/projects/` (referenced as `/projects/...` in code)
- **Recommended width**: **1200–1600px** (PNG or JPG)
- **Preferred aspect**: **16:9** (also supported: 4:3, 1:1)
- **Naming**: kebab-case (e.g., `secure-notes-vault.png`)

### Required for current Projects section

- **`/public/projects/bb84.png`**
- **`/public/projects/invisible-ink.png`**

## Certification badges

- **Folder**: `public/certs/` (referenced as `/certs/...` in code)
- **Recommended**: square or high-resolution badge images (the UI crops to a square tile)
- **Naming**: lowercase kebab-case filenames

### Expected filenames

- **`/public/certs/fortinet-certified-fundamentals.png`**
- **`/public/certs/isc2-cc-candidate.png`**
- **`/public/certs/aws-cloud-practitioner-candidate.png`**
- **`/public/certs/aws-ai-practitioner-candidate.png`**

## Cropping + composition notes (headshot)

- **Center the face** (eyes around the upper third)
- **Clean background** (solid/neutral preferred)
- Avoid harsh shadows; use even lighting
- Leave a little breathing room around the head (don’t crop too tight)

## Naming conventions

- Use **lowercase filenames** with hyphens if needed (e.g., `og-image.png`)
- Keep these names stable so links don’t break later

## Reminder (later phase)

We’ll wire these files into `next/image` (or equivalent) later for optimized loading and responsive sizing.


