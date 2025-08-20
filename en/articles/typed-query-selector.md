---
title: "querySelector typing"
description: "Improved typing for querySelector and querySelectorAll with typed-query-selector for accurate output of element types based on CSS selectors in TypeScript."
date: 2025-06-04
author: "vchet"
tags: ["npm", "typescript"]
---

# `querySelector` typing

[typed-query-selector](https://www.npmjs.com/package/typed-query-selector) — improved typing for `querySelector` and `querySelectorAll` methods with type inference based on CSS selectors.

⚠️ Requires TypeScript version 4.1 or higher.

## Installation

```bash
npm install --save-dev typed-query-selector
```

```ts
// typed-query-selector.d.ts
import "typed-query-selector";
```

## Result

```ts
document.querySelector("div#app"); // HTMLDivElement
document.querySelector("div#app > form#login"); // HTMLFormElement
document.querySelectorAll("span.badge"); // NodeListOf<HTMLSpanElement>
document.querySelector("button#submit"); // HTMLButtonElement
```
