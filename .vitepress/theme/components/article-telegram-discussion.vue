<template>
  <div ref="telegram-widget-element" class="telegram-discussion" />
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useTemplateRef } from "vue";
import { TELEGRAM_CHANNEL } from "../../constants/common";
import type { Frontmatter } from "../../composables/useFrontmatter";

interface Props {
  discussionId: NonNullable<Frontmatter["discussionId"]>
  dark: boolean
}
const props = defineProps<Props>();

const script = ref<HTMLScriptElement | null>(null);
const telegramWidgetRef = useTemplateRef("telegram-widget-element");

function getBrandColor(): string {
  return window.getComputedStyle(document.body).getPropertyValue("--vp-c-brand-1");
}

function mountWidget(): void {
  if (!telegramWidgetRef.value) { return console.warn("telegram-widget is undefined"); }

  script.value = document.createElement("script");
  script.value.async = true;
  script.value.src = "https://telegram.org/js/telegram-widget.js?22";
  script.value.setAttribute("data-telegram-discussion", `${TELEGRAM_CHANNEL}/${props.discussionId}`);
  script.value.setAttribute("data-comments-limit", "5");
  script.value.setAttribute("data-colorful", "1");
  script.value.setAttribute("data-color", getBrandColor());
  script.value.setAttribute("data-dark", props.dark ? "1" : "0");
  telegramWidgetRef.value.appendChild(script.value);
}
function unmountWidget(): void {
  if (script.value && telegramWidgetRef.value?.contains(script.value)) {
    telegramWidgetRef.value.removeChild(script.value);
    script.value = null;
  }
}
onMounted(mountWidget);
onBeforeUnmount(unmountWidget);
</script>
<style lang="scss">
.article-telegram-discussion {
  margin-block: 1rem 0.75rem;
}
</style>
