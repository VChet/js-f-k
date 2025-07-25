<template>
  <layout>
    <template v-if="frontmatter.hero" #doc-before>
      <img :src="frontmatter.hero" class="hero-image">
    </template>
    <template #doc-footer-before>
      <author-card />
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
import { useFrontmatter } from "../composables/useFrontmatter";
import ArticleTags from "@components/article-tags.vue";
import AuthorCard from "@components/author-card.vue";
import RelatedArticles from "@components/related-articles.vue";

const { Layout } = DefaultTheme;

const frontmatter = useFrontmatter();
</script>
<style lang="scss">
.hero-image {
  margin-bottom: 2.5rem;
}
</style>
