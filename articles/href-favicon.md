---
title: "Добавление иконки перед ссылкой"
date: 2025-06-27
tags: ["css"]
---

**Добавление иконки перед ссылкой**

Чтобы ссылка на внешний ресурс выглядела более узнаваемо, можно добавить к ней иконку, используя только **CSS**:

```css
a[href*="github.com"]::before {
  content: "";
  display: inline-block;
  width: 1em;
  height: 1em;
  background-image: url('/assets/icons/github.svg');
  background-size: contain;
  background-repeat: no-repeat;
  margin-right: 0.3em;
}
a[href*="t.me"]::before {
  content: "";
  display: inline-block;
  width: 1em;
  height: 1em;
  background-image: url('/assets/icons/telegram.svg');
  background-size: contain;
  background-repeat: no-repeat;
  margin-right: 0.3em;
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
    content: "";
    display: inline-block;
    width: 1em;
    height: 1em;
    background-image: var(--icon);
    background-size: contain;
    background-repeat: no-repeat;
    margin-right: 0.3em;
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
  gap: 8px;
  a[href^="https://github.com"] {
  --icon: url('./images/github-icon.svg');
    display: inline-flex;
    gap: 2px;
    align-items: center;
    &[href*="/pulls"] {
      --icon: url('./images/github-pull-icon.svg');
    }
    &::before {
      content: "";
      display: inline-block;
      width: 1em;
      height: 1em;
      background-image: var(--icon);
      background-size: contain;
      background-repeat: no-repeat;
      margin-right: 0.4em;
      @media (prefers-color-scheme: dark) {
        filter: invert(1);
      }
    }
  }
}
</style>
