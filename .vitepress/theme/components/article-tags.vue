<template>
  <tag-group v-if="tags.length">
    <tag-block
      v-for="tag in tags"
      :key="tag"
      :href="`/articles#${tag}`"
      :title="t('tagTitle', tag)"
    >
      {{ tag }}
    </tag-block>
  </tag-group>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useFrontmatter } from "../../composables/useFrontmatter";
import { useLocales } from "../../composables/useLocales";
import TagBlock from "./tag-block.vue";
import TagGroup from "./tag-group.vue";

const { t } = useLocales();
const frontmatter = useFrontmatter();
const tags = computed(() => frontmatter.value.tags ?? []);
</script>
