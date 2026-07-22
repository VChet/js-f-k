---
title: "Displaying commit SHA and time in a web application"
description: "How to display the SHA and date of the last git commit in a Vite application via import.meta.env?"
date: 2026-07-23
author: ["vchet", "rudnovd"]
tags: ["build", "git", "vite"]
---

# Displaying commit SHA and time in a web application

If you are not using [SemVer](https://semver.org) or the application has not reached a stable release yet — it makes sense to display the SHA of the latest commit and its date to understand which version is currently running. In Vite, this can be implemented in a few lines.

## Getting commit information

In any convenient file, or directly in `vite.config.ts`, write the following:

```ts
import { execFileSync } from "node:child_process";

const commitSHA = execFileSync("git", ["rev-parse", "--short", "HEAD"], { encoding: "utf8" }).trim();
const commitDate = execFileSync("git", ["log", "-1", "--format=%cI"], { encoding: "utf8" }).trim();
```

::: details What does this code do?
`execFile` (and its synchronous version `execFileSync`) runs an executable file, in our case `git`, and passes parameters to it.

- `git rev-parse --short HEAD` — returns the shortened SHA of the current commit.
- `git log -1 --format=%cI` — returns the date of the latest commit in ISO format.

[execFile][node-execFile] is used instead of [exec][node-exec] because it runs the command directly without passing it through a shell.

The `encoding` option is set to `utf8` so that the function returns a string instead of a `Buffer`.
:::

Add the following values to the `define` section of `vite.config.ts`:

```diff
export default defineConfig({
+ define: {
+   "import.meta.env.VITE_GIT_COMMIT_SHA": JSON.stringify(commitSHA),
+   "import.meta.env.VITE_GIT_COMMIT_DATE": JSON.stringify(commitDate)
+ }
});
```

## Adding to a component

Now, in any component, you can get values from environment variables through `import.meta.env`.

```ts
const { VITE_GIT_COMMIT_SHA, VITE_GIT_COMMIT_DATE } = import.meta.env;
```

And use them, for example, like this:

```ts
const commitDate = new Intl.DateTimeFormat(navigator.language, {
  year: "numeric",
  month: "long",
  day: "2-digit"
}).format(new Date(VITE_GIT_COMMIT_DATE));

const revision = `${commitDate} [${VITE_GIT_COMMIT_SHA}]`; // July 18, 2026 [369f0b3]
```

This makes it easy to verify which commit is currently deployed and confirm that the latest deployment completed successfully.

⚠️ This approach only works if the Git repository is available during the build. If the project is built without the `.git` directory, these commands will fail.

[node-execFile]: https://nodejs.org/api/child_process.html#child_processexecfilefile-args-options-callback
[node-exec]: https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback
