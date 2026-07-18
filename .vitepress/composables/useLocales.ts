import { computed } from "vue";
import { useData } from "vitepress";
import i18n from "../locales/i18n";

type Locale = keyof typeof i18n;
type TranslationKey = keyof typeof i18n.en;

export function useLocales() {
  const { lang } = useData();
  const locale = computed(() => lang.value as Locale);
  const localeData = computed(() => i18n[locale.value]);

  function t(key: TranslationKey, param?: string | number) {
    const text = localeData.value[key];
    return param === undefined ? text : text.replace("{}", param.toString());
  }

  return { t };
}
