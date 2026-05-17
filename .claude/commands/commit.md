---
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*), Bash(git diff:*), Bash(git log:*), Bash(npm run lint:*), Bash(npm run build:*)
argument-hint: [message] | --no-verify | --amend
description: Create well-formatted commits with conventional commit format
---

# Smart Git Commit

Create a well-formatted commit: $ARGUMENTS

## Current repository state

- Status: !`git status --porcelain`
- Branch: !`git branch --show-current`
- Staged: !`git diff --cached --stat`
- Unstaged: !`git diff --stat`
- Recent: !`git log --oneline -5`

## Pre-commit checks

Unless `--no-verify` is passed, run in this order and stop on first failure:

1. `npm run lint`
2. `npm run build` (this also runs `tsc -b` — fails on type errors)

If either fails: surface the error, ask whether to fix or commit anyway. **Do not silently bypass.**

## What this command does

1. Run pre-commit checks above.
2. If nothing is staged, stage all modified/new files via `git add` (respect `.gitignore`).
3. `git diff` the staged set to understand what's changing.
4. If the diff mixes unrelated concerns, propose splitting into ≥2 commits.
5. Build a conventional commit message (see below) and commit.

## Conventional commit format

```text
<type>(<scope>): <subject>
```

- **Subject**: imperative, present tense, ≤72 chars, no trailing period.
- **Scope** (optional): the area touched — e.g. `(app)`, `(deps)`, `(ci)`, `(rules)`, or a feature folder name. Skip if it'd just repeat the type.
- **Body** (optional, separated by blank line): explain *why*, not *what*. Wrap at ~72.

### Types in use

| Type       | When                                                       |
| ---------- | ---------------------------------------------------------- |
| `feat`     | User-facing functionality                                  |
| `fix`      | Bug fix                                                    |
| `refactor` | Restructuring with no behavior change                      |
| `perf`     | Measurable performance improvement                         |
| `style`    | Formatting only (no logic change)                          |
| `docs`     | README, CLAUDE.md, .claude/rules, JSDoc                    |
| `test`     | Adding/adjusting tests (when a test runner exists)         |
| `build`    | Vite, TS config, Tailwind config, package.json scripts     |
| `deps`     | Add/update/remove dependencies                             |
| `ci`       | GitHub Actions / pipeline                                  |
| `chore`    | Tooling, .gitignore, editor config — none of the above     |
| `revert`   | Revert a prior commit (reference its hash in body)         |

Do not use emojis in commit messages. Plain conventional commits stay greppable and tool-friendly.

## When to split

Split if the staged diff contains any of:

1. Mixed types (e.g. `feat` + `refactor` of unrelated code).
2. Multiple features with no shared dependency.
3. A dependency bump bundled with code changes that aren't from the bump.
4. Formatting/style sweep mixed with logic changes.

Splitting flow:

- Reset staging: `git reset` (keeps the working tree).
- Stage logical group A, commit. Repeat for B, C, …
- Use `git add -p` for hunk-level splits.

## Examples

```text
feat(app): add task list view
fix: handle empty asset path in vite import
refactor(rules): co-locate naming and code-style guidance
perf: avoid re-render in App by lifting state to context
build: bump vite to 8.0.13
deps: add zod for runtime schema validation
docs(claude): point CLAUDE.md to .claude/rules/
chore: gitignore .vite and .turbo caches
```

## Options

- `--no-verify` — skip lint + build. Use sparingly; explain in the body why.
- `--amend` — amend the previous commit. Only safe for commits not yet pushed.

## Important

- Never run `git push` from this command. Pushing is a separate, deliberate action.
- Never use `--no-verify` to make a failing build "go away" — fix it.
- If `npm run build` reveals a type error in unrelated code, surface it, don't silently fix.
- `package-lock.json` is the lockfile of record. If you see `pnpm-lock.yaml` or `yarn.lock` appear, flag it — do not commit.
