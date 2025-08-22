---
title: "Improving TypeScript's default behavior"
description: "The ts-reset utility improves TypeScript's standard typing, making the API stricter and safer without changing existing correct code."
date: 2025-06-02
author: "vchet"
tags: ["npm", "typescript"]
---

# Improving TypeScript's default behavior

[ts-reset](https://www.totaltypescript.com/ts-reset) is a utility that extends TypeScript's standard typing by removing outdated and non-strict parts of the core API. It is added at the project level and increases the strictness of typing in a number of APIs.

## Installation

```bash
npm install --save-dev ts-reset
```

```ts
// reset.d.ts
import "@total-typescript/ts-reset";
```

It is also possible to set individual rules:

```ts
// reset.d.ts
// Makes JSON.parse return unknown
import "@total-typescript/ts-reset/json-parse";
// Makes await fetch().then(res => res.json()) return unknown
import "@total-typescript/ts-reset/fetch";
```

## Main changes

- `JSON.parse`, `.json()`, `localStorage`, `sessionStorage` now return `unknown` instead of `any`
- `.filter(Boolean)` correctly removes `falsy` values
- `.includes()`, `.indexOf()`, `Set.has()`, `Map.has()` do not require exact comparison (which is what we are trying to achieve by calling them)
- `Array.isArray()` no longer considers `any[]` safe

⚠️ Not recommended for use in libraries, as changes to global types may affect end projects where the library will be installed.

Within existing projects, connecting `ts-reset` usually does not cause problems: types become stricter but remain compatible with correct code. If errors appear after connecting, these are most likely areas where typing was already unsafe.
