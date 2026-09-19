---
title: "Draw2Draw"
subtitle: "智能协同云图库"
date: 2026-09-18
weight: 1
online: true
featured: true
link: "https://github.com/LittleWin8"
source: "https://github.com/LittleWin8"
icon: "🎨"
tags: ["Spring Boot", "Vue.js", "WebSocket", "MySQL", "Redis"]
summary: "面向团队的智能协同云图库，支持素材管理、协作绘图与对象存储，让创意工作流更顺畅。"
---

## 项目简介

Draw2Draw 是一个面向团队的智能协同云图库平台，解决设计素材分散、协作效率低的问题。团队成员可以在同一个图库中管理素材、实时协作绘图，并通过对象存储统一沉淀团队的数字资产。

## 功能亮点

- 素材管理：分类、标签、检索一站式管理团队图片素材
- 实时协作：基于 WebSocket 的多人协同编辑，操作实时同步
- 对象存储：接入 COS 对象存储，图片资源统一托管、按需加载
- 权限控制：团队空间与个人空间隔离，支持成员角色管理

## 技术栈

后端基于 Spring Boot + MySQL + Redis，前端使用 Vue.js，实时协作依赖 WebSocket，图片存储接入腾讯云 COS。
