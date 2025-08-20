---
title: "Типизация querySelector"
description: "Улучшенная типизация querySelector и querySelectorAll с typed-query-selector для точного вывода типов элементов на основе CSS-селекторов в TypeScript."
date: 2025-06-04
author: "vchet"
tags: ["npm", "typescript"]
---

# Типизация `querySelector`

[typed-query-selector](https://www.npmjs.com/package/typed-query-selector) — улучшение типизации методов `querySelector` и `querySelectorAll` с выводом типов на основе CSS-селекторов.

⚠️ Требуется TypeScript версии 4.1 или выше.

## Установка

```bash
npm install --save-dev typed-query-selector
```

```ts
// typed-query-selector.d.ts
import "typed-query-selector";
```

## Результат

```ts
document.querySelector("div#app"); // HTMLDivElement
document.querySelector("div#app > form#login"); // HTMLFormElement
document.querySelectorAll("span.badge"); // NodeListOf<HTMLSpanElement>
document.querySelector("button#submit"); // HTMLButtonElement
```
