---
title: "GitHub Release Automation"
description: "A repository template for automating version publishing, generating changelogs, and creating GitHub Releases using GitHub Actions."
date: 2025-02-17
author: "vchet"
tags: ["ci/cd", "git", "github", "npm"]
---

# GitHub Release Automation

If you maintain multiple projects or libraries on GitHub and are tired of creating releases manually, the [Auto Release Template](https://github.com/VChet/auto-release-template) can help automate the process. It generates a changelog, creates a commit with the new version, tags it, and publishes a GitHub Release. Releases are never published without your confirmation — you always have the chance to review them first. A key advantage is that all changes are immediately visible in the GitHub Release, without a separate link to the full changelog.

## How It Works

1. Make changes and name your commits according to [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).
1. Run `npm run release` — the version is updated, `CHANGELOG.md` is generated, and a commit and tag are created.
1. Push your changes with `git push --follow-tags`.
1. A GitHub Action triggers on the new tag and creates a GitHub Release with the automatically generated changelog.

## Configuration and Customization

You can adjust the commit format, tag prefix, and the types of commits that appear in the changelog. Additionally, you can configure:

- Automatic publishing to npm or GitHub Packages registry;
- Support for `pnpm`;
- Draft releases;
- Generation of a provenance statement;
- Hooks and inclusion of generated files in your build.

Detailed examples for advanced scenarios are available in the [wiki](https://github.com/VChet/auto-release-template/wiki).

## Summary

Using the Auto Release Template saves time on creating releases, allows you to pause or roll back at any step, and provides a clean changelog directly in GitHub Releases. With proper GitHub Actions setup, it also enables publishing releases in private and team repositories while keeping full control and transparency over the process.
