<template>
  <ul class="article-list">
    <li v-for="{ url, date, title } in data" :key="url">
      <a :href="url">
        <span class="date">[{{ date }}]</span>
        {{ title }}
      </a>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { data } from "../articles.data";
</script>
<style lang="scss">
.article-list {
  padding: 0;
  list-style: none;
  li {
    margin: 0.5em 0;
    .date {
      font-family: monospace;
      color: #888;
    }
  }
}
</style>
