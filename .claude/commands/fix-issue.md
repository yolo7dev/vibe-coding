---
name: fix-issue
description: Analyze and fix a reported bug systematically
---

# /fix-issue

Fix a reported bug. Usage: `Fix issue: [describe the issue]` or `Fix bug in [file/module]`.

For deep diagnostic work, prefer `/debug` — this command is the lighter pass for clear, well-scoped bugs.

## Process

### 1. Understand

- Re-read the report verbatim. Identify the **observable symptom**, the **expected behavior**, and the **trigger**.
- If any of those three are missing, ask before coding.

### 2. Reproduce

- Run `npm run dev` and trigger the bug. If you can't reproduce, treat that as the bug.
- For build/type errors: `npm run build` and read the first error (later ones cascade).

### 3. Locate

- `git log --oneline -20` — is this a regression? Suspect recent commits.
- Read the affected file *and* its closest neighbors before changing anything.

### 4. Plan the minimal change

- The smallest diff that fixes the symptom AND respects `.claude/rules/code-style.md` and `.claude/rules/clean-code.md`.
- If the fix grows beyond ~30 lines or touches >3 files, stop and re-scope — you may be fixing the wrong thing.

### 5. Implement

- Touch only what the bug requires. No drive-by refactors.
- Tighten the type if the bug was a type-system hole. Add a guard clause if it was a runtime hole.
- Do **not** add `useMemo` / `useCallback` / `React.memo` (React Compiler handles it).

### 6. Verify

```powershell
npm run lint
npm run build
npm run dev
```

Re-trigger the original repro. Then check one adjacent flow you might have affected.

### 7. Commit

Use `/commit`. Message format:

```text
fix(scope): one-line description

One or two sentences on the root cause.
Closes #123 (if applicable)
```

## When to escalate to /debug

- You can't reproduce reliably.
- The root cause spans multiple layers (build + runtime + styling).
- A `git bisect` is needed.
- The "obvious" fix doesn't hold the symptom down.
