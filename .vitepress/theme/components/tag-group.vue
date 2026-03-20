<template>
  <div class="tag-group">
    <slot />
  </div>
</template>
<script setup lang="ts">
import type { VNodeChild } from "vue";

interface Slots {
  default?: () => VNodeChild
}
defineSlots<Slots>();
</script>
<style>
.tag-group {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-block: 0.5em;
}
</style>
