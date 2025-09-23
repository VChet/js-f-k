<template>
  <layout>
    <template #doc-before>
      <article-author v-if="frontmatter.author" />
      <article-date v-if="frontmatter.date" />
      <img v-if="frontmatter.hero" :src="frontmatter.hero" class="layout-hero">
    </template>
    <template #doc-after>
      <article-tags v-if="frontmatter.tags" />
      <client-only>
        <related-articles v-if="frontmatter.tags" />
        <article-telegram-discussion
          v-if="frontmatter.discussionId"
          :key="`${frontmatter.discussionId}-${dark}`"
          :discussion-id="frontmatter.discussionId"
          :dark
        />
      </client-only>
    </template>
  </layout>
</template>
<script setup lang="ts">
import { useData } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { useFrontmatter } from "../composables/useFrontmatter";
import ArticleAuthor from "@components/article-author.vue";
import ArticleDate from "@components/article-date.vue";
import ArticleTags from "@components/article-tags.vue";
import ArticleTelegramDiscussion from "@components/article-telegram-discussion.vue";
import RelatedArticles from "@components/related-articles.vue";

const { Layout } = DefaultTheme;

const frontmatter = useFrontmatter();
const { isDark: dark } = useData();
</script>
<style lang="scss">
.layout-hero {
  margin-bottom: 2.5rem;
}
.VPDocFooter {
  margin-top: 2rem !important;
  .last-updated {
    display: none;
  }
}
</style>
