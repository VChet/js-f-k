<template>
  <ul class="article-list">
    <li v-for="tag in Object.keys(tags)" :key="tag">
      <h2 :id="tag" :style="{ color: composeHashColorFromString(tag) }">
        {{ tag }}
      </h2>
      <ul>
        <li v-for="{ url, title } in tags[tag]" :key="url">
          <a :href="url" :title="locales.articleTitle.replace('{}', title)">
            {{ title }}
          </a>
        </li>
      </ul>
    </li>
  </ul>
</template>
<script setup lang="ts">
import dayjs from "dayjs";
import { useData } from "vitepress";
import { useLocales } from "../../composables/useLocales";
import { data, type Article } from "../../data/articles.data";
import { composeHashColorFromString } from "../../helpers/color";
import { formatArticleEntry } from "../../helpers/data";

const { lang } = useData();
const locales = useLocales();
const tags = data.reduce((acc: Record<string, Article[]>, article) => {
  if (article.lang !== lang.value || dayjs(article.date).isAfter(dayjs())) { return acc; }
  for (const tag of article.tags ?? []) {
    if (!acc[tag]) { acc[tag] = []; }
    acc[tag].push(formatArticleEntry(article));
  }
  return acc;
}, {});
</script>
