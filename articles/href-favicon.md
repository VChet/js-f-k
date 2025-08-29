---
title: "Добавление иконки перед ссылкой"
description: "Как с помощью CSS автоматически добавлять иконки к ссылкам на внешние ресурсы — без JavaScript и с учётом безопасности."
date: 2025-06-27
author: "vchet"
tags: ["css"]
discussionId: 19
---

# Добавление иконки перед ссылкой

Чтобы ссылка на внешний ресурс выглядела более узнаваемо, можно добавить к ней иконку, используя только **CSS**:

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

Работает для всех ссылок, в `href` которых встречается нужный домен.

## Больше гибкости

**Отображение разных иконок для одного домена:**

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

**Результат:**

<div class="links-demo">
  <a href="https://github.com/vuejs/vue">Vue Repo</a>
  <a href="https://github.com/vuejs/vue/pulls">Vue Pull Requests</a>
</div>

## ⚠️ Безопасность

Можно указать ссылку на `favicon` напрямую:

```css
a[href*="github.com"]::before {
  background-image: url("https://github.com/favicon.ico");
}
```

Но есть нюансы:

- такие запросы подчиняются **CORS**-политике, и браузер может заблокировать загрузку;
- запросы к `favicon` являются внешними — они могут обмениваться куками и оставлять след в логах целевого сайта.

Поэтому рекомендуется хранить иконки на сервере, либо вставлять их в формате `base64`.

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
