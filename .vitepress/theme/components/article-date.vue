<template>
  <div class="article-date">
    {{ dateString }}
  </div>
</template>
<script setup lang="ts">
import dayjs from "dayjs";
import { inBrowser, useData } from "vitepress";
import { useFrontmatter } from "../../composables/useFrontmatter";
import { useLocales } from "../../composables/useLocales";

if (inBrowser) {
  const { lang } = useData();
  console.log(lang.value);
  dayjs.locale(lang.value);
}

const locales = useLocales();
const { page } = useData();
const frontmatter = useFrontmatter();

const DATE_FORMAT = "DD MMMM, YYYY";
const dateString: string = (() => {
  const { date } = frontmatter.value;
  const { lastUpdated } = page.value;
  let string = dayjs(date).format(DATE_FORMAT);
  if (lastUpdated && dayjs(date).isBefore(dayjs(lastUpdated))) {
    const localizedDate = dayjs(lastUpdated).format(DATE_FORMAT);
    string += ` | ${locales.value.lastUpdated.replace("{}", localizedDate)}`;
  }
  return string;
})();
</script>
<style lang="scss">
.article-date {
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}
</style>
