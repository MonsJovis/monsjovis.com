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

## Deployment

- **Main site:** GitHub Pages via `.github/workflows/deploy.yaml` on push to `main`
- **Chat API:** Google Cloud Functions via `.github/workflows/deploy-chat-api.yaml` on push to `main` (only when `chat-api/**` or `resume.json` changes)
- **Default branch:** `main`

## Environment Variables

- `NUXT_PUBLIC_CHAT_API_URL` — Chat API endpoint (injected at build time)
- Chat API secrets managed in Google Cloud Secret Manager: `ANTHROPIC_API_KEY`, `PERSONAL_CONTEXT`
