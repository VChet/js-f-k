---
title: "Spellcheck for any text"
description: "How to set up spell checking in code using cspell — support for Russian and English, dictionaries, masks, and integration into a project."
date: 2025-06-20
author: "vchet"
tags: ["linters", "npm"]
---

# Spellcheck for any text

Mistakes occur not only in logic, but also in words. This is especially true if the project is multilingual or has a large number of variables, comments, and documentation.

[cspell](https://www.npmjs.com/package/cspell) is a CLI tool that checks spelling directly in the code: in identifiers, strings, comments, and text resources. It works quickly, is easy to configure, and supports dictionaries for dozens of languages.

Example of basic configuration:

```bash
npm install --save-dev cspell @cspell/dict-ru_ru
```

```json
// package.json
{
  "scripts": {
    "lint:cspell": "cspell **"
  }
}
```

```json
// .cspell.json
{
  "$schema": "https://raw.githubusercontent.com/streetsidesoftware/cspell/main/cspell.schema.json",
  "version": "0.2",
  "language": "en,ru",
  "import": ["@cspell/dict-ru_ru/cspell-ext.json"]
}
```

This allows us to check the spelling of Russian and English words in a single pass through the project.

The basic configuration is shown above. After reviewing [the documentation](https://cspell.org/docs/Configuration), you will be able to:

- add dictionaries of technical terms, specific frameworks, and libraries
- add your own dictionaries
- create separate settings for each programming language
- fine-tune rules using a mask to allow or disallow certain words

If you want to keep things tidy not only in your code but also in your texts, **cspell** will help you avoid typos and save reviewers time.
