<template>
  <layout>
    <template #doc-after>
      <article-tags />
    </template>
  </layout>
</template>
<script setup>
import DefaultTheme from "vitepress/theme";
import ArticleTags from "@components/article-tags.vue";

const { Layout } = DefaultTheme;
</script>
