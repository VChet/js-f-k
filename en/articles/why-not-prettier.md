---
title: "Why you can (and should) abandon Prettier"
description: "Abandoning Prettier — why the popular code formatter is losing relevance and how ESLint has become a convenient and flexible alternative."
date: 2025-07-17
author: "vchet"
tags: ["linters"]
---

# Why you can (and should) abandon Prettier

Once upon a time, [Prettier](https://prettier.io) was the obvious choice when starting a new project. But times are changing — and now it's more of a nuisance than a help.

[Anthony Fu](https://antfu.me) (core member of **Vue**, **Nuxt**, and **Vite**) wrote [a compelling article](https://antfu.me/posts/why-not-prettier) back in 2022 about why he no longer uses **Prettier**. Below is a summary of the key arguments:

- **Opinionated**. The creators of Prettier have their own opinion on how code should look — and almost no configuration.
- **Minimal flexibility**. In addition to the inability to configure rules, most of them cannot even be disabled.
- **Conflicts with ESLint**. Prettier imposes style, ESLint checks logic. To make them work together, you have to install wrappers like [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier).
- **ESLint is a modern alternative**. In the current reality, ESLint itself handles formatting just as well, but at the same time gives you complete control in a single ecosystem.

## Opinion

I started using Prettier in 2018, and even then it caused inconvenience. Previously, there were no decent alternatives, and it really did save time. But now its time has passed. If you still have to explain what's wrong with Prettier, just link to this article.
