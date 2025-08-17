// https://vitepress.dev/guide/custom-theme
import DefaultTheme from "vitepress/theme";
import "./global.scss";
import Layout from "./Layout.vue";

export default {
  extends: DefaultTheme,
  Layout
};
