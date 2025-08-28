---
title: "How I wrote my Stylelint plugin"
description: "How to create a custom Stylelint plugin: from the basic API to autofix support. Parse CSS tokens using PostCSS without manual value replacement."
date: 2025-07-15
author: "vchet"
tags: ["linters"]
---

# How I wrote my Stylelint plugin

## Introduction

In our project, we use design system tokens exported from **Figma**. All sizes, indents, colors, shadows, and fonts are hardcoded into predefined tokens so that we can develop according to guidelines without having to remember exact values.

One day, the design team decided to switch to a new naming system, changing the names of about 200 tokens. Making this change is not that difficult within the library, but it is much more difficult to roll it out across all projects, which means tens of thousands of lines that need to be replaced manually.

The solution was to learn and write our own Stylelint plugin that would do all this automatically. It sounds simple, but the [documentation](https://stylelint.io/developer-guide/plugins) turned out to be unexpectedly sparse, and articles on the internet described solutions using *outdated APIs*.

## Implementation

To make the plugin work, you'll need:

1. An entry point to hook the plugin into `stylelint.config.js`;
1. A main `ruleFunction` containing the rule logic;
1. A `walkDecls` method to traverse the `root` AST tree and process all its nodes;
1. A `report` utility to send error notifications to Stylelint;
1. A `createPlugin` function to build a plugin instance with the required parameters.

### Creating an entry point

```js
// index.js
import noLegacyTokens from "./rules/no-legacy-tokens.js";

export default {
  plugins: [noLegacyTokens], // add our plugin
  rules: {
    // enable the rule so that developers don't have to do it themselves
    "lib/legacy-tokens": [true]
  }
};
```

### Creating a mapping file for old and new tokens

Most likely, this file will be provided to you by designers — it can be generated from **Figma**. No need to write it manually.

```js
// mappings.js
export default {
  // ...
  $c6: "$border_main",
  // ...
  $s6: "$space_10",
  $s12: "$space_20",
  // ...
  $r4: "$radius_8",
  // ...
  $a5: "$text_main",
  // ...
  $XL: "$font_header"
};
```

### Creating a rule logic file

Write the basic structure with the main function `ruleFunction` and plugin export.

```js
// rules/no-legacy-tokens.js
import stylelint from "stylelint";

const ruleName = "lib/legacy-tokens"; // rule name

function ruleFunction(enabled) {
  return (root, result) => { }; // rule logic
}

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;

export default createPlugin(ruleName, ruleFunction); // create and export plugin instance
```

### Writing a parser

Parsing is performed using [postcss-value-parser](https://www.npmjs.com/package/postcss-value-parser). It allows us to traverse each node of the AST tree and check for compliance with the requirements.

```js
// rules/no-legacy-tokens.js
import valueParser from "postcss-value-parser";

function ruleFunction(enabled) {
  return (root, result) => {
    if (!enabled) { return; } // do nothing if rule is off

    root.walkDecls((decl) => { // get the `root` of the AST tree and go through all declarations
      const parsedValue = valueParser(decl.value);
      parsedValue.walk((node) => { // go through each node
        report({ }); // send a notification to Stylelint
      });
    });
  };
}
```

### Defining rules for declarations

```js
import mappings from "../mappings";

root.walkDecls((decl) => {
  const parsedValue = valueParser(decl.value);
  parsedValue.walk((node) => {
    if (node.type !== "word") { return; } // ignore functions
    const replacement = mappings[node.value]; // look for an exact match in the mapping
    if (!replacement) { return; } // ignore mismatches

    report({ // pass the error context in the parameters
      message: messages.rejected(node.value, replacement),
      node: decl,
      result,
      ruleName,
      word: node.value
    });
  });
});
```

### Adding interpolation token checks

Token interpolation is an entry of the form `--border-color: #{$c6}`.

```js
if (node.value.startsWith("#")) {
  const matches = node.value.match(/#\{(\$\w+)\}/); // match values like "#{$c6}"
  const [raw, token] = matches; // raw: "#{$c6}", token: "$c6"
  const suggestion = mappings[token]; // find mapping "$c6": "$border_main"
  replacement = raw.replace(token, suggestion); // replace $c6 with $border_main
}
```

### Adding `atRule` function checks for `include`

`atRule` refers to constructs such as `@include`, `@media`, and `@keyframes`. In our case, we only process `@include`.

```js
root.walkAtRules("include", (atRule) => { // go through all `@include`
  const parsedValue = valueParser(atRule.params);
  parsedValue.walk((node) => { }); // same replacement and report logic as for declarations
});
```

### Adding `autofix` support

```js
const meta = { fixable: true };
ruleFunction.meta = meta;

parsedValue.walk((node) => {
  // ...
  report({
    // ...
    fix: () => {
      node.value = replacement;
      parsedValue.modified = true;
    }
  });
});
// if anything was changed — update the whole string
if (parsedValue.modified) { decl.value = parsedValue.toString(); }
```

### Final code

Since the logic is repeated, I moved the node check to a separate function `handleWordNode`.

```js
// rules/no-legacy-tokens.js
import valueParser from "postcss-value-parser";
import stylelint from "stylelint";
import mappings from "../mappings.js";

const { createPlugin, utils: { ruleMessages, report } } = stylelint;

const ruleName = "lib/legacy-tokens";
const messages = ruleMessages(ruleName, {
  rejected: (value, suggestion) => `Legacy token "${value}". Use "${suggestion}" instead`
});
const meta = { fixable: true };

function ruleFunction(enabled) {
  return (root, result) => {
    if (!enabled) { return; }

    function handleWordNode(node, declOrAtRule, parsedValue) {
      let replacement;
      if (node.value.startsWith("#")) {
        const matches = node.value.match(/#\{(\$\w+)\}/);
        if (!matches) { return; }
        const [raw, token] = matches;
        const suggestion = mappings[token];
        if (!suggestion) { return; }
        replacement = raw.replace(token, suggestion);
      } else {
        replacement = mappings[node.value];
        if (!replacement) { return; }
      }

      report({
        message: messages.rejected(node.value, replacement),
        node: declOrAtRule,
        result,
        ruleName,
        word: node.value,
        fix: () => {
          node.value = replacement;
          parsedValue.modified = true;
        }
      });
    }

    root.walkDecls((decl) => {
      const parsedValue = valueParser(decl.value);
      parsedValue.modified = false;
      parsedValue.walk((node) => {
        if (node.type !== "word") { return; }
        handleWordNode(node, decl, parsedValue);
      });
      if (parsedValue.modified) { decl.value = parsedValue.toString(); }
    });

    root.walkAtRules("include", (atRule) => {
      const parsedValue = valueParser(atRule.params);
      parsedValue.modified = false;

      parsedValue.walk((node) => {
        if (node.type !== "word") { return; }
        handleWordNode(node, atRule, parsedValue);
      });

      if (parsedValue.modified) { atRule.params = parsedValue.toString(); }
    });
  };
}

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;
ruleFunction.meta = meta;

export default createPlugin(ruleName, ruleFunction);
```

### Connecting the plugin

```js
// stylelint.config.js
export default {
  extends: ["./src/stylelint-config"]
  // ...
};
```

## Result

### Example

```scss
div {
  --border-color: #{$c6};
  width: $s12;
  height: calc($s6 * 2);
  color: $a5;
  border: $r4;
  @include font($XL);
}
```

```bash
stylelint **/*{.scss,.vue} --fix
```

```scss
div {
  --border-color: #{$border_main};
  width: $space_20;
  height: calc($space_10 * 2);
  color: $text_main;
  border: $radius_8;
  @include font($font_header);
}
```

### Distribution

I didn't need to publish a separate package because developers preferred having the plugin bundled directly with the component library. Therefore, we add the plugin to the build.

```js
// vite.config.js
import copy from "rollup-plugin-copy";

plugins: [
  copy({
    targets: [{ src: "src/stylelint-config/*", dest: "dist/stylelint-config" }]
  })
];
```

```json
// package.json
{
  "exports": {
    "./stylelint-config": "./dist/stylelint-config/index.js"
  }
}
```

Now, when using the library, you can immediately use the built-in Stylelint plugin.

```js
// stylelint.config.js
export default {
  extends: ["./lib/stylelint-config"]
};
```

## Summary

Automating processes like this is not just about saving time — it reduces the chance of human error and standardizes workflows across projects. A couple of hours of work gives you a tool that spares the team dozens of tedious edits and enforces a consistent standard everywhere.
