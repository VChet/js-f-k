---
title: "Обрезание текста по центру"
description: "Как обрезать текст по центру с помощью Flexbox, text-overflow и ResizeObserver без зависимостей."
date: 2026-02-20
author: "vchet"
tags: ["css", "html"]
discussionId: 56
---

# Обрезание текста по центру

В статье по [переносу и обрезанию текста](/articles/line-wrap) был показан часто используемый пример с `text-overflow: ellipsis`, где не влезающий в контейнер текст обрезается в конце. Но есть сценарии, когда требуется отобразить конец строки, а середину скрыть. Такой приём полезен в интерфейсах, где конец важнее, чем содержимое в центре, например:

- UUID и хэши
- email-адреса
- пути к файлам
- blockchain-адреса
- токены и ключи

## Алгоритм

### Разбивка строки на две части

CSS не умеет обрезать текст в середине. Свойство `text-overflow: ellipsis` работает только для переполнения в конце. Чтобы скрыть середину строки, нужно разбить её на две части. Первая часть может сжиматься и обрезаться, а вторая часть остаётся фиксированной и всегда отображается полностью.

### Реализация

<figure>
  <div id="element" class="resizable-container"></div>
  <figcaption>
    <small>Изменяйте размер контейнера, используя кнопку в нижнем правом углу.</small>
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

### Параметры

- `minLimit` — минимальная длина строки, после которой включается обрезание. Если строка меньше этого значения, то она не обрезается.
- `rightLimit` — количество символов, которые гарантированно сохраняются справа.

### Обновление при изменении размера

Для отслеживания изменений размера контейнера используем [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).

```ts
const observer = new ResizeObserver(() => { applyMiddleEllipsis(element, text); });
observer.observe(element);
```

## Ограничения

В показанной реализации строка делится на две части: правая имеет фиксированную длину, а левая занимает всё оставшееся пространство. В этом алгоритме не вычисляется реальная ширина текста в пикселях, что может привести к некорректному поведению:

- разные шрифты могут иметь разные размеры и отступы
- символы, например `W` и `l`, занимают разную ширину
- кириллица и латиница отличаются по ширине

## Итог

Для pixel-perfect точности лучше использовать [measureText из CanvasRenderingContext2D](https://developer.mozilla.org/ru/docs/Web/API/CanvasRenderingContext2D/measureText). Но в большинстве случаев достаточно и этого подхода – не более 30 строк кода и без новых зависимостей.

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
