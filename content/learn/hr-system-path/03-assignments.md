---
title: "任职记录"
slug: assignments
description: "添加关联实体 Assignment，记录员工、部门与职位之间的任职历史。"
order: 3
---

## 任职历史问题

员工可能随时间调换部门或职位。一个部门拥有多名员工，一个职位也可能先后由不同人员担任。

这不是简单的一对一结构。

## 作为关联实体的 Assignment

创建 **Assignment（任职记录）**，连接：

- `Employee` → `Assignment`（一对多）
- `Assignment` → `Department`（多对一）
- `Assignment` → `Position`（多对一）

Assignment 保存这段关系的上下文。

### 任职记录属性

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `assignmentId` | string | ✓ |
| `startDate` | date | |
| `endDate` | date | |
| `isPrimary` | boolean | |

利用 startDate 和 endDate，可以回答以下历史问题：

- 第二季度谁在财务部任职？
- 今年哪些员工调换过部门？

## 模式的实际应用

其他领域也会使用相同模式：

- 通过 Enrollment 连接 Student 与 Course
- 通过订单明细连接 Customer 与 Product
- 通过 Assignment 连接 Employee、Department 和 Position

当关系需要自身的属性时，使用关联实体。

```quiz
Q: Assignment 应成为独立实体的主要原因是什么？
- 能为图谱提供更丰富的图标
- 它承载 startDate、endDate 等属于关系本身的属性 [correct]
- 可以不再需要标识符
- 可以避免多对一关系
> Assignment 保存随时间变化的任职上下文。这些属性属于任职关系，而不单独属于 Employee、Department 或 Position。
```

接下来添加绩效评估，完成分析模型。
