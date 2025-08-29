<template>
  <div v-if="relatedArticles.length" class="related-articles">
    <h3>{{ locales.relatedArticles }}</h3>
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
import dayjs from "dayjs";
import { useData } from "vitepress";
import { useFrontmatter } from "../../composables/useFrontmatter";
import { useLocales } from "../../composables/useLocales";
import { data } from "../../data/articles.data";

const locales = useLocales();
const frontmatter = useFrontmatter();
const { lang } = useData();
const ARTICLES_LIMIT = 4;
const relatedArticles = computed(() => {
  const { title, tags } = frontmatter.value;
  if (!tags) { return []; }

  const result = [];
  for (const article of data) {
    if (article.lang !== lang.value || dayjs(article.date).isAfter(dayjs()) || article.title === title) { continue; }
    if (article.tags.some((tag) => tags.includes(tag))) { result.push(article); }
    if (result.length === ARTICLES_LIMIT) break;
  }
  return result;
});
</script>
<style lang="scss">
.related-articles {
  margin-block: 1rem 0.75rem;
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
