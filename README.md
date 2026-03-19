# JS F/k

[![netlify-status][netlify-status-img]][netlify-status-href]

JS F/k is a modern static blog on VitePress about frontend development. It supports multiple languages, automatic content checking, and RSS feed generation. It uses a custom theme and CI/CD on Netlify for fast publishing.

## Links

[![website][website-img]][website-href]
[![mirror][mirror-img]][mirror-href]
[![telegram][telegram-img]][telegram-href]

## Development

- Install dependencies: `pnpm install`
- Start dev-server: `pnpm run dev`
- Build for production: `pnpm run build`

## Translations

Help translate **JS F/k** into your language.

| Language | Coverage                |
|----------|-------------------------|
| English  | ![i18n-en][i18n-en-img] |

### Want to add a new language?

If your language is not listed — don't worry about configs, routing, RSS or other setup.

- Create `<locale>/articles/`
- Copy filenames from `articles/`
- Translate the content
- Open a Pull Request

Everything else will be configured separately.

## Contributing

To edit an article, click the **Edit this page** link at the bottom of the article — changes are submitted via GitHub.

## License

- Code is licensed under MIT
- Articles and content are licensed under CC-BY-SA 4.0

<!-- Badges -->
[netlify-status-img]: https://img.shields.io/netlify/88839670-d62b-4c07-9932-30d67a00fd65?style=flat-square
[netlify-status-href]: https://app.netlify.com/sites/js-f-k
[i18n-en-img]: https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/VChet/js-f-k/master/ci/badges/en.json
[website-img]: https://img.shields.io/badge/Website-181a1c?style=for-the-badge&logo=netlify
[website-href]: http://js-f-k.netlify.app
[mirror-img]: https://img.shields.io/badge/Mirror-181a1c?style=for-the-badge&logo=cloudflare
[mirror-href]: https://js-f-k.pages.dev
[telegram-img]: https://img.shields.io/badge/Telegram-181a1c?style=for-the-badge&logo=telegram
[telegram-href]: https://t.me/js_f_k
