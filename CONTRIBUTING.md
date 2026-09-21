# 贡献指南（Contributing）

感谢你对 pixel-blog-hugo 主题感兴趣！欢迎提交 Issue 和 Pull Request。

## 本地开发

主题自带一个可运行的示例站 `exampleSite/`，无需准备任何内容：

```bash
git clone https://github.com/LittleWin8/pixel-blog-hugo.git
cd pixel-blog-hugo/exampleSite
hugo server --themesDir ../..
```

打开 http://localhost:1313 即可预览。

> 本主题样式/脚本走 Hugo Pipes，**无需 Node.js / npm**。仅需 Hugo ≥ 0.158（extended 非必需）；采用 0.146+ 新布局目录规范。

## 目录结构

```
themes/pixel-blog-hugo/
├── archetypes/                    # default.md / projects.md（hugo new 骨架）
├── assets/
│   ├── css/                       # 按关注点拆分（见下）
│   ├── js/                        # main.js（明暗/菜单/回顶/代码复制）、search.js
│   └── images/logo.png            # 主题 logo（可替换）
├── i18n/                          # zh-cn.yaml / en.yaml
├── layouts/                       # 采用 Hugo 0.146+ 新布局规范
│   ├── baseof.html                # 基础模板
│   ├── home.html / home.json      # 首页 / 站内搜索索引
│   ├── single.html / list.html    # 页面 / 列表（section / 标签 term 等）
│   ├── taxonomy.html / term.html  # 标签云 / 单个标签页
│   ├── rss.xml                    # RSS（仅输出带日期的文章）
│   ├── archives.html / links.html / search.html   # 自定义 layout 页
│   ├── projects/                  # 项目列表 + 详情
│   ├── _markup/                   # 渲染钩子：render-heading / render-image / render-link
│   ├── _partials/                 # head/、header、footer、hero、works、tech-stack、卡片、分页、toc 等
│   ├── 404.html
│   └── robots.txt
├── exampleSite/                   # 示例站点（预览 + 配置模板）
├── images/                        # README 截图 + 官网收录用 screenshot.png / tn.png
├── hugo.toml                      # 主题默认配置（通用，站点可覆盖）
├── theme.toml
├── README.md / LICENSE / CHANGELOG.md / THIRD-PARTY-NOTICES.md
└── CONTRIBUTING.md / .editorconfig
```

CSS 按关注点拆分，改动时对号入座即可：

```
assets/css/
├── tokens.css      # 设计令牌（配色/字体/尺寸），改主题色从这里
├── base.css        # reset、排版、skip-link、扫描线
├── layout.css      # 容器 / 页头 / 导航 / 页脚 / 文章两栏布局
├── components.css  # 通用基础件：面板、按钮、回到顶部
├── home.css        # 首页：Hero / 个人作品 / 技术栈 + 响应式
├── content.css     # 文章卡片、标签、分页、相关文章、目录
├── archive.css     # 归档页
├── search.css      # 搜索页
├── error.css       # 404
├── projects.css    # 项目列表 / 详情
├── links.css       # 友链页
├── markdown.css    # 正文与代码高亮
└── print.css       # 打印样式
```

## 二次开发（改配色 / 字体等）

- **改配色**：编辑 `assets/css/tokens.css`（亮色在 `:root`，暗色在 `html.theme-dark`）。
- **改断点**：响应式集中在 `home.css` 底部与 `layout.css` 的 `@media`。
- **换 logo**：替换 `assets/images/logo.png`（`logo.html` 会自动按需缩放，SVG 也可）。
- **换像素字体**：改 `params.assets.pixelFont`。
  - 默认走 jsDelivr（fontsource），开箱即用；
  - 想国内更快/更稳可**自托管**：从 [fusion-pixel-font](https://github.com/TakWolf/fusion-pixel-font) 下载 `12px-proportional` 的 woff2（简体中文约 660KB），放到站点 `static/fonts/`，写 `@font-face` CSS（字体名用 `Fusion Pixel 12px Proportional SC`），再把 `pixelFont` 指向它。字体为 OFL-1.1，记得附带 `OFL.txt`。
- **文章更新时间**：显示「更新于」需要 `lastmod`；站点开启 `enableGitInfo = true` 自动取 Git 提交时间，或在 front matter 写 `lastmod`。

> ⚠️ CSS 是**纯 CSS**，请勿使用 `//` 注释（SCSS 语法，会破坏规则），用 `/* */`。

## 提交规范

- 提交信息尽量清晰，推荐 `feat:` / `fix:` / `docs:` / `style:` / `refactor:` 前缀
- 一次 PR 只做一件事，附上改动说明与截图（涉及界面时）
- 提交前请用 `exampleSite` 本地构建通过：
  ```bash
  cd exampleSite && hugo --themesDir ../.. --panicOnWarning
  ```

## 设计来源说明

本主题的视觉风格参考了 [1000ye.top](https://1000ye.top)，**代码与素材均为独立实现**，未使用任何第三方站点的图片、Logo 或文案。若你贡献设计相关内容，请同样确保不引入他人受版权保护的素材。第三方资源见 [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md)。
