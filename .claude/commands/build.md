---
name: build
description: Implement tasks incrementally in small, verifiable slices
---

# /build — Incremental Implementation

> "The simplest thing that could work."

## Purpose

Implement one task at a time in a vertical slice that leaves the app **building, lint-clean, and visibly working** at every step.

## Prerequisites

- A task list (e.g. `tasks/todo.md` from `/plan`) or a clearly stated single task.
- Conventions in `.claude/rules/` loaded.

## Note on testing

This project has **no test runner configured** ([tech-stack.md](../rules/tech-stack.md)). The TDD red-green-refactor cycle described below applies *when* a runner is added (Vitest recommended). Until then, substitute:

- "RED test" → reproduce the gap in the running app or via a typed assertion (e.g. failing `tsc` after defining the new contract).
- "GREEN test" → manual verification in the browser + clean `npm run lint` + clean `npm run build`.

Do **not** add a test runner as a side effect of an unrelated task. Propose it separately.

## Workflow per task

### 1. Load context

- Read the task's acceptance criteria.
- Identify the file the change starts in. Open the closest neighbors.
- Re-read the relevant rule file (likely `code-style.md` and `clean-code.md`).

### 2. Define the contract first

Before writing any rendering or logic:

```ts
type TaskCardProps = {
  task: Task;
  onComplete: (id: string) => void;
};
```

Let TypeScript drive the shape. If the type feels awkward, the design is wrong — adjust before implementing.

### 3. Minimal implementation

Write the **smallest** code that satisfies the type + acceptance criteria. No premature abstraction, no "while I'm here" cleanups.

- Don't hand-roll `useMemo` / `useCallback` / `React.memo` — the React Compiler handles this.
- Prefer derived values over `useState` + `useEffect` sync.
- Co-locate the new file with its only caller.

### 4. Verify locally

```powershell
npm run lint
npm run build      # also runs tsc -b
```

Then in another shell:

```powershell
npm run dev
```

Drive the feature in the browser. Check the golden path and one edge case. Open the React DevTools.

### 5. Commit

Use the `/commit` command. One task = one commit. If the diff naturally splits, split.

### 6. Mark complete

Update `tasks/todo.md`:

```markdown
- [x] Task 1.1: Add TaskCard component
```

## Rules

| Rule                          | Why                                                           |
| ----------------------------- | ------------------------------------------------------------- |
| **Touch only what's needed**  | Don't refactor adjacent code; propose it as a separate task   |
| **Keep it building**          | `npm run build` must pass after every increment               |
| **Keep it lint-clean**        | `npm run lint` must pass; don't suppress to ship              |
| **Verify in the browser**     | Type-check ≠ feature-correct. Actually use the UI             |
| **One concern per commit**    | If you can't describe it in 7 words, split it                 |

## When stuck

1. **Stop.** Don't push through broken code.
2. **Diagnose** with `/debug`.
3. **Fix** the root cause.
4. **Guard** — add a type, a guard clause, or (later) a test.
5. **Resume.**

## Red flags

Stop and reassess if you find yourself:

- Adding `useMemo` / `useCallback` "just in case".
- Writing >150 lines without running the app once.
- Mixing the task at hand with an unrelated refactor.
- Creating a folder for a single file.
- Reaching for a global state library before there's a second consumer.

## Output

- Working, lint-clean, type-clean code verified in the browser.
- Updated `tasks/todo.md`.
- Atomic commit via `/commit`.

## Next step

After all tasks complete, run `/code-review` for a final pass.
