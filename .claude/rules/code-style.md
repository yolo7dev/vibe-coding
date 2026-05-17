# Code Style

Formatting follows the existing file's style — there is no Prettier. The rules below are about *substance*, not whitespace.

## TypeScript

- **`import type`** is mandatory for type-only imports (`verbatimModuleSyntax`). Mixed imports: `import { foo, type Bar } from '...'`.
- **No `any`.** Use `unknown` and narrow, or define the type. `as unknown as T` is a code smell that needs a comment explaining why.
- **No non-null assertion (`!`)** except at framework boundaries where the type system can't see the invariant (e.g., `document.getElementById('root')!` in [main.tsx](../../src/main.tsx)). Everywhere else, narrow with a guard.
- **Prefer `type` for unions/aliases, `interface` for object shapes you expect to be extended** (e.g., component props). Be consistent within a file.
- **Inference over annotation** for locals and return types; explicit types for exported function signatures and props.
- **No enums** — `erasableSyntaxOnly` forbids them. Use `const` objects:
  ```ts
  const Status = { Idle: 'idle', Loading: 'loading' } as const;
  type Status = (typeof Status)[keyof typeof Status];
  ```

## React

- **Function components only.** No class components.
- **Don't manually memoize.** The React Compiler handles `useMemo`/`useCallback`/`React.memo`. Hand-rolled memoization is a regression — remove on sight, except where profiling proves otherwise (add a comment with the measurement).
- **Hooks at the top, returns at the bottom.** No early returns between hooks (linter will catch it, but think about it before saving).
- **One component per file** for anything reused. Small private subcomponents may share a file with their parent.
- **Props destructuring in the parameter list**:
  ```tsx
  function UserCard({ name, avatar, onClick }: UserCardProps) { ... }
  ```
- **Children**: type as `React.ReactNode`, never `JSX.Element` (too narrow) or `any`.
- **Event handlers**: `function handleSubmit(e: React.FormEvent) { ... }`. Don't inline arrow functions in JSX when the body is non-trivial — pull them out for readability, not performance (compiler handles that).
- **Conditional rendering**: prefer `{condition && <X />}` for boolean; use ternary `{cond ? <A /> : <B />}` for either/or; for ≥3 branches, extract to a function or use early returns *before* the JSX.
- **Keys**: stable IDs from data, never array index unless the list is static and append-only.

## State

- `useState` for component-local state.
- `useReducer` when ≥3 related state values transition together.
- Lift state only when a sibling needs it; otherwise keep it local.
- Don't reach for global state (Context/store) before there's a second consumer.

## Effects

- `useEffect` is a last resort. Before adding one, ask: can this be derived during render? Computed from event handlers? If yes, do that instead.
- Every effect has a cleanup function unless you can prove it doesn't need one.
- Dependency arrays are exhaustive — `react-hooks/exhaustive-deps` is on for a reason.

## Imports

- Use relative paths within a feature; absolute (or aliased) across features.
- No deep imports into another feature's internals — go through the feature's public surface.
- One import statement per source; don't split.

## Tailwind

- **Class order**: layout → box (margin/padding) → sizing → typography → color → state variants. Don't obsess over it; just be roughly consistent.
- **Long class lists**: break onto multiple lines using template literals or `clsx`/`cn` *only when conditional*. Don't break unconditional class lists across lines.
- **No `style={{ }}` props** for things Tailwind can express. Inline style is for dynamic values (e.g., a computed `transform`).

## Comments

- Default: no comment. Names should carry the meaning.
- Write a comment when the **why** is non-obvious: a workaround, a constraint from another system, a counter-intuitive choice.
- Never narrate what the code does (`// increment counter` above `count++`).
- TODOs include a name or ticket: `// TODO(name): explain`.

## Errors

- Throw at the boundary that knows what to do; don't bury errors with silent `try/catch`.
- User-visible errors live in the UI layer (toast, error boundary). Lower layers throw or return `Result`-shaped values.
- Never `catch (e) {}`. If you really must swallow, comment why.
