<template>
  <div v-if="relatedArticles.length" class="related-articles">
    <h3>Статьи по теме</h3>
    <ul>
      <li v-for="article in relatedArticles" :key="article.url">
        <a :href="article.url">
          {{ article.title }}
        </a>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useData } from "vitepress";
import { data } from "../../data/articles.data";

const { frontmatter } = useData();
const relatedArticles = computed(() => {
  const { title, tags } = frontmatter.value;
  if (!tags) { return []; }

  return data
    .filter((article) => article.title !== title && article.tags.some((tag) => tags.includes(tag)))
    .slice(0, 4);
});
</script>
<style lang="scss">
.related-articles {
  h3 {
    margin-block: 1rem .75rem;
    font-size: 1.25rem;
  }
  a {
    font-size: .9rem;
    font-weight: 500;
    color: var(--vp-c-brand-1);
    text-decoration: none;
    &:hover,
    &:focus-visible {
      text-decoration: underline;
    }
  }
}
</style>
