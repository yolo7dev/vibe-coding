---
name: feature-scaffold
description: Scaffold a new feature slice (folder, component, hook, types) in this Vite + React + TypeScript project, following the conventions in .claude/rules/. Use this skill when the user says "scaffold a feature", "add a new feature", "create a new module/slice/page", "set up the X feature folder", or otherwise asks to bootstrap the file/folder structure for a new user-facing capability. Skip when the change is a single inline tweak to existing code — this skill is for *new* slices, not edits.
version: 1.0.0
tags: [React, Vite, TypeScript, scaffolding, project-structure]
---

# feature-scaffold

Bootstrap a new vertical-slice feature in this codebase with the minimum files needed to be useful, wired into the app, and lint-clean.

## When to use

- User asks to "scaffold", "create", "set up", or "add" a new feature, page, module, or slice.
- A new user-visible capability is starting and needs its folder + first files.
- Existing code is being *promoted* from `App.tsx` into its own slice.

## When NOT to use

- Editing a single existing file → just edit it.
- A pure utility with no UI → it goes in `src/lib/` directly, not a feature slice.
- A throwaway prototype the user explicitly says they'll delete — skip the structure.

## Project context loaded by this skill

This skill ALWAYS reads and obeys these before generating anything:

- [.claude/rules/project-structure.md](../../rules/project-structure.md) — where files go.
- [.claude/rules/naming-conventions.md](../../rules/naming-conventions.md) — what to name them.
- [.claude/rules/code-style.md](../../rules/code-style.md) — how to write them.
- [.claude/rules/clean-code.md](../../rules/clean-code.md) — what NOT to add.
- [.claude/rules/tech-stack.md](../../rules/tech-stack.md) — React 19 + Compiler, TS 6 quirks, Tailwind v4.

If those files do not exist, stop and tell the user — the skill assumes the conventions in those files.

## Discovery (ask only what you can't infer)

Keep this short. 1–3 questions max.

1. **Feature name** (a short noun phrase, e.g. `tasks`, `user-profile`, `dashboard`).
2. **Shape**: one of the four patterns below. If unclear, propose the smallest one.
3. **Wiring**: does it replace content in `App.tsx`, mount at a route, or stay opt-in for now? (This project has no router by default — confirm before adding one.)

Do NOT ask about: testing setup (none exists yet), state library (use `useState` until proven otherwise), styling (Tailwind utilities inline), file naming (the rules already decide).

## The four patterns

Pick the smallest pattern that fits. Promote later, don't predict.

### Pattern A — Single component (in `App.tsx` or `components/`)

Use when: the feature is one self-contained component with local state, no children, no shared hooks.

Files:

```text
src/components/<Name>.tsx
```

### Pattern B — Feature folder, flat

Use when: there is one main component plus 1–2 helpers (a type file, maybe a hook). No sub-components yet.

```text
src/features/<feature>/
  <FeatureName>.tsx       # main component (named export = entry point)
  use<FeatureName>.ts     # hook (only if state/effects warrant it)
  types.ts                # (only if types are shared between files)
```

### Pattern C — Feature folder, with components/

Use when: ≥2 sub-components are obvious from the start (e.g. a list + an item).

```text
src/features/<feature>/
  <FeatureName>.tsx               # the page/entry component
  components/
    <SubComponent>.tsx
    <OtherSubComponent>.tsx
  use<FeatureName>.ts             # if needed
  types.ts                        # if needed
```

### Pattern D — Feature folder with data layer

Use when: the feature fetches from an API or persists somewhere.

```text
src/features/<feature>/
  <FeatureName>.tsx
  components/
  api.ts                  # fetcher functions + response types
  use<FeatureName>.ts     # hook that owns loading/error state
  types.ts
```

**Never** scaffold all four levels "just in case." Start at A or B; you can always add the next level when a real second consumer appears.

## Workflow

### 1. Decide

State the chosen pattern (A/B/C/D) and the feature name back to the user in one line before writing files. If the pick feels wrong, the user can correct now (cheap) instead of later (expensive).

### 2. Generate the minimum

Generate ONLY the files the chosen pattern requires. Each file should be a working, lint-clean stub — not a TODO-riddled placeholder. See [references/templates.md](references/templates.md) for the templates.

Rules:

- Component file name = primary export. `Tasks.tsx` exports `Tasks`.
- Hook file: `useTasks.ts` exports `useTasks`.
- Types co-located in the same file unless ≥2 files in the slice consume them — then `types.ts`.
- **No** `index.ts` barrel unless the folder already has ≥3 exports.
- **No** hand-rolled `useMemo` / `useCallback` / `React.memo`. The React Compiler handles memoization.
- Use `import type` for type-only imports (required by `verbatimModuleSyntax`).
- Tailwind utilities inline; no new CSS files.
- `useState` first; `useReducer` only when ≥3 related state values transition together. No global state library on the first pass.

### 3. Wire it up

Default: import and render the feature's entry component from `src/App.tsx`. Show the user the diff to `App.tsx` and ask before overwriting existing JSX.

If the user wants routing:

- React Router is NOT installed. Confirm they want to add it before introducing a router.
- If they do, install it as a separate, named step: `npm install react-router` — do not bundle the install into the scaffold commit.

### 4. Verify

Run, in order, and stop on first failure:

```powershell
npm run lint
npm run build
```

Then `npm run dev` and confirm the feature mounts visibly (even if it's just the empty state).

### 5. Hand off

End with:

- A bulleted list of files created.
- The one-line change to `App.tsx` (or wherever).
- A suggested next step using `/build` or `/plan` for the *next* slice.

## What this skill does NOT do

- Doesn't add a test runner. That's a separate, named decision (see [tech-stack.md](../../rules/tech-stack.md)).
- Doesn't add state management libraries (Zustand, Redux, Jotai, …). Don't until the second consumer of shared state shows up.
- Doesn't add styling libraries beyond Tailwind v4.
- Doesn't preemptively create `lib/`, `hooks/`, `types/`, or `components/` at `src/` root. Those graduate from feature folders when a *second* feature needs them.
- Doesn't write JSDoc or paragraph-long comments. Names carry the meaning ([clean-code.md](../../rules/clean-code.md)).

## Common mistakes to avoid

| Mistake                                          | Why it's wrong                                              |
| ------------------------------------------------ | ----------------------------------------------------------- |
| Generating an `index.ts` barrel "for cleanliness" | Hurts tree-shaking; conventions only allow it at ≥3 exports |
| Adding `useMemo` around derived values           | React Compiler does this; manual memo is noise              |
| Wrapping the entry in `React.memo`               | Same — compiler handles it                                  |
| `// TODO: implement` comments in the stub         | Either implement it or leave the file out                   |
| Adding `loading` + `error` booleans              | Use a discriminated `{ kind: 'idle' \| 'loading' \| … }` union |
| Generating a `utils.ts` file                     | Banned by project-structure.md — name files by purpose      |
| Pre-installing react-router without asking       | Adds a dep + bundle weight; must be confirmed               |
| Creating `__tests__/` folder                     | No test runner configured; don't pretend                    |

## Reference

- File templates: [references/templates.md](references/templates.md)
