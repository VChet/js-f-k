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
import { formatDate } from "../../helpers/date";

const content = useData();
const frontmatter = useFrontmatter();

const DATE_FORMAT = "DD MMMM YYYY";
const dateString = computed<string>(() => {
  const { date } = frontmatter.value;
  const { lastUpdated } = content.page.value;
  let string = formatDate(date, DATE_FORMAT);
  if (lastUpdated && dayjs(date).isBefore(dayjs(lastUpdated))) {
    string += ` | Обновлено ${formatDate(lastUpdated, DATE_FORMAT)}`;
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
