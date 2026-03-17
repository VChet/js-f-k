<template>
  <a :href="article.url" class="article-block">
    <div class="article-block__header">
      <div class="article-block__header-title" :title="article.title">
        {{ article.title }}
      </div>
      <tag-group>
        <tag-block v-for="tag in article.tags" :key="tag">
          {{ tag }}
        </tag-block>
      </tag-group>
    </div>
    <div class="article-block__date">{{ date.format("DD MMMM, YYYY") }}</div>
    <div class="article-block__description">{{ article.description }}</div>
  </a>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import dayjs from "dayjs";
import { useData } from "vitepress";
import type { Article } from "../../data/articles.data";
import TagBlock from "./tag-block.vue";
import TagGroup from "./tag-group.vue";

interface Props {
  article: Article
}
const props = defineProps<Props>();

const { lang } = useData();
const date = ref(dayjs(props.article.date));
onMounted(() => {
  date.value = dayjs(props.article.date).locale(lang.value);
  console.log(lang.value);
});
</script>
<style lang="scss">
.vp-doc a.article-block {
  font-weight: unset;
  color: var(--vp-c-text-1) ;
  text-decoration: none;
  transition: transform 300ms;
}
.article-block {
  display: grid;
  grid-template-rows: auto auto 1fr;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 0.375rem;
  &:hover,
  &:focus-visible {
    transform: translateY(-0.25rem);
  }
  &__header {
    display: flex;
    flex-wrap: wrap;
    gap: 0 1rem;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    font-size: 1.5rem;
    font-weight: bold;
    .tag-group {
      flex-wrap: nowrap;
    }
  }
  &__date {
    font-size: 0.9rem;
    color: var(--vp-c-text-2);
  }
  &__description {
    margin-top: 0.5rem;
  }
}
</style>
