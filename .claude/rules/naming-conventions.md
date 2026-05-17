# Naming Conventions

The rule: **the file name matches the primary exported symbol.** If the export is `Button`, the file is `Button.tsx`. If the export is `useAuth`, the file is `useAuth.ts`. This single rule subsumes most of what follows.

## Files

| Kind                       | File name              | Example                       |
| -------------------------- | ---------------------- | ----------------------------- |
| React component            | `PascalCase.tsx`       | `UserCard.tsx`, `App.tsx`     |
| Custom hook                | `useCamelCase.ts`      | `useAuth.ts`, `useDebounce.ts`|
| Pure utility / lib         | `camelCase.ts`         | `formatDate.ts`, `apiClient.ts`|
| Type-only module           | `camelCase.types.ts`   | `user.types.ts`               |
| Test (when added)          | `<source>.test.ts(x)`  | `formatDate.test.ts`          |
| Constants module           | `camelCase.ts`         | `routes.ts` (not `ROUTES.ts`) |
| Stylesheet                 | `kebab-case.css`       | `index.css`, `print-styles.css`|

`index.ts` is reserved for intentional barrel files. Do not name a component `index.tsx` — it kills jump-to-file and stack traces.

## Symbols inside files

| Kind                       | Convention             | Example                       |
| -------------------------- | ---------------------- | ----------------------------- |
| Component                  | `PascalCase`           | `function UserCard() {}`      |
| Hook                       | `useCamelCase`         | `function useAuth() {}`       |
| Variable, function         | `camelCase`            | `const userCount = ...`       |
| Module-level constant      | `UPPER_SNAKE_CASE`     | `const MAX_RETRIES = 3`       |
| Type / Interface           | `PascalCase`           | `type User = ...`             |
| Enum-like const object     | `PascalCase`           | `const HttpStatus = { ... } as const` |
| Boolean                    | `is/has/can/should…`   | `isLoading`, `hasError`       |
| Event handler              | `handleX` (inside) / `onX` (prop) | `onClick={handleSubmit}` |
| Generic type parameter     | `T`, `TUser`, `TKey`   | `<TItem extends ...>`         |

## React-specific

- **Props type**: `<ComponentName>Props` (e.g., `UserCardProps`). Define inline above the component or co-locate at the top of the file.
- **Don't use enums** (`erasableSyntaxOnly` forbids them). Use `as const` objects + `keyof typeof` for the type.
- **Discriminated unions** use a literal `kind` or `type` field — pick one per codebase and stick with it (default: `kind`).
- **Context**: `<Domain>Context` for the context, `<Domain>Provider` for the provider, `use<Domain>` for the consumer hook.

## Imports

- Group order: (1) external packages, (2) internal aliases / `src/`, (3) relative `./` and `../`, (4) styles and assets. Blank line between groups.
- **Type-only imports must use `import type`** — required by `verbatimModuleSyntax`.

## CSS / Tailwind

- Prefer Tailwind utilities inline; reach for a class only when the same combination repeats ≥3 times.
- Custom CSS classes: `kebab-case`. No BEM, no CSS modules unless we explicitly adopt them.
- Design tokens live in `@theme { ... }` in [src/index.css](../../src/index.css), named `--color-brand-500`, `--font-display`, etc. — follow Tailwind v4's namespace prefixes.

## What to avoid

- `Utils`, `Helpers`, `Common`, `Manager`, `Service` as suffixes — they say nothing. Name by what the thing does.
- Abbreviations (`usr`, `btn`, `cfg`). Type the full word.
- Hungarian notation (`strName`, `bIsOpen`). TypeScript already encodes the type.
- Negated booleans (`isNotLoaded`). Use the positive form.
