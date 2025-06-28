// https://vitepress.dev/guide/custom-theme
import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import "./global.scss";
import Layout from "./Layout.vue";

export default {
  ...DefaultTheme,
  Layout
} satisfies Theme;
