# 更新日志

本项目使用 [语义化版本](https://semver.org/lang/zh-CN/)。格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)。

## [Unreleased]

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
