# monsjovis.com

[![Deploy](https://github.com/MonsJovis/monsjovis.com/actions/workflows/deploy.yaml/badge.svg)](https://github.com/MonsJovis/monsjovis.com/actions/workflows/deploy.yaml)
[![Deploy Chat API](https://github.com/MonsJovis/monsjovis.com/actions/workflows/deploy-chat-api.yaml/badge.svg)](https://github.com/MonsJovis/monsjovis.com/actions/workflows/deploy-chat-api.yaml)
![Nuxt](https://img.shields.io/badge/Nuxt-4-00DC82?logo=nuxt.js)
![Vue](https://img.shields.io/badge/Vue-3-4FC08D?logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)

Portfolio website for **Markus Aurich** (Fractional CTO & CPO) with an AI-powered chat assistant.

**[monsjovis.com](https://monsjovis.com)**

## Features

- **Homepage sections** — Hero, Experience, Projects, Skills, and more
- **AI chat widget** — Ask questions about my background; powered by Claude with streaming responses
- **Dark / light mode** — Follows system preference, toggleable
- **Static generation** — Pre-rendered for fast loads via GitHub Pages

## Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | Nuxt 4 (Vue 3), TypeScript, Tailwind CSS v4 |
| **UI Components** | shadcn-vue (shadcn-nuxt + Reka UI) |
| **Chat API** | Google Cloud Functions (Gen 2), Anthropic Claude SDK, Node.js 24 |
| **Hosting** | GitHub Pages (site), Google Cloud Functions (API) |

## Development

```bash
# Install dependencies
npm install

# Start frontend dev server
npm run dev

# Chat API (separate service)
cd chat-api
npm install
npm run dev
```

## Project Structure

```
components/
  chats/           # AI chat widget (Button, Input, Message, Panel, Widget)
  sections/        # Homepage sections (Hero, Experience, Projects, Skills)
  ui/              # shadcn-vue primitives (badge, button, card, sheet)
composables/       # Vue 3 composables (useAiChat, useCountUp, useResume, useScrollAnimation)
types/             # TypeScript interfaces (chat.ts, resume.ts)
chat-api/src/      # Cloud Function entry point
resume.json        # Resume data (JSON Resume format)
```

## Deployment

- **Site** — GitHub Pages via GitHub Actions on push to `main`
- **Chat API** — Google Cloud Functions via GitHub Actions on push to `main` (when `chat-api/**` or `resume.json` changes)
