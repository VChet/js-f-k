// https://vitepress.dev/guide/custom-theme
import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import "@catppuccin/vitepress/theme/mocha/sky.css";
import "./global.scss";
import Layout from "./Layout.vue";

export default {
  ...DefaultTheme,
  Layout
} satisfies Theme;
