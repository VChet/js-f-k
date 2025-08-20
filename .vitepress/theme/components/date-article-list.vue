<template>
  <ul class="article-list">
    <li v-for="{ url, date, title } in articles" :key="url">
      <a :href="url" :title="locales.articleTitle.replace('{}', title)">
        <span class="date">[{{ date }}]</span>
        {{ title }}
      </a>
    </li>
  </ul>
</template>
<script setup lang="ts">
import dayjs from "dayjs";
import { useData } from "vitepress";
import { useLocales } from "../../composables/useLocales";
import { data, type Article } from "../../data/articles.data";
import { formatArticleEntry } from "../../helpers/data";

const { lang } = useData();
const locales = useLocales();
const articles = data.reduce((acc: Article[], article) => {
  if (article.lang !== lang.value || dayjs(article.date).isAfter(dayjs())) { return acc; }
  acc.push(formatArticleEntry(article));
  return acc;
}, []);
</script>
