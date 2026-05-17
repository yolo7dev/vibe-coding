# Tech Stack

The non-obvious pieces. Everything else is in [package.json](../../package.json).

## Core

- **React 19** with the **React Compiler** enabled (`babel-plugin-react-compiler` via `@rolldown/plugin-babel` in [vite.config.ts](../../vite.config.ts)). The compiler auto-memoizes — **do not hand-roll `useMemo`, `useCallback`, or `React.memo`** unless a profiler proves the compiler missed it.
- **TypeScript 6** with project references ([tsconfig.app.json](../../tsconfig.app.json) for `src/`, [tsconfig.node.json](../../tsconfig.node.json) for build configs). Strict flags in effect:
  - `verbatimModuleSyntax` — type-only imports MUST use `import type { Foo } from '...'`
  - `erasableSyntaxOnly` — no `enum`, no parameter properties, no namespaces
  - `noUnusedLocals` / `noUnusedParameters` — unused symbols fail the build
  - `noFallthroughCasesInSwitch`
- **Vite 8** as bundler/dev server. HMR is the source of truth — don't add hand-rolled watchers.
- **Tailwind CSS v4** via `@tailwindcss/vite`. **CSS-first config** — there is no `tailwind.config.js`. Customize via `@theme { ... }` blocks inside [src/index.css](../../src/index.css).

## Linting

- **ESLint 10** flat config in [eslint.config.js](../../eslint.config.js). Extends `js.recommended`, `tseslint.recommended`, `react-hooks` (flat), `react-refresh/vite`.
- The lint config is intentionally minimal — do not silently relax rules to make warnings disappear; fix the code.

## Tooling boundaries

- **No test runner** is configured. If you add one, prefer Vitest (it shares Vite's transform pipeline — no duplicate Babel/TS config).
- **No formatter** is configured. Match surrounding style; do not introduce Prettier without discussing it.
- **Package manager**: `package-lock.json` is checked in → use **npm**. Do not mix in yarn/pnpm lockfiles.

## Version sensitivities

- React 19's `ref` is a regular prop (not `forwardRef`). Old patterns will trip up code review.
- Tailwind v4 syntax differs from v3 (`@import "tailwindcss"`, not `@tailwind base/components/utilities`). Don't paste v3 snippets.
- TypeScript 6 + `verbatimModuleSyntax` means accidentally importing a type as a value will break the build — read import errors carefully.
