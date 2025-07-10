---
title: "ESLint плагины: compat"
description: "ESLint-плагин, который проверяет совместимость вашего кода с целевыми браузерами. Простое подключение, поддержка polyfill'ов, настройка через browserslist."
hero: "/hero/eslint-plugin-compat.gif"
date: 2025-07-24
tags: ["linters", "npm"]
---

# ESLint плагины: compat

С постоянным развитием стандарта **ECMAScript** и **Web API** вы наверняка сталкивались с ситуацией, когда хочется использовать новую возможность языка или API, но возникает вопрос — заработает ли это у пользователей. Возможно, вы даже добавляли полифиллы пару лет назад, но теперь уже не помните какие из них всё ещё нужны.

Чтобы писать код и не задумываться об этом, можно воспользоваться плагином [eslint-plugin-compat](https://www.npmjs.com/package/eslint-plugin-compat) — он автоматически проверит, поддерживаются ли используемые функции в целевых браузерах.

## Установка

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

## Поддержка полифиллов

Если вы используете полифиллы, их нужно явно указать в настройках — плагин не будет реагировать на такие API:

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

## Итог

`eslint-plugin-compat` поможет предотвратить ситуацию, когда в прод попадает код, не работающий у части ваших пользователей. Если вы знаете, какие браузеры поддерживаете — подключите этот плагин, и ESLint сам предупредит, если появятся проблемы.

⚠️ Не забывайте обновлять `caniuse` зависимости, чтобы `browserslist` всегда соответствовал актуальным данным.
