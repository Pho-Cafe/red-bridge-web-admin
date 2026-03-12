# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
```

There are no lint or test scripts configured.

## Architecture

This is a Next.js 16 App Router application using Firebase Firestore as its database, deployed as a Docker container (`output: 'standalone'`).

### Data flow

Each route follows the same pattern:

1. `page.tsx` — server component; fetches data directly from the DB layer and passes it as props
2. `*Client.tsx` — client component; manages UI state, calls server actions on mutation
3. After mutation, either `router.refresh()` (stay on page) or `redirect()` inside the action (navigate away)

### Layers

- **`src/db/`** — Firestore access functions, all marked `"use server"`. Direct Firebase SDK calls (`getDocs`, `setDoc`, `deleteDoc`, etc.). These are called from server components and server actions only.
- **`src/actions/`** — Server actions (`"use server"`). Thin wrappers over DB functions; handle input sanitisation and post-mutation side effects (`redirect`).
- **`src/lib/`** — External API clients (e.g. TeamViewer REST API). Not Firebase.
- **`src/components/`** — Shared UI primitives: `Button`, `Input`, `Table`, `PageLayout`, `Nav`. No external UI library.
- **`src/app/api/`** — Next.js route handlers for server-side API proxying (e.g. proxying TeamViewer API to avoid exposing the secret key client-side).

### Firebase

Initialised in `src/firebase-client.ts` from `NEXT_PUBLIC_FIREBASE_*` env vars. The Firestore instance uses the default database. All DB functions import `{ db }` from there.

Reference fields are used as Firestore document IDs (e.g. location reference = doc ID). Renaming a reference means creating a new document and deleting the old one.

### Dynamic routes

Location detail pages use `export const dynamic = "force-dynamic"` to prevent build-time static generation, since data must be fetched at request time.

### Environment variables

See `.env.example` for the full list. Key variables:
- `NEXT_PUBLIC_FIREBASE_*` — Firebase project config (client-safe)
- `TEAMVIEWER_API_SECRET_KEY` — server-only, used in the API route handler
- `NEXT_PUBLIC_APP_NAME` — display name shown in the nav and page title; defaults to `"Admin"`

## Styling

- Tailwind CSS v4 (`@import "tailwindcss"` syntax, `@theme inline` for custom tokens)
- No UI component libraries
- Minimal, functional aesthetic: neutral grays only, no accent colours, no shadows or gradients
- `system-ui, sans-serif` font
- Native browser affordances preserved (visible input borders, standard button appearance)
- All shared UI lives in `src/components/` — prefer extending those over writing one-off styles inline
