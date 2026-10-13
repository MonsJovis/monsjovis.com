# CLAUDE.md

## Project Overview

Personal portfolio website for Markus Aurich (Fractional CTO & CPO) with an AI-powered chat assistant. Static site deployed to GitHub Pages, chat API deployed as a Google Cloud Function.

## Tech Stack

- **Frontend:** Nuxt 4 (Vue 3), TypeScript, Tailwind CSS v4
- **UI Components:** shadcn-vue (via shadcn-nuxt + Reka UI)
- **Chat API:** Google Cloud Functions (Gen 2), Anthropic Claude SDK, Node.js 24
- **Package Manager:** npm

## Commands

```bash
# Frontend
npm run dev        # Start dev server
npm run build      # Production build
npm run generate   # Static site generation (used for deploy)
npm run preview    # Preview production build

# Chat API
cd chat-api
npm run dev        # Build + start local functions framework
npm run build      # TypeScript compilation only
```

## Project Structure

```
components/
  chats/           # AI chat widget (Button, Input, Message, Panel, Widget, etc.)
  sections/        # Homepage sections (Hero, Experience, Projects, Skills, etc.)
  ui/              # shadcn-vue primitives (badge, button, card, separator, sheet)
composables/       # Vue 3 composables (useAiChat, useCountUp, useResume, useScrollAnimation)
types/             # TypeScript interfaces (chat.ts, resume.ts)
lib/utils.ts       # cn() utility for Tailwind class merging
chat-api/src/      # Cloud Function entry point (index.ts)
resume.json        # Resume data (JSON Resume format) — single source of truth
```

## Conventions

- **Components:** `<script setup lang="ts">` with Composition API. PascalCase filenames.
- **Composables:** `use` prefix (e.g., `useAiChat`). Return reactive state and methods.
- **Styling:** Tailwind utility classes only. Use `cn()` for conditional class merging. OKLCH color variables for theming. Dark mode via `.dark` class (system preference default).
- **Types:** Explicit TypeScript interfaces for all data structures. Strict mode enabled.
- **No linter/formatter configured** — follow existing code style.
- **Avatar:** `public/avatar-<hash>.jpg` (1600x1600), named by the first 8 hex characters of its SHA-256, so a new picture gets a new URL and no cache keeps the old one. Next to it the hero serves `avatar-<hash>-{288,576,864}.webp` (`magick avatar-<hash>.jpg -resize 576x576 -strip -quality 80 avatar-<hash>-576.webp`, same for 288 and 864). The URL lives in `resume.json` only, `nuxt.config.ts` reads it from there and fails the build if one of the four files is missing. For a new picture: add the files, update `resume.json` and both `resume.*.json` in the `cv` repo. `avatar-300x300.jpg` stays as a copy of the current picture, because older pages link it directly (monsjovis.dev docs, Signivo signature templates).
- **Hero without entrance animation:** the hero is visible from the first paint. A fade-in from `opacity: 0` (JS or CSS) hides the LCP element, and Lighthouse then cannot measure the page at all (`NO_LCP`).

## SEO and GEO

- **`/llms.txt`** is the page as Markdown for AI systems, generated from `resume.json` and `lib/services.ts` by `server/routes/llms.txt.ts` and prerendered by `nuxt generate`. It follows the page by itself.
- **JSON-LD** (`ProfilePage` with `Person`) in `pages/index.vue` is built from `resume.json` as well.
- **`public/sitemap.xml` and `public/robots.txt`** are static. A new indexable page goes into the sitemap.
- **Metrics render their real numbers on the server.** Crawlers without JavaScript read "15+", not "0"; the count-up starts from 0 only in the browser.

## Deployment

- **Main site:** GitHub Pages via `.github/workflows/deploy.yaml` on push to `main`
- **Chat API:** Google Cloud Functions via `.github/workflows/deploy-chat-api.yaml` on push to `main` (only when `chat-api/**` or `resume.json` changes)
- **Default branch:** `main`

## Environment Variables

- `NUXT_PUBLIC_CHAT_API_URL` — Chat API endpoint (injected at build time)
- Chat API secrets managed in Google Cloud Secret Manager: `ANTHROPIC_API_KEY`, `PERSONAL_CONTEXT`
