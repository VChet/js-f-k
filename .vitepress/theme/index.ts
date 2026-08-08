import { enhanceAppWithTabs } from "vitepress-plugin-tabs/client";
import DefaultTheme from "vitepress/theme"; // https://vitepress.dev/guide/custom-theme
import type { Theme } from "vitepress";
import "./departure-theme.css";
import "./global.css";
import Layout from "./Layout.vue";
import LayoutArticles from "./LayoutArticles.vue";

import("dayjs/locale/ru");

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component("articles", LayoutArticles);
    enhanceAppWithTabs(app);
  }
} satisfies Theme;
