# System Guidelines (authoritative)

Target stack:
- **Next.js 14+ / 15 – App Router (`app/`)**
- **TypeScript**
- **TailwindCSS v4 (@tailwindcss/postcss)**

Hard requirements:
1) **No Vite. No CRA.** `package.json` must have Next scripts only:  
   "dev": "next dev", "build": "next build", "start": "next start"
2) **Remove legacy React entry points** like `App.tsx` and any Vite configs.
3) **App Router structure only**:
   - `app/layout.tsx`
   - `app/page.tsx`
   - feature pages, e.g. `app/centers/page.tsx`, `app/about/page.tsx`, etc.
   - API routes under `app/api/*/route.ts` (route handlers)
4) **Styling**: Tailwind utilities only. Add:
   - `postcss.config.mjs` with `@tailwindcss/postcss`
   - `globals.css` with `@import "tailwindcss";`
   - valid `tailwind.config.ts`
5) **TypeScript**:
   - valid `tsconfig.json` (moduleResolution: "bundler", jsx: "preserve")
   - path alias `"@/*": ["./*"]` or `"./src/*"` if using `/src`
6) **Components**:
   - Put shared UI in `components/` (or `src/components/` if using `/src`)
   - Client interactivity only where needed: add `"use client"` at top of client components
   - Prefer server components for pages/lists; fetch data server-side
7) **Data fetching**:
   - For the centers: implement server page (SSR) that passes initial data.
   - Client components manage interactive filters/sort/search.
8) **Remove all unused/legacy files** left from previous React/Vite setup:
   - delete `App.tsx` and any “Legacy” files unless they are migrated under `app/`
   - delete Vite config and deps
9) **Buildable**:
   - project must build with `next build` without errors/warnings related to legacy/Vite.

Deliverables (must exist at root):
- `package.json` (Next only, no Vite)
- `tsconfig.json`
- `postcss.config.mjs`
- `tailwind.config.ts`
- `/app` with `layout.tsx`, `page.tsx`, and feature routes
- `/components` (UI), `/styles/globals.css`
- No `App.tsx`, no Vite files
