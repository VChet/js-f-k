<template>
  <span class="article-date">{{ articleDate }}</span>
</template>
<script setup lang="ts">
import { computed } from "vue";
import dayjs from "dayjs";
import { useData } from "vitepress";
import { useFrontmatter } from "../../composables/useFrontmatter";
import { useLocales } from "../../composables/useLocales";
import { formatDate } from "../../helpers/data";

const { t } = useLocales();
const { page, lang } = useData();
const frontmatter = useFrontmatter();

const articleDate = computed<string>(() => {
  const { date } = frontmatter.value;
  const { lastUpdated } = page.value;
  let string = formatDate(date, lang.value);
  if (lastUpdated && dayjs(lastUpdated).isAfter(dayjs(date))) {
    string += ` · ${t("lastUpdated", formatDate(lastUpdated, lang.value))}`;
  }
  return string;
});
</script>
