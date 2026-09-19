# xiaowen

小稳的个人博客 Hugo 主题：像素复古（pixel / 8-bit）风格，零圆角、2px 硬边框、实心错位阴影，配色取自 Sweetie 16 像素画调色板，明暗双主题。

![首页 · 亮色](images/screenshot-home-light.png)
![首页 · 暗色](images/screenshot-home-dark.png)

| 项目 | 文章 | 移动端 |
|---|---|---|
| ![项目](images/screenshot-projects.png) | ![文章](images/screenshot-post.png) | ![移动端](images/screenshot-mobile.png) |

## 特性

- 明暗主题切换，跟随系统，无闪烁（FOUC）
- 响应式布局 + 移动端折叠菜单，全站移动端适配
- 首页：双栏 Hero、个人信息面板、个人作品入口、技术栈（可开关）、最新文章
- **项目（`/projects/`）**：内容驱动，大卡片列表 + 站内详情页；上线项目可点击、带绿点与悬浮效果，未上线不可点击
- 顶部导航、友链页（`/links/`）均由配置驱动，**注释掉某项即隐藏**
- **首页文案 / 顶部栏名称与 logo / 技术栈 / 友链，写在你站点的配置里（覆盖主题默认）**
- 文章 / 项目页：**右侧粘性目录（大纲）**、标签、上一篇/下一篇、**代码块一键复制**、**相关文章**（窄屏目录回到内容上方）
- **Markdown 渲染钩子**：图片懒加载 + 图注、外链自动新窗口、标题锚点链接
- **站内搜索**（覆盖文章与项目，纯前端、无外部依赖）
- 标签云与标签页、**归档页**（按年份分组）、**404 页面**、robots.txt
- SEO：JSON-LD（BlogPosting / 面包屑）、OG / Twitter、RSS、sitemap
- 无障碍：跳过导航（skip link）、统一焦点样式
- CSS 自定义属性驱动，改一个色值全站生效
- 样式与脚本经 Hugo Pipes 拼接、压缩、加指纹，无需 npm / 构建工具
- i18n 中英文案
- SEO：description / canonical / Open Graph / Twitter Card / RSS

## 我该改哪个文件？（主题 vs 站点）

Hugo 里只有两类东西：

- **主题**：模板 + 样式 + 通用默认值（一套，所有人共享）
- **站点**：你自己的配置 + 内容（每个博客一份）

同名配置，**站点会覆盖主题**。所以主题里放「通用默认」，站点里放「我的东西」。

| 文件 | 层级 | 什么时候改 | 放什么 |
|---|---|---|---|
| `themes/xiaowen/hugo.yaml` | 主题 | 你是主题作者、改默认值时 | 通用默认（默认导航、字体源、开关） |
| `themes/xiaowen/layouts/`、`assets/` | 主题 | 改主题外观 / 功能时 | 模板、样式、脚本 |
| `themes/xiaowen/exampleSite/hugo.toml` | 站点 | 预览 / 演示 | 示例个人信息 |
| `themes/xiaowen/exampleSite/content/` | 站点 | 预览 / 演示 | 示例文章、项目、页面 |
| 你的博客/hugo.toml | 站点 | 你写博客时 | 你的个人配置 |
| 你的博客/content/ | 站点 | 你写博客时 | 你的文章、项目 |

> **一句话**：改「我的名字 / 文案 / 文章 / 项目」→ 改**站点**（`hugo.toml` + `content/`）；改「主题长什么样 / 功能」→ 改**主题**（`layouts` / `assets` / 主题默认值）。

> ⚠️ **这些配置只能写在站点**（写进主题配置无效，因为 Hugo 只合并主题的 `params` 与 `menu`）：
> `baseURL`、`languageCode`、`defaultContentLanguage`、`title`、`theme`、`hasCJKLanguage`、`summaryLength`、`[outputs]`、`[pagination]`、`[taxonomies]`、`[markup]`。
> 其中中文站点务必开 `hasCJKLanguage = true`，否则阅读时长/摘要不准；站内搜索需要 `home` 输出 `JSON`。

`exampleSite` 是**主题自带的示例站点**：既用来预览主题，也是你建站时的配置模板——新建博客后，把自己的 `hugo.toml` 照着它改即可。

## 快速开始

```bash
# 1. 安装 Hugo（extended 更佳，本主题非必需）
brew install hugo            # macOS；Windows 用 scoop/choco，Linux 用 apt/snap

# 2. 建站
hugo new site my-blog && cd my-blog
git init

# 3. 安装主题
git submodule add https://github.com/<you>/xiaowen themes/xiaowen
# 或 Hugo Modules：hugo mod init github.com/<you>/my-blog && hugo mod get github.com/<you>/xiaowen
```

`hugo.toml` 只需基础配置（其余个性化见下节）：

```toml
baseURL = "https://example.com/"
languageCode = "zh-cn"
defaultContentLanguage = "zh"
title = "我的博客"
theme = "xiaowen"
enableRobotsTXT = true

[outputs]
  home = ["HTML", "RSS", "JSON"]   # JSON 供站内搜索使用

[pagination]
  pagerSize = 8
[taxonomies]
  tag = "tags"
[markup]
  [markup.goldmark.renderer]
    unsafe = true
  [markup.highlight]
    noClasses = false
  [markup.tableofcontents]     # 右侧大纲层级范围
    startLevel = 2
    endLevel = 4
```

写内容：

```bash
hugo new posts/hello.md        # 文章，发布前把 draft 改 false
hugo new projects/my-app.md    # 项目（字段见「项目」一节）

hugo server -D                 # 本地预览 http://localhost:1313
hugo                           # 构建到 public/，部署到任意静态托管
```

> 搜索页需要站点有 `content/search.md`（`layout: search`）并开启 `home` 的 JSON 输出。

## 目录结构

```
themes/xiaowen/
├── archetypes/                    # default.md / projects.md（hugo new 骨架）
├── assets/
│   ├── css/                       # tokens / base / layout / components / markdown / home / projects / links
│   ├── js/                        # main.js（明暗/菜单/回顶/代码复制）、search.js
│   └── images/logo.png            # 主题 logo（可替换）
├── i18n/                          # zh-cn.yaml / en.yaml
├── layouts/
│   ├── _default/
│   │   ├── baseof.html            # 基础外框
│   │   ├── single.html            # 文章/独立页面（含右侧粘性大纲）
│   │   ├── list.html              # 列表页
│   │   ├── terms.html             # 标签云
│   │   ├── links.html             # 友链页 /links/
│   │   ├── archives.html          # 归档页 /archives/
│   │   ├── search.html            # 搜索页 /search/
│   │   └── _markup/               # 渲染钩子：图片 / 链接 / 标题
│   ├── projects/                  # list.html / single.html（项目列表 + 详情）
│   ├── partials/
│   │   ├── head/                  # head / meta / schema / favicon / styles / theme-init
│   │   ├── header.html / footer.html / scripts.html
│   │   ├── hero.html / works.html / tech-stack.html
│   │   ├── project-card*.html / project-*.html / category-icon.html
│   │   ├── post-card.html / post-meta.html / related.html
│   │   ├── pagination.html / toc.html
│   │   ├── logo.html / menu-icon.html / language-switch.html
│   │   └── theme-toggle.html / back-to-top.html
│   ├── index.html                 # 首页
│   ├── index.json                 # 站内搜索索引
│   ├── 404.html
│   └── robots.txt
├── exampleSite/                   # ★ 示例站点（预览 + 配置模板）
├── images/                        # README 截图
├── hugo.yaml                      # ★ 主题默认配置（通用，站点可覆盖）
├── README.md
└── theme.toml
```

> 文章/项目等**内容不在主题里**，而是放在**站点**的 `content/` 下（见下）。主题配置只提供通用默认值。

## 个性化配置（写在**站点**里，如 `exampleSite/hugo.toml` 或你博客的 `hugo.toml`）

主题的 `hugo.yaml` 只提供**通用默认值**（默认导航、字体源、开关等）；你的**个人信息 / 文案 / 技术栈 / 友链**写在你**自己的站点配置**里，会覆盖主题默认。下面就是站点里的一份完整示例（`exampleSite/hugo.toml`）：

```toml
[params]
  author = "小稳"
  description = "小稳的个人博客 · 记录技术与生活"
  toc = true                # 文章页是否显示目录
  homePosts = 6             # 首页显示的文章数

  # 品牌 / 顶部栏
  [params.identity]
    name = "小稳"                     # 顶部栏名称
    logo = "images/logo.png"         # 顶部栏 logo（相对主题 assets/）
    favicon = "images/logo.png"

  # 首页主视觉文案（intro 支持 Markdown，可多段）
  [params.hero]
    eyebrow = "持续学习，也持续创造"
    title = "小稳"
    tagline = "全栈开发者，专注于把想法做成好用的产品。"
    intro = """
支持 **Markdown** 的自我介绍，可多段。
"""

  # 首页「个人作品」入口（项目内容见下方 content/projects/）
  [params.works]
    eyebrow = "FEATURED WORK"
    title = "个人作品"
    count = 3                   # 首页展示几个项目

  # 首页「技术栈」（enable = false 即整块隐藏）
  [params.techstack]
    enable = true
    title = "技术栈"
    subtitle = "我使用的技术和工具"
    [[params.techstack.groups]]
      title = "后端与数据库"
      icon = "backend"              # 大类图标名，见下表
      description = "以 Java 生态为主线。"
      items = ["Java", "Spring Boot", "MySQL", "Redis"]

  [params.assets]
    pixelFont = "https://cdn.jsdelivr.net/npm/@fontsource/fusion-pixel-12px-proportional-sc@5.3.0/index.css"

  [params.social]
    github = "https://github.com/LittleWin8"   # 有值才在 Hero 显示按钮

  # 友链页内容
  [params.links]
    title = "友情链接"
    description = "一些有趣的朋友和他们的站点，欢迎交换。"
    items = [
      { name = "千夜の詩", url = "https://1000ye.top/", description = "全栈开发者的像素风小窝", avatar = "https://1000ye.top/1000ye.png" },
      { name = "GitHub", url = "https://github.com/LittleWin8", description = "我的开源主页" },
    ]

# 顶部导航：顺序即显示顺序；某项注释掉即隐藏
# icon 可选：home / posts / tags / projects / links / about
[[params.nav]]
  name = "首页"
  url = "/"
  icon = "home"
[[params.nav]]
  name = "博客"
  url = "/posts/"
  icon = "posts"
[[params.nav]]
  name = "项目"
  url = "/projects/"
  icon = "projects"
[[params.nav]]
  name = "友链"
  url = "/links/"
  icon = "links"
# [[params.nav]]
#   name = "关于"
#   url = "/about/"
#   icon = "about"
```

`params.works.count` 控制首页入口展示数量；`params.techstack` 设 `enable = false` 或删除，技术栈整块隐藏。

## 归档页 / 搜索页

两者都是「一个内容页 + 主题布局」，在**站点**里各建一个文件即可（`exampleSite` 已有）：

```markdown
<!-- content/archives.md -->
---
title: "归档"
layout: "archives"
---

<!-- content/search.md -->
---
title: "搜索"
layout: "search"
---
```

- 归档页按年份自动分组，无需维护；在站点 `params.nav` 加一项 `{ name = "归档", url = "/archives/", icon = "archives" }` 即可进导航。
- 搜索页由顶栏的搜索图标进入，需要站点开启 `home` 的 `JSON` 输出（见快速开始）。

## 项目（`content/projects/`）

每个项目一个 Markdown 文件，自动生成 `/projects/` 列表和 `/projects/<文件名>/` 详情页：

```yaml
---
title: "Draw2Draw"
subtitle: "智能协同云图库"      # 标题后的补充说明
date: 2026-09-18
weight: 1                      # 列表排序（小的在前）
online: true                   # ★ 是否上线
featured: true                 # 「重点项目」徽章
link: "https://xxx"            # 「在线体验」按钮（不填则不显示）
source: "https://github.com/xxx"  # 「查看源码」按钮（不填则不显示）
icon: "🎨"                     # 卡片图标（emoji / 文字）
# image: "images/x.png"        # 也可用图片，本地图放主题 assets/ 自动裁成方形
tags: ["Spring Boot", "Vue.js"]
summary: "一句话介绍，卡片和列表都会显示。"
---

详情页正文（Markdown）。
```

卡片按钮：**项目详情**（进详情页）、**在线体验**（有 `link` 才显示）、**查看源码**（有 `source` 才显示）。

**`online` 决定卡片行为**：

| | 徽章 | 卡片悬浮效果 | 在线体验按钮 |
|---|---|---|---|
| `online: true` | 「已上线」（绿） | ✅ 上浮 | ✅（有 `link` 时） |
| `online: false`（或不写） | 「开发中」（黄） | ❌ | ❌ |

首页「个人作品」入口仅对 `online: true` 的项目显示绿点与悬浮，未上线的为静态项。

首页「个人作品」入口按 `weight` 取前 `count` 个，`online` 规则同上；「查看全部 →」进入 `/projects/`。

### 技术栈大类图标

`params.techstack.groups[].icon` 填图标名，内置以下大类（填入未命中的值则原样显示为文字）：

| 名称 | 含义 | 名称 | 含义 |
|---|---|---|---|
| `frontend` | 前端 | `backend` | 后端 |
| `database` | 数据库 | `ai` | AI / 算法 |
| `devops` | 运维 / DevOps | `cloud` | 云服务 |
| `tools` | 工具链 | `mobile` | 移动端 |
| `design` | 设计 | `language` | 编程语言 |
| `security` | 安全 | `test` | 测试 |
| `box` | 通用 / 默认 | | |

### 代码高亮

主题在 `markdown.css` 中自定义了 Chroma 配色，需在**站点** `hugo.toml` 关闭内联样式：

```toml
[markup.highlight]
  noClasses = false
```

## 多语言（中 / 英）

主题自带 UI 文案的中英文（`i18n/`），并内置语言切换按钮——当站点配置了 **2 种以上语言**时才显示。

启用方式（站点 `hugo.toml`）：

```toml
defaultContentLanguage = "zh"
defaultContentLanguageInSubdir = false   # 中文在 /，英文在 /en/

[languages]
  [languages.zh]
    languageCode = "zh-cn"
    languageName = "中文"
    title = "小稳的博客"
    weight = 1
  [languages.en]
    languageCode = "en-us"
    languageName = "English"
    title = "LittleWin's Blog"
    weight = 2
    [languages.en.params]      # 覆盖主题里的同名 params（英文文案）
      [languages.en.params.hero]
        title = "LittleWin"
        tagline = "Full-stack developer..."
        intro = "..."
      [languages.en.params.works]
        title = "Selected Work"
      [languages.en.params.techstack]
        title = "Tech Stack"
    [languages.en.menu]        # 覆盖导航名称
      [[languages.en.menu.main]]
        identifier = "posts"
        name = "Blog"
        url = "/posts/"
        weight = 2
```

文章/页面的英文版用文件名后缀：`hello-world.md` ↔ `hello-world.en.md`；分类的页面标题用 `_index.en.md`。

> 语言级 `params` 会与主题的默认 params 合并，只需写要翻译的字段；数组（如 `works.items`、`techstack.groups`）会整体替换，需写全。

## 二次开发

- **改配色**：编辑 `assets/css/tokens.css`（亮色在 `:root`，暗色在 `html.theme-dark`）。
- **改断点**：响应式集中在 `home.css` 底部与 `layout.css` 的 `@media`。
- **换 logo**：替换 `assets/images/logo.png`（`logo.html` 会自动按需缩放，SVG 也可）。
- **换像素字体**：改 `params.assets.pixelFont`。
  - 默认走 jsDelivr（fontsource），开箱即用；
  - 想国内更快/更稳，可**自托管**：从 [fusion-pixel-font](https://github.com/TakWolf/fusion-pixel-font) 下载 `12px-proportional` 的 woff2（简体中文约 660KB），放到站点 `static/fonts/`，写一个 `@font-face` CSS（用字体名 `Fusion Pixel 12px Proportional SC`），再把 `pixelFont` 指向它。字体为 OFL-1.1，记得附带 `OFL.txt`。
- **更新时间**：文章显示「更新于」需要 `lastmod`。站点开启 `enableGitInfo = true` 可自动取 Git 提交时间，或在 front matter 写 `lastmod`。

> 注意：CSS 文件是纯 CSS，请勿使用 `//` 注释（那是 SCSS 语法，会破坏规则），用 `/* */`。

## 依赖

无需 Node.js / npm。仅需 **Hugo v0.146+**（extended 非必需）。
