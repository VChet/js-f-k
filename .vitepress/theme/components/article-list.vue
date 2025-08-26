<template>
  <section class="article-list">
    <tag-group>
      <tag-block v-for="tag in tags" :key="tag" :active="selectedTag === tag" @click="selectTag(tag)">
        {{ tag }}
      </tag-block>
    </tag-group>
    <div class="article-list__articles">
      <article-block v-for="article in filteredArticles" :key="article.url" :article />
    </div>
  </section>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import dayjs from "dayjs";
import { useData } from "vitepress";
import { data, type Article } from "../../data/articles.data";
import { formatArticleEntry } from "../../helpers/data";
import ArticleBlock from "./article-block.vue";
import TagBlock from "./tag-block.vue";
import TagGroup from "./tag-group.vue";

const { lang } = useData();
const tags = (() => {
  const result = data.reduce((acc: Set<string>, article: Article) => {
    if (article.lang !== lang.value || dayjs(article.date).isAfter(dayjs())) { return acc; }
    for (const tag of article.tags) { acc.add(tag); }
    return acc;
  }, new Set());
  return [...result].sort((a, b) => a.localeCompare(b));
})();

const selectedTag = ref("");
function selectTag(tag: string) {
  selectedTag.value = tag === selectedTag.value ? "" : tag;
}
onMounted(() => {
  const hash = window.location.hash.slice(1);
  if (hash && tags.includes(hash)) selectTag(hash);
});

const articles = data.reduce((acc: Article[], article: Article) => {
  if (article.lang !== lang.value || dayjs(article.date).isAfter(dayjs())) { return acc; }
  return [...acc, formatArticleEntry(article)];
}, []);
const filteredArticles = computed<Article[]>(() => {
  if (!selectedTag.value) { return articles; }
  return articles.filter((article) => article.tags?.includes(selectedTag.value));
});
</script>
<style lang="scss">
.article-list {
  margin-top: 1.5rem;
  &__articles {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-block: 1.5em;
  }
}
</style>
