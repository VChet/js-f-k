---
title: "Migrating from CommonJS to ESM"
description: "Why you should migrate from CommonJS to ESM, what advantages the new module format offers, and when migration may cause issues."
date: 2025-06-09
author: "vchet"
tags: ["build"]
---

# Migrating from CommonJS to ESM

Modules based on `require()` and `module.exports` (CommonJS) are a deprecated format. The modern stack (including Node.js) is gradually migrating to [ESM (ECMAScript Modules)](https://nodejs.org/api/esm.html), which has become the official standard.

Why consider the migration:

- ESM is supported in all modern compilers
- provides access to `import/export`, `top-level await`, `tree-shaking`
- new Node.js APIs, such as `import.meta`, are ESM-oriented
- more and more libraries are being published only in ESM format

More details: [antfu.me/posts/move-on-to-esm-only](https://antfu.me/posts/move-on-to-esm-only)

[Detailed instructions for migration by sindresorhus](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)

For a gradual migration, you may enable the [prefer-module](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-module.md) rule from `eslint-plugin-unicorn`.

⚠️ Migrating to ESM can be difficult, especially in CLI applications and projects that use dependencies that have not been updated for a long time. In such cases, it is better to stick with CommonJS until stable support is available.

ESM is the direction in which the platform is developing. If the project allows it, it is worth starting the migration. But for some types of applications, the migration may be too early at this point.
