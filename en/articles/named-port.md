---
title: "How to Pin a Port to a Project and Avoid Collisions"
description: "How to avoid localStorage, cookie, and service worker conflicts between projects — automatic port assignment based on package.json."
date: 2026-04-07
author: "vchet"
tags: ["npm"]
---

# How to Pin a Port to a Project and Avoid Collisions

If you have several frontend projects (especially those using Vue or other SPA frameworks), they almost certainly use the same dev port by default — usually `3000` or `5173`. When multiple projects use the same port, this sooner or later leads to errors, because from the browser's perspective it's the same environment: shared `localStorage`, shared `cookie`, shared `service workers`.

## The Problem

As a result, you can encounter:

- data being overwritten (e.g., tokens)
- unexpected authorizations
- broken pages with no obvious cause
- cache from another project

The `service worker` becomes particularly problematic — it can start serving an entirely different project.

## Manual Solution

You can set the port manually:

```ts
// vite.config.ts
export default defineConfig({
  server: {
    port: 7000
  }
});
```

But as the number of projects grows, a new problem emerges — you need to remember which ports are taken and track collisions.

## Automatic Solution

The solution is to use the [named-port](https://www.npmjs.com/package/named-port) package.

`named-port` solves the problem differently: it deterministically calculates the port based on the provided string. This way, each project gets its own stable port based on its name or any arbitrary string.

## Usage

```bash
npm install --save-dev named-port
```

```ts
// vite.config.ts
import process from "node:process";
import namedPort from "named-port";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: namedPort(process.env.npm_package_name)
  }
});
```

Now the port depends on the `name` field from `package.json`. The key difference is predictability: the port is not random, you don't need to remember it, and it's the same on all machines.

## Configuration

```ts
// pass an arbitrary string as an argument
namedPort("custom-key");
// change the port range (default is 1024..65535)
namedPort("my-app", { min: 3000, max: 3999 });
```

## Summary

`named-port` is a small utility that helps avoid collisions when working with multiple projects and eliminates an entire class of non-obvious bugs. The port becomes a stable and unique property of the project.
