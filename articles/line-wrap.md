---
title: "Сводка по переносу и обрезанию текста"
description: "Краткое руководство по CSS-свойствам для переноса и обрезания текста: overflow-wrap, text-wrap, word-break, white-space и text-overflow."
publish: false
author: "vchet"
tags: ["css"]
---

# Сводка по переносу и обрезанию текста

Для демонстрации примеров будет использоваться элемент:

```html
<p class="element">
  В докладе о роли науки для общества упоминались исследования политетрафторэтилена и тетраэтилортосиликата
</p>
```

## [`overflow-wrap`](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap)

### `anywhere` и `break-word`

Разрывает непрерывные токены в любом месте, но только когда это нужно, чтобы избежать переполнения.

Поведение `break-word` совпадает с `anywhere`, обычно неразрывные слова разрешается разрывать в произвольных точках, если в строке нет других приемлемых точек разрыва.

⚠️ В старых статьях можно встретить устаревшее название `word-wrap: break-word`. Если у вас такое встретилось в коде – замена на `overflow-wrap: break-word` сохранит аналогичное поведение.

```css
.element { overflow-wrap: anywhere; }
```

<p class="element" style="overflow-wrap: anywhere">
  В докладе о роли науки для общества упоминались исследования политетрафторэтилена и тетраэтилортосиликата
</p>

```css
.element { overflow-wrap: break-word; }
```

<p class="element" style="overflow-wrap: break-word">
  В докладе о роли науки для общества упоминались исследования политетрафторэтилена и тетраэтилортосиликата
</p>

## [`text-wrap`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap)

### `nowrap`

Запрещает автоматические переносы, но разрешает явные `\n`.

```css
.element { text-wrap: nowrap; }
```

<p class="element" style="text-wrap: nowrap">
  В докладе о роли науки для общества упоминались исследования политетрафторэтилена и тетраэтилортосиликата
</p>

### `balance`

Текст автоматически переносится, чтобы лучше расположить символы на одной строке.

```css
.element { text-wrap: balance; }
```

⚠️ Подсчет символов и балансирование строк является ресурсоемким процессом и работает только для текстов не длиннее 6 строк. Текст примера был сокращен.

<div style="display: flex">
  <div>
    До
    <p class="element">
      В докладе о роли науки для общества упоминались исследования
    </p>
  </div>
  <div>
    После
    <p class="element" style="text-wrap: balance">
      В докладе о роли науки для общества упоминались исследования
    </p>
  </div>
</div>

## [`word-break`](https://developer.mozilla.org/en-US/docs/Web/CSS/word-break)

Разбивает текст всегда между любыми символами.

⚠️ В большинстве случаев сильно затрудняет восприятие и лучше использовать `overflow-wrap: anywhere`.

```css
.element { word-break: break-all; }
```

<p class="element" style="word-break: break-all">
  В докладе о роли науки для общества упоминались исследования политетрафторэтилена и тетраэтилортосиликата
</p>

## [`white-space`](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space) и [`text-overflow`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow)

### Однострочная обрезка с троеточием

Используется в сочетании с `overflow: hidden` + `text-overflow: ellipsis`. В других сценариях `white-space` почти не применяется.

```css
.element {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

<p class="element single-line-break">
  В докладе о роли науки для общества упоминались исследования политетрафторэтилена и тетраэтилортосиликата
</p>

### Многострочная обрезка с троеточием

Аналогичный подход для многострочного текста.

```css
.element {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
```

<p class="element multi-line-break">В докладе о роли науки для общества упоминались исследования политетрафторэтилена и тетраэтилортосиликата</p>

## Форматирование пробелов с [`white-space`](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)

Не относится к переносу слов, но полезно при форматировании переносов между словами.

### `pre`

Сохранение всех пробелов и переносов как в исходнике. Строки не будут перенесены автоматически — текст будет вылезать за границы блока.

```css
.element { white-space: pre; }
```

<p class="element" style="white-space: pre">
  В докладе о роли науки для общества упоминались исследования политетрафторэтилена и тетраэтилортосиликата
</p>

### `pre-wrap`

Сохранение всех пробелов и переносов как в исходнике. Строки будут перенесены автоматически, если строка не помещается в контейнер.

```css
.element { white-space: pre-wrap; }
```

<div class="code-block" style="white-space: pre-wrap">
  {{ JSON.parse('{ "id": 123, "name": "Bob","roles": ["user"], "settings": { "theme": "dark" } }', null, 2) }}
</div>

### `pre-line`

Склеивание нескольких пробелов в один. Строки будут перенесены автоматически, если строка не помещается в контейнер.

```css
.element { white-space: pre-line; }
```

<div class="code-block" style="white-space: pre-line">
  {{ JSON.parse('{ "id": 123, "name": "Bob","roles": ["user"], "settings": { "theme": "dark" } }', null, 2) }}
</div>

## Итог

- Длинные слова, URL и токены без пробелов — используйте `overflow-wrap: anywhere`.
- Устаревший код с `word-wrap: break-word` замените на `overflow-wrap: break-word`.
- Если требуется строгое сохранение пробелов и переносов, например для блоков кода, используйте `white-space: pre-wrap`.
- Если переносы были расставлены вручную, но нужно склеить повторяющиеся пробелы, используйте `white-space: pre-line`.
- Для обрезания текста с троеточием — `white-space: nowrap` + `overflow: hidden` + `text-overflow: ellipsis`.
- Балансирование текста на строке — `text-wrap: balance`, но только для коротких текстов.

<style lang="scss" scoped>
.element {
  width: 10rem;
  padding: .5rem;
  font-family: sans-serif;
  font-style: italic;
  border: 0.25rem solid var(--vp-c-brand-3);
}
.code-block {
  font-family: monospace;
  border: 0.25rem solid var(--vp-c-brand-3);
}
.single-line-break {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.multi-line-break {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
