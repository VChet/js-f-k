---
title: "Pinia: стоит ли использовать setup store"
date: 2025-06-11
tags: ["pinia"]
---

**Pinia: стоит ли использовать setup store**

Документация Pinia описывает два способа создания стора: [`setup store`](https://pinia.vuejs.org/core-concepts/#Setup-Stores) и [`option-store`](https://pinia.vuejs.org/core-concepts/#Option-Stores).

**Option-синтаксис:**

```js
export const useCounter = defineStore("counter", {
  state: () => ({ count: 0 }),
  actions: {
    increment() { this.count++; }
  }
});
```

**Setup-синтаксис:**

```js
export const useCounter = defineStore("counter", () => {
  const count = ref(0);
  function increment() { count.value++; }
  return { count, increment };
});
```

`Setup store` позволяет использовать `Composition API` внутри стора, но имеет ряд ограничений:
> Необходимо вручную вернуть все переменные и методы из setup().
> Пропущенные значения приведут к проблемам с SSR, Vue Devtools и сторонними плагинами.
> Типизация и линтинг работают ограниченно, проверки на уровне TS/ESLint отсутствуют.

Дополнительно: приватное состояние возможно только через отдельные store-инстансы — например, так:

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

Подробнее:
– [Pinia docs: Setup Stores](https://pinia.vuejs.org/core-concepts/#setup-stores)
– [Mastering Pinia: Private State](https://masteringpinia.com/blog/how-to-create-private-state-in-stores)

Таким образом, можно использовать `setup store`, однако мы не рекомендуем это делать, пока его архитектура остаётся неочевидной, а ошибки не выявляются инструментами.
В большинстве проектов предпочтительнее продолжать использовать `option store` — он безопаснее, прозрачнее и лучше поддерживается.
