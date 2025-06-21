<template>
  <layout>
    <template #doc-footer-before>
      <article-tags />
    </template>
    <template #doc-after>
      <client-only>
        <related-articles />
      </client-only>
    </template>
  </layout>
</template>
<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import ArticleTags from "@components/article-tags.vue";
import RelatedArticles from "@components/related-articles.vue";

const { Layout } = DefaultTheme;
</script>
