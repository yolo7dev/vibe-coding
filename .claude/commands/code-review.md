---
allowed-tools: Read, Bash, Grep, Glob
argument-hint: [file-path] | [commit-hash] | --staged | --branch
description: Review changes in this Vite/React/TS project against project conventions
---

# Code Review

Review the change set: $ARGUMENTS

If no argument is given, review **staged + unstaged changes** on the current branch.

## Current state

- Status: !`git status --porcelain`
- Diff (vs HEAD): !`git diff --stat HEAD`
- Diff (vs main): !`git diff --stat origin/main..HEAD 2>/dev/null || git diff --stat main..HEAD 2>/dev/null || echo "no main branch baseline"`
- Recent commits: !`git log --oneline -5`
- Lint: !`npm run lint --silent 2>&1 | tail -20`
- Type-check / build: !`npx tsc -b --noEmit 2>&1 | tail -20`

## Project context

This is a **frontend-only** project: Vite + React 19 + TypeScript 6 + Tailwind v4.
There is **no backend, no database, no test runner**. Skip checks that don't apply.

Project conventions live in `.claude/rules/` — **read these first** and treat any rule violation as a review finding:

- `.claude/rules/tech-stack.md`
- `.claude/rules/project-structure.md`
- `.claude/rules/naming-conventions.md`
- `.claude/rules/code-style.md`
- `.claude/rules/clean-code.md`

## Review checklist

For each changed file, evaluate:

### 1. Correctness

- TypeScript compiles; no `any`, no non-null `!` outside framework boundaries.
- `import type` used for type-only imports (`verbatimModuleSyntax`).
- No unused symbols (`noUnusedLocals` / `noUnusedParameters` will block the build).
- Hooks rules respected (top-level, stable order, exhaustive deps).

### 2. React Compiler discipline

- **Flag any hand-written `useMemo` / `useCallback` / `React.memo`** unless a comment cites a profiler measurement. The compiler handles this; manual memoization is noise and can mask bugs.
- Flag dependency-array gymnastics meant to "stabilize" callbacks — usually unneeded now.

### 3. State & effects

- Derived values computed during render, not synced via `useEffect`.
- Effects have cleanup unless trivially unnecessary.
- State shape: prefer discriminated unions over multiple booleans for status (`{ kind: 'idle' | 'loading' | … }`).

### 4. Structure

- File name matches primary export (`Button.tsx` → `Button`).
- Components co-located with their only consumer, not preemptively in `components/`.
- No new `utils.ts`, `helpers/`, `common/`, `misc/` (see project-structure.md).

### 5. Tailwind / styling

- Tailwind utilities inline; no `tailwind.config.js` resurrection (v4 is CSS-first).
- Custom tokens via `@theme {}` in `src/index.css`, not via `theme.extend`.
- No `style={{...}}` for things Tailwind expresses.

### 6. Security (frontend-specific)

- No secrets/API keys in source. `VITE_` env vars are public — if it's truly secret, it can't live in this bundle.
- `dangerouslySetInnerHTML` flagged unless input is provably safe.
- External links use `rel="noopener noreferrer"` when `target="_blank"`.

### 7. Performance

- Bundle: any large dep added (>50KB)? Justify it.
- Images in `src/assets/` (hashed) vs `public/` (raw) — appropriate choice?
- Avoid array index as `key` for dynamic lists.

### 8. Accessibility

- Interactive elements are `<button>` not `<div onClick>`.
- Form controls have labels.
- Images have `alt` (empty `alt=""` only when decorative).

## Output format

Group findings by severity:

```markdown
## Blocking
- file:line — issue — fix

## Should fix
- ...

## Nits
- ...

## Praise (optional)
- what's clearly improved
```

Always cite `file:line`. Be specific — "this could be cleaner" is not a review finding.

## Rules of engagement

- Don't invent issues to fill space. A short review is a good review.
- Don't suggest abstractions for a single use case.
- If a finding contradicts a rule in `.claude/rules/`, link the rule.
- If a rule itself seems wrong for this change, say so — rules are revisable.
