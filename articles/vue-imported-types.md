---
title: "Vue, TypeScript и импортированные типы: что может пойти не так?"
description: "Почему Vue-компоненты в defineProps работают некорректно с импортированными типами? Как работает компиляция props, и почему помогает локальное объявление типов."
date: 2025-07-10
tags: ["typescript", "vue"]
---

# Vue, TypeScript и импортированные типы: что может пойти не так?

Когда вы используете `defineProps` в Vue с TypeScript, компилятор Vue запускает [обратную генерацию типов](https://ru.vuejs.org/guide/typescript/composition-api.html#typing-component-props): из интерфейсов, аннотаций и значений по умолчанию (`default`) создаются [JS-конструкторы](https://ru.vuejs.org/guide/components/props#runtime-type-checks) — `Boolean`, `String`, `Object` и другие. Именно они потом используются в скомпилированном компоненте в рантайме.

Компилятор постарается сделать всё возможное, чтобы вывести эквивалентные параметры времени выполнения, основанные на аргументах типа. Но сработает это не всегда.

## Проблема: неработающий Boolean при импорте

На момент `vue@3.5.*`, если типы пропов импортируются, а не определяются прямо в компоненте — Vue может некорректно вывести тип `Boolean` при использовании `shorthand`-синтаксиса.

### Пример

```vue
<!-- Comp.vue -->
<script setup lang="ts">
import { Props } from "./types";

withDefaults(defineProps<Props>(), {
  disabled: false,
  sampleBooleanProp: false
});
</script>
```

```ts
// types.ts
import { InputHTMLAttributes } from "vue";

export interface Props {
  disabled?: InputHTMLAttributes["disabled"] // импортированный тип
  sampleBooleanProp?: boolean
}
```

### Результат

```html
<!-- Пропы не указаны. Должны примениться значения по умолчанию -->
<Comp/>
<!-- ✅ Работает верно. disabled: false, sampleBooleanProp: false -->

<!-- Пропы указаны со значениями. Должны примениться значения true -->
<Comp :disabled="true" :sampleBooleanProp="true"/>
<!-- ✅ Работает верно. disabled: true, sampleBooleanProp: true -->

<!-- Пропы указаны со значениями. Должны примениться значения false -->
<Comp disabled="false" sampleBooleanProp="false"/>
<!-- ✅ Работает верно. disabled: false, sampleBooleanProp: false -->

<!-- Пропы указаны в shorthand-формате. Должны примениться значения true -->
<Comp disabled sampleBooleanProp/>
<!-- ❌ Ошибка. disabled: '' (пустая строка), sampleBooleanProp: true -->
```

Как видно из примера — если не передавать в проп `disabled` значение, то вместо ожидаемого `true`, проп равен пустой строке. То есть Vue не сгенерировал конструктор `Boolean` для `disabled` — он не смог вывести правильный тип из импортированного интерфейса.

## Решение

Если поменять тип на локально объявленный, всё работает верно.

```ts
// types.ts
// локальный интерфейс, полностью идентичен InputHTMLAttributes
interface InputHTMLAttributes_Local { disabled: boolean | "true" | "false" }

export interface Props {
  disabled?: InputHTMLAttributes_Local["disabled"] // локальный аналог
  sampleBooleanProp?: boolean
}
```

В таком случае TypeScript передаёт в Vue AST более полную информацию о локальных типах, и Vue корректно использует конструктор `Boolean`.

### Проверить самостоятельно

Если хотите поэкспериментировать: [Открыть демо на Vue Playground](https://play.vuejs.org/#eNqVVNtO20AQ/ZWRXwxSsFVRXoybClqkUtEWtbzVFfJlnBjWu9buOhel+ffO7sZ2AAPlIcnuzOw5Z27ZeGdNEyxa9CIvVrmsGg0KddsAS/nsQ+JplXjThFd1I6SGT6JuoJSiBj8IzcU89U8THofuMYXSRWPdsFQj3QDixv4AcKGhSZXCIoC6VRoyhDJlCm1U6MJiSxG681xavD0M9x4WKWtRDTBatiMoUVGpNGNYmDxMhAdRvT7KhGCY8qNGimbwvJXyGeX7nC5klLRzvcZ6j2sFgrP1a7l2tPCIyzLEYd8Rb0ItzQUvq1lwpwSnvm8MSuLlBFMxlD8aXQlObY/AeowvZUwsv1qboZ909nyO+f2I/U6tjC3xriUqlAtKtffpVM5QO/fFr++4onPvrEXRMop+wfkTlWCt0ejCzltekOy9OKv20k5sxWc36mKlkasuqa5+WxufeDTBpoLPpT7IPQ7e23cJ31IVu+n/v8XZ2NW5poYo2PYbpNcNjZRWvmn+stLzz1imLdPqoMCy4mjjbX/taXpwOHHCum5HbgxtJvX63PXdxO4cJPXwxeUcgOJsutkMY7TdxmE2hQOyGZWi3HcRJs1dZob2Ca/DeWAcAXvs30PcG9aEm3HdFYkK3Rfzkjet/nLz7epMa1llrca+rLahiXeaSMqWPmEIVyJPGVRcoyzTHCdQFch1ZYxajGGZd334WMCtgxzqFcFu6eAv+GbCfHOwPfBJWScGVzaBAXuYio3xA5Bc8z+5FPKeZncCyzlycHnT3ZbP5cmqzL3oJHyMxpT+9ju//2fSybA0DylaZeCZTcuQ9GEvw7tCPCGhxbHfD9pMCLsiGafZodsFSrOX1Nrj4CR4d+Jt/wGCkz4F)

## Итог

Если вы столкнулись с тем, что `shorthand`-пропы ведут себя странно — вероятно, проблема в неправильно выведенном типе из импортированного интерфейса. Пока единственное решение — объявить типы локально или отказаться от `shorthand`-синтаксиса.

Если вам известно другое решение — пишите, будет интересно разобраться!
