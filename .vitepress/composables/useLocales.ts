import { computed } from "vue";
import { useData } from "vitepress";
import i18n from "../locales/i18n";

export function useLocales() {
  const { lang } = useData();
  const key = computed(() => lang.value as keyof typeof i18n);
  return computed(() => i18n[key.value]);
}
