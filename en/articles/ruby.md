---
title: "Annotations above text with the ruby tag"
description: "How to add superscript explanations to words using the <ruby> tag. Works for Japanese, Chinese, and any other languages."
date: 2025-06-06
author: "vchet"
tags: ["html"]
---

# Annotations above text with the `ruby` tag

[`<ruby>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/ruby) is an HTML element for annotating words with translations, transcriptions, or notes. It's commonly used for Japanese and Chinese, but it works with any language.

The `<ruby>`, `<rt>`, and `<rp>` elements are part of the **Baseline**: they are supported by all modern browsers.

## Example

```html
we usually say <ruby>привет<rp>(</rp><rt>hi</rt><rp>)</rp></ruby> as a greeting
```

![example](./images/ruby.png)

## What is `<rp>` for?

`<rp>` (ruby parentheses) is displayed only in browsers that do not support `<ruby>`. It usually contains parentheses around `<rt>` to keep the text readable: `привет (hi)`
