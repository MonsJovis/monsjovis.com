# monsjovis.com

[![Deploy](https://github.com/monsjovis/monsjovis.com/actions/workflows/deploy.yaml/badge.svg)](https://github.com/monsjovis/monsjovis.com/actions/workflows/deploy.yaml)
![Nuxt](https://img.shields.io/badge/Nuxt-4-00DC82?logo=nuxt.js)
![Vue](https://img.shields.io/badge/Vue-3-4FC08D?logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)

Personal portfolio website.

## Tech Stack

- **Framework**: Nuxt 4 / Vue 3
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Hosting**: GitHub Pages

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Generate static site
npm run generate

# Preview production build
npm run preview
```

## Project Structure

```
├── pages/           # Page components
│   └── index.vue    # Landing page
├── assets/css/      # Global styles
├── public/          # Static assets
├── nuxt.config.ts   # Nuxt configuration
└── app.vue          # Root component
```

## Deployment

The site automatically deploys to GitHub Pages when changes are pushed to `main` via GitHub Actions.

To deploy manually:

```bash
npm run generate
# Output is in .output/public/
```
