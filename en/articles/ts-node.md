---
title: "Running TypeScript directly in Node.js"
description: "How to run TypeScript files directly, without intermediate transpilation, using modern Node.js versions."
date: 2025-08-21
author: "vchet"
tags: ["build", "typescript"]
---

# Running TypeScript directly in Node.js

Good news: in recent versions of **Node.js**, you can run `.ts` files directly — no `ts-node`, `tsx`, or manual build needed.

| Version | Change                                          |
|---------|-------------------------------------------------|
| v22.6.0 | Basic support for `type-stripping` introduced   |
| v22.7.0 | Added the `--experimental-transform-types` flag |
| v23.6.0 | Type annotation removal enabled by default      |
| v24.3.0 | Feature is no longer considered experimental    |

More about native TypeScript support in Node.js can be found in the [official documentation](https://nodejs.org/en/learn/typescript/run-natively).

## What Changed

- **Node.js** now removes type annotations ([type stripping](https://nodejs.org/api/typescript.html#type-stripping)) on its own, leaving clean JavaScript.
- The `--experimental-strip-types` flag is no longer required — it is enabled by default. You can disable it with `--no-experimental-strip-types` if needed.
- Definitions that still require transpilation (`enum`, `namespace`) require the `--experimental-transform-types` flag.

### Example Usage

```bash
node --experimental-transform-types index.ts
```

## Writing Compatible Code

In **TypeScript 5.8**, a new flag `erasableSyntaxOnly` was introduced. It disallows constructs that **Node.js** cannot strip. By adding this to your `tsconfig.json`, your editor will warn you about unsupported code.

## Who This Is Useful For

Large TypeScript projects that actively use `namespace`, `enum`, and other transformable constructs will still rely on tools like `ts-node`, `tsx`, or a full `tsc` build — and that's perfectly fine. But for small utilities, test scripts, and quick tools, the ability to just run `node script.ts` is a great way to save time and avoid extra configuration.
