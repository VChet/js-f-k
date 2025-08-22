---
title: "Auto-update npm dependencies"
description: "A convenient way to automatically update npm dependencies using npm-check-updates: more control, filters, and interactivity for easy project maintenance."
hero: "/hero/npm-check-updates.png"
date: 2025-05-28
author: ["vchet", "rudnovd"]
tags: ["npm"]
---

# Auto-update npm dependencies

Many people still check `package.json` dependencies manually or via `npm outdated`. But there is a tool that makes this easier and more convenient: [npm-check-updates (ncu)](https://www.npmjs.com/package/npm-check-updates).

|                                      | `npm outdated` + `npm update` | `ncu` |
|--------------------------------------|:-----------------------------:|:-----:|
| Shows available updates              |               ✅               |   ✅   |
| Updates dependencies                 |               ✅               |   ✅   |
| Updates above the current range      |               ❌               |   ✅   |
| Ignores specified packages           |               ❌               |   ✅   |
| Filters by type (patch/minor/latest) |               ❌               |   ✅   |
| Interactive mode                     |               ❌               |   ✅   |

## Installation

```bash
npm install --global npm-check-updates
```

```bash
ncu          # show updates
ncu -u       # update package.json
npm install  # install dependencies
```

## Show updates to a specific level

```bash
ncu --target patch
ncu --target minor
ncu --target latest
```

## Show updates for specific packages

```bash
ncu -f webpack  # only webpack
ncu -x webpack  # everything except webpack
```

## Check for updates to global dependencies

```bash
ncu -g
```

## Ignoring packages

```json
// .ncurc
{
  "reject": ["webpack", "eslint", "@types/*"]
}
```

⚠️ Currently, it is not possible to restrict packages to a specific version range.

`npm-check-updates` provides complete control, flexibility, and ease of configuration, making it better suited for automating the process.
