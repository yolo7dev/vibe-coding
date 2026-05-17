# Feature Scaffold Templates

Minimal stubs to copy from. They are deliberately small — fill in real behavior in `/build`, don't pad these out.

Conventions assumed:

- `<Name>` = PascalCase feature name (`Tasks`, `UserProfile`).
- `<name>` = camelCase form (`tasks`, `userProfile`).
- `<feature>` = the folder slug, usually kebab- or camel-case matching `<name>`.

## Pattern A: single component in `src/components/`

`src/components/<Name>.tsx`

```tsx
type <Name>Props = {
  // fill in or delete if no props
};

export function <Name>({}: <Name>Props) {
  return (
    <section className="p-6">
      <h1 className="text-xl font-semibold"><Name></h1>
      <p className="text-sm text-neutral-600">Empty state.</p>
    </section>
  );
}
```

## Pattern B: feature folder, flat

`src/features/<feature>/<Name>.tsx`

```tsx
import { use<Name> } from './use<Name>';

export function <Name>() {
  const state = use<Name>();

  if (state.kind === 'idle') {
    return (
      <section className="p-6">
        <h1 className="text-xl font-semibold"><Name></h1>
        <p className="text-sm text-neutral-600">Nothing here yet.</p>
      </section>
    );
  }

  return (
    <section className="p-6">
      {/* TODO replaced with real rendering once /build adds behavior */}
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </section>
  );
}
```

`src/features/<feature>/use<Name>.ts`

```ts
import { useState } from 'react';

type <Name>State =
  | { kind: 'idle' }
  | { kind: 'ready'; data: unknown };

export function use<Name>() {
  const [state] = useState<<Name>State>({ kind: 'idle' });
  return state;
}
```

Skip `use<Name>.ts` entirely if the component has no state. Don't generate empty hooks.

## Pattern C: feature folder with components/

Same as B, plus:

`src/features/<feature>/components/<SubComponent>.tsx`

```tsx
type <SubComponent>Props = {
  // fill in
};

export function <SubComponent>({}: <SubComponent>Props) {
  return <div className="rounded border p-3"><SubComponent></div>;
}
```

Import sub-components into `<Name>.tsx` with relative paths:

```tsx
import { <SubComponent> } from './components/<SubComponent>';
```

## Pattern D: feature folder with data layer

Same as C, plus:

`src/features/<feature>/api.ts`

```ts
import type { <Name>Item } from './types';

const ENDPOINT = '/api/<feature>'; // adjust when a real API exists

export async function fetch<Name>List(): Promise<<Name>Item[]> {
  const res = await fetch(ENDPOINT);
  if (!res.ok) throw new Error(`<Name> fetch failed: ${res.status}`);
  return res.json() as Promise<<Name>Item[]>;
}
```

`src/features/<feature>/types.ts`

```ts
export type <Name>Item = {
  id: string;
  // …
};
```

`src/features/<feature>/use<Name>.ts` — owns the async state:

```ts
import { useEffect, useState } from 'react';
import { fetch<Name>List } from './api';
import type { <Name>Item } from './types';

type <Name>State =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'success'; data: <Name>Item[] }
  | { kind: 'error'; error: Error };

export function use<Name>() {
  const [state, setState] = useState<<Name>State>({ kind: 'idle' });

  useEffect(() => {
    let cancelled = false;
    setState({ kind: 'loading' });
    fetch<Name>List()
      .then((data) => {
        if (!cancelled) setState({ kind: 'success', data });
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setState({
            kind: 'error',
            error: error instanceof Error ? error : new Error(String(error)),
          });
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
```

The component renders by switching on `state.kind`. No `isLoading`/`isError` boolean pairs.

## App wiring

In `src/App.tsx`, the minimum wire-up is:

```tsx
import { <Name> } from './features/<feature>/<Name>'; // pattern B/C/D
// or
import { <Name> } from './components/<Name>';          // pattern A

function App() {
  return <<Name> />;
}

export default App;
```

If `App.tsx` already renders existing content, ask before replacing it. The default move is to render the new feature alongside (e.g. in its own `<section>`), not to clobber existing JSX.

## What NOT to generate

- `__tests__/` or `*.test.tsx` — no test runner is configured.
- `index.ts` barrels — only allowed at ≥3 exports per folder.
- `*.module.css` — Tailwind utilities inline.
- `constants.ts` containing one constant — inline it.
- `utils.ts` — banned by project-structure.md.
- A `README.md` inside the feature folder — the code should speak for itself.
