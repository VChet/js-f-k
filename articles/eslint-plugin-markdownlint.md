---
title: "ESLint плагины: markdownlint"
description: "Плагин для ESLint, который проверяет Markdown-файлы по правилам markdownlint. Удобен при работе с документацией, README и статьями. Поддерживает конфигурацию, свои правила и autofix."
date: 2025-07-29
author: "vchet"
tags: ["linters", "npm"]
---

# ESLint плагины: markdownlint

Даже если вы не пишете код, то с **Markdown** всё равно сталкиваетесь — документация, README или статьи. Он проще **HTML** и надёжнее **Word**: незакрытый тег не сломает вёрстку, а добавление переноса не унесёт весь абзац в другое измерение. Но если тексты объемные, то в них быстро могут накапливаться стилистические ошибки и несогласованности: лишние пробелы, неправильные стили заголовков, нумерация списков и так далее. Это мелочи, но исправив их, текст станет гораздо проще для восприятия.

[eslint-plugin-markdownlint](https://www.npmjs.com/package/eslint-plugin-markdownlint) помогает подсветить такие ошибки: он интегрирует проверку Markdown-файлов прямо в ESLint, используя правила [markdownlint](https://github.com/DavidAnson/markdownlint).

## Установка

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

## Возможности

- Плагин поддерживает проверку `.mdx` файлов.
- Использует ESLint инфраструктуру — не нужно ставить дополнительные библиотеки.
- Большинство правил поддерживают **autofix** через `--fix`.
- Можно адаптировать любые правила под свои нужды, либо отключить ненужные.

## Что именно он проверяет?

Базовые правила покрывают самые частые ошибки и несоответствия:

- **Заголовки**: `MD001`, `MD003`, `MD018`, `MD025` — стили, отступы, вложенность.
- **Списки и блоки**: `MD004`, `MD005`, `MD007`, `MD030`, `MD032`.
- **Отступы, пробелы и переносы строк**: `MD009`, `MD010`, `MD012`, `MD047`.
- **Код и ссылки**: `MD014`, `MD040`, `MD042`, `MD052`.
- **Общие стилистические правила**: `MD026` (точка в заголовке), `MD036` (курсив вместо заголовка), `MD041` (H1 — первой строкой).
- **Вёрстка таблиц и inline-html**: `MD033`, `MD055`, `MD058`

[Полный список правил](https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md).

## Итог

Если в вашем проекте с **Markdown** уже используется **ESLint** — подключите этот плагин и пишите аккуратные тексты не отвлекаясь на стилистические правки.
