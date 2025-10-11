---
title: "Text Wrapping and Truncation Summary"
description: "A concise guide to CSS properties for text wrapping and truncation: overflow-wrap, text-wrap, word-break, white-space, and text-overflow."
date: 2025-10-14
author: "vchet"
tags: ["css"]
---

# Text Wrapping and Truncation Summary

For demonstration purposes, we will use the following element:

```html
<p class="element">
  The report on the role of science in society mentioned research on polytetrafluoroethylene and tetraethylorthosilicate
</p>
```

## [`overflow-wrap`](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap)

Allows the browser to break long, unbroken tokens to prevent container overflow.

⚠️ Old guides may reference the deprecated property `word-wrap: break-word`. If you encounter it in code, replacing it with `overflow-wrap: break-word` preserves the same behavior.

### `anywhere` and `break-word`

```css
.element { overflow-wrap: anywhere; }
```

```css
.element { overflow-wrap: break-word; }
```

Permits breaking a word at any point to avoid overflow. When used with `width: min-content`, `anywhere` will not expand the block beyond its minimum content width.

<div style="display: flex">
  <div>
    <code>anywhere</code>
    <p class="element" style="width: min-content; overflow-wrap: anywhere">
      polytetrafluoroethylene
    </p>
  </div>
  <div>
    <code>break-word</code>
    <p class="element" style="width: min-content; overflow-wrap: break-word">
      polytetrafluoroethylene
    </p>
  </div>
</div>

## [`text-wrap`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap)

### `nowrap`

Disables automatic line breaks but respects explicit `\n` line breaks.

```css
.element { text-wrap: nowrap; }
```

<p class="element" style="text-wrap: nowrap">
  The report on the role of science in society mentioned research on polytetrafluoroethylene and tetraethylorthosilicate
</p>

### `balance`

Automatically adjusts line breaks to better balance text across lines.

```css
.element { text-wrap: balance; }
```

⚠️ Character counting and line balancing is resource-intensive and works only for texts shorter than 6 lines. The example text has been shortened.

<div style="display: flex">
  <div>
    Before
    <p class="element">
       The report on the role of science in society
    </p>
  </div>
  <div>
    After
    <p class="element" style="text-wrap: balance">
       The report on the role of science in society
    </p>
  </div>
</div>

## [`word-break`](https://developer.mozilla.org/en-US/docs/Web/CSS/word-break)

Breaks text between any characters.

⚠️ In most cases, this makes reading harder and it is better to use `overflow-wrap: anywhere`.

```css
.element { word-break: break-all; }
```

<p class="element" style="word-break: break-all">
  The report on the role of science in society mentioned research on polytetrafluoroethylene and tetraethylorthosilicate
</p>

## [`white-space`](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space) and [`text-overflow`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow)

### Single-line truncation with ellipsis

Used in combination with `overflow: hidden` + `text-overflow: ellipsis`. In other scenarios, `white-space` is rarely applied.

```css
.element {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

<p class="element single-line-break">
  The report on the role of science in society mentioned research on polytetrafluoroethylene and tetraethylorthosilicate
</p>

### Multi-line truncation with ellipsis

A similar approach for multi-line text.

```css
.element {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
```

<p class="element multi-line-break">The report on the role of science in society mentioned research on polytetrafluoroethylene and tetraethylorthosilicate</p>

## Whitespace formatting with [`white-space`](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)

Not related to word wrapping but useful for controlling spaces and line breaks in the original text.

### `pre`

Preserves all spaces and line breaks as in the source. Lines will not wrap automatically — text may overflow the container.

```css
.element { white-space: pre; }
```

<p class="element" style="white-space: pre">
  The report on the role of science in society mentioned research on polytetrafluoroethylene and tetraethylorthosilicate
</p>

### `pre-wrap`

Preserves all spaces and line breaks as in the source. Lines will wrap automatically if they don't fit the container.

```css
.element { white-space: pre-wrap; }
```

<div class="code-block" style="white-space: pre-wrap">
  {{ JSON.parse('{ "id": 123, "name": "Bob","roles": ["user"], "settings": { "theme": "dark" } }', null, 2) }}
</div>

### `pre-line`

Collapses multiple spaces into one. Lines will wrap automatically if they don't fit the container.

```css
.element { white-space: pre-line; }
```

<div class="code-block" style="white-space: pre-line">
  {{ JSON.parse('{ "id": 123, "name": "Bob","roles": ["user"], "settings": { "theme": "dark" } }', null, 2) }}
</div>

## Summary

- Long words, URLs, and unbroken tokens — use `overflow-wrap: anywhere`.
- Replace legacy `word-wrap: break-word` with `overflow-wrap: break-word`.
- For strict preservation of spaces and line breaks, e.g., in code blocks, use `white-space: pre-wrap`.
- If line breaks are manual but repeated spaces should be collapsed, use `white-space: pre-line`.
- For truncating text with ellipsis — use `white-space: nowrap` + `overflow: hidden` + `text-overflow: ellipsis`.
- Text line balancing — use `text-wrap: balance`, but only for short texts.

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
