# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SvelteKit Landing — Marketing landing page with hero, features, testimonials, pricing, FAQ, and waitlist signup. Data-driven sections fetch content from Supabase (testimonials, FAQs, waitlist).

Built with SvelteKit 2, Svelte 5 (runes), TypeScript, Tailwind CSS, and Supabase.

## Commands

```bash
npm install              # Install dependencies
npm run dev              # Start dev server (http://localhost:5173)
npm run build            # Production build
npm run preview          # Preview production build
npm run check            # svelte-check (type checking)
npm run lint             # ESLint + Prettier
npm run test             # Unit tests (vitest)
npm run test:e2e         # E2E tests (Playwright)
```

## Architecture

- `src/routes/` — File-based routing (`+page.svelte`, `+page.server.ts`)
- `src/lib/` — Shared library code (`$lib` alias)
- `src/lib/components/` — Reusable Svelte components (Hero, Features, Testimonials, Pricing, Faq, WaitlistForm, Nav, Footer)
- `src/lib/supabase.ts` — Browser Supabase client (uses `$env/dynamic/public`)
- `src/lib/server/supabase.ts` — Server-side Supabase client (uses `$env/dynamic/private`)
- `supabase/migrations/` — Database migrations (waitlist, testimonials, faqs tables)
- `supabase/seed.sql` — Sample data for local development
- `static/` — Static assets

## Data Flow

- `+page.server.ts` `load()` fetches testimonials and FAQs from Supabase on every page load
- Features and pricing remain hardcoded in `load()` (static marketing content)
- WaitlistForm uses SvelteKit form actions (`?/joinWaitlist`) to INSERT into the waitlist table
- Form action validates email server-side and handles duplicate-email conflicts

## Database (Supabase)

Three tables with RLS enabled:
- `waitlist` — email (unique), name, source. Insertable by anyone (anon/authenticated).
- `testimonials` — author_name, author_title, content, rating, featured. Publicly readable.
- `faqs` — question, answer, sort_order. Publicly readable.

## Rules

- Use `+page.server.ts` for server-side data loading
- Use SvelteKit form actions for mutations (not API routes)
- Use `$env/dynamic/public` for browser env vars, `$env/dynamic/private` for server-only
- TypeScript for all `.ts` files, type annotations in `.svelte` `<script lang="ts">`
- Tailwind utility classes for styling
- All interactive elements must have ARIA labels
