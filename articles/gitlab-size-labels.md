---
title: "Автоматические size-метки для Merge Request в GitLab CI"
description: "Как автоматически выставлять метки size/M и size/XL в Merge Request в GitLab CI на основе количества изменений."
date: 2025-07-22
tags: ["ci/cd"]
---

# Автоматические size-метки для Merge Request в GitLab CI

В больших проектах удобно сортировать Merge Request по размеру: мелкие правки можно рассмотреть быстро, а крупные требуют отдельного внимания. Чтобы не выставлять метки вручную, можно добавить скрипт в GitLab CI, который автоматически будет присваивать их ориентируясь на количество строк в diff.

Такие метки можно использовать для фильтрации, статистики или даже контроля слияния — например, разрешать `size/XL` только после двух ревью.

## Реализация

Прежде всего, потребуется токен, который нужно указать в переменной окружения SIZE_LABEL_JOB_TOKEN. У токена должны быть следующие права:

- `api`
- `read_repository`
- `write_repository`

Вместо громоздких bash-скриптов напишем логику на **JavaScript**, и подключим её к пайплайну GitLab CI.

1. Запускаем скрипт на Merge Request

    ```yaml
    # .gitlab-ci.yaml
    size-label:
      stage: labeling
      only:
        - merge_requests
      script:
        - node ci/size-label.js
    ```

1. Получаем изменения из Merge Request

    ```js
    const TOKEN = process.env.SIZE_LABEL_JOB_TOKEN;
    const API_URL = process.env.CI_API_V4_URL;
    const REPO_ID = process.env.CI_PROJECT_ID;
    const MR_IID = process.env.CI_MERGE_REQUEST_IID;

    const MR_ENDPOINT = `${API_URL}/projects/${REPO_ID}/merge_requests/${MR_IID}`;

    async function apiRequest(url, method = "GET", body = null) {
      const headers = { "PRIVATE-TOKEN": TOKEN };
      if (body) headers["Content-Type"] = "application/json";
      const response = await fetch(url, { method, headers, body });
      if (!response.ok) throw new Error(`HTTP error ${response.status}: ${await response.text()}`);
      return response.json();
    }

    const mrData = await apiRequest(`${MR_ENDPOINT}/changes`);
    ```

1. Считаем количество добавленных и удалённых строк, игнорируя крупные файлы

    ```js
    const IGNORED_FILES = ["package-lock.json"];

    const diffs = mrData.changes
      .filter(({ new_path }) => !IGNORED_FILES.some((x) => new_path.endsWith(x)))
      .map(({ diff }) => diff)
      .join("\n");

    const added = (diffs.match(/^\+[^+]/gm) ?? []).length;
    const removed = (diffs.match(/^-[^-]/gm) ?? []).length;
    const total = added + removed;
    ```

1. По общему числу строк назначаем одну из меток размера

    ```js
    let label = "size/XS";
    if (total >= 1000) label = "size/XL";
    else if (total >= 500) label = "size/L";
    else if (total >= 100) label = "size/M";
    else if (total >= 10) label = "size/S";

    console.info(`Changes: +${added}, -${removed} → ${label}`);
    ```

1. Обновляем метки MR, сохранив все не связанные с размером

    ```js
    const mrMeta = await apiRequest(MR_ENDPOINT);
    const existingLabels = mrMeta.labels.filter((l) => !l.startsWith("size/"));
    const newLabels = [...existingLabels, label];

    if (newLabels.every((l) => mrMeta.labels.includes(l))) {
      console.info("No labels update needed");
    } else {
      await apiRequest(MR_ENDPOINT, "PUT", JSON.stringify({ labels: newLabels }));
      console.info(`Applied labels: ${newLabels.join(",")}`);
    }
    ```

## Итоговый код

```js
// ci/size-label.js
import process from "node:process";

const TOKEN = process.env.SIZE_LABEL_JOB_TOKEN;
const API_URL = process.env.CI_API_V4_URL;
const REPO_ID = process.env.CI_PROJECT_ID;
const MR_IID = process.env.CI_MERGE_REQUEST_IID;

const MR_ENDPOINT = `${API_URL}/projects/${REPO_ID}/merge_requests/${MR_IID}`;

const IGNORED_FILES = ["package-lock.json"];

async function apiRequest(url, method = "GET", body = null) {
  const headers = { "PRIVATE-TOKEN": TOKEN };
  if (body) headers["Content-Type"] = "application/json";
  const response = await fetch(url, { method, headers, body });
  if (!response.ok) throw new Error(`HTTP error ${response.status}: ${await response.text()}`);
  return response.json();
}

async function main() {
  try {
    const mrData = await apiRequest(`${MR_ENDPOINT}/changes`);
    const diffs = mrData.changes
      .filter(({ new_path }) => !IGNORED_FILES.some((x) => new_path.endsWith(x)))
      .map(({ diff }) => diff)
      .join("\n");

    const added = (diffs.match(/^\+[^+]/gm) ?? []).length;
    const removed = (diffs.match(/^-[^-]/gm) ?? []).length;
    const total = added + removed;

    let label = "size/XS";
    if (total >= 1000) label = "size/XL";
    else if (total >= 500) label = "size/L";
    else if (total >= 100) label = "size/M";
    else if (total >= 10) label = "size/S";

    console.info(`Changes: +${added}, -${removed} → ${label}`);

    const mrMeta = await apiRequest(MR_ENDPOINT);
    const existingLabels = mrMeta.labels.filter((l) => !l.startsWith("size/"));
    const newLabels = [...existingLabels, label];

    if (newLabels.every((l) => mrMeta.labels.includes(l))) {
      console.info("No labels update needed");
    } else {
      await apiRequest(MR_ENDPOINT, "PUT", JSON.stringify({ labels: newLabels }));
      console.info(`Applied labels: ${newLabels.join(",")}`);
    }
  } catch (error) {
    console.error("Error applying label:", error.message ?? error);
    process.exit(1);
  }
}

main();
```

## Заключение

Получили простой скрипт, теперь при большом потоке MR проще оценить их масштаб с первого взгляда. Мелкие (`size/XS`) можно принять сразу, средние (`size/M`) — просмотреть за чашкой чая, а к крупным (`size/XL`) не подступаться в вечер пятницы.
