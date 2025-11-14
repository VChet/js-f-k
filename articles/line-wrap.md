---
title: "Сводка по переносу и обрезанию текста"
description: "Краткое руководство по CSS-свойствам для переноса и обрезания текста: overflow-wrap, text-wrap, word-break, white-space и text-overflow."
date: 2025-10-14
author: "vchet"
tags: ["css"]
discussionId: 44
---

# Сводка по переносу и обрезанию текста

Для демонстрации примеров будет использоваться элемент:

```html
<p class="element">
  В докладе о роли науки для общества упоминались исследования политетрафторэтилена и тетраэтилортосиликата
</p>
```

## [`overflow-wrap`](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap)

![Baseline Status: overflow-wrap](https://baseline.js.org/features/overflow-wrap/static-adaptive.svg)

Позволяет браузеру разрывать длинные непрерывные токены, чтобы избежать переполнения контейнера.

⚠️ В старых статьях можно встретить устаревшее свойство `word-wrap: break-word`. Если у вас такое встретилось в коде – замена на `overflow-wrap: break-word` сохранит аналогичное поведение.

### `anywhere` и `break-word`

```css
.element { overflow-wrap: anywhere; }
```

```css
.element { overflow-wrap: break-word; }
```

Разрешает разрывать слово в любом месте, если нужно предотвратить переполнение. При использовании с `width: min-content`, `anywhere` не будет расширять блок больше минимального размера.

<div style="display: flex">
  <div>
    <code>anywhere</code>
    <p class="element" style="width: min-content; overflow-wrap: anywhere">
      политетрафторэтилен
    </p>
  </div>
  <div>
    <code>break-word</code>
    <p class="element" style="width: min-content; overflow-wrap: break-word">
      политетрафторэтилен
    </p>
  </div>
</div>

## [`text-wrap`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap)

![Baseline Status: text-wrap](https://baseline.js.org/features/text-wrap/static-adaptive.svg)

### `nowrap`

Отключает автоматические переносы, но учитывает явно указанные `\n` переносы.

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

⚠️ Подсчет символов и балансирование строк является ресурсоемким процессом и работает только для текстов не длиннее 6 строк. Текст примера сокращен.

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

![Baseline Status: word-break](https://baseline.js.org/features/word-break/static-adaptive.svg)

Разбивает текст всегда между любыми символами.

⚠️ В большинстве случаев сильно затрудняет восприятие и лучше использовать `overflow-wrap: anywhere`.

```css
.element { word-break: break-all; }
```

<p class="element" style="word-break: break-all">
  В докладе о роли науки для общества упоминались исследования политетрафторэтилена и тетраэтилортосиликата
</p>

## [`white-space`](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space) и [`text-overflow`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow)

![Baseline Status: white-space](https://baseline.js.org/features/white-space/static-adaptive.svg)
![Baseline Status: text-overflow](https://baseline.js.org/features/text-overflow/static-adaptive.svg)

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
