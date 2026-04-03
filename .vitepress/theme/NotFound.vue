<!-- https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/NotFound.vue -->
<template>
  <div class="NotFound">
    <p class="code">
      {{ theme.notFound?.code ?? '404' }}
    </p>
    <h1 class="title">
      {{ theme.notFound?.title ?? 'PAGE NOT FOUND' }}
    </h1>
    <div class="divider" />
    <blockquote class="quote">
      {{
        theme.notFound?.quote ??
          "But if you don't change your direction, and if you keep looking, you may end up where you are heading."
      }}
    </blockquote>

    <div class="action">
      <a
        class="link"
        :href="withBase(theme.notFound?.link ?? '/')"
        :aria-label="theme.notFound?.linkLabel ?? 'go to home'"
      >
        {{ theme.notFound?.linkText ?? 'Take me home' }}
      </a>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useData, withBase } from "vitepress";

const { theme } = useData();
</script>
<style scoped>
@import url("./not-found-default.css");
</style>
