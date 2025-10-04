---
title: "Typing with as const"
description: "Strict typing and immutability of objects in TypeScript: how to use as const and satisfies to validate object fields and lock literal values."
date: 2025-09-25
author: "vchet"
tags: ["typescript"]
---

# Typing with `as const`

In **TypeScript**, `as const` allows you to lock literal values and make them as specific as possible: strings won't widen to `string`, numbers won't widen to `number`, and object properties and arrays become `readonly`. This is useful when working with immutable objects or when using them as "enum-like" constructs. [Docs: `const` assertions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions)

Let's see how it works in practice, and what pitfalls appear when comparing plain typing to `as const`.

## Examples

### Explicit type annotation

```ts
type Fruit = { name: string };

const Apple: Fruit = { name: "Apple" }; // create an Apple object and annotate it as Fruit
Apple.name = "Orange"; // ⚠️ no error
```

The property remains mutable. A regular type annotation doesn't protect against changes.

### Using `as const`

```ts
const Apple = { nme: "Apple" } as const; // the object is immutable
function isFruit(payload: unknown): payload is Fruit { return payload && "name" in payload; } // a simple type guard for clarity
isFruit(Apple); // ⚠️ false
```

Here the property name is misspelled (`nme` instead of `name`), so the check fails. This shows that `as const` locks values but doesn't guarantee interface compatibility — typos or missing fields can slip through.

### Combining `as const` with an interface

It may seem natural to combine `as const` with an interface:

```ts
const Apple: Fruit = { name: "Apple" } as const;
Apple.name = "Orange"; // ⚠️ no error
```

But in practice, `as const` gets "is discarded": the type is narrowed to `{ name: string }`, so the property becomes mutable again.

### `Readonly`

```ts
const Apple: Readonly<Fruit> = { name: "Apple" };
Apple.name = "Orange"; // ✅ compile-time error
```

This approach prevents property mutation, and the `Fruit` type ensures field names are correct. But there's a catch: the IDE shows Apple's type as `{ name: string }`, not the literal `{ name: "Apple" }`. The "specific type" is lost — which is often the main reason for using `as const`.

### `ReadonlyDeep`

If `Readonly` is enough for you, keep in mind it only works at the top level: nested objects and arrays stay mutable. In such cases, it's better to use [`ReadonlyDeep` from type-fest](https://github.com/sindresorhus/type-fest/blob/v5.0.1/source/readonly-deep.d.ts). It recursively makes all properties immutable.

## The solution

To both lock values and validate structure, use the `satisfies` operator. It checks that an expression is compatible with a given type while preserving the original (more specific) type for inference. [Docs: satisfies operator](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator)

```ts
const Apple = { name: "Apple" } as const satisfies Fruit;
Apple.name = "Orange"; // ✅ compile-time error
```

With `as const satisfies %type%`, TypeScript validates object fields correctly, `as const` preserves literal immutability, and attempts to reassign a property are caught at compile time.

## Conclusion

`as const satisfies` is a straightforward way to achieve two goals at once: keep object values immutable and ensure the structure matches the interface. It's especially useful for large objects, such as configs, where typos or type mismatches are easy to make.
