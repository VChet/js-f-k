<template>
  <ul class="article-list">
    <li v-for="{ url, date, title } in articles" :key="url">
      <a :href="url" :title="`Открыть статью: ${title}`">
        <span class="date">[{{ date }}]</span>
        {{ title }}
      </a>
    </li>
  </ul>
</template>
<script setup lang="ts">
import dayjs from "dayjs";
import { data, type Article } from "../../data/articles.data";
import { formatArticleEntry } from "../../helpers/data";

const articles = data.reduce((acc: Article[], article) => {
  if (dayjs(article.date).isAfter(dayjs())) { return acc; }
  acc.push(formatArticleEntry(article));
  return acc;
}, []);
</script>
