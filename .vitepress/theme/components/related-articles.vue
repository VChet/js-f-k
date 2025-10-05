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
import { useFrontmatter } from "../../composables/useFrontmatter";
import { useLocales } from "../../composables/useLocales";
import { data, type Article } from "../../data/articles.data";
import { isApplicableArticle } from "../../helpers/data";

const locales = useLocales();
const frontmatter = useFrontmatter();

const ARTICLES_LIMIT = 4;
const relatedArticles = computed(() => {
  const { tags, title } = frontmatter.value;
  if (!tags) { return []; }

  const result: Article[] = [];
  for (const article of data) {
    if (!isApplicableArticle(article) || article.title === title) { continue; }
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
