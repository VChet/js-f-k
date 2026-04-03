<template>
  <a :href="article.url" class="article-block">
    <header :title="article.title">
      {{ article.title }}
    </header>
    <div class="date">{{ article.date }}</div>
    <tag-group>
      <tag-block v-for="tag in article.tags" :key="tag" :color-key="tag">
        {{ tag }}
      </tag-block>
    </tag-group>
    <div class="description">{{ article.description }}</div>
  </a>
</template>
<script setup lang="ts">
import type { Article } from "../../data/articles.data";
import TagBlock from "./tag-block.vue";
import TagGroup from "./tag-group.vue";

interface Props {
  article: Article
}
defineProps<Props>();
</script>
<style>
.vp-doc a.article-block {
  font-weight: unset;
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: transform 300ms;
}
.article-block {
  display: grid;
  grid-template-rows: auto auto 1fr;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg-alt);
  border-radius: 0.375rem;
  &:hover,
  &:focus-visible {
    transform: translateY(-0.25rem);
  }
  header {
    font-size: 1.5rem;
    font-weight: bold;
  }
  .date {
    font-size: 0.9rem;
    color: var(--vp-c-text-2);
  }
  .tag-block {
    background-color: var(--vp-c-bg-soft);
  }
  .description {
    margin-top: 0.5rem;
  }
}
</style>
