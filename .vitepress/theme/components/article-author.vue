<template>
  <div v-if="authors.length" class="article-author">
    <a
      v-for="{ url, avatar, name } in authors"
      :key="url"
      :href="url"
      target="_blank"
      class="article-author__entry"
    >
      <img :src="avatar" :alt="`Аватар ${name}`" class="article-author__entry-avatar">
      <div>{{ name }}</div>
    </a>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useFrontmatter } from "../../composables/useFrontmatter";
import { authorsData, type AuthorData } from "../../data/authors";

const frontmatter = useFrontmatter();
const authors = computed<AuthorData[]>(() => {
  const { author } = frontmatter.value;
  if (!author) { return []; }
  const authorKeys: string[] = Array.isArray(author) ? author : [author];
  return authorKeys.reduce((acc: AuthorData[], key) => {
    const data = authorsData.get(key);
    return data ? [...acc, data] : acc;
  }, []);
});
</script>
<style lang="scss">
.article-author {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 1rem;
  &__entry {
    display: inline-flex;
    gap: .75rem;
    align-items: center;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--vp-c-brand-1);
    text-decoration: none;
    &:hover,
    &:focus-visible {
      text-decoration: underline;
    }
    &-avatar {
      width: 2rem;
      height: 2rem;
      object-fit: cover;
      border-radius: 50%;
    }
  }
}
</style>
