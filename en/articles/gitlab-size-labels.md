---
title: "Automatic size labels for Merge Requests in GitLab CI"
description: "How to automatically assign size/M and size/XL labels to Merge Requests in GitLab CI based on the number of changes."
date: 2025-07-22
author: "vchet"
tags: ["ci/cd", "git"]
---

# Automatic size labels for Merge Requests in GitLab CI

In large projects, it's handy to sort Merge Requests by size: small changes can be reviewed quickly, while big ones need more careful attention. Instead of assigning labels manually, you can add a script to **GitLab CI** that automatically sets them based on the number of lines in the diff.

These labels can help with filtering, statistics, or even merge control — for example, requiring two reviews before merging especially large changes (`size/XL`).

## Implementation

First, you'll need a token stored in the `SIZE_LABEL_JOB_TOKEN` environment variable. The token must have the following scopes:

- `api`
- `read_repository`
- `write_repository`

Instead of bulky bash scripts, we'll write the logic in **JavaScript** and hook it into the GitLab CI pipeline.

1. Run the script on Merge Request

    ```yaml
    # .gitlab-ci.yaml
    size-label:
      stage: labeling
      only:
        - merge_requests
      script:
        - node ci/size-label.js
    ```

1. Fetch changes from the Merge Request

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

1. Count added and removed lines, ignoring large files

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

1. Assign a size label based on the total number of lines

    ```js
    let label = "size/XS";
    if (total >= 1000) label = "size/XL";
    else if (total >= 500) label = "size/L";
    else if (total >= 100) label = "size/M";
    else if (total >= 10) label = "size/S";

    console.info(`Changes: +${added}, -${removed} → ${label}`);
    ```

1. Update MR labels, preserving any unrelated to size

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

## Final code

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

## Conclusion

We now have a simple script, making it easier to assess the scale of large MR flows at a glance. Small ones (`size/XS`) can be accepted right away, medium ones (`size/M`) reviewed over a cup of tea, and large ones (`size/XL`) best avoided late on a Friday evening.
