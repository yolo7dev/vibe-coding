# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server with HMR
- `npm run build` — type-check (`tsc -b`) then build with Vite; the build fails on TypeScript errors
- `npm run lint` — run ESLint over the project
- `npm run preview` — serve the production build locally

There is no test runner configured.

## Architecture

Minimal Vite + React 19 + TypeScript starter, with two notable additions wired through [vite.config.ts](vite.config.ts):

1. **React Compiler** is enabled via `@rolldown/plugin-babel` + `babel-plugin-react-compiler` (applied through `reactCompilerPreset()`). This auto-memoizes components — avoid hand-rolled `useMemo`/`useCallback`/`React.memo` unless profiling shows the compiler missed something. Per the README, this affects both dev and build performance.
2. **Tailwind CSS v4** is enabled via `@tailwindcss/vite` (no `tailwind.config.js` — v4 uses CSS-first config). Global styles live in [src/index.css](src/index.css); the `@import "tailwindcss"` directive belongs there.

Entry flow: [index.html](index.html) → [src/main.tsx](src/main.tsx) (mounts `<App />` inside `<StrictMode>`) → [src/App.tsx](src/App.tsx).

TypeScript uses project references: [tsconfig.json](tsconfig.json) delegates to [tsconfig.app.json](tsconfig.app.json) (app code under `src/`) and [tsconfig.node.json](tsconfig.node.json) (Vite/Node config files). The app config has `verbatimModuleSyntax`, `erasableSyntaxOnly`, `noUnusedLocals`, and `noUnusedParameters` enabled — type-only imports must use `import type`, and unused symbols will break the build.

## Project conventions

Read these before writing or reviewing code — they encode decisions specific to this stack and codebase. If a rule and a code sample disagree, follow the rule and update the code.

- [.claude/rules/tech-stack.md](.claude/rules/tech-stack.md) — pinned versions, what's enabled, version sensitivities (React 19 ref-as-prop, Tailwind v4 CSS-first, TS 6 erasable-syntax).
- [.claude/rules/project-structure.md](.claude/rules/project-structure.md) — where files go inside `src/`, when to promote co-located code to shared folders, what does not belong.
- [.claude/rules/naming-conventions.md](.claude/rules/naming-conventions.md) — file and symbol names; the core rule is *file name matches the primary export*.
- [.claude/rules/code-style.md](.claude/rules/code-style.md) — TypeScript, React, state, effects, Tailwind, comments, error handling.
- [.claude/rules/clean-code.md](.claude/rules/clean-code.md) — design principles ranked by frequency: model state as unions, derive-don't-sync, don't memoize by hand, co-locate then promote.

The biggest rule that catches new contributors: **the React Compiler is on**, so hand-rolled `useMemo` / `useCallback` / `React.memo` should be removed, not added.
