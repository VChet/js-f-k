<!-- https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/NotFound.vue -->
<template>
  <div class="NotFound">
    <template v-if="originalArticle">
      <p class="code">
        {{ theme.notFound?.code ?? '404' }}
      </p>
      <h1 class="title">
        {{ locales.missingTranslation }}
      </h1>
      <div class="divider" />
      <div class="translation-details">
        {{ locales.missingTranslationHint }}
        <a href="https://github.com/VChet/js-f-k#translations" target="_blank" rel="noopener noreferrer">github.com</a>
      </div>

      <div class="action">
        <a class="link" :href="withBase(originalArticle.url)">
          {{ locales.goToArticle }}: {{ originalArticle.title }}
        </a>
        <a
          class="link"
          :href="withBase(theme.notFound?.link ?? '/')"
          :aria-label="theme.notFound?.linkLabel ?? 'go to home'"
        >
          {{ theme.notFound?.linkText ?? 'Take me home' }}
        </a>
      </div>
    </template>
    <template v-else>
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
    </template>
  </div>
</template>
<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { useData, withBase } from "vitepress";
import { useLocales } from "../composables/useLocales";
import { data, type Article } from "../data/articles.data";

const { theme, page } = useData();
const locales = useLocales();
const originalArticle = ref<Article | null>(null);

onBeforeMount(() => {
  const currentPath = page.value.relativePath;
  if (!currentPath.includes("/articles/")) return;

  // Path of the original article: "locale/articles/article.md" -> "/articles/article"
  const ruPath = `/${currentPath.replace(/^[^/]+\/|\.md$/g, "")}`;
  originalArticle.value = data.find((article) => article.url === ruPath) ?? null;
});
</script>
<style scoped>
@import url("./not-found-default.css");
.translation-details {
  max-width: 25rem;
  margin: 0 auto;
  text-wrap-style: balance;
  a {
    font-weight: 500;
    color: var(--vp-c-brand-1);
    transition: color 0.25s;
    &:hover, &:focus-visible {
      color: var(--vp-c-brand-2);
      text-decoration: underline;
    }
  }
}
.action {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}
</style>
