---
title: "ESLint plugins: markdownlint"
description: "A plugin for ESLint that checks Markdown files against markdownlint rules. Useful when working with documentation, README files, and articles. Supports configuration, custom rules, and autofix."
date: 2025-07-29
author: "vchet"
tags: ["linters", "npm"]
---

# ESLint plugins: markdownlint

Even if you don't write code, you still encounter **Markdown** — in documentation, README files, or articles. It's simpler than **HTML** and more reliable than **Word**: an unclosed tag won't break the layout, and adding a hyphen won't send the entire paragraph into another dimension. But if the texts are bulky, they may quickly accumulate stylistic errors and inconsistencies: extra spaces, incorrect heading styles, list numbering, and so on. It's a minor issue, but fixing it will make the text much easier to read.

[eslint-plugin-markdownlint](https://www.npmjs.com/package/eslint-plugin-markdownlint) helps highlight such errors: it integrates Markdown file checking directly into ESLint using [markdownlint](https://github.com/DavidAnson/markdownlint) rules.

## Installation

```bash
npm install --save-dev eslint-plugin-markdownlint
```

```js
// eslint.config.js
import markdownlintPlugin from "eslint-plugin-markdownlint";
import markdownlintParser from "eslint-plugin-markdownlint/parser.js";

const markdownlintPluginConfig = {
  files: ["*.md", "*.mdx"],
  plugins: { markdownlint: markdownlintPlugin },
  languageOptions: { parser: markdownlintParser },
  rules: markdownlintPlugin.configs.recommended.rules
};

export default [
  // ...
  markdownlintPluginConfig
];
```

## Features

- The plugin supports checking `.mdx` files.
- Uses ESLint environment — no need to install additional libraries.
- Most rules support **autofix** via `--fix`.
- You can adapt any rules to your needs or disable unnecessary ones.

## What exactly does it check?

The basic rules cover the most common errors and inconsistencies:

- **Headings**: `MD001`, `MD003`, `MD018`, `MD025` — styles, indents, nesting.
- **Lists and blocks**: `MD004`, `MD005`, `MD007`, `MD030`, `MD032`.
- **Indents, spaces, and line breaks**: `MD009`, `MD010`, `MD012`, `MD047`.
- **Code and links**: `MD014`, `MD040`, `MD042`, `MD052`.
- **General stylistic rules**: `MD026` (period in the title), `MD036` (italics instead of a title), `MD041` (H1 — first line).
- **Table layout and inline HTML**: `MD033`, `MD055`, `MD058`

[Full list of rules](https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md).

## Summary

If your **Markdown** project already uses **ESLint**, add this plugin and write clean texts without getting distracted by stylistic edits.
