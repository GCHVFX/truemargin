\# TrueMargin



\## Stack

\- Next.js (App Router) — server components by default, minimise `use client`

\- TypeScript strict — no `any`, explicit return types, named exports only

\- Tailwind CSS — no inline styles, no CSS modules

\- Supabase via `@supabase/ssr`

\- Stripe (not yet live — waiting on scenario comparison + SKU saving)

\- Vercel (hosting)



\## Folder Structure

app/                    # Pages and API routes

&#x20; (auth)/               # Auth route group

&#x20; (dashboard)/          # Authenticated routes

&#x20; api/                  # API handlers

&#x20; etsy-fees-on-\*/       # pSEO price pages

components/             # Shared components

lib/                    # Utilities, calculator logic, content

types/                  # TypeScript types



\## Import Alias

\- `@/` maps to project root



\## Naming

\- kebab-case filenames

\- PascalCase component names

\- Named exports only — never `export default` for components



\## Critical Rules

\- Never use `.single()` — use `.maybeSingle()` for nullable Supabase queries

\- Never use `@supabase/auth-helpers-nextjs` — always `@supabase/ssr`

\- Never use `getAll`/`setAll` individually for cookies — only together

\- Never gate the calculator or hide the math behind signup

\- Never use inline styles — Tailwind only

\- JSON-LD structured data must be server-rendered via inline `<script>` tags

\- Smallest change that achieves the goal — no over-engineering



\## Supabase Tables

\- `tm\_pro\_waitlist` — Pro plan signups

\- `tm\_waitlist\_signups` — general waitlist

\- Keep these separate



\## Writing Style (copy/UI text only — not code)

\- No em dashes — use period or comma instead

\- No filler transitions: Additionally, Furthermore, Moreover

\- No forbidden words: ensure, leverage, streamline, seamless, utilize

\- Lead with the answer, not the preamble

\- Short sentences, specific numbers



\## Current Focus

Building scenario comparison feature — this unlocks Stripe.

After that: SKU saving, then Stripe goes live.

