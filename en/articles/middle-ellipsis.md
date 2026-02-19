---
title: "Middle text truncation"
description: "How to truncate text in the middle using Flexbox, text-overflow, and ResizeObserver without dependencies."
date: 2026-02-20
author: "vchet"
tags: ["css", "html"]
---

# Middle text truncation

In the article on [line wrapping and text truncation](/en/articles/line-wrap),  a commonly used example with `text-overflow: ellipsis` was shown, where text that does not fit into the container is truncated at the end. But there are scenarios where it is necessary to display the end of the string and hide the middle. This technique is useful in interfaces where the ending is more important than the content in the center, for example:

- UUIDs and hashes
- email addresses
- file paths
- blockchain addresses
- tokens and keys

## Algorithm

### Splitting the string into two parts

CSS cannot truncate text in the middle. The `text-overflow: ellipsis` property only works for overflow at the end. To hide the middle of a string, it must be split into two parts. The first part can shrink and be truncated, while the second part remains fixed and is always fully visible.

### Implementation

<figure>
  <div id="element" class="resizable-container"></div>
  <figcaption>
    <small>Resize the container using the button in the bottom right corner.</small>
  </figcaption>
</figure>

```html
<div id="element"></div>

<style>
.middle-ellipsis {
  display: inline-flex;
  overflow: hidden;
  span {
    &:first-child {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &:last-child {
      white-space: pre;
    }
  }
}
</style>
```

```ts
function applyMiddleEllipsis(
  element: HTMLElement,
  text: string,
  options: { minLimit?: number, rightLimit?: number } = {}
): void {
  const { minLimit = 15, rightLimit = 5 } = options;
  if (minLimit < rightLimit) { return; }
  if (text.length <= minLimit) {
    element.textContent = text;
    return;
  }

  element.classList.add("middle-ellipsis");

  const leftSpan = document.createElement("span");
  leftSpan.textContent = text.substring(0, text.length - rightLimit);
  const rightSpan = document.createElement("span");
  rightSpan.textContent = text.substring(text.length - rightLimit);
  element.replaceChildren(leftSpan, rightSpan);
}

const element = document.querySelector("#element");
if (!element) return;
const text = "d9428888-122b-41a6-8c41-f56f8f7478d5";
applyMiddleEllipsis(element, text);
```

### Parameters

- `minLimit` — the minimum string length after which truncation is applied. If the string is shorter than this value, it is not truncated.
- `rightLimit` — the number of characters that are guaranteed to be preserved on the right.

### Updating on resize

To track container size changes, use [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).

```ts
const observer = new ResizeObserver(() => { applyMiddleEllipsis(element, text); });
observer.observe(element);
```

## Limitations

In the shown implementation, the string is split into two parts: the right one has a fixed length, and the left one occupies all remaining space. This algorithm does not calculate the real width of the text in pixels, which can lead to incorrect behavior:

- different fonts may have different sizes and spacing
- characters such as `W` and `l` have different widths
- Cyrillic and Latin scripts differ in width

## Conclusion

For pixel-perfect accuracy, it is better to use [measureText from CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/measureText). But in most cases this approach is sufficient — no more than 30 lines of code and no new dependencies.

<script setup lang="ts">
import { onMounted } from "vue"

function applyMiddleEllipsis(
  element: HTMLElement,
  text: string,
  options: { minLimit?: number, rightLimit?: number } = {}
): void {
  const { minLimit = 15, rightLimit = 5 } = options
  if (minLimit < rightLimit) { return }
  if (text.length <= minLimit) {
    element.textContent = text
    return
  }

  element.classList.add("middle-ellipsis")

  const leftSpan = document.createElement("span");
  leftSpan.textContent = text.substring(0, text.length - rightLimit);
  const rightSpan = document.createElement("span");
  rightSpan.textContent = text.substring(text.length - rightLimit);
  element.replaceChildren(leftSpan, rightSpan);
}

function attachMiddleEllipsis(): void {
  const element = document.querySelector("#element")
  if (!element) return
  const text = "d9428888-122b-41a6-8c41-f56f8f7478d5"

  const observer = new ResizeObserver(() => { applyMiddleEllipsis(element, text) })
  observer.observe(element)

  applyMiddleEllipsis(element, text)
}

onMounted(attachMiddleEllipsis)
</script>
<style lang="scss" scoped>
.resizable-container {
  max-width: 100%;
  padding: .5rem;
  margin-top: 1rem;
  resize: horizontal;
  border: 0.25rem solid var(--vp-c-brand-3);
}
:deep(.middle-ellipsis) {
  display: inline-flex;
  overflow: hidden;
  span {
    &:first-child {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &:last-child {
      white-space: pre;
    }
  }
}
</style>
