---
title: "Типизированные customEvents"
description: "Как реализовать типизированный CustomEvent-сервис на Vue с автодополнением, строгими типами и поддержкой useEventListener из VueUse."
date: 2025-06-23
author: ["vchet", "rudnovd"]
tags: ["typescript", "vue", "vue-use"]
---

# Типизированные customEvents

Наверно каждый разработчик хоть раз писал свой [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent)-сервис. Вот и мы написали свой. Но хотя бы типизированный.

Мы используем `window.dispatchEvent()` и `useEventListener()` из **VueUse**, но оборачиваем их, чтобы:

- обеспечить строгую типизацию названий событий и их `payload`
- иметь автодополнение при вызове событий
- заранее знать тип `event.detail` без явных проверок и `any`

## Как использовать

```ts
dispatchCustomDashboardEvent("user-created", user.id);

useDashboardEventListener("user-created", ({ detail }) => {
  state = detail; // string, не any
});
```

## Реализация

```ts
import { useEventListener, type Arrayable } from "@vueuse/core";

// Доступные события и payload описываются через интерфейс
export interface CustomDashboardEvent {
  "user-created": User["id"]
  "user-deleted": never
}
type DashboardEventName = keyof CustomDashboardEvent;

// Создание типизированного события
function createCustomDashboardEvent<EventName extends DashboardEventName>(
  eventName: EventName,
  payload?: CustomDashboardEvent[EventName]
): CustomEvent<CustomDashboardEvent[EventName]> {
  return new CustomEvent<CustomDashboardEvent[EventName]>(eventName, { detail: payload });
}

// Вызов события
export function dispatchCustomDashboardEvent<EventName extends DashboardEventName>(
  eventName: EventName,
  ...[payload]: CustomDashboardEvent[EventName] extends never ? [] : [CustomDashboardEvent[EventName]]
): void {
  window.dispatchEvent(createCustomDashboardEvent(eventName, payload));
}

// Прослушивание событий
export function useDashboardEventListener<EventName extends DashboardEventName>(
  eventName: Arrayable<EventName>,
  callback: (eventData: CustomEventInit<CustomDashboardEvent[EventName]>) => void,
  options?: AddEventListenerOptions
): void {
  useEventListener(window, eventName, callback, options);
}
```

Если вы обходитесь без глобального стора, не хотите лишних зависимостей и при этом цените строгую типизацию — возможно, вам подойдёт именно такой вариант.
