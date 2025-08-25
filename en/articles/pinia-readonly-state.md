---
title: "Pinia: prohibiting implicit state mutation"
description: "How to prohibit implicit state mutation in Pinia using TypeScript so that changes are explicit and controllable, improving application stability."
date: 2025-06-16
author: ["vchet", "rudnovd"]
tags: ["pinia", "typescript"]
---

# Pinia: prohibiting implicit state mutation

One of the main reasons to use **TypeScript** is predictability. Any data change must be intentional: we either call a function or update `ref`. But in the case of **Pinia**, the following code is possible:

```ts
const store = useDummyStore();
store.stateValue = null; // ❌ direct mutation of state, but no error
```

## Explicit vs implicit mutation

What's wrong here?

- ❌ `store.stateValue = null` — looks like an object field, but actually mutates the global store directly.
- ✅ `storeToRefs(store).stateValue.value = null` — requires a preceding step, `storeToRefs` call, and operating on `.value`, which makes the intention obvious.

This behavior is closer to `commit()` from **Vuex**: we don't just assign something, we ask the store to edit its `state`. It is this intentionality that separates good architecture from fragile architecture.

### Pinia and implicit mutations

Unlike **Vuex**, **Pinia** allows you to directly change the `state` by default. There are no `mutations` or built-in restriction. [Strict mode was discussed back in 2020](https://github.com/vuejs/pinia/issues/58), but it has not been implemented.

## How to prohibit implicit mutations

We can regain control through typing. Make `state` read-only:

```ts
// env.d.ts
declare module "pinia" {
  export interface StoreDefinition<
    Id extends string = string,
    S extends StateTree = StateTree,
    G = _GettersTree<S>,
    A = _ActionsTree
  > {
    (pinia?: Pinia | null | undefined, hot?: StoreGeneric): Store<Id, Readonly<S>, G, A>
  }
}
```

Now:

```ts
// Direct assignment
const store = useDummyStore();
store.stateValue = null; // ❌ Error: Cannot assign to 'stateValue' because it is a read-only property
// Via storeToRefs
const { stateValue } = storeToRefs(useDummyStore());
stateValue.value = null; // ✅
// Via action
store.setValue(null); // ✅
```

**Pinia** offers flexibility, but with that comes vulnerability. If you want `state` changes to always be intentional and controlled, setting `Readonly<StateTree>` is a good starting point. We are not limiting the capabilities of **Pinia**, we are simply bringing back a clear discipline that is especially needed in a team or on a long-term project.
