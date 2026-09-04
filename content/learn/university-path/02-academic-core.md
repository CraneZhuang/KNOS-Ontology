---
title: "教学核心"
slug: academic-core
description: "定义 Student、Course 和 Enrollment，学习支撑学籍记录的中间实体模式。"
order: 2
embed: official/university-step-1
---

## 学籍记录基础

学籍记录围绕一个核心问题：*哪些学生修读哪些课程，表现如何？* 三个实体回答这一问题：

- **Student（学生）**——谁在学习？
- **Course（课程）**——教授什么内容？
- **Enrollment（选课记录）**——连接学生与课程，并记录成绩

## 定义实体

### Student（学生）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `studentId` | string | ✓ |
| `name` | string | |
| `gpa` | float | |
| `enrollmentYear` | integer | |
| `major` | string | |

`gpa` 是浮点数，平均绩点范围为 0.0–4.0。该汇总指标支持学业状态查询和荣誉名单计算。

### Course（课程）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `courseId` | string | ✓ |
| `title` | string | |
| `credits` | integer | |
| `level` | string | |
| `maxEnrollment` | integer | |

`level`（100、200、300、400）表示课程难度与先修层级。整数属性 `maxEnrollment` 用于容量规划。

### Enrollment（选课记录）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `enrollmentId` | string | ✓ |
| `semester` | string | |
| `grade` | string | |
| `enrollDate` | date | |
| `status` | string | |

Enrollment 是**中间实体**：专门连接学生与课程，并携带成绩、学期、状态等附加上下文。

## 关系

- **enrolls_in（选课）**——`Student` → `Enrollment`（一对多）
  一个学生可以在不同学期拥有多条选课记录。

- **for_course（对应课程）**——`Enrollment` → `Course`（多对一）
  每条选课记录对应一门特定课程。

> **中间实体模式：**当两个实体之间的多对多关系需要携带属性时，应创建中间实体。学生修读多门课程，课程包含多名学生；Enrollment 位于两者之间，承载成绩、学期和状态。这是本体设计中最常见的模式之一。

## 当前图谱

<ontology-embed id="official/university-step-1" height="350px"></ontology-embed>

*Student 和 Course 通过 Enrollment 连接——经典的中间实体模式。*

## 本节总结

- **中间实体**（Enrollment）解析带属性的多对多关系
- **浮点属性**（GPA）支持汇总计算与阈值判断
- **整数属性**（credits、maxEnrollment）支持容量与工作量规划
- 教学核心路径为 Student → Enrollment → Course

```quiz
Q: 为什么将 Enrollment 建模为独立实体，而不是直接连接 Student 与 Course？
- 为了让图中有更多节点
- 因为 Enrollment 有自己的属性（成绩、学期、状态），这些属性不属于 Student 或 Course 本身 [correct]
- 因为本体至少需要三个实体
- 因为实体之间不允许直接建立关系
> 简单的 Student–Course 连接无法表达这里所需的成绩、学期和状态。中间实体把选课关系作为独立实体，便可回答“这个学生本学期在这门课中取得什么成绩？”——这些属性属于连接本身，而非任一端点。
```

接下来添加 Professor，记录教师安排。
