---
title: "多级标题样式演示"
date: 2026-09-19
draft: false
tags: ["示例"]
summary: "演示文章大纲的多级标题层级效果。"
---

这是一篇用来演示多级标题与右侧大纲层级的示例文章。

## 第一个大节

这里是大节下的正文内容。

### 小节一

小节里的内容。

#### 更深的子节

更深一层的内容。

### 小节二

小节里的内容。

## 第二个大节

这里是大节下的正文内容。

### 小节 A

内容。

### 小节 B

内容。

#### 子节 B.1

内容。

## 小结

到此为止，右侧目录应该能体现多级层级。

## 图片演示

下面用主题 logo 占位，验证响应式图片（srcset）：

![示例图片](images/logo.png "响应式图片演示")

## 代码高亮

Java：

```java
public class HelloWorld {
    public static void main(String[] args) {
        // 一段用于演示高亮的示例代码
        String who = "xiaowen";
        System.out.println("Hello, " + who + "!");
    }
}
```

TypeScript：

```typescript
const greet = (name: string): string => `Hello, ${name}!`;
console.log(greet("xiaowen"));
```

终端：

```bash
hugo new posts/my-post.md
hugo server -D
```
