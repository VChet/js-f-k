<template>
  <div class="article-date">
    {{ dateString }}
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import dayjs from "dayjs";
import { useData } from "vitepress";
import { useFrontmatter } from "../../composables/useFrontmatter";
import { useLocales } from "../../composables/useLocales";

import("dayjs/locale/ru");

const locales = useLocales();
const { page, lang } = useData();
const frontmatter = useFrontmatter();

const DATE_FORMAT = "DD MMMM YYYY";
const dateString = computed<string>(() => {
  const { date } = frontmatter.value;
  const { lastUpdated } = page.value;
  let string = dayjs(date).locale(lang.value).format(DATE_FORMAT);
  if (lastUpdated && dayjs(date).isBefore(dayjs(lastUpdated))) {
    const localizedDate = dayjs(lastUpdated).locale(lang.value).format(DATE_FORMAT);
    string += ` | ${locales.value.lastUpdated.replace("{}", localizedDate)}`;
  }
  return string;
});
</script>
<style lang="scss">
.article-date {
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}
</style>
