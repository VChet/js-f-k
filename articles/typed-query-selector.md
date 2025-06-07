---
title: "typed-query-selector: типизированный querySelector"
date: 2025-06-04
---

**typed-query-selector: типизированный querySelector**

[typed-query-selector](https://www.npmjs.com/package/typed-query-selector) — улучшение типизации методов `querySelector` и `querySelectorAll` с выводом типов на основе CSS-селекторов.

⚠️ Требуется TypeScript версии 4.1 или выше.

Установка:

```bash
npm i --save-dev typed-query-selector
```

```ts
// typed-query-selector.d.ts
import "typed-query-selector";
```

Результат:

```ts
document.querySelector("div#app"); // HTMLDivElement
document.querySelector("div#app > form#login"); // HTMLFormElement
document.querySelectorAll("span.badge"); // NodeListOf<HTMLSpanElement>
document.querySelector("button#submit"); // HTMLButtonElement
```
