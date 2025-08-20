<template>
  <ul v-if="tags.length" class="article-tags">
    <li v-for="tag in tags" :key="tag">
      <a
        :href="`/articles-by-tag#${tag}`"
        :title="locales.tagTitle.replace('{}', tag)"
        :style="{ color: composeHashColorFromString(tag) }"
      >
        #{{ tag }}
      </a>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useFrontmatter } from "../../composables/useFrontmatter";
import { useLocales } from "../../composables/useLocales";
import { composeHashColorFromString } from "../../helpers/color";

const locales = useLocales();
const frontmatter = useFrontmatter();
const tags = computed(() => frontmatter.value.tags ?? []);
</script>
<style lang="scss">
.article-tags {
  display: flex;
  gap: .5rem;
  padding: 0;
  margin-block: 1rem 0.75rem;
  list-style: none;
}
</style>
