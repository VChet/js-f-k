import BaselineLimitedIcon from "./icons/baseline-limited.svg?raw";
import BaselineNewlyIcon from "./icons/baseline-newly.svg?raw";
import BaselineNoDataIcon from "./icons/baseline-no_data.svg?raw";
import BaselineWidelyIcon from "./icons/baseline-widely.svg?raw";
import BrowserChromeIcon from "./icons/browser-chrome.svg?raw";
import BrowserEdgeIcon from "./icons/browser-edge.svg?raw";
import BrowserFirefoxIcon from "./icons/browser-firefox.svg?raw";
import BrowserSafariIcon from "./icons/browser-safari.svg?raw";
import SupportAvailableIcon from "./icons/support-available.svg?raw";
import SupportNoDataIcon from "./icons/support-no_data.svg?raw";
import SupportUnavailableIcon from "./icons/support-unavailable.svg?raw";
import type { BaselineState, CoreBrowser, SupportState } from "../../../types/baseline";

export const BASELINE_API_ENDPOINT = "https://api.webstatus.dev/v1/features/";

export const BASELINE_ICONS = Object.freeze<Record<BaselineState, string>>({
  limited: BaselineLimitedIcon,
  widely: BaselineWidelyIcon,
  newly: BaselineNewlyIcon,
  no_data: BaselineNoDataIcon
});
export const BROWSER_ICONS = Object.freeze<Record<CoreBrowser, string>>({
  chrome: BrowserChromeIcon,
  edge: BrowserEdgeIcon,
  firefox: BrowserFirefoxIcon,
  safari: BrowserSafariIcon
});
export const SUPPORT_ICONS = Object.freeze<Record<SupportState, string>>({
  available: SupportAvailableIcon,
  unavailable: SupportUnavailableIcon,
  no_data: SupportNoDataIcon
});
export const BASELINE_DEFS = Object.freeze<Record<BaselineState, { title: string, defaultDescription: string }>>({
  limited: {
    title: "Limited availability",
    defaultDescription: "This feature is not Baseline because it does not work in some of the most widely-used browsers."
  },
  newly: {
    title: "Newly available",
    defaultDescription: "This feature works across the latest devices and browser versions. This feature might not work in older devices or browsers."
  },
  widely: {
    title: "Widely available",
    defaultDescription: "This feature is well established and works across many devices and browser versions."
  },
  no_data: {
    title: "Unknown availability",
    defaultDescription: "We currently don't have browser support information about this feature."
  }
});
