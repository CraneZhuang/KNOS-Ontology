---
title: "组织核心"
slug: organization-core
description: "定义 Employee、Department 和 Position，描述核心组织结构。"
order: 2
---

## 建立组织骨架

人力资源本体从三个核心实体开始：

- **Employee（员工）**：组织中的人员
- **Department（部门）**：组织工作的业务单位
- **Position（职位）**：描述职责和职级的角色定义

这三个实体为招聘、报告和人力规划提供最基本的结构。

## 实体设计

### 员工（Employee）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `employeeId` | string | ✓ |
| `name` | string | |
| `hireDate` | date | |
| `employmentStatus` | enum | |
| `jobLevel` | enum | |

`employeeId` 是稳定的业务标识符。应避免使用电子邮箱等可变属性作为主键。

### 部门（Department）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `departmentId` | string | ✓ |
| `name` | string | |
| `budget` | decimal | |
| `status` | enum | |

部门预算让同一张图谱同时支持资源规划与成本中心分析。

### 职位（Position）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `positionId` | string | ✓ |
| `title` | string | |
| `level` | enum | |
| `salaryBand` | string | |

Position 将角色定义与当前任职人员分离。

## 为什么要这样分离

如果把这些概念合并为一个 EmployeeProfile 实体，就会降低处理以下情况的灵活性：

- 历史任职变化
- 岗位转换
- 招聘之前就已存在的空缺职位

独立实体使模型保持清晰且便于扩展。

```quiz
Q: 为什么将 Position 建成独立实体，而不是仅在 Employee 上存储角色字段？
- 因为本体工具至少要求三个实体
- 因为 Position 是可复用的角色定义，可以独立于特定员工存在 [correct]
- 为了减少关系数量
- 为了避免使用标识符属性
> Position 表示角色本身，包括职称、职级和薪资区间；Employee 表示具体人员。分离后可以支持空缺职位、岗位变动和更清晰的人员配置分析。
```

接下来添加 Assignment，记录谁在何时、何地担任什么职位。
