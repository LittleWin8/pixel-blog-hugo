# pixel-blog-hugo

A pixel-retro (pixel / 8-bit) Hugo blog theme: zero border-radius, 2px hard borders, solid offset shadows, colors from the Sweetie 16 pixel-art palette, with light and dark modes.

[中文说明](README.md)

| Home · light | Home · dark |
|---|---|
| ![Home · light](images/screenshot-home-light.png) | ![Home · dark](images/screenshot-home-dark.png) |

| Projects | Archive | Search |
|---|---|---|
| ![Projects](images/screenshot-projects.png) | ![Archive](images/screenshot-archive.png) | ![Search](images/screenshot-search.png) |

| Post | Mobile |
|---|---|
| ![Post](images/screenshot-post.png) | ![Mobile](images/screenshot-mobile.png) |

## Features

- Light/dark theme, follows the system, no flash (FOUC)
- Responsive layout with a collapsible mobile menu
- Home page: two-column hero, profile panel, featured work entry, tech stack (toggleable), latest posts
- **Projects (`/projects/`)**: content-driven, large card list + detail page; `online: true` projects get a green dot, hover effect and a "Live demo" button
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

> The hero always has an "About me →" button pointing to `/about/`. To drop it, delete `content/about.md` and override `params.hero` in your site, or edit the theme's `layouts/partials/hero.html` (advanced).

> The search page needs a `content/search.md` (`layout: search`) and `JSON` in the home outputs.

> **Content is not part of the theme** — it lives under your site's `content/`. For the theme's directory layout and dev notes (colors / fonts / breakpoints), see [CONTRIBUTING.md](CONTRIBUTING.md).

## Personalization

One rule: **to change your own blog, only touch files in your own site** — you rarely need to touch the theme:

| What you want to change | Which file |
|---|---|
| Name, logo, hero copy, tech stack, links, nav, toggles | **`[params]` in your site's `hugo.toml`** (copy the sample below) |
| Posts | your site's `content/posts/` |
| Projects | your site's `content/projects/` |
| Theme defaults / look / features (advanced) | the theme's `hugo.yaml`, `assets/`, `layouts/` — see [CONTRIBUTING.md](CONTRIBUTING.md) |

> Your site config may be `hugo.toml` or `hugo.yaml` — Hugo accepts both, but **don't mix formats in one file**. Examples below use `hugo.toml`.
> Theme defaults live in `themes/pixel-blog-hugo/hugo.yaml`; values in your site override them.

> ⚠️ These keys only work **in your site** (Hugo only merges the theme's `params` and `menu`):
> `baseURL`, `languageCode`, `defaultContentLanguage`, `title`, `theme`, `hasCJKLanguage`, `summaryLength`, `[outputs]`, `[pagination]`, `[taxonomies]`, `[markup]`.

Below is the full config of the bundled **example site** (`exampleSite/hugo.toml`). **Copy the whole block into your site's `hugo.toml`** and replace the values with your own:

```toml
[params]
  author = "LittleWin"
  description = "pixel-blog-hugo theme · example site"
  # copyright = "© 2024-2026 LittleWin"   # custom footer copyright (defaults to "© YEAR AUTHOR")
  # icp = "ICP-xxxxxxx"                   # footer license/ICP number (for CN sites)
  # scanlines = true                      # enable CRT scanline decoration
  toc = true                # show the table of contents on post pages
  homePosts = 6             # number of posts on the home page

  # Brand / top bar
  [params.identity]
    name = "LittleWin"                   # name in the top bar
    logo = "images/logo.png"             # logo (put it in your site's assets/)
    favicon = "images/logo.png"

  # Hero copy (intro supports Markdown, multiple paragraphs)
  [params.hero]
    eyebrow = "Example site · copy is yours to change"
    title = "LittleWin"
    tagline = "I write down what I tinker with."
    intro = """
An intro that supports **Markdown**, in as many paragraphs as you like.
"""

  # Home "featured work" entry (project content lives in content/projects/)
  [params.works]
    eyebrow = "FEATURED WORK"
    title = "Selected Work"
    count = 3                   # how many projects to show on the home page

  # Home "tech stack" (set enable = false to hide the whole block)
  [params.techstack]
    enable = true
    title = "Tech Stack"
    subtitle = "Tools and technologies I use"
    [[params.techstack.groups]]
      title = "Backend & Databases"
      icon = "backend"              # category icon name, see the table below
      description = "Mostly the Java ecosystem."
      items = ["Java", "Spring Boot", "MySQL", "Redis"]

  [params.assets]
    pixelFont = "https://cdn.jsdelivr.net/npm/@fontsource/fusion-pixel-12px-proportional-sc@5.3.0/index.css"
    ogImage = "/images/og-default.png"    # default share image (1200x630)

  # Social icons: only entries with a value are shown (hero + footer), all empty = hidden
  [params.social]
    github = "https://github.com/LittleWin8"
    # email = "you@example.com"                     # email (mailto: added automatically)
    # x = "https://x.com/yourname"
    # bilibili = "https://space.bilibili.com/yourUID"
    # steam = "https://steamcommunity.com/id/yourid"

  # Links page content
  [params.links]
    title = "Links"
    description = "Some interesting friends and their sites — swaps welcome."
    items = [
      { name = "Hugo", url = "https://gohugo.io/", description = "Static site generator" },
      { name = "GitHub", url = "https://github.com/", description = "Code hosting" },
    ]

# Top navigation: order = display order; comment an item out to hide it
# icon options: home / posts / tags / projects / links / archives / about (a dot is shown otherwise)
[[params.nav]]
  name = "Home"
  url = "/"
  icon = "home"
[[params.nav]]
  name = "Blog"
  url = "/posts/"
  icon = "posts"
[[params.nav]]
  name = "Projects"
  url = "/projects/"
  icon = "projects"
[[params.nav]]
  name = "Links"
  url = "/links/"
  icon = "links"
```

`params.works.count` controls how many entries the home page shows; set `params.techstack.enable = false` (or delete it) to hide the tech stack.

`params.social` built-in icons (shown only when set): `github` / `email` / `x` / `telegram` / `wechat` / `weibo` / `bilibili` / `zhihu` / `juejin` / `youtube` / `linkedin` / `mastodon` / `discord` / `instagram` / `steam`.

### Share thumbnails (OG, automatic)

The thumbnail shown when a link is shared to WeChat / X / Telegram and so on — **works out of the box** (the theme outputs standard `og:image` / `twitter:image` metadata):

- **Site default**: `params.assets.ogImage` (a 1200×630 image in your site's `static/`, e.g. `/images/og-default.png`).
- **Per post**: set `cover: "images/xxx.png"` in front matter (in the page bundle or under your site's `assets/`); the theme **crops it to 1200×630**. The front matter `images` list (first entry) also works as a fallback.

### Page description and keywords

- **Description**: resolved as front matter `description` → page summary → site `params.description`. Used for `<meta name="description">` and OG/Twitter.
- **Keywords**: site `params.keywords` (a list), emitted as `<meta name="keywords">`.
- **Updated date**: a post shows "Updated" when `lastmod ≠ date`. Set `enableGitInfo = true` on your site to use Git commit time, or write `lastmod` in front matter.

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

2) Fill in `[params.links]` in your site's `hugo.toml`:

```toml
[params.links]
  title = "Links"                                    # page title (falls back to the content title)
  description = "Some interesting friends and their sites."  # optional line under the title
  items = [
    { name = "Hugo", url = "https://gohugo.io/", description = "Static site generator" },
    { name = "A friend", url = "https://example.com/", description = "One-line intro", avatar = "https://example.com/avatar.png" },
  ]
```

- `name` and `url` are required; `description` and `avatar` are optional.
- `avatar` is an image URL (remote, or `/images/x.png`); **without it, a generic link icon is shown**.
- Add a nav entry: add `{ name = "Links", url = "/links/", icon = "links" }` to `params.nav`.
- To write an intro (e.g. "get in touch to swap links"), put it in the body of `links.md` — it appears below the list.
- **Don't want the page?** Delete `content/links.md` and remove the nav entry.

## Projects (`content/projects/`)

One Markdown file per project, generating the `/projects/` list and a `/projects/<filename>/` detail page:

```yaml
---
title: "Pixel Notes"
subtitle: "A pixel-art note app"   # extra text after the title
date: 2026-09-18
weight: 1                      # list order (lower first)
online: true                   # ★ is it live
featured: true                 # "Featured" badge
link: "https://example.com"    # "Live demo" button (hidden if omitted)
source: "https://github.com/you/repo"  # "Source" button (hidden if omitted)
icon: "📝"                     # card icon (emoji / text)
# image: "images/x.png"        # or an image, auto-cropped to a square from your site's assets
tags: ["Vue.js", "TypeScript"]
summary: "One-line intro, shown on the card and list."
---

Detail page body (Markdown).
```

Card buttons: **Details** (opens the detail page), **Live demo** (`online: true` and a `link`), **Source** (only with `source`).

**`online` controls card behaviour**:

| | Badge | Card hover | Live demo button |
|---|---|---|---|
| `online: true` | "Live" (green) | ✅ lifts up | ✅ (when `link` is set) |
| `online: false` (or omitted) | "In development" (yellow) | ❌ | ❌ |

- The home "Selected Work" entry lists only `online: true` projects with a green dot and hover effect; others appear as static items (how many are shown is `params.works.count`, ordered by `weight`).
- The projects list (`/projects/`) shows **all** projects; the "Live demo" button still requires `online: true`.

### Tech stack category icons

Set `params.techstack.groups[].icon` to one of the built-in names (an unknown value is rendered as text):

| Name | Meaning | Name | Meaning |
|---|---|---|---|
| `frontend` | Frontend | `backend` | Backend |
| `database` | Database | `ai` | AI / Algorithms |
| `devops` | Ops / DevOps | `cloud` | Cloud |
| `tools` | Tooling | `mobile` | Mobile |
| `design` | Design | `language` | Languages |
| `security` | Security | `test` | Testing |
| `box` | Generic / default | | |

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
