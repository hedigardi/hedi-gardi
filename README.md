# Hedi Gardi Portfolio (React + TypeScript)

Modern portfolio and digital identity for hedigardi.com, rebuilt with React and TypeScript.

## Website

https://hedigardi.com

## Tech Stack

- React 18
- TypeScript
- Vite
- Vanilla CSS

## Features

- Minimalist modern design with responsive layout
- Command palette (Ctrl/Cmd + K) for navigation and quick actions
- Project portfolio cards with stack tags and status indicators
- Local file hashing lab (SHA-256 via browser crypto API)
- Live Bitcoin fee ticker (mempool.space API)
- SEO metadata + Open Graph
- Netlify deployment setup

## Project Structure

- `src/App.tsx` - Main portfolio page layout
- `src/components/CommandPalette.tsx` - Keyboard-driven command menu
- `src/components/HashLab.tsx` - Local file hashing feature
- `src/data/projects.ts` - Portfolio project data
- `src/styles.css` - Complete visual theme and responsive styles
- `public/assets/images/` - Favicons, OG image, and image assets
- `public/robots.txt` and `public/sitemap.xml` - Search indexing files
- `netlify.toml` - Build and redirect configuration

## Local Development

1. Install dependencies:

```powershell
npm install
```

2. Start development server:

```powershell
npm run dev
```

3. Build for production:

```powershell
npm run build
```

## License

Personal portfolio project for hedigardi.com.
