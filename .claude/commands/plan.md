---
name: plan
description: Decompose a spec into small, verifiable, vertical-slice tasks
---

# /plan — Planning & Task Breakdown

> "Vertical slices, not horizontal layers."

## Purpose

Turn a specification (from `/spec`) or a clearly-stated feature request into an ordered list of tasks that each leave the app working.

## Prerequisites

- A `SPEC.md` exists, or a feature is described well enough to derive acceptance criteria.
- You've read `.claude/rules/project-structure.md` and `.claude/rules/clean-code.md` — they constrain how tasks are sliced.

## Workflow

### Phase 1: Analyze (read-only)

1. Read the spec. List the acceptance criteria explicitly.
2. Walk the current `src/` tree. Note which files the feature touches and which it adds.
3. Identify integration points: routing, state, styling, third-party deps.
4. List unknowns and risks — what could make a task balloon?

**Do not modify code in this phase.**

### Phase 2: Slice vertically

Each task delivers user-visible value through the whole stack (UI + state + types).

```
Wrong (horizontal):
   T1: Add all types
   T2: Add all hooks
   T3: Add all components

Right (vertical):
   T1: User can see an empty task list
   T2: User can add a task
   T3: User can mark a task complete
```

A vertical slice is OK to be tiny. "Render the empty state" is a real task — it forces routing, layout, and the empty-data type to exist.

### Phase 3: Define each task

```markdown
## Task: <short imperative title>

**Objective**: <one sentence — the user-visible change>

**Files**:
- `src/...` (new / modified / deleted — mark which)

**Acceptance criteria**:
- [ ] <observable behavior>
- [ ] <edge case handled>
- [ ] Lint clean (`npm run lint`)
- [ ] Build clean (`npm run build`)

**Dependencies**: <task IDs this needs, or "none">

**Verification**:
- [ ] Manual: <exact click path in the dev server>
- [ ] Visual: <what you expect to see>
```

Notes:

- **Do not include a test-runner step** unless one is configured ([tech-stack.md](../rules/tech-stack.md)). Adding Vitest is itself a task.
- **Files** uses real paths consistent with `.claude/rules/project-structure.md`. No backend paths in this project.

### Phase 4: Order

Sequence by:

1. **Risk first** — the task most likely to invalidate the plan goes early.
2. **Walking skeleton** — the smallest end-to-end version of the feature lands before any polish.
3. **Dependencies** — never plan T(n) requiring artifacts from T(n+k).
4. **Quick wins last only if they're truly optional** — otherwise, get them done while context is fresh.

### Phase 5: Checkpoints

Insert a checkpoint between major phases so the plan can pause and re-evaluate:

```markdown
---
## Checkpoint: walking skeleton works

Verify before proceeding:
- [ ] Empty state renders at the new route
- [ ] No console errors in dev or `npm run preview`
- [ ] Bundle didn't grow by >20KB
---
```

## Output

Save to a `tasks/` directory (create if missing):

- `tasks/plan.md` — analysis, slicing rationale, full task definitions.
- `tasks/todo.md` — the actionable checklist.

`tasks/todo.md` example:

```markdown
# TODO: <Feature>

## Phase 1: Walking skeleton
- [ ] T1.1: <…>
- [ ] T1.2: <…>

## Checkpoint: walking skeleton works

## Phase 2: Core behavior
- [ ] T2.1: <…>
- [ ] T2.2: <…>

## Phase 3: Polish
- [ ] T3.1: <…>
```

## Anti-patterns

- "Add types" or "Refactor utils" as standalone tasks — these are not vertical slices.
- A task that needs a different task to ship before its UI is reachable.
- Tasks defined by *file*, not by *user-visible outcome*.
- Bundling "while we're here" cleanups into a feature task.

## Next step

After the plan is approved, run `/build` to implement task-by-task.
