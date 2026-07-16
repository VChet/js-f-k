<template>
  <span class="article-date">{{ dateString }}</span>
</template>
<script setup lang="ts">
import { computed } from "vue";
import dayjs from "dayjs";
import { useData } from "vitepress";
import { useFrontmatter } from "../../composables/useFrontmatter";
import { useLocales } from "../../composables/useLocales";

const locales = useLocales();
const { page, lang } = useData();
const frontmatter = useFrontmatter();

const DATE_FORMAT = "DD MMMM, YYYY";
const dateString = computed<string>(() => {
  const { date } = frontmatter.value;
  const { lastUpdated } = page.value;
  let string = dayjs(date).locale(lang.value).format(DATE_FORMAT);
  if (lastUpdated && dayjs(lastUpdated).isAfter(dayjs(date))) {
    const localizedDate = dayjs(lastUpdated).locale(lang.value).format(DATE_FORMAT);
    string += ` · ${locales.value.lastUpdated.replace("{}", localizedDate)}`;
  }
  return string;
});
</script>
