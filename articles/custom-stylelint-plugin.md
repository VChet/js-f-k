---
title: "Как я написал свой Stylelint-плагин"
description: "Как создать собственный Stylelint-плагин: от базового API до поддержки autofix. Обрабатываем CSS-токены и избавляемся от ручной замены значений с помощью PostCSS."
date: 2025-07-15
author: "vchet"
tags: ["linters"]
---

# Как я написал свой Stylelint-плагин

## Вступление

В нашем проекте мы используем токены дизайн-системы, экспортируемые из **Figma**. Все размеры, отступы, цвета, тени и шрифты зашиты в предопределенные токены, чтобы можно было разрабатывать по гайдлайнам, не вспоминая точных значений.

В один день команда дизайна решила перейти на новую систему именования, изменив названия около 200 токенов. Сделать эту замену не так сложно в рамках библиотеки, но гораздо сложнее раскатить это на все проекты, а это десятки тысяч строк, которые нужно заменить вручную.

Решением оказалось научиться и написать свой Stylelint-плагин, который сделает всё это автоматически. Звучит просто, но [документация](https://stylelint.io/developer-guide/plugins) оказалась неожиданно скудной, а статьи в интернете описывали решения с использованием *устаревших API*.

## Реализация

Чтобы плагин работал, потребуется:

1. Точка входа, через которую плагин подключится в `stylelint.config.js`;
1. Главная функция `ruleFunction`, которая содержит логику правила;
1. Метод `walkDecls`, который проходит по `root` AST-дерева и обработает все его узлы;
1. Утилита `report`, которая отправит уведомление об ошибке в Stylelint;
1. Функция `createPlugin`, которая создаст экземпляр плагина с нужными параметрами.

### Создаём точку входа

```js
// index.js
import noLegacyTokens from "./rules/no-legacy-tokens.js";

export default {
  plugins: [noLegacyTokens], // добавляем наш плагин
  rules: {
    // включаем правило, чтобы разработчикам не приходилось делать это самостоятельно
    "lib/legacy-tokens": [true]
  }
};
```

### Создаём файл с маппингом старых и новых токенов

Скорее всего, этот файл вам предоставят дизайнеры — его можно сгенерировать из **Figma**. Не нужно писать его вручную.

```js
// mappings.js
export default {
  // ...
  $c6: "$border_main",
  // ...
  $s6: "$space_10",
  $s12: "$space_20",
  // ...
  $r4: "$radius_8",
  // ...
  $a5: "$text_main",
  // ...
  $XL: "$font_header"
};
```

### Создаём файл с логикой правила

Напишем базовую структуру с главной функцией `ruleFunction` и экспортом плагина.

```js
// rules/no-legacy-tokens.js
import stylelint from "stylelint";

const ruleName = "lib/legacy-tokens"; // название правила

function ruleFunction(enabled) {
  return (root, result) => { }; // логика правила
}

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;

export default createPlugin(ruleName, ruleFunction); // создание экземпляра плагина и его экспорт
```

### Пишем парсер

Парсинг выполняется через [postcss-value-parser](https://www.npmjs.com/package/postcss-value-parser). Благодаря ему, получив AST-дерево, мы можем пройти по каждому узлу и проверить соответствие требованиям.

```js
// rules/no-legacy-tokens.js
import valueParser from "postcss-value-parser";

function ruleFunction(enabled) {
  return (root, result) => {
    if (!enabled) { return; } // если правило выключено, то ничего не делаем

    root.walkDecls((decl) => { // получаем `root` AST-дерева и проходим по всем объявлениям
      const parsedValue = valueParser(decl.value);
      parsedValue.walk((node) => { // обходим каждый узел (node)
        report({ }); // передаём уведомление в Stylelint
      });
    });
  };
}
```

### Описываем правила для объявлений

```js
import mappings from "../mappings";

root.walkDecls((decl) => {
  const parsedValue = valueParser(decl.value);
  parsedValue.walk((node) => {
    if (node.type !== "word") { return; } // игнорируем функции
    const replacement = mappings[node.value]; // ищем прямое совпадение в маппинге
    if (!replacement) { return; } // игнорируем несовпадения

    report({ // передаём в параметрах контекст ошибки
      message: messages.rejected(node.value, replacement),
      node: decl,
      result,
      ruleName,
      word: node.value
    });
  });
});
```

### Добавляем проверку интерполяции токенов

Интерполяция токена — это запись вида `--border-color: #{$c6}`.

```js
if (node.value.startsWith("#")) {
  const matches = node.value.match(/#\{(\$\w+)\}/); // находим значения формата "#{$c6}"
  const [raw, token] = matches; // raw: "#{$c6}", token: "$c6"
  const suggestion = mappings[token]; // находим совпадение в маппинге "$c6": "$border_main"
  replacement = raw.replace(token, suggestion); // заменяем $c6 на $border_main
}
```

### Добавляем проверку `atRule` функции `include`

`atRule` — это конструкции вида `@include`, `@media`, `@keyframes`. В нашем случае мы обрабатываем только `@include`.

```js
root.walkAtRules("include", (atRule) => { // проходим по всем `@include`
  const parsedValue = valueParser(atRule.params);
  parsedValue.walk((node) => { }); // логика замены и вызова уведомления — та же, что и для объявлений
});
```

### Добавляем поддержку `autofix`

```js
const meta = { fixable: true };
ruleFunction.meta = meta;

parsedValue.walk((node) => {
  // ...
  report({
    // ...
    fix: () => {
      node.value = replacement;
      parsedValue.modified = true;
    }
  });
});
// если были внесены любые изменения — обновляем всю строку
if (parsedValue.modified) { decl.value = parsedValue.toString(); }
```

### Итоговый код

Так как логика повторяется, проверку узлов я вынес в отдельную функцию `handleWordNode`.

```js
// rules/no-legacy-tokens.js
import valueParser from "postcss-value-parser";
import stylelint from "stylelint";
import mappings from "../mappings.js";

const { createPlugin, utils: { ruleMessages, report } } = stylelint;

const ruleName = "lib/legacy-tokens";
const messages = ruleMessages(ruleName, {
  rejected: (value, suggestion) => `Legacy token "${value}". Use "${suggestion}" instead`
});
const meta = { fixable: true };

function ruleFunction(enabled) {
  return (root, result) => {
    if (!enabled) { return; }

    function handleWordNode(node, declOrAtRule, parsedValue) {
      let replacement;
      if (node.value.startsWith("#")) {
        const matches = node.value.match(/#\{(\$\w+)\}/);
        if (!matches) { return; }
        const [raw, token] = matches;
        const suggestion = mappings[token];
        if (!suggestion) { return; }
        replacement = raw.replace(token, suggestion);
      } else {
        replacement = mappings[node.value];
        if (!replacement) { return; }
      }

      report({
        message: messages.rejected(node.value, replacement),
        node: declOrAtRule,
        result,
        ruleName,
        word: node.value,
        fix: () => {
          node.value = replacement;
          parsedValue.modified = true;
        }
      });
    }

    root.walkDecls((decl) => {
      const parsedValue = valueParser(decl.value);
      parsedValue.modified = false;
      parsedValue.walk((node) => {
        if (node.type !== "word") { return; }
        handleWordNode(node, decl, parsedValue);
      });
      if (parsedValue.modified) { decl.value = parsedValue.toString(); }
    });

    root.walkAtRules("include", (atRule) => {
      const parsedValue = valueParser(atRule.params);
      parsedValue.modified = false;

      parsedValue.walk((node) => {
        if (node.type !== "word") { return; }
        handleWordNode(node, atRule, parsedValue);
      });

      if (parsedValue.modified) { atRule.params = parsedValue.toString(); }
    });
  };
}

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;
ruleFunction.meta = meta;

export default createPlugin(ruleName, ruleFunction);
```

### Подключаем плагин

```js
// stylelint.config.js
export default {
  extends: ["./src/stylelint-config"]
  // ...
};
```

## Результат

### Пример работы

```scss
div {
  --border-color: #{$c6};
  width: $s12;
  height: calc($s6 * 2);
  color: $a5;
  border: $r4;
  @include font($XL);
}
```

```bash
stylelint **/*{.scss,.vue} --fix
```

```scss
div {
  --border-color: #{$border_main};
  width: $space_20;
  height: calc($space_10 * 2);
  color: $text_main;
  border: $radius_8;
  @include font($font_header);
}
```

### Распространение

Мне не понадобилось делать отдельный пакет, так как разработчикам удобнее подключать плагин сразу с библиотекой компонентов. Поэтому добавляем плагин в сборку.

```js
// vite.config.js
import copy from "rollup-plugin-copy";

plugins: [
  copy({
    targets: [{ src: "src/stylelint-config/*", dest: "dist/stylelint-config" }]
  })
];
```

```json
// package.json
{
  "exports": {
    "./stylelint-config": "./dist/stylelint-config/index.js"
  }
}
```

Теперь при подключении библиотеки можно сразу использовать встроенный Stylelint-плагин.

```js
// stylelint.config.js
export default {
  extends: ["./lib/stylelint-config"]
};
```

## Итог

Автоматизация таких процессов — не просто экономия времени, а способ снизить вероятность человеческой ошибки и стандартизировать подход ко всем проектам. Всего пара часов — и у вас в руках инструмент, который избавит команду от десятков рутинных правок и обеспечит единый стандарт для всех проектов.
