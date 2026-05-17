---
name: spec
description: Spec before code — structured feature definition
---

# /spec — Specification-Driven Development

> "Plan the work, then work the plan."

## Purpose

Produce a written specification **before** code, so reviewers and future Claude sessions can verify intent against implementation.

## Prerequisites

- A rough idea or user request.
- Familiarity with `.claude/rules/` (the spec defers style/structure decisions to these — don't restate them).

## Workflow

### Phase 1: Discovery

Ask the user the questions you can't answer from the codebase. Skip any you already know.

#### Scope

- What is the user-visible outcome?
- Who triggers it, and from where in the app?
- What problem does it solve that the current app doesn't?

#### Features

- What is the MVP behavior (single sentence each)?
- What is explicitly out of scope for this iteration?
- What are the acceptance criteria — observable, not implementation-defined?

#### Technical

- Any new dependencies? (Justify each — bundle cost is real.)
- New routes, new global state, new third-party integrations?
- Any performance budget (bundle delta, render time)?

#### Constraints

- Must work on which viewport sizes?
- Accessibility requirements (keyboard, screen reader, contrast)?
- Browsers (the project doesn't declare a baseline — confirm one if it matters)?

Ask only what you need. A small feature may need 2 questions, not 10.

### Phase 2: Generate spec

Write to `SPEC.md` at the repo root, or `docs/specs/<feature>.md` for non-trivial features.

```markdown
# Feature: <Name>

## Objective
<1–2 sentences>

## Users & trigger
<who, from where>

## Behavior
1. <observable behavior>
2. <observable behavior>
3. <observable behavior>

## Out of scope
- <what we're explicitly NOT building>

## UI surface
- New routes: <or "none">
- New components: <named, with rough role>
- Where it lives in the layout

## Data
- Shape (TypeScript-ish): <type sketch>
- Source: <user input / local state / external API / static>
- Persistence: <in-memory / localStorage / none>

## Dependencies
- New packages: <name + reason + bundle impact>
- Or: "none"

## Acceptance criteria
- [ ] <observable>
- [ ] <edge case>
- [ ] Lint clean
- [ ] Build clean
- [ ] Verified in `npm run preview` (production build)

## Conventions
Follow `.claude/rules/`. No feature-specific overrides unless listed below.

## Open questions
- <unresolved item — must be answered before /plan>
```

### Phase 3: Review

- Present the spec to the user.
- Resolve every item under "Open questions" before moving on.
- Once approved, commit `SPEC.md` (use `/commit` with `docs:` type).

## Output

- `SPEC.md` (or `docs/specs/<feature>.md`).
- Zero ambiguity about what "done" looks like.

## Next step

Run `/plan` to decompose the spec into vertical-slice tasks.
