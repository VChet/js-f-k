<template>
  <ul class="article-list">
    <li v-for="{ url, date, title } in pages" :key="url">
      <a :href="url">
        <span class="date">[{{ date.format('DD.MM.YY') }}]</span>
        {{ title }}
      </a>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { ref } from "vue";
import dayjs, { type Dayjs } from "dayjs";

interface Article {
  title: string
  date: Dayjs
  url: string
}

function getArticles() {
  const files = import.meta.glob("/articles/*.md", { eager: true }) as Record<string, any>;
  const articles: Article[] = [];
  for (const [path, module] of Object.entries(files)) {
    const frontmatter = module?.frontmatter ?? module?.__pageData?.frontmatter;
    if (!frontmatter || dayjs(frontmatter.date).isAfter(dayjs())) continue;

    const { title, date } = frontmatter;
    articles.push({
      title,
      date: dayjs(date),
      url: path.replace(".md", "")
    });
  }

  return articles.sort((a, b) => b.date.valueOf() - a.date.valueOf());
}

const pages = ref<Article[]>(getArticles());
</script>
<style lang="scss">
.article-list {
  padding: 0;
  list-style: none;
  li {
    margin: 0.5em 0;
  }
}
.date {
  font-family: monospace;
  color: #888;
}
</style>
