<template>
  <layout>
    <template #not-found>
      <not-found />
    </template>
    <template #doc-before>
      <article-author v-if="frontmatter.author" />
      <div class="layout-subheader">
        <article-date v-if="frontmatter.date" />
        <span v-if="frontmatter.date"> · </span>
        <article-duration />
      </div>
      <figure v-if="frontmatter.hero" class="layout-hero">
        <img :src="frontmatter.hero">
      </figure>
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
import NotFound from "./NotFound.vue";
import ArticleAuthor from "@components/article-author.vue";
import ArticleDate from "@components/article-date.vue";
import ArticleDuration from "@components/article-duration.vue";
import ArticleTags from "@components/article-tags.vue";
import ArticleTelegramDiscussion from "@components/article-telegram-discussion.vue";
import RelatedArticles from "@components/related-articles.vue";

const { Layout } = DefaultTheme;

const frontmatter = useFrontmatter();
const { isDark: dark } = useData();
</script>
<style>
.layout-subheader {
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}
.layout-hero {
  margin-bottom: 2.5rem;
}
.VPDoc .content-container {
  overflow-x: hidden;
}
.VPDocFooter {
  margin-top: 2rem !important;
  .last-updated {
    display: none;
  }
}
</style>
