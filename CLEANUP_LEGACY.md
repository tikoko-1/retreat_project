# Files to Remove

## Legacy React Entry Points
- /App.tsx - ✓ Remove (legacy React router)
- /DashboardApp.tsx - ✓ Remove (migrated to /app/dashboard/page.tsx)

## Legacy Components  
- /components/AboutPageLegacy.tsx - ✓ Remove (use /components/AboutPage.tsx)
- /components/HeaderLegacy.tsx - ✓ Remove (use /components/Header.tsx)
- /components/HomePageLegacy.tsx - ✓ Remove (use /components/HomePage.tsx)

## Legacy Config Files
- /postcss.config.js - ✓ Remove (replaced with /postcss.config.mjs)

## Navigation Utils
- /components/utils/navigation.ts - ✓ Keep but review for Next.js router usage

All App Router pages are working and no longer depend on these legacy files.