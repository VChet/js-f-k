---
title: "Vue, TypeScript, and imported types: what could go wrong?"
description: "Why do Vue components in defineProps not work correctly with imported types? How does props compilation work, and why does local type declaration help."
date: 2025-07-10
author: ["vchet", "rudnovd"]
tags: ["typescript", "vue", "unresolved"]
---

# Vue, TypeScript, and imported types: what could go wrong?

When you use `defineProps` in Vue with TypeScript, the Vue compiler performs [reverse type generation](https://vuejs.org/guide/typescript/composition-api.html#typing-component-props): from interfaces, annotations, and default values (`default`), it generates [JS constructors](https://vuejs.org/guide/components/props#runtime-type-checks) — `Boolean`, `String`, `Object`, and so on. These constructors are then used in the compiled component at runtime.

The compiler will do its best to infer equivalent runtime parameters based on the type arguments. But this doesn't always work.

## Problem: Boolean breaks when imported

As of `vue@3.5.*`, if prop types are imported rather than defined directly inside the component, Vue may incorrectly infer the `Boolean` type when using `shorthand` syntax.

### Example

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
  disabled?: InputHTMLAttributes["disabled"] // imported type
  sampleBooleanProp?: boolean
}
```

### Result

```html
<!-- Props not provided. Defaults should apply -->
<Comp/>
<!-- ✅ Works as expected. disabled: false, sampleBooleanProp: false -->

<!-- Props explicitly set to true -->
<Comp :disabled="true" :sampleBooleanProp="true"/>
<!-- ✅ Works as expected. disabled: true, sampleBooleanProp: true -->

<!-- Props explicitly set to false -->
<Comp disabled="false" sampleBooleanProp="false"/>
<!-- ✅ Works as expected. disabled: false, sampleBooleanProp: false -->

<!-- Shorthand syntax should imply true -->
<Comp disabled sampleBooleanProp/>
<!-- ❌ Bug. disabled: '' (empty string), sampleBooleanProp: true -->
```

As shown, when the `disabled` prop is used without a value, Vue sets it to an empty string rather than the expected `true`. This means Vue didn't generate a `Boolean` constructor for `disabled` — it failed to infer the correct type from the imported interface.

## Fix

If you switch to a locally declared type, everything works as intended.

```ts
// types.ts
// local interface, identical to InputHTMLAttributes
interface InputHTMLAttributes_Local { disabled: boolean | "true" | "false" }

export interface Props {
  disabled?: InputHTMLAttributes_Local["disabled"] // local equivalent
  sampleBooleanProp?: boolean
}
```

In this case, TypeScript passes more complete information about local types to Vue AST, and Vue correctly uses the `Boolean` constructor.

### Try it yourself

If you want to experiment: [Open demo on Vue Playground](https://play.vuejs.org/#eNqVVNtO20AQ/ZWRXwxSsFVRXoybClqkUtEWtbzVFfJlnBjWu9buOhel+ffO7sZ2AAPlIcnuzOw5Z27ZeGdNEyxa9CIvVrmsGg0KddsAS/nsQ+JplXjThFd1I6SGT6JuoJSiBj8IzcU89U8THofuMYXSRWPdsFQj3QDixv4AcKGhSZXCIoC6VRoyhDJlCm1U6MJiSxG681xavD0M9x4WKWtRDTBatiMoUVGpNGNYmDxMhAdRvT7KhGCY8qNGimbwvJXyGeX7nC5klLRzvcZ6j2sFgrP1a7l2tPCIyzLEYd8Rb0ItzQUvq1lwpwSnvm8MSuLlBFMxlD8aXQlObY/AeowvZUwsv1qboZ909nyO+f2I/U6tjC3xriUqlAtKtffpVM5QO/fFr++4onPvrEXRMop+wfkTlWCt0ejCzltekOy9OKv20k5sxWc36mKlkasuqa5+WxufeDTBpoLPpT7IPQ7e23cJ31IVu+n/v8XZ2NW5poYo2PYbpNcNjZRWvmn+stLzz1imLdPqoMCy4mjjbX/taXpwOHHCum5HbgxtJvX63PXdxO4cJPXwxeUcgOJsutkMY7TdxmE2hQOyGZWi3HcRJs1dZob2Ca/DeWAcAXvs30PcG9aEm3HdFYkK3Rfzkjet/nLz7epMa1llrca+rLahiXeaSMqWPmEIVyJPGVRcoyzTHCdQFch1ZYxajGGZd334WMCtgxzqFcFu6eAv+GbCfHOwPfBJWScGVzaBAXuYio3xA5Bc8z+5FPKeZncCyzlycHnT3ZbP5cmqzL3oJHyMxpT+9ju//2fSybA0DylaZeCZTcuQ9GEvw7tCPCGhxbHfD9pMCLsiGafZodsFSrOX1Nrj4CR4d+Jt/wGCkz4F)

## Conclusion

If your `shorthand` props behave strangely, the problem is likely caused by Vue failing to infer types from imported interfaces. For now, the only solution is to declare types locally or avoid `shorthand` syntax.

If you know another workaround — let us know, we'd love to dig deeper!
