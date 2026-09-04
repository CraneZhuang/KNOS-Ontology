---
title: "完整大学模型"
slug: complete-university
description: "添加 Department，完成大学本体，将教师、课程与学生组织到各个院系。"
order: 4
embed: official/university-step-3
---

## 组织结构

大学由多个 **Department（院系）**组成。院系是管理教师、开设课程和授予学位的行政单位。添加 Department 可建立连接各部分的组织层次。

## Department 实体

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `departmentId` | string | ✓ |
| `name` | string | |
| `building` | string | |
| `budget` | float | |
| `headOfDept` | string | |

浮点属性 `budget` 支持资源分配查询。`headOfDept` 引用领导该院系的教授，这是组织层次中常见的负责人引用。

## 新增关系

- **belongs_to（属于）**——`Professor` → `Department`（多对一）
  教授隶属于一个院系。

- **offers（开设）**——`Department` → `Course`（一对多）
  院系根据培养方案开设课程。

> **组织层次：**Department 位于大学本体的组织上层，向下连接 Professor（教师）和 Course（课程）。这种枢纽位置适合进行院系级汇总查询。

## 完整图谱

<ontology-embed id="official/university-step-3" diff="official/university-step-2" height="500px"></ontology-embed>

*完整大学本体：5 个实体、6 条关系。Department 同时组织教师和课程。*

## 完整模型支持的能力

| 问题 | 图谱路径 |
|---|---|
| 哪些院系的学生平均 GPA 最高？ | Department → Course ← Enrollment ← Student（平均 GPA） |
| 哪些教授在讲授本院系以外的课程？ | 比较 Professor → Department 与 Professor → Course → Department |
| 各院系的课程满额率是多少？ | Department → Course ← Enrollment（计数）/ Course.maxEnrollment |
| 哪些院系拥有最多终身教职教师？ | Department ← Professor（tenured=true，计数） |

## GQL 查询示例

查找学生学习情况不佳的院系（平均成绩低于 B）：

```gql
MATCH (d:Department)-[:offers]->(c:Course)<-[:for_course]-(e:Enrollment)<-[:enrolls_in]-(s:Student)
WHERE e.grade IN ['C', 'D', 'F']
RETURN d.name, c.title, COUNT(e) AS struggling_count
ORDER BY struggling_count DESC
```

## 已构建的模型

| 步骤 | 新增实体 | 累计数量 | 关键概念 |
|---|---|---|---|
| 1 | Student、Course、Enrollment | 3 | 中间实体、多对多关系 |
| 2 | Professor | 4 | 跨关系查询、布尔属性 |
| 3 | Department | 5 | 组织层次、枢纽实体 |

## 核心要点

1. **中间实体**（Enrollment）解析带属性的多对多关系
2. **跨关系查询**通过多跳路径发现信息
3. **布尔属性**（tenured）支持分类筛选
4. **组织层次**（Department）提供汇总分组
5. **枢纽实体**（Department）连接本体的多个分支

```quiz
Q: 为什么 Department 被视为大学本体中的“枢纽实体”？
- 因为它拥有最多属性
- 因为它同时连接 Professor 和 Course，位于组织层次的上层 [correct]
- 因为它是最后添加的实体
- 因为枢纽实体必须具有 budget 属性
> Department 分别通过 belongs_to 和 offers 连接 Professor 与 Course。这两个方向的连接使它成为组织枢纽，适合在院系层面汇总教师和课程数据。
```

你已完成大学系统学习路径！可在[本体目录](#/catalogue)加载任意步骤进行交互探索。
