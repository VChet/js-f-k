---
title: "ESLint plugins: compat"
description: "ESLint plugin that checks the compatibility of your code with target browsers. Easy to install, supports polyfills, configurable via browserslist."
hero: "/hero/eslint-plugin-compat.gif"
date: 2025-07-24
author: "vchet"
tags: ["linters", "npm"]
---

# ESLint plugins: compat

With the constant development of the **ECMAScript** and **Web API** standards, you have probably encountered a situation where you want to use a new language or API feature, but you wonder whether it will work for your users or not. You may have even added polyfills a couple of years ago, but now you can't remember which ones are still needed.

To write code without worrying about this, you can use the [eslint-plugin-compat](https://www.npmjs.com/package/eslint-plugin-compat) plugin — it will automatically check whether the functions you are using are supported in the target browsers.

## Installation

```bash
npm install --save-dev eslint-plugin-compat
```

```js
// eslint.config.js
import compat from "eslint-plugin-compat";

export default [
  // ...
  compat.configs["flat/recommended"]
];
```

```json
// package.json / .browserslistrc
{
  "browserslist": [
    "last 3 Chrome versions",
    "Firefox ESR"
  ]
}
```

## Polyfill support

If you use polyfills, you need to explicitly specify them in the settings — the plugin will not respond to such APIs:

```json
// eslint.config.js
{
  "settings": {
    "polyfills": [
      "Promise",
      "WebAssembly.compile",
      "fetch",
      "Array.prototype.push"
    ]
  }
}
```

## Summary

`eslint-plugin-compat` will help prevent situations when code that doesn't work for some of your users ends up in production. If you know which browsers you support, connect this plugin and ESLint will warn you if any problems arise.

⚠️ Don't forget to update the `caniuse` dependency so that `browserslist` always matches the latest data.
