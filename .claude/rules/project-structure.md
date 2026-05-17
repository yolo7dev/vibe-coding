# Project Structure

Layout convention for `src/`. Create folders only when they have ≥2 files — premature foldering is more painful than a flat `src/`.

```
src/
  main.tsx              # entry — mounts <App /> in <StrictMode>
  App.tsx               # root component, route shell
  index.css             # Tailwind import + @theme tokens; global styles
  assets/               # imported via `import logo from './assets/...'` (Vite hashes & bundles)
  components/           # reusable, presentational, no feature coupling
  features/<feature>/   # feature slice: components + hooks + state + types for one domain
  hooks/                # cross-cutting custom hooks (only when not feature-specific)
  lib/                  # pure utilities, third-party wrappers, framework-agnostic helpers
  types/                # shared TS types/interfaces used across features
public/                 # served verbatim at `/` — favicons, robots.txt, OG images
```

## Where things go

- **A component used by exactly one feature** → `features/<that-feature>/components/`, not `components/`.
- **A component promoted to reuse** → move to `components/` *after* the second consumer appears, not in anticipation.
- **API calls / fetchers** → `features/<feature>/api.ts` (feature-scoped) or `lib/api/` (shared client).
- **Constants** → co-locate with consumer. Promote to `lib/constants.ts` only when ≥2 features need them.
- **Types** → co-locate next to the component/hook that owns them. Promote to `types/` only when shared.
- **Static assets**: `src/assets/` if imported in code (gets hashed); `public/` if referenced by absolute URL (e.g., `/favicon.ico`).

## Files per folder

- Each folder may have an `index.ts` barrel **only** if it has ≥3 exports and consumers benefit from grouped imports. Otherwise import the file directly — barrels hurt tree-shaking and bundle analysis.

## What does NOT belong here

- No `utils.ts` dumping ground. Name files by what they do (`formatDate.ts`, `parseQueryString.ts`).
- No `helpers/`, `common/`, `misc/` folders — same reason.
- No build artifacts checked in. `dist/` is gitignored; keep it that way.

## Anchor files

- [vite.config.ts](../../vite.config.ts) — plugin order matters (`react` before `babel` before `tailwindcss`).
- [src/main.tsx](../../src/main.tsx) — single React root; don't create a second one.
- [src/index.css](../../src/index.css) — only place Tailwind is imported.
