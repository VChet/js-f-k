---
title: "Rejecting scoped styles in Vue"
description: "Analyzing when to use <style scoped> in Vue and when unique class names are sufficient."
date: 2026-03-17
author: "vchet"
tags: ["build", "css", "vue"]
---

# Rejecting scoped styles in Vue

When working with Vue, many habitually use `<style scoped>`, limiting styles to the current component. Let's figure out if this is really necessary, or if it's an outdated habit we can abandon.

## `scoped` in Vue

`<style scoped>` adds a unique attribute like `data-v-xxxx` to each selector.

```vue
<template>
  <button class="button">
    Click
  </button>
</template>
<style scoped>
.button { color: red; }
</style>
```

Compiles to:

```css
.button[data-v-1234] { color: red; }
```

- Pros: complete style isolation, no collisions. Such styles are easy to transfer between projects and you don't risk accidentally affecting existing ones.
- Cons: slight runtime/compile overhead, CSS bloat due to added hashes.

Scoped is convenient for quick prototypes, but for large projects it's often unnecessary load.

## `module` in Vue

Vue supports another isolation method — **CSS Modules**, via `<style module>`.

```vue
<template>
  <button :class="$style.button">
    Click
  </button>
</template>
<style module>
.button { color: red; }
</style>
```

Classes get unique names at compile time (e.g. `button_abc123`) and access via `$style` object.

- Pros: complete isolation, convenient for dynamic classes, can combine with BEM.
- Cons: syntax a bit more complex (`$style` instead of plain class), more boilerplate, not as clear for people used to plain CSS.

If BEM is already followed, CSS Modules are often unnecessary, but can be useful for components with dynamic classes.

## Unique Class Names (BEM)

If the project uses strict naming, like **BEM** (Block-Element-Modifier), `scoped` can be avoided. Block classes are already unique, and child elements and modifiers are limited to the block scope:

```vue
<style>
.block {
  display: flex;
  flex-direction: column;
  &__element {
    flex-basis: 50%;
  }
  &--modifier {
    flex-direction: row;
  }
}
</style>
```

- Pros: plain CSS without `data-v-xxxx`, reduced bundle size, no runtime/compile overhead. No collisions with strict BEM following.
- Cons: requires following BEM naming, which not everyone likes, slight increase in code review time.

This option suits teams with code review and established development standards.

## Validation of classes and styles

Compliance with these rules can be automated with linters.

- Stylelint — forbid non-BEM classes:

```json
{
  "selector-class-pattern": "[a-z]([a-z-]+)?(__([a-z]+-?)+)?(--([a-z]+-?)+){0,2}"
}
```

- ESLint — forbid `scoped` in `<style>` of Vue components:

```json
{
  "vue/enforce-style-attribute": ["error", { "allow": ["plain"] }]
}
```

## Conclusion

- Scoped styles can be safely avoided if strict BEM is applied.
- CSS without `scoped` reduces bundle size and runtime load.
- Linters `stylelint` and `eslint` will help speed up migration and prevent future errors.
- Scoped remains a safe and acceptable approach, but only if you understand the cost of its use.
