# 更新日志

本项目使用 [语义化版本](https://semver.org/lang/zh-CN/)。格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)。

## [Unreleased]

## [0.2.0] - 2026-09-20

### 变更

- 布局目录迁移到 Hugo 0.146+ 新规范（`layouts/_partials/`、`layouts/_markup/`、`baseof/home/single/list/taxonomy/term.html` 等）
- 适配 Hugo 0.156–0.158 弃用：语言方法改用 `site.Language.Locale/Label/Name`、多语言改用 `hugo.Sites`；最低版本提升至 **0.158**

### 新增

- 支持 Hugo Modules 安装：新增仓库根 `go.mod`，可 `hugo mod get github.com/LittleWin8/pixel-blog-hugo`
- 内置社交图标：`params.social` 支持 `github` / `email` / `x` / `telegram` / `wechat` / `weibo` / `bilibili` / `zhihu` / `juejin` / `youtube` / `linkedin` / `mastodon` / `discord` / `instagram` / `steam`，显示在首页 Hero 与页脚

### 修复

- 首页 Hero 光晕导致的横向滚动（伪元素改为 `100vw` 居中；`html`/`body` 用 `overflow-x: clip`；skip-link 改 transform 隐藏）
- 搜索页 i18n 文案在 `<script>` 中被双重转义（改 `jsonify | safeJS`）
- 无日期内容产生 `0001` 年份：JSON-LD、`article:published_time` 与归档分组均加空日期保护
- 新增 RSS 模板，仅输出带日期的文章（此前工具页会以 `0001` 日期进入 feed）
- 项目 `online: false` 时不再显示「在线体验」按钮（与文档一致）
- 图片渲染钩子输出 `<figure>` 被包进 `<p>`（配合 `wrapStandAloneImageWithinParagraph = false`）
- 标签链接改用 `.GetTerms`，不再硬编码 `tags/` 路径
- `logo`/`favicon` 由 `.Resize` 改为 `.Fit`，避免非方图拉伸
- 项目图标/OG 图对 SVG 资源做保护（避免 `.Fill` 报错）；修正 `project-default-icon` 的上下文
- 页脚社交图标、代码复制提示文案走 i18n（`.PlainText` 作为图片 alt）
- `twitter:card` 在无分享图时降级为 `summary`；分页箭头补充可访问名称；目录由 `<aside>` 改为 `<nav>`

### 文档

- README（中/英）补充友链页使用说明；新增 `noLinks` / `copyCode` / `prevPage` 等 i18n 文案
- README 修正多语言导航示例（`params.nav` 而非 `menu`）、`works.items` 误写、icon 可选值、assets 路径指引
- README 补充 OG 回退、页面 description/keywords、`enableGitInfo`、`about` 页与最低版本说明
- CHANGELOG 与英文 `README.en.md` 同步

## [0.1.0] - 2026-09-19

首个版本。

### 新增

- 明暗主题切换（跟随系统、无闪烁），像素复古风格设计
- 首页：双栏 Hero、个人信息面板、个人作品入口、技术栈（可开关）、最新文章
- 项目：`/projects/` 列表 + 详情页，`online` 控制徽章、悬浮与在线体验按钮
- 文章：右侧粘性目录（大纲，支持多级）、标签、上下篇、代码块一键复制、相关文章、更新时间
- 站内搜索（覆盖文章与项目，纯前端无依赖）
- 归档页（按年份分组）、友链页、404 页面、robots.txt
- Markdown 渲染钩子：图片懒加载 + 图注 + 响应式 `srcset`、外链新窗口、标题锚点
- SEO：JSON-LD、OG / Twitter 分享图（站点默认 + 文章封面）、RSS、sitemap
- 无障碍：对比度达标、skip link、`prefers-reduced-motion`、无 JS 时导航兜底
- i18n（中/英）、响应式与移动端折叠菜单
- 配置集中在主题 `hugo.yaml`（通用默认）+ 站点 `params`（个性化）
- 附 `exampleSite` 示例站点
