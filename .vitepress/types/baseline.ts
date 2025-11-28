import type { PickLiteral } from ".";

export type BaselineState = "widely" | "newly" | "limited" | "no_data";
interface FeatureBaseline {
  high_date: string | null
  low_date: string | null
  status: BaselineState
}

type Browser = |
  "chrome" |
  "chrome_android" |
  "edge" |
  "firefox" |
  "firefox_android" |
  "safari" |
  "safari_ios";
export type CoreBrowser = PickLiteral<Browser, "chrome" | "edge" | "firefox" | "safari">;
interface FeatureSpec {
  links: { link: string }[]
}
export type SupportState = "available" | "unavailable" | "no_data";
interface FeatureBrowserImplementation {
  date: string | null
  status: SupportState
  version: string | null
}

export interface FeatureBaselineData {
  feature_id: string
  name: string
  baseline: FeatureBaseline
  browser_implementations: Record<Browser, FeatureBrowserImplementation>
  spec: FeatureSpec
  usage: Record<string, Record<string, unknown>>
}
