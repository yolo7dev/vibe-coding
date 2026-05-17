# Clean Code

Principles, ranked by how often they catch real bugs in this kind of stack.

## 1. Make state impossible to misrepresent

A boolean pair like `isLoading` + `isError` permits 4 states, but only 3 are meaningful. Model state as a **discriminated union**:

```ts
type AsyncState<T> =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'success'; data: T }
  | { kind: 'error'; error: Error };
```

If you find yourself writing `if (isLoading && data)` checks, the type is wrong.

## 2. Derive, don't sync

If value B can be computed from value A, **don't store B in state**. Compute it during render. The React Compiler will memoize it for free. Storing both invites them to disagree.

## 3. Small, single-purpose components

A component that does one thing is testable, movable, and replaceable. Heuristics, not laws:

- ≳200 lines → smell. Look for sub-components.
- ≥3 `useState`s → consider `useReducer` or extracting a custom hook.
- ≥2 effects → almost always means the component is conflating responsibilities.
- A prop named `mode` / `variant` that branches behavior wildly → two components, not one.

## 4. Don't memoize by hand

The React Compiler memoizes everything that's safe to memoize. `useMemo` / `useCallback` / `React.memo` you write yourself is **noise** — and worse, it can mask referential bugs that the compiler would otherwise smooth over. Remove on sight unless a profile proves otherwise (and leave a comment with the measurement).

## 5. Pure functions where possible

Anything that doesn't touch the DOM, the network, or React state belongs in a pure function in `lib/`. Pure code is testable without a render, reviewable without context, and reusable for free.

## 6. Early returns over nested ifs

```ts
// no
function f(user) {
  if (user) {
    if (user.active) {
      // ...
    }
  }
}

// yes
function f(user) {
  if (!user) return;
  if (!user.active) return;
  // ...
}
```

## 7. Co-locate, then promote

New code lives next to its only consumer. It moves to `components/` / `hooks/` / `lib/` only when the **second** consumer appears. Most "shared utility" folders are full of code with one caller — that's the wrong direction.

## 8. Resist premature abstraction

Three lines that look similar is not duplication — it's coincidence. Wait for the fourth, and for the change vector to be clear. The wrong abstraction is more expensive than the duplication it replaced.

## 9. Boundaries handle errors

Don't `try/catch` defensively at every layer. Throw where you detect the problem, catch at the layer that can do something about it (error boundary, route handler, top-level toast). Each `catch` should have a clear answer to: *what does the user see now?*

## 10. Effects are a last resort

Before reaching for `useEffect`, ask:

1. Can this be derived during render? → use a regular variable.
2. Can this happen in an event handler? → do it there.
3. Is this syncing with an external system (DOM API, subscription, timer)? → then yes, `useEffect`.

Effects to sync state-to-state are almost always a bug.

## 11. Name to remove the comment

If the comment explains *what*, rename the function or variable until the comment is redundant. Reserve comments for *why* — constraints, gotchas, links to issues.

## 12. Delete fearlessly

Unused code is not free — it has to be read, type-checked, and trusted by everyone who touches the file. If TypeScript flags an unused symbol (`noUnusedLocals` is on), delete it; don't prefix with `_`.

## 13. Match the boring choice

When two approaches are roughly equal, pick the one closer to what's already in the codebase. Consistency compounds; novelty costs.
