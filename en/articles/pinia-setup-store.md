---
title: "Pinia: is it worth using setup store"
description: "Let's figure out whether it's worth using setup store in Pinia: pros, limitations, and why option store remains a reliable choice for most projects."
date: 2025-06-11
author: "vchet"
tags: ["pinia"]
---

# Pinia: is it worth using setup store

The Pinia documentation describes two ways to create a store: [`setup store`](https://pinia.vuejs.org/core-concepts/#Setup-Stores) and [`option-store`](https://pinia.vuejs.org/core-concepts/#Option-Stores).

**Option syntax:**

```js
export const useCounter = defineStore("counter", {
  state: () => ({ count: 0 }),
  actions: {
    increment() { this.count++; }
  }
});
```

**Setup syntax:**

```js
export const useCounter = defineStore("counter", () => {
  const count = ref(0);
  function increment() { count.value++; }
  return { count, increment };
});
```

`Setup store` allows you to use `Composition API` inside the store, but it has its own limitations:

> - You must manually return all state properties and methods from `setup()`.
> - Missing values will cause problems with SSR, Vue Devtools, and third-party plugins.
> - Typing and linting work with limitations, and there are no TS/ESLint checks.

Additionally: private state is only possible through separate store instances — for example, like this:

```js
const usePrivateState = defineStore("store-private", () => {
  const secret = ref("Never seen outside");
  return { secret };
});

export const useStore = defineStore("store", () => {
  const privateState = usePrivateState();
  const censoredSecret = computed(() => "*".repeat(privateState.secret.length));
  return { censoredSecret };
});
```

More details:
– [Pinia docs: Setup Stores](https://pinia.vuejs.org/core-concepts/#setup-stores)
– [Mastering Pinia: Private State](https://masteringpinia.com/blog/how-to-create-private-state-in-stores)

So, you *can* use `setup store`, but we don't recommend it until its architecture is clear and errors are caught by tools. For most projects, it's better to keep using `option store` — it's safer, more transparent, and better supported.
