---
title: "Modularity and visibility of exports"
description: "Exports from modules are visible globally, clutters autocomplete in the IDE, and prevents code encapsulation — analysis of the problem and possible workarounds."
date: 2025-08-26
author: "vchet"
tags: ["build", "unresolved"]
---

# Modularity and visibility of exports

Dividing code into small modules is good practice, but it faces a trivial encapsulation problem: entities exported from *internal* files become visible throughout the entire project. If several submodules have a function or variable with the same name, the IDE will suggest imports from all these files on autocomplete.

Neither the platform nor the language standard currently has a simple mechanism for *module visibility* — that is, a way to mark an export as accessible only within the scope of a module/folder. On the EcmaScript standards discussion forum (Ecma Technical Committee 39), there is [a thread discussing the idea](https://es.discourse.group/t/module-level-export-visibility-use-internal-directive-or-export-internal-syntax/2355) of a directive such as `‘use internal’` or a modifier such as `internal`, which would limit the scope of exports, but this remains only a proposal.

Other approaches exist, but they are compromising: unique names, explicit `namespace` specification, avoiding re-exporting conflicting entities via `barrel export`, linter rules, IDE configuration to prefer local imports. All these workarounds have their drawbacks and do not provide systematic, standard control over the visibility of exports.

Standard and ecosystem-level solutions would be desirable, but if you have any ideas for implementation, please share them in the discussion or directly in the thread at [es.discourse.group](https://es.discourse.group/t/module-level-export-visibility-use-internal-directive-or-export-internal-syntax/2355).
