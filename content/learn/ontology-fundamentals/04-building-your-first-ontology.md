---
title: 构建你的第一个本体
slug: building-your-first-ontology
description: 通过可视化设计器从零创建本体：添加实体、定义属性、连接关系，并导出 RDF。
order: 4
embed: official/cosmic-coffee
---

## 我们将构建什么

本教程将创建一个简单的**图书馆本体**，包含 Book、Author 和 Member 三个实体类型，并通过关系连接。完成后可导出适用于 Microsoft Fabric IQ 或其他语义工具的 RDF 文件。

## 步骤 1：打开设计器

点击顶部导航栏的**设计器**，或直接打开[设计页面](#/designer)。页面左侧是实体表单，右侧是实时图谱预览。

## 步骤 2：创建实体类型

点击实体区域的**添加**按钮，创建三个实体：

**图书（Book）**
- 名称：`Book`
- 图标：`📚`
- 颜色：蓝色
- 属性：
  - `isbn`：string，**标识符** ✓
  - `title`：string
  - `publishedYear`：integer

**作者（Author）**
- 名称：`Author`
- 图标：`✍️`
- 颜色：绿色
- 属性：
  - `authorId`：string，**标识符** ✓
  - `name`：string
  - `nationality`：string

**会员（Member）**
- 名称：`Member`
- 图标：`👤`
- 颜色：紫色
- 属性：
  - `memberId`：string，**标识符** ✓
  - `name`：string
  - `joinDate`：date

添加每个实体时，观察图谱预览实时更新。

## 步骤 3：添加关系

在**关系**区域添加：

| 关系 | 起点 | 终点 | 基数 |
|-------------|------|-----|-------------|
| `writtenBy` | Book | Author | 多对一 |
| `borrowedBy` | Book | Member | 多对多 |

writtenBy 是多对一关系，因为多本书可以共享一位作者，本例中每本书有一位主要作者。borrowedBy 是多对多，因为一本书可以被多位会员借阅，一位会员也可以借多本书。

## 步骤 4：校验

点击工具栏的**校验**。如果通过，会显示绿色“未发现问题”提示，否则请修复报告的问题：

- 每个实体至少有一个标识符属性
- 关系必须引用已存在的实体类型
- ID 不得重复

## 步骤 5：预览 RDF

点击预览区域的 **RDF** 标签，即可查看实时生成、带语法高亮的 RDF/OWL 内容。Fabric IQ 等工具使用的就是这类文件。

<ontology-embed id="official/cosmic-coffee" height="400px"></ontology-embed>

*Fourth Coffee 本体也采用相同流程构建。你的图书馆本体也会以彩色节点表示实体，以有向连线表示关系。*

## 步骤 6：导出

可以使用以下方式：

1. **下载 RDF**：保存为 .rdf 文件
2. **提交到本体目录**：打开社区贡献说明，下载 RDF 和元数据，再通过 GitHub 提交拉取请求
3. **复制 JSON**：获取供应用使用的 JSON 表示

## 下一步

- 浏览[本体目录](#/catalogue)，了解其他模型的结构
- 阅读[本体设计模式](#/learn/ontology-fundamentals/ontology-design-patterns)，了解命名约定与实践建议
- 在首页的**自然语言查询**面板中，针对本体提问

## 核心要点

- 设计器提供无需编码的可视化建模流程
- 每个实体需要名称、至少一个属性及一个标识符
- 关系通过名称和基数连接实体
- 实时图谱与 RDF 预览提供即时反馈
- 可为 Fabric IQ 导出 RDF，或贡献到社区目录

```quiz
Q: 为什么 Book 与 Member 之间的 borrowedBy 关系是多对多？
- 一本书只能被借阅一次
- 每位会员同时恰好只借一本书
- 一本书可以在不同时期被多位会员借阅，一位会员也可以借多本书 [correct]
- 多对多是所有关系的默认基数
> 同一本书可以在不同时间被不同会员借阅，每位会员也可以同时借阅多本书。双方的多重对应使其成为多对多关系。
```
