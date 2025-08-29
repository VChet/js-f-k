---
title: "ESLint плагины: pinia"
description: "Плагин для ESLint, который помогает следить за стилем и архитектурой сторов Pinia. Поддерживает рекомендованные правила, проверку структуры и нейминг."
date: 2025-07-31
author: "vchet"
tags: ["linters", "npm", "pinia"]
discussionId: 30
---

# ESLint плагины: pinia

Хранилища (далее сторы) в **Pinia** — это основа архитектуры любого Vue-приложения. Но чем больше проект, тем сложнее следить за тем, чтобы все `defineStore` были реализованы одинаково, не было дублирующихся id, а свойства явно экспортировались.

[eslint-plugin-pinia](https://www.npmjs.com/package/eslint-plugin-pinia) поможет автоматизировать эти проверки: после подключения в ESLint плагин найдет потенциальные ошибки, несогласованный стиль и архитектурные несоответствия в ваших `stores`.

## Установка

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

## Что проверяет?

Правила покрывают самые частые ошибки:

- `never-export-initialized-store` — запрещает экспортировать результат `defineStore()`, только саму функцию.
- `no-duplicate-store-ids` — проверка уникальности id у всех `defineStore`.
- `no-return-global-properties` — запрет возврата `inject`, `useRouter`, `useRoute` из стора напрямую.
- `no-store-to-refs-in-store` — `storeToRefs()` не должны использоваться внутри `defineStore`.
- `prefer-single-store-per-file` — один файл должен содержать один стор. *Отключено по умолчанию*
- `prefer-use-store-naming-convention` — названия сторов должны начинаться с `use`: `useCartStore`, `useUserStore`, и т.д. *Отключено по умолчанию*
- `require-setup-store-properties-export` — все свойства `state` в setup-сторе должны быть экспортированы.

## Итог

Если вы используете **Pinia** — этот небольшой плагин поможет избежать многих архитектурных проблем ещё на этапе написания кода. Особенно пригодится в командной работе: сторы будут оформлены единообразно, код станет предсказуемым, а ревью — быстрее и проще.
