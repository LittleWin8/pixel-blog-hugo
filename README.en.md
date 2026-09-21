# pixel-blog-hugo

A pixel-retro (pixel / 8-bit) Hugo blog theme: zero border-radius, 2px hard borders, solid offset shadows, colors from the Sweetie 16 pixel-art palette, with light and dark modes.

[中文说明](README.md)

| Home · light | Home · dark |
|---|---|
| ![Home · light](https://raw.githubusercontent.com/LittleWin8/pixel-blog-hugo/main/images/screenshot-home-light.png) | ![Home · dark](https://raw.githubusercontent.com/LittleWin8/pixel-blog-hugo/main/images/screenshot-home-dark.png) |

| Projects | Archive | Search |
|---|---|---|
| ![Projects](https://raw.githubusercontent.com/LittleWin8/pixel-blog-hugo/main/images/screenshot-projects.png) | ![Archive](https://raw.githubusercontent.com/LittleWin8/pixel-blog-hugo/main/images/screenshot-archive.png) | ![Search](https://raw.githubusercontent.com/LittleWin8/pixel-blog-hugo/main/images/screenshot-search.png) |

| Post | Mobile |
|---|---|
| ![Post](https://raw.githubusercontent.com/LittleWin8/pixel-blog-hugo/main/images/screenshot-post.png) | ![Mobile](https://raw.githubusercontent.com/LittleWin8/pixel-blog-hugo/main/images/screenshot-mobile.png) |

## Features

- Light/dark theme, follows the system, no flash (FOUC)
- Responsive layout with a collapsible mobile menu
- Home page: two-column hero, profile panel, featured work entry, tech stack (toggleable), latest posts
- **Projects (`/projects/`)**: content-driven, large card list + detail page; every card lifts on hover and links to its detail page; `status` supports Live / Completed / In development / Archived, and `online: true` adds a green dot and a "Live demo" button
- Top navigation and the links page (`/links/`) are config-driven, **comment out an item to hide it**
- Optional **CRT scanlines** (`params.scanlines`), footer **ICP number** (`params.icp`), **social icons** (`params.social`)
- **Hero copy / site name and logo / tech stack / links all live in your site config (overriding theme defaults)**
- Post / project pages: **sticky right-hand table of contents**, tags, prev/next, **one-click code copy**, **related posts** (TOC moves above the content on narrow screens)
- **Markdown render hooks**: lazy-loaded images with responsive `srcset` and captions, external links open in a new tab, heading anchor links
- **Built-in search** (covers posts and projects, pure front-end, no dependencies)
- Tag cloud and tag pages, **archive page** (grouped by year), **404 page**, robots.txt, footer **RSS** icon
- SEO: JSON-LD (BlogPosting / breadcrumbs), OG / Twitter share images (site default + post cover), description / canonical, RSS, sitemap
- Accessibility: skip link, consistent focus styles, labelled pagination controls
- Driven by CSS custom properties — change one color and the whole site follows
- Styles and scripts bundled, minified and fingerprinted via Hugo Pipes — no npm / build tooling
- i18n UI strings (Chinese / English), including copy-code and social-link labels

## Getting started

### 1. Create a site and install the theme

> Requires **Hugo ≥ 0.158** (extended not required).

```bash
# Create a site (skip if you already have one)
hugo new site my-blog
cd my-blog
git init

# Install the theme (pick one)

# Option A: Git submodule (requires git)
git submodule add https://github.com/LittleWin8/pixel-blog-hugo themes/pixel-blog-hugo

# Option B: Hugo Modules (requires Go; import it in hugo.toml, see below)
#   hugo mod init github.com/<your-name>/my-blog
#   hugo mod get github.com/LittleWin8/pixel-blog-hugo

# Option C: download the zip and extract it into themes/pixel-blog-hugo
```

> **Option A / C**: set `theme = "pixel-blog-hugo"` in your site's `hugo.toml`.
> **Option B (Modules)**: remove `theme = ...` and import instead:
> ```toml
> [module]
>   [[module.imports]]
>     path = "github.com/LittleWin8/pixel-blog-hugo"
> ```
> `hugo mod get` downloads it automatically; update with `hugo mod get -u`.

### 2. Configure `hugo.toml`

Only the basics are needed (personalization comes next):

```toml
baseURL = "https://example.com/"
locale = "en-us"
defaultContentLanguage = "en"
title = "My Blog"
theme = "pixel-blog-hugo"
enableRobotsTXT = true
hasCJKLanguage = false     # enable for Chinese/Japanese/Korean sites
summaryLength = 30         # the three lines above are examples — adjust as needed
# enableGitInfo = true     # use Git commit time as the "Updated" date (see below)

[outputs]
  home = ["HTML", "RSS", "JSON"]   # JSON powers built-in search

[pagination]
  pagerSize = 8
[taxonomies]
  tag = "tags"
[markup]
  [markup.goldmark.parser]
    wrapStandAloneImageWithinParagraph = false   # render-hook images emit <figure>, keep them out of <p>
  [markup.goldmark.renderer]
    unsafe = true
  [markup.highlight]
    noClasses = false
  [markup.tableofcontents]     # heading levels shown in the TOC
    startLevel = 2
    endLevel = 4
```

### 3. Write content and preview

```bash
hugo new posts/hello.md        # a post; set draft to false before publishing
hugo new projects/my-app.md    # a project (fields described below)
hugo new about.md              # about page: the hero's "About me" button points to /about/

hugo server -D                 # preview at http://localhost:1313
hugo                           # build into public/, deploy anywhere
```

## Personalization

One rule: **to change your own blog, only touch files in your own site** — you rarely need to touch the theme:

| What you want to change | Which file |
|---|---|
| Name, logo, hero copy, tech stack, links, nav, toggles | **`[params]` in your site's `hugo.toml`** (copy the sample below) |
| Posts | your site's `content/posts/` |
| Projects | your site's `content/projects/` |
| Theme defaults / look / features (advanced) | the theme's `hugo.toml`, `assets/`, `layouts/` — see [CONTRIBUTING.md](CONTRIBUTING.md) |

> ⚠️ Site-level keys like `baseURL`, `title`, `theme`, `[outputs]`, `[markup]` only work **in your site's root `hugo.toml`** (putting them in the theme config fails silently).

**Paste the content of** [`exampleSite/hugo.toml`](exampleSite/hugo.toml) **into your site's own `hugo.toml`**, then replace the values with yours following the comments inside.

> Don't panic if some links 404 right after pasting — the example config references pages (archives, projects, links, about) that don't exist in your site yet. That's expected. **Follow the sections below to create those pages** (archive / search / projects / links / about) and everything will resolve.

### Share thumbnails and page description (SEO, automatic)

- **Share image**: site default `params.assets.ogImage`; per-post front matter `cover` (auto-cropped to 1200×630).
- **Description**: front matter `description` → summary → site `params.description`, auto-emitted to `<meta>`.
- **Updated date**: shown when `lastmod ≠ date`. Set `enableGitInfo = true` to use Git commit time.

## Archive / search pages

Both are "a content page + a theme layout" — create one file each in your **site** (`exampleSite` already has them):

```markdown
<!-- content/archives.md -->
---
title: "Archive"
layout: "archives"
---

<!-- content/search.md -->
---
title: "Search"
layout: "search"
---
```

- The archive page groups by year automatically; add `{ name = "Archive", url = "/archives/", icon = "archives" }` to `params.nav` to put it in the nav.
- Reach search via the magnifier in the top bar; it needs `JSON` in the home outputs (see Getting started).

## Links page

Two steps: **create a content page** + **list your links in the site config**.

1) Create `content/links.md` in your site (`exampleSite` already has one):

```markdown
---
title: "Links"
layout: "links"
---
```

2) The `[params.links]` block is already in what you pasted (field docs are in the `exampleSite/hugo.toml` comments) — just replace the entries with your own friends.

- Add a nav entry: add `{ name = "Links", url = "/links/", icon = "links" }` to `params.nav`.
- To write an intro (e.g. "get in touch to swap links"), put it in the body of `links.md` — it appears below the list.
- **Don't want the page?** Delete `content/links.md` and remove the nav entry.

## Projects (`content/projects/`)

One Markdown file per project, generating the `/projects/` list and a `/projects/<filename>/` detail page:

```bash
hugo new projects/my-app.md   # generates a skeleton with all fields commented
```

Common front-matter fields (see the skeleton comments via `hugo new` for the full list):

```yaml
---
title: "Pixel Notes"
subtitle: "A pixel-art note app"   # extra text after the title
date: 2026-09-18
weight: 1                      # list order (lower first)
online: true                   # ★ is it live (drives the "Live demo" button and the home green dot)
status: ""                     # status badge: online / done / wip / archived; derived from `online` when empty
featured: true                 # "Featured" badge
link: "https://example.com"    # "Live demo" button (hidden if omitted)
source: "https://github.com/you/repo"  # "Source" button (hidden if omitted)
icon: "📝"                     # card icon (emoji / text)
tags: ["Vue.js", "TypeScript"]
summary: "One-line intro, shown on the card and list."
---

Detail page body (Markdown).
```

**`status` controls the status badge** (derived from `online` when empty: `online: true` → `online`, otherwise `wip`):

| `status` | Badge | Home green dot | Live demo button |
|---|---|---|---|
| `online` | "Live" (green) | ✅ | ✅ (when `link` is set) |
| `done` | "Completed" (blue) | ❌ | ❌ |
| `wip` (or omitted) | "In development" (yellow) | ❌ | ❌ |
| `archived` | "Archived" (grey) | ❌ | ❌ |

- Every project card (both the `/projects/` list and the home "Selected Work" entry) **lifts on hover, and the whole card links to its detail page**.
- The "Live demo" button and the home green dot still require `online: true`; `done` / `wip` / `archived` don't show them.
- How many home entry items are shown is `params.works.count`, ordered by `weight`.
- The projects list (`/projects/`) shows **all** projects.

## Multilingual (Chinese / English)

The theme ships UI strings in Chinese and English (`i18n/`) plus a built-in language switcher — shown only when your site configures **2 or more languages**.

Enable it in your site's config:

```toml
defaultContentLanguage = "en"
defaultContentLanguageInSubdir = false   # English at /, Chinese at /zh/

[languages]
  [languages.en]
    locale = "en-us"
    label = "English"
    title = "LittleWin's Blog"
    weight = 1
  [languages.zh]
    locale = "zh-cn"
    label = "中文"
    title = "小稳的博客"
    weight = 2
    [languages.zh.params]      # override theme params for this language
      [languages.zh.params.hero]
        title = "小稳"
        tagline = "全栈开发者..."
        intro = "..."
      [languages.zh.params.nav]   # nav: arrays are replaced wholesale, so write them in full
        [[languages.zh.params.nav]]
          name = "首页"
          url = "/"
          icon = "home"
        [[languages.zh.params.nav]]
          name = "博客"
          url = "/posts/"
          icon = "posts"
```

Use filename suffixes for translated pages: `hello-world.md` ↔ `hello-world.zh.md`; taxonomy titles use `_index.zh.md`.

> Language-level `params` merge with the theme defaults — only write the fields you translate. Arrays (like `nav`, `links.items`, `techstack.groups`) are replaced wholesale, so write them in full.

## Credits

- Design inspiration: [千夜の詩の小窝 · 1000ye.top](https://1000ye.top/) by [@X1aoM1ngTX](https://github.com/X1aoM1ngTX). This theme is an independent **Hugo implementation** of that pixel-retro design; all code and assets are original.
- The same design as a **Next.js** project: [X1aoM1ngTX/pixel-blog](https://github.com/X1aoM1ngTX/pixel-blog).
- Pixel font: [Fusion Pixel](https://github.com/TakWolf/fusion-pixel-font) (SIL OFL 1.1).
- Line icons inspired by [Lucide](https://lucide.dev/) (ISC).

See [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md) for the full list.

## License

[MIT](LICENSE) © 2026 LittleWin
