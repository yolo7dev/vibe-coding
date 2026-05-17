---
name: deploy
description: Produce a production build and run pre-deploy checks
---

# /deploy

## Status: deploy target not yet configured

This project has **no deploy scripts** in `package.json` and **no hosting target** chosen. This command therefore covers the parts that exist today — producing and verifying a production build — plus a checklist for adding a real deploy target.

When a host is chosen, replace this file with the host's specific flow (Vercel / Netlify / Cloudflare Pages / static S3 / etc.).

## What works today

### 1. Pre-flight

```powershell
git status                  # working tree should be clean
git branch --show-current   # confirm you're on the intended branch
npm run lint
npm run build               # also runs `tsc -b`
```

Stop on the first failure. Do not bypass.

### 2. Build artifacts

`npm run build` writes to `dist/`. Verify it locally:

```powershell
npm run preview
```

This serves the production bundle (not the dev server). Walk through the golden path in the browser — some bugs only show up in the prod build (tree-shaken code paths, env var differences, source-map issues).

### 3. Bundle sanity check

- Open `dist/assets/` and note the largest files. Sudden jumps (>50KB on a JS chunk) deserve investigation.
- Open the built `index.html` and check that asset URLs resolve.

## What needs to be added before this command is real

Pick one host and wire it up:

| Host              | What to add                                                         |
| ----------------- | ------------------------------------------------------------------- |
| Vercel            | `vercel.json` (or zero-config), connect repo, set env vars          |
| Netlify           | `netlify.toml` with `command = "npm run build"`, `publish = "dist"` |
| Cloudflare Pages  | Pages project, build command `npm run build`, output `dist`         |
| GitHub Pages      | Action that builds and publishes `dist/` to `gh-pages` branch       |
| Static S3 / nginx | CI step that uploads `dist/` after build                            |

For any of the above, also add:

- An `npm run deploy` script (or rely on CI on push to `main`).
- `VITE_*` env vars in the host's dashboard. Remember **`VITE_` is public** — never put secrets there.
- A documented rollback path (revert the commit on `main`, or use the host's "promote previous deployment" feature).

## Rollback (placeholder)

There is no rollback script today. Until a host is configured, "rollback" means `git revert` the offending commit and re-running this build.

## Next step

Once a host is configured, replace this file with the host-specific runbook. The structure above (preflight → build → verify → deploy → verify → rollback) should stay the same.
