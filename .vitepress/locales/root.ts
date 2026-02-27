import { REPOSITORY_URL, SITE_NAME, TELEGRAM_CHANNEL } from "../constants/common";
import locales from "./i18n";

const COPYRIGHT = `
  <a
    href="https://creativecommons.org/licenses/by-sa/4.0/deed.ru"
    target="_blank"
    rel="noopener noreferrer"
    title="Открыть текст лицензии CC-BY-SA 4.0"
  >CC-BY-SA 4.0</a> © 2025 JS F/k Team
`.trim();

export default {
  label: "Русский",
  lang: "ru",
  link: "/",
  title: SITE_NAME,
  description: locales.ru.description,
  themeConfig: {
    nav: [
      { text: "Статьи", link: "/articles" }
    ],
    socialLinks: [
      { icon: "telegram", link: `https://t.me/${TELEGRAM_CHANNEL}`, ariaLabel: "Telegram" },
      { icon: "github", link: REPOSITORY_URL, ariaLabel: "GitHub" },
      { icon: "rss", link: "/rss.xml", ariaLabel: "RSS" }
    ],
    editLink: { text: "Изменить эту страницу на GitHub" },
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
