# 贡献指南（Contributing）

感谢你对 xiaowen 主题感兴趣！欢迎提交 Issue 和 Pull Request。

## 本地开发

主题自带一个可运行的示例站 `exampleSite/`，无需准备任何内容：

```bash
git clone https://github.com/LittleWin8/xiaowen.git
cd xiaowen/exampleSite
hugo server --themesDir ../..
```

打开 http://localhost:1313 即可预览。

> 本主题样式/脚本走 Hugo Pipes，**无需 Node.js / npm**。仅需 Hugo ≥ 0.146（extended 非必需）。

## 目录说明

- `layouts/`：模板（`_default/`、`partials/`、`projects/`、`_markup/` 渲染钩子）
- `assets/css/`：纯 CSS，按层拆分（tokens / base / layout / components / markdown / home / projects / links / print）
- `assets/js/`：原生 JS（明暗切换、菜单、代码复制、搜索）
- `hugo.yaml`：主题**默认配置**（通用值，勿放个人内容）
- `exampleSite/`：示例站点（演示 + 配置模板）

> ⚠️ CSS 文件是**纯 CSS**，请勿使用 `//` 注释（SCSS 语法，会破坏规则），用 `/* */`。

## 提交规范

- 提交信息尽量清晰，推荐 `feat:` / `fix:` / `docs:` / `style:` / `refactor:` 前缀
- 一次 PR 只做一件事，附上改动说明与截图（涉及界面时）
- 提交前请用 `exampleSite` 本地构建通过：
  ```bash
  cd exampleSite && hugo --themesDir ../.. --panicOnWarning
  ```

## 设计来源说明

本主题的视觉风格参考了若干像素风个人站点，**代码与素材均为独立实现**，未使用任何第三方站点的图片、Logo 或文案。若你贡献设计相关内容，请同样确保不引入他人受版权保护的素材。
