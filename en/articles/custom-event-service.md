---
title: "Typed customEvents"
description: "How to implement a typed CustomEvent service in Vue with autocompletion, strict types, and useEventListener support from VueUse."
date: 2025-06-23
author: ["vchet", "rudnovd"]
tags: ["typescript", "vue", "vue-use"]
---

# Typed customEvents

Probably every developer has written their own [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) service at least once. So we wrote ours. But at least it's typed.

We use `window.dispatchEvent()` and `useEventListener()` from **VueUse**, but wrap them to:

- ensure strict typing of event names and their `payload`
- have autocomplete when calling events
- know the type of `event.detail` in advance without explicit checks and `any`

## How to use

```ts
dispatchCustomDashboardEvent("user-created", user.id);

useDashboardEventListener("user-created", ({ detail }) => {
  state = detail; // string instead of any
});
```

## Implementation

```ts
import { useEventListener, type Arrayable } from "@vueuse/core";

// Available events and payloads are described via the interface
export interface CustomDashboardEvent {
  "user-created": User["id"]
  "user-deleted": never
}
type DashboardEventName = keyof CustomDashboardEvent;

// Creating a typed event
function createCustomDashboardEvent<EventName extends DashboardEventName>(
  eventName: EventName,
  payload?: CustomDashboardEvent[EventName]
): CustomEvent<CustomDashboardEvent[EventName]> {
  return new CustomEvent<CustomDashboardEvent[EventName]>(eventName, { detail: payload });
}

// Dispatching an event
export function dispatchCustomDashboardEvent<EventName extends DashboardEventName>(
  eventName: EventName,
  ...[payload]: CustomDashboardEvent[EventName] extends never ? [] : [CustomDashboardEvent[EventName]]
): void {
  window.dispatchEvent(createCustomDashboardEvent(eventName, payload));
}

// Listening to events
export function useDashboardEventListener<EventName extends DashboardEventName>(
  eventName: Arrayable<EventName>,
  callback: (eventData: CustomEventInit<CustomDashboardEvent[EventName]>) => void,
  options?: AddEventListenerOptions
): void {
  useEventListener(window, eventName, callback, options);
}
```

If you avoid using a global store, don't want unnecessary dependencies, and value strict typing, this approach may be right for you.
