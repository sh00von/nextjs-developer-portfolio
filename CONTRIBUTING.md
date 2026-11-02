# Contributing

Thanks for your interest in improving this project! This repository is both my personal portfolio
([shovon.bd](https://www.shovon.bd)) and an open-source Next.js portfolio template, so contributions that
improve the **template** (bugs, accessibility, performance, docs) are especially welcome.

By participating, you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Ways to contribute

- **Report a bug** – open a [bug report](https://github.com/sh00von/nextjs-developer-portfolio/issues/new?template=bug_report.yml).
- **Suggest a feature** – open a [feature request](https://github.com/sh00von/nextjs-developer-portfolio/issues/new?template=feature_request.yml).
- **Fix something** – look for open issues, or open one first for larger changes so we can agree on the approach.
- **Security issues** – please follow the [Security Policy](SECURITY.md) instead of opening a public issue.

## Development setup

Requirements: Node.js 20+ and [pnpm](https://pnpm.io/).

```bash
git clone https://github.com/sh00von/nextjs-developer-portfolio.git
cd nextjs-developer-portfolio
pnpm install
pnpm dev
```

The site runs at <http://localhost:3000>.

## Project structure

| Path                   | What lives there                                        |
| ---------------------- | ------------------------------------------------------- |
| `src/app/`             | App Router pages, routes, sitemap, RSS and OG images    |
| `src/components/`      | Shared UI (navigation, homepage sections, tables)       |
| `src/data/`            | Content as typed TypeScript data (projects, CVEs, apps) |
| `src/content/blog/`    | Blog posts in Markdown                                  |
| `src/app/globals.css`  | Design tokens and shared component classes              |

Most content changes only need edits in `src/data/`.

## Making a change

1. Fork the repository and create a branch from `main`, e.g. `fix/mobile-menu-focus`.
2. Make your change, keeping it focused on one thing.
3. Run the checks before pushing:

   ```bash
   pnpm lint
   pnpm build
   ```

4. Check the change at both mobile (~390px) and desktop widths.
5. Open a pull request and fill in the template.

## Style guidelines

- TypeScript everywhere; avoid `any`.
- Use Tailwind utilities and the CSS variables in `globals.css` (`var(--text)`, `var(--border)`, …) rather than new hard-coded colors.
- Keep components accessible: semantic HTML, labelled controls, visible focus states, and enough color contrast.
- Prefer server components; add `"use client"` only where interactivity requires it.
- Write commit messages in the imperative mood, e.g. `Fix focus trap in mobile menu`.

## Personal content

Pull requests that change my personal details (bio, experience, CVEs, photos, resume) won't be merged unless
they fix an obvious error. If you're using this as a template, replace that content in your own fork.
