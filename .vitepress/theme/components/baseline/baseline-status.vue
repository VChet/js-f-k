<template>
  <client-only>
    <a
      class="baseline-status"
      href="https://web-platform-dx.github.io/web-features"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span class="baseline-status__icon" v-html="BASELINE_ICONS[status]" />
      <span class="baseline-status__title" :title="BASELINE_DEFS[status].defaultDescription">
        {{ BASELINE_DEFS[status].title }}
      </span>
      <div class="baseline-status__browsers">
        <browser-status
          v-for="[browser, browserStatus] of getTypedEntries(browserSupport)"
          :key="browser"
          :browser
          :status="browserStatus"
        />
      </div>
    </a>
  </client-only>
</template>
<script setup lang="ts">
import { onBeforeMount, reactive, ref } from "vue";
import { getTypedEntries, getTypedKeys } from "../../../helpers/object";
import { BASELINE_API_ENDPOINT, BASELINE_DEFS, BASELINE_ICONS } from "./constants";
import type { BaselineState, CoreBrowser, FeatureBaselineData, SupportState } from "../../../types/baseline";
import BrowserStatus from "./browser-status.vue";

const props = defineProps<{ featureId: string }>();

const status = ref<BaselineState>("no_data");
const browserSupport = reactive<Record<CoreBrowser, SupportState | null>>({
  chrome: null,
  edge: null,
  firefox: null,
  safari: null
});

async function fetchStatus(): Promise<void> {
  const res = await fetch(`${BASELINE_API_ENDPOINT}${props.featureId}`);
  if (!res.ok) return;
  const payload: FeatureBaselineData = await res.json();
  status.value = payload.baseline.status ?? "no_data";
  for (const browser of getTypedKeys(browserSupport)) {
    browserSupport[browser] = payload.browser_implementations[browser]?.status ?? null;
  }
}
onBeforeMount(fetchStatus);
</script>
<style lang="scss">
@use "./baseline";
.baseline-status {
  display: inline-flex;
  gap: 0.375rem;
  align-items: center;
  font-size: 1rem;
  font-weight: normal;
  &__icon {
    display: inline-block;
    width: 2rem;
    height: 1rem;
  }
  &__title {
    white-space: nowrap;
  }
  &__browsers {
    display: inline-flex;
    align-items: center;
    padding: 0;
    margin: 0;
    list-style: none;
  }
}
</style>
