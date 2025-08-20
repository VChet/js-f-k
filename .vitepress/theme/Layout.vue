<template>
  <layout>
    <template #doc-before>
      <article-author v-if="frontmatter.author" />
      <article-date v-if="frontmatter.date" />
      <img v-if="frontmatter.hero" :src="frontmatter.hero" class="layout-hero">
    </template>
    <template v-if="frontmatter.tags" #doc-after>
      <article-tags />
      <client-only>
        <related-articles />
      </client-only>
    </template>
  </layout>
</template>
<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import { useFrontmatter } from "../composables/useFrontmatter";
import ArticleAuthor from "@components/article-author.vue";
import ArticleDate from "@components/article-date.vue";
import ArticleTags from "@components/article-tags.vue";
import RelatedArticles from "@components/related-articles.vue";

const { Layout } = DefaultTheme;

const frontmatter = useFrontmatter();
</script>
<style lang="scss">
.layout-hero {
  margin-bottom: 2.5rem;
}
.VPDocFooter {
  display: none;
}
</style>
