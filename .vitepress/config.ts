import { fileURLToPath } from "node:url";
import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "JS F/k",
  description: "HTML/TS/Vue — с примерами, по делу, без воды",
  lang: "ru-RU",
  sitemap: {
    hostname: "https://js-f-k.netlify.app"
  },
  cleanUrls: true,
  srcExclude: ["README.md", "LICENSE.md"],
  vite: {
    resolve: {
      alias: {
        "@components": fileURLToPath(new URL("theme/components", import.meta.url))
      }
    }
  },
  markdown: {
    theme: {
      light: "catppuccin-latte",
      dark: "catppuccin-mocha"
    }
  },
  themeConfig: {
    outline: false,
    socialLinks: [
      { icon: "telegram", link: "https://t.me/js_fck" }
    ],
    footer: {
      copyright: "<a href=\"https://creativecommons.org/licenses/by-nc-sa/4.0/\" target=\"_blank\" rel=\"noopener noreferrer\">CC-BY-NC-SA-4.0</a> © 2025 JS F/k Team"
    }
  }
});
