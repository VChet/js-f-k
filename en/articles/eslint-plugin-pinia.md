---
title: "ESLint plugins: pinia"
description: "A plugin for ESLint that helps monitor the style and architecture of Pinia stores. Supports recommended rules, structure checking, and naming."
date: 2025-07-31
author: "vchet"
tags: ["linters", "npm", "pinia"]
---

# ESLint plugins: pinia

Stores in **Pinia** are the foundation of any Vue application architecture. However, the larger the project, the more challenging it becomes to ensure that all `defineStore` are implemented consistently, there are no duplicate ids, and properties are explicitly exported.

[eslint-plugin-pinia](https://www.npmjs.com/package/eslint-plugin-pinia) helps automate these checks: once connected to ESLint, the plugin will find potential errors, inconsistent styles, and architectural inconsistencies in your `stores`.

## Installation

```bash
npm install --save-dev eslint-plugin-pinia
```

```js
// eslint.config.js
import piniaPlugin from "eslint-plugin-pinia";

export default [
  // ...
  piniaPlugin.configs["all-flat"]
];
```

## What does it check?

The rules cover the most common errors:

- `never-export-initialized-store` — prohibits exporting the result of `defineStore()`, only the function itself.
- `no-duplicate-store-ids` — checks the uniqueness of the id for all `defineStore`.
- `no-return-global-properties` — prohibits returning `inject`, `useRouter`, `useRoute` directly from the store.
- `no-store-to-refs-in-store` — `storeToRefs()` should not be used inside `defineStore`.
- `prefer-single-store-per-file` — one file should contain one store. *Disabled by default*
- `prefer-use-store-naming-convention` — store names must begin with `use`: `useCartStore`, `useUserStore`, etc. *Disabled by default*
- `require-setup-store-properties-export` — all `state` properties in the setup store must be exported.

## Summary

If you use **Pinia**, this small plugin will help you avoid many architectural problems while writing code. It is especially useful for teamwork: stores will be formatted consistently, code will become predictable, and reviews will be faster and easier.
