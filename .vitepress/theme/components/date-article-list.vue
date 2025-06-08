<template>
  <ul class="article-list">
    <li v-for="{ url, date, title } in data" :key="url">
      <a :href="url" :title="`Открыть статью: ${title}`">
        <span class="date">[{{ date }}]</span>
        {{ title }}
      </a>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { data } from "../articles.data";
</script>
