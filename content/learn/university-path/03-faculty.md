---
title: "教师"
slug: faculty
description: "添加 Professor，通过授课关系连接教师、课程与学生。"
order: 3
embed: official/university-step-2
---

## 添加教师

谁负责授课？**Professor（教授）**实体加入教学维度，连接教师与课程，并通过路径间接连接学生。

添加 Professor 后，可研究以下问题：
- “哪位教授讲授的 400 级课程最多？”
- “Smith 教授课程中学生的平均 GPA 是多少？”
- “哪些拥有终身教职的教师教授入门课程？”

## Professor 实体

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `professorId` | string | ✓ |
| `name` | string | |
| `rank` | string | |
| `tenured` | boolean | |
| `officeHours` | string | |

`rank`（Assistant、Associate、Full）表示学术职级。布尔属性 `tenured` 用于区分是否拥有终身教职。

## 新增关系

- **teaches（教授）**——`Professor` → `Course`（一对多）
  教授每学期讲授一门或多门课程。

- **advises（指导）**——`Professor` → `Student`（一对多）
  教授为专业内的学生提供学业指导。

> **跨关系查询：**沿 Professor → Course ← Enrollment ← Student，可以回答“哪些学生正在修读终身教职教授的课程？”这需要遍历 Professor → Course → Enrollment → Student。

## 持续扩展的图谱

<ontology-embed id="official/university-step-2" diff="official/university-step-1" height="400px"></ontology-embed>

*Professor 通过授课和指导关系加入。差异高亮显示新增内容。*

## 本节总结

- **布尔属性**（tenured）提供用于筛选的是/否分类
- **跨关系查询**沿多条关系连接相距较远的实体
- **学术职级**遵循明确的层次（Assistant → Associate → Full）
- 图现在同时支持以学生和教师为中心的查询

```quiz
Q: 大学本体中的跨关系查询是什么样的？
- 查询单个实体的属性
- 沿 Professor → Course → Enrollment → Student 等多条关系遍历，连接相距较远的实体 [correct]
- 通过 ID 查找教授
- 统计系统中的课程数量
> 跨关系查询是图本体的优势之一。沿 Professor → Course → Enrollment → Student 遍历，可回答“哪些学生修读终身教职教授的课程？”——即使两个实体没有直接关系，也能通过中间节点连接。
```

接下来添加 Department，组织教学结构。
