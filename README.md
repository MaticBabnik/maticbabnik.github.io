# Matic Babnik Portfolio

Nuxt + Nuxt Content site deployed as static output.

## Requirements

- Node.js >= 24
- npm

## Setup

Make sure to install the dependencies:

```bash
npm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

## Content Collections

Project content is managed via typed collections in [content.config.ts](content.config.ts). The `projects` collection includes fields for `title`, `description`, `feature`, `tech`, `links`, and `images`.

For more information, see the [Nuxt Content documentation](https://content.nuxt.com/).

## Migration Notes (Nuxt 4 + Content 3)

- Upgraded to **Nuxt 4.4.2** and **@nuxt/content 3.13.0**
- Runtime: **Node.js >= 24** (see [.nvmrc](.nvmrc))
- Package manager: **npm only** (Bun support removed)
- Content queries: replaced `queryContent()` with `queryCollection()` API
- Content fields: `_path` → `path` across all collections
- ESLint: migrated to flat config format (eslint.config.js)
- Static deployment: GitHub Pages `.output/public` workflow maintained

Checkout the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
