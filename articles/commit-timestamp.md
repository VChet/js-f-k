---
title: "Отображение SHA и времени коммита в веб-приложении"
description: "Как отображать SHA и дату последнего git-коммита в Vite-приложении через import.meta.env?"
date: 2026-07-23
author: ["vchet", "rudnovd"]
tags: ["build", "git", "vite"]
discussionId: 65
---

# Отображение SHA и времени коммита в веб-приложении

Если вы не используете [SemVer](https://semver.org/lang/ru) или приложение еще не получило стабильной версии — имеет смысл отображать SHA последнего коммита и его дату, чтобы понимать, какая версия сейчас запущена. В Vite это реализуется в несколько строк.

## Получение информации о коммите

В любом удобном файле, либо прямо в `vite.config.ts` напишите:

```ts
import { execFileSync } from "node:child_process";

const commitSHA = execFileSync("git", ["rev-parse", "--short", "HEAD"], { encoding: "utf8" }).trim();
const commitDate = execFileSync("git", ["log", "-1", "--format=%cI"], { encoding: "utf8" }).trim();
```

::: details Что делает этот код?
`execFile` (и его синхронная версия `execFileSync`) запускает исполняемый файл, в нашем случае `git` и передаёт в него параметры.

- `git rev-parse --short HEAD` — возвращает сокращённый SHA текущего коммита.
- `git log -1 --format=%cI` — возвращает дату последнего коммита в формате ISO.

Используется [execFile][node-execFile] вместо [exec][node-exec], чтобы запускать команду напрямую без передачи строки на обработку shell.

В опции `encoding` передается значение `utf8`, чтобы вызов вернул строку вместо `Buffer`.
:::

Добавьте значения в `define` в `vite.config.ts`:

```diff
export default defineConfig({
+ define: {
+   "import.meta.env.VITE_GIT_COMMIT_SHA": JSON.stringify(commitSHA),
+   "import.meta.env.VITE_GIT_COMMIT_DATE": JSON.stringify(commitDate)
+ }
});
```

## Добавление в компонент

Теперь в любом компоненте можно получить значения из переменных среды через `import.meta.env`.

```ts
const { VITE_GIT_COMMIT_SHA, VITE_GIT_COMMIT_DATE } = import.meta.env;
```

И использовать, например, вот так:

```ts
const commitDate = new Intl.DateTimeFormat(navigator.language, {
  year: "numeric",
  month: "long",
  day: "2-digit"
}).format(new Date(VITE_GIT_COMMIT_DATE));

const revision = `${commitDate} [${VITE_GIT_COMMIT_SHA}]`; // July 18, 2026 [369f0b3]
```

Такой способ позволяет быстро определить, какой коммит сейчас развернут, и убедиться, что деплой прошёл успешно.

⚠️ Этот способ работает только если во время сборки доступен git-репозиторий. Если проект собирается без каталога `.git`, команды завершатся ошибкой.

[node-execFile]: https://nodejs.org/api/child_process.html#child_processexecfilefile-args-options-callback
[node-exec]: https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback
