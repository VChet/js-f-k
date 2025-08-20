---
title: "Quick cleanup of node_modules"
description: "How to use npkill to find and delete node_modules folders with a single click — freeing up gigabytes of disk space in a couple of minutes."
hero: "/hero/npkill.gif"
date: 2025-06-25
author: "vchet"
tags: ["npm"]
---

# Quick cleanup of node_modules

[npkill](https://www.npmjs.com/package/npkill) is a CLI utility that searches for `node_modules` directories and allows you to delete them with a single keystroke.

To run:

```bash
npx npkill
```

By default, the utility will scan the current folder and all subdirectories for `node_modules`. By moving with the arrow keys and pressing `Space`, you can immediately delete any folder with packages that is found.

⚠️ `npkill` deletes directories **without confirmation**. Make sure you have `lock` files left so you can quickly restore dependencies if necessary.

Periodically cleaning up dependencies in outdated or forgotten projects can free up tens of gigabytes. `npkill` makes it quick and easy.
