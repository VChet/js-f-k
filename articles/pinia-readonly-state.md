---
title: "Pinia: запрет неявной мутации state"
description: "Как запретить неявную мутацию состояния в Pinia с помощью TypeScript, чтобы изменения были явными и контролируемыми, улучшая стабильность приложения."
date: 2025-06-16
author: ["vchet", "rudnovd"]
tags: ["pinia", "typescript"]
discussionId: 14
---

# Pinia: запрет неявной мутации state

Одна из главных причин использовать **TypeScript** — это предсказуемость. Любое изменение данных должно быть намеренным: мы либо вызываем функцию, либо обновляем `ref`. Но в случае с **Pinia** возможен такой код:

```ts
const store = useDummyStore();
store.stateValue = null; // ❌ прямая мутация state, но нет ошибки
```

## Явная vs неявная мутация

Что здесь не так?

- ❌ `store.stateValue = null` — выглядит как поле объекта, но на самом деле мутирует глобальное хранилище напрямую.
- ✅ `storeToRefs(store).stateValue.value = null` — требует предварительного шага, вызов `storeToRefs`, и работы с `.value`, что делает намерение очевидным.

Такое поведение ближе к `commit()` из **Vuex**: мы не просто что-то присваиваем, мы просим хранилище редактировать свой `state`. Именно эта намеренность и отделяет хорошую архитектуру от хрупкой.

### Pinia и неявные мутации

В отличие от **Vuex**, **Pinia** по умолчанию позволяет напрямую менять `state`. Нет ни `mutations`, ни встроенного запрета. [strict режим обсуждался ещё в 2020](https://github.com/vuejs/pinia/issues/58), но так и остался не реализован.

## Как запретить неявные мутации

Мы можем вернуть контроль сами через типизацию. Делаем `state` доступным только для чтения:

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

Теперь:

```ts
// Прямое присваивание
const store = useDummyStore();
store.stateValue = null; // ❌ Error: Cannot assign to 'stateValue' because it is a read-only property
// Посредством storeToRefs
const { stateValue } = storeToRefs(useDummyStore());
stateValue.value = null; // ✅
// Посредством action
store.setValue(null); // ✅
```

**Pinia** предлагает гибкость, но вместе с ней — уязвимость. Если вы хотите, чтобы изменения `state` всегда были преднамеренными и контролируемыми, настройка `Readonly<StateTree>` — хорошая отправная точка. Мы не ограничиваем возможности **Pinia**, мы лишь возвращаем понятную дисциплину, которая особенно нужна в команде или на долгосрочном проекте.
