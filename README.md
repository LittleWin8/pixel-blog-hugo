# pixel-blog-hugo

个人博客 Hugo 主题：像素复古（pixel / 8-bit）风格，零圆角、2px 硬边框、实心错位阴影，配色取自 Sweetie 16 像素画调色板，明暗双主题。

[English](README.en.md)

| 首页 · 亮色 | 首页 · 暗色 |
|---|---|
| ![首页 · 亮色](https://raw.githubusercontent.com/LittleWin8/pixel-blog-hugo/main/images/screenshot-home-light.png) | ![首页 · 暗色](https://raw.githubusercontent.com/LittleWin8/pixel-blog-hugo/main/images/screenshot-home-dark.png) |

| 项目 | 归档 | 搜索 |
|---|---|---|
| ![项目](https://raw.githubusercontent.com/LittleWin8/pixel-blog-hugo/main/images/screenshot-projects.png) | ![归档](https://raw.githubusercontent.com/LittleWin8/pixel-blog-hugo/main/images/screenshot-archive.png) | ![搜索](https://raw.githubusercontent.com/LittleWin8/pixel-blog-hugo/main/images/screenshot-search.png) |

| 文章 | 移动端 |
|---|---|
| ![文章](https://raw.githubusercontent.com/LittleWin8/pixel-blog-hugo/main/images/screenshot-post.png) | ![移动端](https://raw.githubusercontent.com/LittleWin8/pixel-blog-hugo/main/images/screenshot-mobile.png) |

## 特性

- 明暗主题切换，跟随系统，无闪烁（FOUC）
- 响应式布局 + 移动端折叠菜单，全站移动端适配
- 首页：双栏 Hero、个人信息面板、个人作品入口、技术栈（可开关）、最新文章
- **项目（`/projects/`）**：内容驱动，大卡片列表 + 站内详情页；卡片统一悬浮、整卡可点进详情；`status` 支持 已上线 / 已完成 / 开发中 / 已归档，`online: true` 的项目带绿点与「在线体验」按钮；详情页含**右侧粘性目录**、标签与代码块一键复制
- 顶部导航、友链页（`/links/`）均由配置驱动，**注释掉某项即隐藏**
- 可选 **CRT 扫描线**（`params.scanlines`）、页脚 **ICP 备案号**（`params.icp`）、**社交图标**（`params.social`）
- **首页文案 / 顶部栏名称与 logo / 技术栈 / 友链，写在你站点的配置里（覆盖主题默认）**
- 文章页：**右侧粘性目录（大纲）**、标签、上一篇/下一篇、**代码块一键复制**、**相关文章**（窄屏目录回到内容上方）
- **Markdown 渲染钩子**：图片懒加载 + 响应式 `srcset` + 图注、外链自动新窗口、标题锚点链接
- **站内搜索**（覆盖文章与项目，纯前端、无外部依赖）
- 标签云与标签页（**标签页**卡片区分**文章 / 项目**）、**归档页**（按年份分组）、**404 页面**、robots.txt、页脚 **RSS 订阅**图标
- SEO：JSON-LD（WebSite / BlogPosting / CreativeWork / 面包屑）、OG / Twitter 分享图（站点默认 + 文章封面）、description / canonical、RSS、sitemap
- 无障碍：跳过导航（skip link）、统一焦点样式、分页按钮可访问名称
- CSS 自定义属性驱动，改一个色值全站生效
- 样式与脚本经 Hugo Pipes 拼接、压缩、加指纹，无需 npm / 构建工具
- i18n 中英文案（含代码复制提示、社交链接等）

## 快速开始

### 1. 建站并安装主题

> 需要 **Hugo ≥ 0.158**（extended 非必需）。

```bash
# 建站（已有站点可跳过）
hugo new site my-blog
cd my-blog
git init

# 安装主题（任选一种）

# 方式 A：Git submodule（需要 git）
git submodule add https://github.com/LittleWin8/pixel-blog-hugo themes/pixel-blog-hugo

# 方式 B：Hugo Modules（需要 Go，且在 hugo.toml 里用 module 引入，见下）
#   hugo mod init github.com/<你的用户名>/my-blog
#   hugo mod get github.com/LittleWin8/pixel-blog-hugo

# 方式 C：直接下载 zip 解压到 themes/pixel-blog-hugo
```

> **方式 A / C**：站点 `hugo.toml` 里写 `theme = "pixel-blog-hugo"`。
> **方式 B（Modules）**：删掉 `theme = ...`，改为在 `hugo.toml` 中引入：
> ```toml
> [module]
>   [[module.imports]]
>     path = "github.com/LittleWin8/pixel-blog-hugo"
> ```
> 之后 `hugo mod get` 会自动下载；升级用 `hugo mod get -u`。

### 2. 配置 `hugo.toml`

只需基础配置（其余个性化见下节）：

```toml
baseURL = "https://example.com/"
locale = "zh-cn"
defaultContentLanguage = "zh"
title = "我的博客"
theme = "pixel-blog-hugo"
enableRobotsTXT = true
hasCJKLanguage = true      # 中文站点建议开启（阅读时长/摘要更准）
summaryLength = 80         # 以上三行均为示例值，按需调整
mainSections = ["posts"]   # 主内容区块：首页「最新文章」/归档/相关文章/搜索索引都基于它
# enableGitInfo = true     # 自动用 Git 提交时间作为「更新于」，见下文

[outputs]
  home = ["HTML", "RSS", "JSON"]   # JSON 供站内搜索使用

[pagination]
  pagerSize = 8
[taxonomies]
  tag = "tags"
[markup]
  [markup.goldmark.parser]
    wrapStandAloneImageWithinParagraph = false   # 图片渲染钩子输出 <figure>，避免被包进 <p>
  [markup.goldmark.renderer]
    unsafe = true
  [markup.highlight]
    noClasses = false
  [markup.tableofcontents]     # 右侧大纲层级范围
    startLevel = 2
    endLevel = 4
```

### 3. 写内容与预览（三系统命令相同）

```bash
hugo new posts/hello.md        # 文章，发布前把 draft 改 false
hugo new projects/my-app.md    # 项目（字段见「项目」一节）
hugo new about.md              # 关于页：首页 Hero 的「关于我」按钮指向 /about/

hugo server -D                 # 本地预览 http://localhost:1313
hugo                           # 构建到 public/，部署到任意静态托管
```

## 个性化配置

记住一句话：**改你自己的博客，只动你自己站点里的文件，基本不用碰主题**：

| 想改什么 | 去改哪个文件 |
|---|---|
| 名字、logo、首页文案、技术栈、友链、导航、开关 | **你站点根目录的 `hugo.toml`** 里的 `[params]`（照下方示例填） |
| 文章 | 你站点的 `content/posts/` |
| 项目 | 你站点的 `content/projects/` |
| 主题默认值 / 外观 / 功能（进阶） | 主题的 `hugo.toml`、`assets/`、`layouts/`，见 [CONTRIBUTING.md](CONTRIBUTING.md) |

> ⚠️ `baseURL`、`title`、`theme`、`[outputs]`、`[markup]` 这类**站点级配置**只能写在站点根目录的 `hugo.toml`（写在主题配置里无效且不报错）。

**把** [`exampleSite/hugo.toml`](exampleSite/hugo.toml) **的内容粘进你自己站点的 `hugo.toml`**，再按里面的注释换成你的信息即可。

> 粘完先别慌：示例配置引用的页面（归档、项目、友链、关于等）你站点里还没有，部分链接会 404——这很正常。**跟着下面的教程把对应页面建起来**（归档 / 搜索 / 项目 / 友链 / 关于 各小节）就都通了。
>
> 配置里字段的说明都写在该配置文件的注释中（含可选值清单），改前先看注释；主题默认项 `toc`、`homePosts` 见主题 `hugo.toml` 注释。

### 链接分享缩略图与页面描述（SEO，自动）

- **分享缩略图**：站点默认 `params.assets.ogImage`；文章级 front matter `cover`（**本地资源**自动裁成 1200×630，外链 / 根路径原样使用）。
- **页面描述**：front matter `description` → 摘要 → 站点 `params.description`，自动用于 `<meta>`。
- **更新时间**：文章页在 `lastmod ≠ date` 时显示「更新于」。开启 `enableGitInfo = true` 自动取 Git 提交时间。

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

## 友链页

分两步：**建一个内容页** + **在站点配置里填好友**。

1）站点里新建 `content/links.md`（`exampleSite` 已有）：

```markdown
---
title: "友链"
layout: "links"
---
```

2）站点 `hugo.toml` 填 `[params.links]`（字段说明见 `exampleSite/hugo.toml` 注释）：配置已在粘贴的示例里（`exampleSite` 已有），改成你自己的好友即可。

- 导航里加入口：`params.nav` 加 `{ name = "友链", url = "/links/", icon = "links" }`。
- 想写一段文字介绍（如「交换友链请联系…」），直接写在 `links.md` 正文即可，会显示在列表下方。
- **不想用友链页**：删掉 `content/links.md`，并从 `params.nav` 移除该项即可。

## 项目（`content/projects/`）

每个项目一个 Markdown 文件，自动生成 `/projects/` 列表和 `/projects/<文件名>/` 详情页：

```bash
hugo new projects/my-app.md   # 生成带全部字段注释的骨架
```

front matter 常用字段（完整说明用 `hugo new` 看骨架注释）：

```yaml
---
title: "Pixel Notes"
subtitle: "像素风笔记应用"      # 标题后的补充说明
date: 2026-09-18
weight: 1                      # 列表排序（小的在前）
online: true                   # ★ 是否上线（决定「在线体验」按钮与首页绿点）
status: ""                     # 状态徽章：online 已上线 / done 已完成 / wip 开发中 / archived 已归档；留空按 online 推导
featured: true                 # 「重点项目」徽章
link: "https://example.com"    # 「在线体验」按钮（不填则不显示）
source: "https://github.com/you/repo"  # 「查看源码」按钮（不填则不显示）
icon: "📝"                     # 卡片图标（emoji / 文字）
image: ""                      # 可选配图，优先于 icon（放页面包 / 站点 assets，自动裁 176×176）
tags: ["Vue.js", "TypeScript"]
summary: "一句话介绍，卡片和列表都会显示。"
---

详情页正文（Markdown）。
```

**`status` 决定状态徽章**（缺省按 `online` 推导：`online: true` → `online`，否则 `wip`）；下表「首页绿点 / 在线体验按钮」实际由 `online: true` 决定，`status` 只决定徽章：

| `status` | 徽章 | 首页绿点 | 在线体验按钮 |
|---|---|---|---|
| `online` | 「已上线」（绿） | ✅ | ✅（有 `link` 时） |
| `done` | 「已完成」（蓝） | ❌ | ❌ |
| `wip`（或不写） | 「开发中」（黄） | ❌ | ❌ |
| `archived` | 「已归档」（灰） | ❌ | ❌ |

- 所有项目卡片（`/projects/` 列表与首页「个人作品」）**都有悬浮效果，点击整卡即进入详情页**。
- 「在线体验」按钮与首页绿点仍以 `online: true` 为准；`done` / `wip` / `archived` 不显示。
- 首页「个人作品」入口的显示数量由 `params.works.count` 决定，按 `weight` 排序。
- 项目列表页（`/projects/`）会显示**全部**项目。

## 关于页

首页 Hero 的「关于我」按钮指向 `/about/`，在站点里建一个内容页即可（`exampleSite` 已有）：

```bash
hugo new about.md
```

正文用 Markdown 写，复用文章页排版（目录、代码复制等）；它是独立页面，不会进入文章列表与归档。

## 多语言（中 / 英）

主题自带 UI 文案的中英文（`i18n/`），并内置语言切换按钮——当站点配置了 **2 种以上语言**时才显示。

启用方式（站点 `hugo.toml`）：

```toml
defaultContentLanguage = "zh"
defaultContentLanguageInSubdir = false   # 中文在 /，英文在 /en/

[languages]
  [languages.zh]
    locale = "zh-cn"
    label = "中文"
    title = "小稳的博客"
    weight = 1
  [languages.en]
    locale = "en-us"
    label = "English"
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
      # 导航：数组整体替换，需写全（用 [[languages.en.params.nav]] 逐项列出）
      [[languages.en.params.nav]]
        name = "Home"
        url = "/"
        icon = "home"
        [[languages.en.params.nav]]
          name = "Blog"
          url = "/posts/"
          icon = "posts"
```

文章/页面的英文版用文件名后缀：`hello-world.md` ↔ `hello-world.en.md`；分类的页面标题用 `_index.en.md`。

> 语言级 `params` 会与主题的默认 params 合并，只需写要翻译的字段；数组（如 `nav`、`links.items`、`techstack.groups`）会整体替换，需写全。

## 致谢

- 设计灵感来源：[千夜の詩の小窝 · 1000ye.top](https://1000ye.top/)（作者 [@X1aoM1ngTX](https://github.com/X1aoM1ngTX)）。本主题是该像素复古设计的 **Hugo 实现**，代码与素材均为独立编写。
- 同一套设计的 **Next.js 版**：[X1aoM1ngTX/pixel-blog](https://github.com/X1aoM1ngTX/pixel-blog)。
- 像素字体：[Fusion Pixel 缝合像素字体](https://github.com/TakWolf/fusion-pixel-font)（SIL OFL 1.1）。
- 线性图标参考 [Lucide](https://lucide.dev/)（ISC）。

第三方资源清单见 [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md)。

## 许可证

[MIT](LICENSE) © 2026 LittleWin

