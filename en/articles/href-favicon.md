---
title: "Adding an icon before a link"
description: "How to automatically add icons to links to external resources using CSS — without JavaScript and with security in mind."
date: 2025-06-27
author: "vchet"
tags: ["css"]
---

# Adding an icon before a link

To make a link to an external resource more recognizable, you can add an icon to it using only **CSS**:

```css
a[href*="github.com"]::before {
  display: inline-block;
  width: 1em;
  height: 1em;
  margin-right: 0.3em;
  content: "";
  background-image: url('/assets/icons/github.svg');
  background-repeat: no-repeat;
  background-size: contain;
}
a[href*="t.me"]::before {
  display: inline-block;
  width: 1em;
  height: 1em;
  margin-right: 0.3em;
  content: "";
  background-image: url('/assets/icons/telegram.svg');
  background-repeat: no-repeat;
  background-size: contain;
}
```

Works for all links that contain the desired domain in `href`.

## More flexibility

**Displaying different icons for the same domain:**

```css
a[href^="https://github.com"] {
  --icon: url('/assets/icons/github-icon.svg');
  &[href*="/pulls"] {
    --icon: url('/assets/icons/github-pull-icon.svg');
  }
  &::before {
    display: inline-block;
    width: 1em;
    height: 1em;
    margin-right: 0.3em;
    content: "";
    background-image: var(--icon);
    background-repeat: no-repeat;
    background-size: contain;
  }
}
```

**Result:**

<div class="links-demo">
  <a href="https://github.com/vuejs/vue">Vue Repo</a>
  <a href="https://github.com/vuejs/vue/pulls">Vue Pull Requests</a>
</div>

## ⚠️ Security

You can specify a link to the `favicon` directly:

```css
a[href*="github.com"]::before {
  background-image: url("https://github.com/favicon.ico");
}
```

But there are some drawbacks:

- such requests are subject to **CORS** policy, and the browser may block the download.
- requests to `favicon` are external — they can exchange cookies and leave traces in the target site's logs.

Therefore, it is recommended to store icons on the server or embed them in `base64` format.

<style lang="scss" scoped>
.links-demo {
  display: grid;
  gap: 0.5rem;
  a[href^="https://github.com"] {
  --icon: url('./images/github-icon.svg');
    display: inline-flex;
    gap: 0.125rem;
    align-items: center;
    &[href*="/pulls"] {
      --icon: url('./images/github-pull-icon.svg');
    }
    &::before {
      display: inline-block;
      width: 1em;
      height: 1em;
      margin-right: 0.4em;
      content: "";
      background-image: var(--icon);
      background-repeat: no-repeat;
      background-size: contain;
      @media (prefers-color-scheme: dark) {
        filter: invert(1);
      }
    }
  }
}
</style>
