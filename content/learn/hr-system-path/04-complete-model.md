---
title: "完整人力资源模型"
slug: complete-model
description: "添加 PerformanceReview，并使用完整人力资源本体回答实际人员分析问题。"
order: 4
embed: community/ravi-chandu/hr-system
---

## 补齐人员分析层

最后一个实体是 **PerformanceReview（绩效评估）**，它将各评估周期的结果关联到员工。

关系：

- `Employee` → `PerformanceReview`（一对多）

### 绩效评估属性

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `reviewId` | string | ✓ |
| `reviewPeriod` | string | |
| `rating` | enum | |
| `reviewDate` | date | |

现在，同一张图谱可以支持日常运营和战略层面的人力资源问题。

## 完整图谱

<ontology-embed id="community/ravi-chandu/hr-system" height="460px"></ontology-embed>

*人力资源本体包含 Employee、Department、Position、Assignment 和 PerformanceReview 共 5 个实体。*

## 图谱问题示例

| 问题 | 图谱路径 |
|---|---|
| 哪些部门的资深员工最多？ | Department ← Assignment ← Employee（jobLevel=senior） |
| 哪些员工在过去一年更换过职位？ | Employee → Assignment（按日期区分多条记录）→ Position |
| 哪些团队拥有较多优秀绩效评价？ | Department ← Assignment ← Employee → PerformanceReview（rating=outstanding） |
| 哪些任职记录已不再有效？ | Assignment（已设置 endDate，或 isPrimary=false） |

## 核心要点

1. 将**人员**、**组织单位**和**角色**分成不同实体。
2. 使用 **Assignment** 作为关联实体，记录随时间变化的任职历史。
3. 使用 **PerformanceReview** 为人员实体关联可衡量的结果。
4. 保持标识符稳定，通过枚举控制状态取值。

```quiz
Q: 哪个实体支持分析职位和部门随时间发生的历史变化？
- Employee
- Department
- Assignment [correct]
- PerformanceReview
> Assignment 为特定的员工–部门–职位关联记录开始与结束日期。没有它，就难以清晰追踪任职历史。
```

你已完成人力资源学习路径。可在[本体目录](#/catalogue/community/ravi-chandu/hr-system)中打开模型，或在[设计器](#/designer/community/ravi-chandu/hr-system)中继续完善。
