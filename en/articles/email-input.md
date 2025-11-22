---
title: "Why You Shouldn't Validate Emails Using Complex Regular Expressions"
description: "When regex-based email validation is unnecessary and how to correctly ensure the entered address is valid."
date: 2025-11-04
author: ["vchet"]
tags: ["html"]
---

# Why You Shouldn't Validate Emails Using Complex Regular Expressions

If you have a task like "verify that the entered email fully complies with the RFC standard", then most likely you're misunderstanding the actual purpose of the form you're you're giving to the user. The only real goal is to make sure you can reach the user using the provided address.

Writing elaborate regex patterns like:

```txt
(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])
```

may be an "entertaining" activity, but in practice they're always unnecessary.

## Simple Validation

If you just need to ensure the user didn't mistype the field, checking for the presence of `@` is enough.

If you want something slightly stricter: `.+@.+\..+` — this verifies:

- at least one character before `@`
- a domain after `@`
- a dot and a top-level domain

Even this level of checking is often overkill: the main goal is simply that the address is reachable.

## Why Full Validation Is Excessive

[RFC 5322](https://datatracker.ietf.org/doc/html/rfc5322) describes email as a fairly complex structure:

- the local part before `@` may include special characters
- comments in parentheses are allowed, including nested ones
- the server handles the local part based on its own rules, and nonstandard addresses might still be valid

Even a perfectly written regex can reject working addresses. Strict validation risks pushing away users who have unusual but perfectly functional mail servers.

The only reliable way to confirm an email works is to send a confirmation message. That's the only way to verify the address actually exists and the user can receive mail at it.

## Basic Validation Rules

For simple, user-friendly validation, it's enough to ensure:

- the field isn't empty
- the field contains an `@` symbol
- there's protection against SQL injections or other obvious abuses

## Conclusion

- Complex email regex patterns are almost always unnecessary
- Basic checks are sufficient for most tasks
- The main validation tool is a confirmation email
