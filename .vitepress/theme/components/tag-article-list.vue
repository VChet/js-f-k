<template>
  <ul class="article-list">
    <li v-for="tag in Object.keys(tags)" :key="tag">
      <h2 :id="tag" :style="{ color: composeHashColorFromString(tag) }">
        {{ tag }}
      </h2>
      <ul>
        <li v-for="{ url, title } in tags[tag]" :key="url">
          <a :href="url" :title="`Открыть статью: ${title}`">
            {{ title }}
          </a>
        </li>
      </ul>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { composeHashColorFromString } from "../../helpers/color";
import { data, type Article } from "../articles.data";

const tags = (() => data.reduce((acc: Record<string, Article[]>, article) => {
  for (const tag of article.tags) {
    if (!acc[tag]) { acc[tag] = []; }
    acc[tag].push({
      url: article.url,
      title: article.title,
      date: article.date,
      tags: article.tags
    });
  }
  return acc;
}, {}))();
</script>
