---
title: "Cleaning node_modules of outdated polyfills"
description: "How to find and remove outdated polyfills from node_modules using nolyfill to speed up the installation, build, and launch of a JavaScript project."
date: 2025-06-18
author: "vchet"
tags: ["npm"]
---

# Cleaning node_modules of outdated polyfills

Even if you use the **Current** or **LTS** version of **Node.js**, many popular packages still drag along outdated polyfills — all the way back to **Node.js 4**. They often end up in a project as dependencies — for example, `eslint-plugin-import`, `eslint-plugin-jsx-a11y`, `eslint-plugin-react`. This increases the size of **node_modules**, slows down installation, and even slows down code execution. This is because some of these polyfills are used instead of native APIs, even if they are already available in the runtime environment, which reduces performance unnecessarily.

[nolyfill](https://www.npmjs.com/package/nolyfill) is a CLI tool that automatically finds and replaces outdated polyfills with safe placeholders.

⚠️ It will not work for you if your project runs on a version of **Node.js** lower than 12.4.0 or if you are developing for an environment that does not support **ECMAScript2019**.

## Usage

```bash
npx nolyfill // Finds polyfills in the current project
npx nolyfill install // Replaces them with stubs
```

If you frequently change dependencies, add a call to `nolyfill` to `postinstall` so you don't forget to run it:

```json
// package.json
{
  "scripts": {
    "postinstall": "npx nolyfill"
  }
}
```

A modern stack requires modern solutions. `nolyfill` is an easy way to free your project from the legacy of old dependencies and take a step towards modern, fast, and clean **JavaScript**.
