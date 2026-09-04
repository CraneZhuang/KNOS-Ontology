---
title: 向本体目录贡献内容
slug: contributing-to-the-catalogue
description: 学习如何派生仓库、添加 RDF 与元数据、提交拉取请求，并将本体发布到社区目录。
order: 6
embed: official/university
---

## 社区本体目录

本体探索平台的[目录](#/catalogue)包含项目团队维护的官方本体和社区贡献本体。任何人都可以通过拉取请求提交。

## 两种贡献方式

### 方式 A：从设计器导出贡献文件

可从设计器开始：

1. 打开[设计器](#/designer)，构建本体或加载已有本体
2. 点击工具栏的**提交到本体目录**
3. 下载 RDF 与元数据，填写名称、说明、类别和标签
4. 使用自己的 GitHub 账号登录 GitHub
5. 按弹窗说明派生仓库，将文件加入社区目录，并提交拉取请求

CI 流水线会校验 RDF、检查元数据结构并运行测试，然后由维护者评审合并。

### 方式 B：手动提交拉取请求

如果更喜欢直接使用 Git：

1. 在 GitHub 上**派生（Fork）**仓库
2. 在 `catalogue/community/<your-github-username>/<ontology-slug>/` 下创建目录
3. 添加两个文件：
   - ontology.rdf：RDF/OWL 本体文件
   - metadata.json：本体说明与元数据

## 元数据格式

```json
{
  "name": "Library System",
  "description": "A public library with books, authors, members, and loans.",
  "icon": "📚",
  "category": "education",
  "tags": ["library", "books", "lending"],
  "author": "your-github-username"
}
```

| 字段 | 必填 | 说明 |
|-------|----------|-------------|
| name | 是 | 目录显示名称 |
| description | 是 | 一句话摘要 |
| category | 是 | retail、healthcare、finance、manufacturing、education、technology、general 等支持的类别 |
| icon | 否 | 卡片使用的单个表情符号 |
| tags | 否 | 用于搜索的小写关键词数组 |
| author | 否 | GitHub 用户名 |

## 校验规则

拉取请求会按照以下规则自动校验：

- **有效 RDF/OWL**：必须能够无错误解析
- **往返一致性**：parse(serialize(ontology)) 必须得到等价输出
- **元数据结构**：必填字段齐全，类别有效
- **目录命名**：只使用小写字母、数字、连字符和下划线
- **禁止符号链接**：出于安全考虑，目录中的符号链接会被拒绝

## 合并后会发生什么？

合并后，构建流水线将：

1. 运行 `npm run catalogue:build`，将全部 RDF 文件编译为 catalogue.json
2. 部署更新后的网站，使本体出现在[本体目录](#/catalogue)中
3. 部署后即可嵌入、通过深链接访问，或在探索平台中加载

<ontology-embed id="official/university" height="400px"></ontology-embed>

*大学系统是官方目录中的一个本体。社区贡献遵循相同格式，提交的本体也会在目录中以同样方式展示。*

## 让评审更顺利

- **写好说明**：解释本体描述什么领域、面向哪些用户
- **添加有意义的标签**：帮助用户搜索到本体
- **本地测试**：推送前运行 `npm run validate -- catalogue/community/<you>/<slug>/ontology.rdf`
- **保持聚焦**：边界清晰、包含 3–8 个实体的本体，往往比庞杂的 30 多实体模型更实用

## 核心要点

- 任何人都可以从设计器导出文件，或手动发起拉取请求来贡献本体
- 每次提交都需要 RDF 文件和 metadata.json
- CI 自动校验 RDF，评审前应修复错误
- 合并后的本体会在部署完成后出现在在线目录中

```quiz
Q: 每个目录贡献必须包含哪两个文件？
- ontology.json 与 README.md
- schema.rdf 与 config.yaml
- ontology.rdf 与 metadata.json [correct]
- index.html 与 style.css
> 每个目录条目都需要 ontology.rdf（RDF/OWL 本体）和 metadata.json（目录使用的名称、说明、类别及标签）。
```
