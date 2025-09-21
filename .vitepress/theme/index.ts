// https://vitepress.dev/guide/custom-theme
import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import "./global.scss";
import Layout from "./Layout.vue";
import LayoutArticles from "./LayoutArticles.vue";

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) { app.component("articles", LayoutArticles); }
} satisfies Theme;
