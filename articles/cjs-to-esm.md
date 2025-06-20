---
title: "Переход с CommonJS на ESM"
description: "Почему стоит перейти с CommonJS на ESM, какие преимущества даёт новый формат модулей и когда миграция может вызвать проблемы."
date: 2025-06-09
tags: ["build"]
---

# Переход с CommonJS на ESM

Модули на основе `require()` и `module.exports` (CommonJS) — устаревающий формат.
Современный стек (включая Node.js) постепенно переходит на [ESM (ECMAScript Modules)](https://nodejs.org/api/esm.html),
который стал официальным стандартом.

Зачем рассматривать переход:

- ESM поддерживается во всех современных сборщиках
- даёт доступ к `import/export`, `top-level await`, `tree-shaking`
- новые API Node.js, например `import.meta`, ориентированы на ESM
- всё больше библиотек публикуются только в ESM-формате

Подробнее: [antfu.me/posts/move-on-to-esm-only](https://antfu.me/posts/move-on-to-esm-only)

[Подробная инструкция по миграции от sindresorhus](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)

Для постепенного перехода можно включить правило [prefer-module](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-module.md) из `eslint-plugin-unicorn`.

⚠️ Переход на ESM может быть затруднён, особенно в CLI-приложениях и проектах где используются зависимости, которые давно не обновлялись.
В таких случаях лучше придерживаться CommonJS до появления стабильной поддержки.

ESM — направление развития платформы. Если проект позволяет — стоит начинать миграцию. Но для некоторых типов приложений переход пока может быть преждевременным.
