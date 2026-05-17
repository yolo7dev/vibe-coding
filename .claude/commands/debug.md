---
name: debug
description: Systematic debugging — find root cause, not symptoms
---

# /debug — Debugging & Error Recovery

> "Fix root causes, not symptoms."

## Stop-the-line rule

When a failure shows up:

1. **STOP** other work.
2. **PRESERVE** the evidence — copy the full stack trace, console output, network response, and the exact steps to reproduce.
3. **DIAGNOSE** before changing code.
4. **FIX** the root cause.
5. **GUARD** against recurrence.
6. **RESUME** only after verification.

## 6-step triage

### 1. Reproduce

Make the failure deterministic.

- Browser bug? Note the page, the user action sequence, the browser/version.
- Build bug? Capture the full `npm run build` output.
- HMR oddity? Reproduce after a clean `npm run dev` restart — HMR can mask real issues.
- Race condition? Throttle the network in DevTools, or wrap the suspect call in `await new Promise(r => setTimeout(r, 500))` temporarily.

If you can't reproduce, you can't fix — investigate the environment difference itself.

### 2. Localize

| Layer            | Where to look                                                         |
| ---------------- | --------------------------------------------------------------------- |
| **TypeScript**   | `npx tsc -b --noEmit`. Read the *first* error; later ones cascade.    |
| **Build**        | `npm run build` output. Check plugin order in `vite.config.ts`.       |
| **Runtime**      | Browser console + React DevTools. Toggle StrictMode double-render.    |
| **HMR / dev**    | Stop dev server, clear `node_modules/.vite`, restart.                 |
| **Styling**      | DevTools "Computed" panel. Is the class even applied?                 |
| **Bundling**     | `npm run build && npm run preview`. Some bugs only show in prod build |
| **External API** | Network tab. Check status, payload, CORS, timing.                     |

For a regression, use `git bisect`:

```powershell
git bisect start
git bisect bad HEAD
git bisect good <last-known-good>
# Test each commit git suggests; mark good/bad
git bisect reset
```

### 3. Reduce

Strip the failing case until it can't be smaller.

- Comment out unrelated JSX.
- Replace dynamic data with a hardcoded literal.
- Disable plugins in `vite.config.ts` one at a time if the bug is build-side.

A 5-line repro is a fixable bug. A 500-line repro is a research project.

### 4. Fix the root cause

| Symptom                              | Bad fix                                  | Good fix                                          |
| ------------------------------------ | ---------------------------------------- | ------------------------------------------------- |
| Stale value in handler               | Add `useCallback` with bigger deps array | Stop syncing via effect; derive during render     |
| `Cannot read property of undefined`  | `?.` everywhere                          | Narrow the type; render a loading state           |
| List items flicker / lose state      | Bigger `key` hash                        | Use a stable ID, not array index                  |
| Class doesn't apply                  | `!important`                             | Find why specificity / order is wrong             |
| HMR shows wrong output               | Hard-reload always                       | Find the side-effect at module top level          |
| Build passes, prod fails             | Avoid the prod build                     | Reproduce in `npm run preview`; check env vars    |
| TS error after refactor              | `as any`                                 | Fix the type — the error is usually correct       |

### 5. Guard

Make the bug uncatchable next time:

- Tighten the type (replace `string` with a union, narrow a boolean to a discriminated union).
- Add a guard clause that throws with a clear message.
- When a test runner exists, write a failing test first, then the fix.
- Document the gotcha as a one-line comment **only** if a future reader would re-introduce it.

### 6. Verify

```powershell
npm run lint
npm run build
npm run dev      # or `preview` if the bug only showed in prod build
```

Drive the original repro path. Then check at least one adjacent flow you might have broken.

## Debugging tools for this stack

- **React DevTools** — Components tab for props/state, Profiler for re-renders.
- **Browser console** — `console.log` is fine while debugging; **never** ship it.
- **Vite logs** — terminal shows transform errors and dependency pre-bundle hits.
- **TypeScript** — `npx tsc -b --noEmit` for a fast type-only check without running Vite.
- **Source maps** — Vite ships them; stack traces should point to your `.ts/.tsx`. If they don't, check `build.sourcemap` in `vite.config.ts`.

## Console-log hygiene

Before committing:

```powershell
git diff | Select-String "console\.(log|debug)"
```

Remove or convert to a real logger.

## Common rationalizations

| Excuse                            | Reality                                                |
| --------------------------------- | ------------------------------------------------------ |
| "It works on my machine"          | Environment differences ARE the bug                    |
| "It's just flaky"                 | Flake has a cause; the cause will eventually bite prod |
| "Let's add a retry"               | Retries hide races; fix the race                       |
| "It's React StrictMode acting up" | StrictMode reveals real bugs; don't disable it         |
| "We'll fix it later"              | Later is more expensive than now                       |

## Output

- Root cause stated in one sentence.
- Minimal fix, no scope creep.
- Type/guard/test that prevents recurrence.
- Lint + build clean.

## Next step

Resume `/build` on the interrupted task, or run `/code-review`.
