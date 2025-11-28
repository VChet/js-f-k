<template>
  <div class="browser-status">
    <span v-html="BROWSER_ICONS[browser]" />
    <span :class="`support-${status ?? 'no_data'}`" v-html="status ? SUPPORT_ICONS[status] : SUPPORT_ICONS.no_data" />
  </div>
</template>
<script setup lang="ts">
import { BROWSER_ICONS, SUPPORT_ICONS } from "./constants";
import type { CoreBrowser, SupportState } from "../../../types/baseline";

defineProps<{ browser: CoreBrowser, status: SupportState | null }>();
</script>
<style lang="scss">
.browser-status {
  display: inline-flex;
  align-items: center;
  .support-no_data {
    color: var(--baseline-status-color-no_data); /* stylelint-disable-line custom-property-pattern */
  }
  .support-unavailable {
    color: var(--baseline-status-color-limited);
  }
  .support-newly {
    color: var(--baseline-status-color-newly);
  }
  .support-widely,
  .support-available {
    color: var(--baseline-status-color-widely);
  }
}
</style>
