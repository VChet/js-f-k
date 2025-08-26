<template>
  <component :is="buttonComponent" v-bind="buttonProps" :class="{ active }">
    <slot />
  </component>
</template>
<script setup lang="ts">
import {
  computed,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type VNodeChild
} from "vue";

interface Props {
  active?: boolean
  href?: string | null
}
interface Slots {
  default?: () => VNodeChild
}
const props = withDefaults(defineProps<Props>(), { active: false, href: null });
defineSlots<Slots>();

const buttonComponent = computed(() => {
  if (props.href) return "a";
  return "button";
});

interface ButtonProps {
  class: HTMLAttributes["class"]
  href?: AnchorHTMLAttributes["href"]
  type?: ButtonHTMLAttributes["type"]
}
const buttonProps = computed<ButtonProps>(() => {
  const attrs: ButtonProps = { class: "tag-block" };
  if (props.href) {
    attrs.href = props.href;
  } else {
    attrs.type = "button";
  }
  return attrs;
});
</script>
<style lang="scss">
.tag-block {
  display: inline-block;
  padding: 0.2rem 0.75rem;
  font-size: 0.75rem;
  color: var(--vp-c-text-1);
  text-decoration: none;
  cursor: pointer;
  background-color: var(--vp-c-bg-alt);
  border-radius: 0.25rem;
  transition: background-color 300ms, color 300ms;
  &:hover,
  &:focus-visible,
  &.active {
    color: var(--vp-c-neutral-inverse);
    background-color: var(--vp-c-brand-1);
  }
}
</style>
