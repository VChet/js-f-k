// https://vitepress.dev/guide/custom-theme
import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import "@catppuccin/vitepress/theme/mocha/sky.css";
import "./theme-override.scss";

export default {
  ...DefaultTheme
} satisfies Theme;
