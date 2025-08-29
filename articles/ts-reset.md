---
title: "Улучшение дефолтного поведения TypeScript"
description: "Утилита ts-reset улучшает стандартную типизацию TypeScript, делая API строже и безопаснее без изменения существующего корректного кода."
date: 2025-06-02
author: "vchet"
tags: ["npm", "typescript"]
discussionId: 6
---

# Улучшение дефолтного поведения TypeScript

[ts-reset](https://www.totaltypescript.com/ts-reset) — утилита, которая расширяет стандартную типизацию в TypeScript, устраняя устаревшие и нестрогие участки в базовых API. Подключается на уровне проекта и повышает строгость типизации в ряде API.

## Установка

```bash
npm install --save-dev ts-reset
```

```ts
// reset.d.ts
import "@total-typescript/ts-reset";
```

Также возможно установить отдельные правила:

```ts
// reset.d.ts
// Makes JSON.parse return unknown
import "@total-typescript/ts-reset/json-parse";
// Makes await fetch().then(res => res.json()) return unknown
import "@total-typescript/ts-reset/fetch";
```

## Основные изменения

- `JSON.parse`, `.json()`, `localStorage`, `sessionStorage` теперь возвращают `unknown`, а не `any`
- `.filter(Boolean)` корректно удаляет `falsy`-значения
- `.includes()`, `.indexOf()`, `Set.has()`, `Map.has()` не требуют точного сравнения (чего и пытаемся добиться, вызывая их)
- `Array.isArray()` больше не считает `any[]` безопасным

⚠️ Не рекомендуется использовать в библиотеках, так как изменения глобальных типов могут повлиять на конечные проекты, в которые библиотека будет установлена.

Внутри существующих проектов подключение `ts-reset`, как правило, не вызывает проблем: типы становятся строже, но остаются совместимыми с корректным кодом. Если после подключения появляются ошибки — скорее всего, это участки, где типизация и так была небезопасной.
