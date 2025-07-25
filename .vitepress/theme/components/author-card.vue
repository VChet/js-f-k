<template>
  <section v-if="authors.length" class="author-card">
    <a
      v-for="{ url, avatar, name } in authors"
      :key="url"
      :href="url"
      target="_blank"
      class="author-card__entry"
    >
      <img :src="avatar" :alt="`Аватар ${name}`" class="author-card__entry-avatar">
      <div>{{ name }}</div>
    </a>
  </section>
</template>
<script setup lang="ts">
import { useData } from "vitepress";
import { authorsData, type AuthorData } from "../../data/authors";

const { frontmatter } = useData();
function getAuthorsData(): AuthorData[] {
  const { author } = frontmatter.value;
  if (!author) { return []; }
  const authorKeys: string[] = Array.isArray(author) ? author : [author];
  return authorKeys.reduce((acc: AuthorData[], key) => {
    const data = authorsData.get(key);
    return data ? [...acc, data] : acc;
  }, []);
}
const authors = getAuthorsData();
</script>
<style lang="scss">
.author-card {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 2rem;
  &__entry {
    display: inline-flex;
    gap: .75rem;
    align-items: center;
    margin-bottom: 1.5rem;
    font-weight: 500;
    color: var(--vp-c-brand-1);
    text-decoration: none;
    &:hover,
    &:focus-visible {
      text-decoration: underline;
    }
    &-avatar {
      width: 2.5rem;
      height: 2.5rem;
      object-fit: cover;
      border-radius: 50%;
    }
  }
}
</style>
