---
title: "Downloading an app from RuStore without registration"
description: "Downloading an APK from RuStore without registration via the official API: how to get information about the app and download the APK from RuStore."
date: 2025-07-03
author: "vchet"
tags: ["service"]
---

# Downloading an app from RuStore without registration

**RuStore** is a Russian app store that requires mandatory registration to download apps. However, **RuStore** has a public API that can be used to obtain app data and download APKs even without an account.

## API requests

### Obtaining the app information

`GET https://backapi.rustore.ru/applicationData/overallInfo/{packageName}`

We receive detailed information about the application and the **id** we need in `body.appId` in the response.

### Obtaining a link to download the APK

`POST https://backapi.rustore.ru/applicationData/download-link`

```json
{
  "appId": "body.appId",
  "firstInstall": true
}
```

The response will contain the URL in `body.apkUrl`.

### Downloading the APK

Opening the `body.apkUrl` will download a `.zip` file with the application, inside which will be the `.apk` file we need.

Detailed information about endpoints can be found at [gist.github](https://gist.github.com/oldnomad/5d38a9ea9b1daf9d82fa4f655b9aebe8).

## Summary

With a couple of requests to the **RuStore** API, you can bypass the registration requirement and get the APK file directly. This is useful for automatic updates, backups, or application analysis. All you need to know is the application's `packageName`.
