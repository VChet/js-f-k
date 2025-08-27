import { SITE_NAME } from "../constants/common";
import locales from "./i18n";

const COPYRIGHT = `
  <a
    href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
    target="_blank"
    rel="noopener noreferrer"
    title="Открыть текст лицензии CC-BY-NC-SA 4.0"
  >CC-BY-NC-SA 4.0</a> © 2025 JS F/k Team
`.trim();
const TELEGRAM_CHANNEL = "js_f_k";

export default {
  label: "Русский",
  lang: "ru",
  link: "/",
  title: SITE_NAME,
  description: locales.ru.description,
  themeConfig: {
    nav: [
      { text: "Статьи по датам", link: "/articles-by-date" },
      { text: "Статьи по тегам", link: "/articles-by-tag" }
    ],
    socialLinks: [
      { icon: "telegram", link: `https://t.me/${TELEGRAM_CHANNEL}`, ariaLabel: "Telegram" },
      { icon: "rss", link: "/rss.xml", ariaLabel: "RSS" }
    ],
    langMenuLabel: "Изменить язык",
    skipToContentLabel: "Перейти к содержанию",
    returnToTopLabel: "Вернуться к началу",
    darkModeSwitchLabel: "Оформление",
    lightModeSwitchTitle: "Переключить на светлую тему",
    darkModeSwitchTitle: "Переключить на тёмную тему",
    footer: { copyright: COPYRIGHT },
    notFound: {
      title: "СТРАНИЦА НЕ НАЙДЕНА",
      quote: "Возможно, вы перешли по неправильной ссылке. А может, мы опять что-то сломали ¯\\_(ツ)_/¯",
      linkLabel: "Вернуться на главную",
      linkText: "На главную"
    }
  }
};
