<template>
  <span class="article-duration">{{ duration }}</span>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useFrontmatter } from "../../composables/useFrontmatter";
import { useLocales } from "../../composables/useLocales";
import { data } from "../../data/articles.data";

const frontmatter = useFrontmatter();
const { t } = useLocales();

const duration = computed<string>(() => {
  const value = data.find(({ title }) => title === frontmatter.value.title)?.duration ?? 1;
  return t("duration", value);
});
</script>
