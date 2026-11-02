<div align="center">

# ⚡️ Next.js 16 Developer Portfolio & App Template

**An ultra-fast, modern, accessible, and SEO-optimized Developer Portfolio & App Showcase starter template.**  
Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

[Live Demo](https://shovon.bd) · [Use This Template](https://github.com/sh00von/nextjs-developer-portfolio/generate) · [Report Bug](https://github.com/sh00von/nextjs-developer-portfolio/issues) · [Request Feature](https://github.com/sh00von/nextjs-developer-portfolio/issues)

<br/>

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

[![GitHub stars](https://img.shields.io/github/stars/sh00von/nextjs-developer-portfolio?style=social)](https://github.com/sh00von/nextjs-developer-portfolio/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/sh00von/nextjs-developer-portfolio?style=social)](https://github.com/sh00von/nextjs-developer-portfolio/network/members)

</div>

---

## 🌟 Why Use This Template?

Whether you are a **Software Engineer**, **Full-Stack Developer**, **Security Researcher**, or **Data Scientist**, this portfolio kit provides everything you need to showcase your work, apps, publications, security disclosures, and achievements with a high-performance, polished UI.

### ✨ Key Features

- ⚡️ **Next.js 16 App Router & React 19** — Lightning-fast server side rendering & static optimization.
- 🎨 **Tailwind CSS v4 & Next-Themes** — Sleek dark/light theme switching with modern color palettes and micro-animations.
- 🔍 **Interactive Command Palette (`Cmd + K`)** — Instant keyboard-driven navigation across sections, external links, and projects.
- 📁 **Data-Driven Architecture (`src/data/`)** — Completely decoupled content! Customize your portfolio items by updating simple TypeScript arrays without editing component code.
- 📡 **Automated SEO & Feed Engine**:
  - Dynamic `sitemap.ts` generation
  - Built-in RSS Feed generation (`src/app/rss.xml/route.ts`)
  - Configured `robots.ts` for search engines
  - OpenGraph & Twitter Card metadata setup
- 📱 **Mobile-First & Responsive Layout** — Optimized for all devices from mobile screens to ultra-wide displays.
- 🖼 **Lightbox Gallery & Product Pages** — Built-in image preview lightbox, project filtering, security research listings, and app privacy policy subpages.
- ⚡️ **100/100 Lighthouse Performance** — Zero bloated libraries, lightweight assets, and clean semantic markup.

---

## 🚀 Quick Start

### 1. Click "Use this template"
Click the **[Use this template](https://github.com/sh00von/nextjs-developer-portfolio/generate)** button at the top of this GitHub repository to generate your own fresh repository.

### 2. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view your site live.

---

## ⚙️ How to Customize

All site content is cleanly structured inside `src/data/` so you can update your personal profile in seconds:

```
src/data/
├── home.ts      # Bio, Socials, Experience, Education, Publications, Security Disclosures & Skills
├── projects.ts  # Web apps, open-source projects, tech stacks, and live demo links
└── apps.ts      # Custom apps, privacy policy content, and store links
```

### Example: Updating your profile (`src/data/home.ts`)
```typescript
export const socials = [
  ["GitHub", "https://github.com/YOUR_USERNAME"],
  ["LinkedIn", "https://www.linkedin.com/in/YOUR_PROFILE/"],
  ["Resume", "/resume.pdf"],
] as const;
```

---

## 📂 Directory Structure

```text
├── src/
│   ├── app/                # Next.js App Router (pages, layout, API routes, RSS, sitemap)
│   │   ├── apps/           # Apps list page
│   │   ├── projects/       # Projects list page
│   │   ├── security/       # Security disclosures subpages
│   │   ├── rss.xml/        # RSS feed API endpoint
│   │   ├── globals.css     # Tailwind CSS v4 setup & custom utilities
│   │   └── layout.tsx      # Root layout with theme provider
│   ├── components/         # Reusable React components
│   │   ├── CommandPalette.tsx  # Cmd+K search modal
│   │   ├── HomePage.tsx        # Main homepage assembler
│   │   ├── SiteChrome.tsx      # Header navigation & footer
│   │   └── GalleryLightbox.tsx # Image viewer lightbox
│   └── data/               # Modular data files (Socials, Projects, Apps, Experience)
├── public/                 # Static images, favicon, icons, and PDF resume
├── package.json
└── README.md
```

---

## 🛠 Tech Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Theme:** [next-themes](https://github.com/pacocoursey/next-themes)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Deployment:** [Vercel](https://vercel.com)

---

## 🌐 Deploy to Vercel

Deploy your portfolio to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsh00von%2Fnextjs-developer-portfolio)

---

## 🏷 Keywords & SEO Tags

`nextjs-portfolio` · `developer-portfolio` · `react19` · `nextjs16` · `typescript-portfolio` · `portfolio-template` · `cmd-k-command-palette` · `tailwinds-css-v4` · `dark-mode-portfolio` · `open-source-template` · `vercel-template` · `seo-friendly-portfolio`

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — free to use, modify, and distribute for personal or commercial projects.

The MIT License covers the **code**. Personal content (my photo, resume, bio, writing and project screenshots) is not part of the template — please replace it with your own.

See also: [Contributing](CONTRIBUTING.md) · [Code of Conduct](CODE_OF_CONDUCT.md) · [Security Policy](SECURITY.md)

---

<div align="center">

### ⭐ Give a Star!
If you found this template helpful, please consider **giving it a star on GitHub**! It helps others discover this project.

Crafted with ❤️ by [Md. Minaruzzaman Shovon](https://github.com/sh00von)

</div>
