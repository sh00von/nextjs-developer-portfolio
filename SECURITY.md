# Security Policy

## Supported versions

Only the latest code on the `main` branch (deployed at [shovon.bd](https://www.shovon.bd)) receives security fixes.

| Version        | Supported |
| -------------- | --------- |
| `main`         | ✅        |
| Older commits  | ❌        |

## Reporting a vulnerability

**Please do not report security vulnerabilities through public GitHub issues, discussions or pull requests.**

Instead, report them privately using one of these channels:

- **GitHub:** open a [private security advisory](https://github.com/sh00von/nextjs-developer-portfolio/security/advisories/new) (preferred)
- **Email:** [minar.svn@gmail.com](mailto:minar.svn@gmail.com)

Please include as much of the following as you can:

- The type of issue (e.g. XSS, open redirect, information disclosure)
- The affected URL, route or source file(s)
- Step-by-step instructions to reproduce
- Proof-of-concept or exploit code, if available
- The impact and how an attacker might use it

## What to expect

- **Acknowledgement** within 3 business days
- **Initial assessment** within 7 days
- A fix or mitigation plan for confirmed issues, with credit in the release notes if you would like it

The site's machine-readable contact details are published at
[`/.well-known/security.txt`](https://www.shovon.bd/.well-known/security.txt) (RFC 9116).

## Scope

In scope: this repository's code and the site it deploys to `shovon.bd`.

Out of scope: third-party services (Vercel, Umami, Google Fonts), denial-of-service attacks, social engineering, and findings from automated scanners without a demonstrated impact.
