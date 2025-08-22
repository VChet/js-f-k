---
title: "Display merged git branches and related tasks"
description: "How to find merged git branches and check related tasks in the tracker. Simplifies cleaning up the repository after releases and helps you not to lose anything important."
date: 2025-07-01
author: "vchet"
tags: ["git", "npm"]
---

# Display merged git branches and related tasks

In a large repository where several developers work simultaneously, there can be up to 30 active branches, some of which are paused, some are in progress, and some are marked for an upcoming release. After each release, such branches need to be deleted, but doing this manually is a dubious task. To avoid missing a branch or deleting the wrong one, you can use `git-merged-branches`.

[git-merged-branches](https://www.npmjs.com/package/git-merged-branches) is a CLI utility that shows branches merged into the main branch (**master** or **main**). It works locally, is easy to use, has no child dependencies, and is also available under the short alias `gmb`.

The main feature is the ability to view links to tasks from the tracker directly in the branch list, if the name uses task identifiers such as **JIRA-123**, **BUG-42**, etc.

## Usage

Install globally:

```bash
npm install --global git-merged-branches
```

Or run via `npx`:

```bash
npx git-merged-branches
```

By calling `git-merged-branches`, or the alias `gmb`, the utility will determine the base branch (**master** or **main**) and display a list of branches that have already been merged into it:

```bash
$ gmb

Branches merged into 'master':
bugfix/fix-crash-on-start
feature/add-new-feature
hotfix/urgent-fix
```

### Configuring task identifiers

If you use task prefixes in branch names, such as **TOKEN-123_fix-layout**, you can configure automatic addition of links to the task tracker.

```json
// package.json
{
  "git-merged-branches": {
    "issueUrlFormat": "https://jira.my-company.com/browse/{{prefix}}{{id}}",
    "issueUrlPrefix": ["TOKEN-", "BUG-"]
  }
}
```

This will change the output to the following:

```bash
TOKEN-123_fix-layout <https://jira.my-company.com/browse/TOKEN-123>
BUG-56_add-tests <https://jira.my-company.com/browse/BUG-56>
```

`git-merged-branches` is a minimalistic but useful utility that allows you to quickly clean up branches while checking their status in the tracker.
