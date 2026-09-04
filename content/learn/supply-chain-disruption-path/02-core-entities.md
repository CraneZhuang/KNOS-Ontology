---
title: "核心实体与属性"
slug: core-entities
description: "了解供应链中断模型的 7 类实体和 40 个属性，从供应商、零部件到风险评估及缓解措施。"
order: 2
---

## 7 类实体

本体覆盖供应链中断的完整生命周期：事件发生、检测、评估和响应。

### 第一层：供应网络

**Supplier（供应商）**
- 表示提供原材料或零部件的外部企业
- 关键属性：`supplierId`（唯一标识）、`name`、`country`、`tier`（Tier 1/2/3）、`reliabilityScore`（0–100）、`singleSourced`（布尔值）
- 用途：识别会放大风险的关键单一来源供应商

**Component（零部件）**
- 从一个或多个供应商采购的零件、材料或子组件
- 关键属性：`componentId`、`name`、`category`（Electronic/Mechanical/Chemical/Packaging/Raw Material）、`daysOfSupplyOnHand`、`criticalityLevel`（Critical/High/Medium/Low）
- 用途：根据安全库存判断哪些零部件能够承受供应中断

**ProductLine（产品线）**
- 使用共同零部件的一组成品
- 关键属性：`productLineId`、`name`、`annualRevenue`、`marketSegment`、`productionStatus`（Active/At Risk/Halted/Discontinued）
- 用途：计算收入风险敞口及生产计划所受影响

### 第二层：中断事件

**DisruptionEvent（中断事件）**
- 中断或威胁一个或多个供应商正常供货的事件
- 关键属性：`eventId`、`type`（Natural Disaster/Geopolitical/Financial/Logistics/Quality Recall/Pandemic/Cyber Attack）、`severity`（Critical/High/Medium/Low）、`startDate`、`estimatedDurationDays`、`region`
- 用途：根据事件分类和严重程度确定升级级别及响应时限

### 第三层：分析与响应

**RiskAssessment（风险评估）**
- 分析供应链中断造成的业务影响
- 关键属性：`assessmentId`、`assessedDate`（日期时间）、`revenueAtRisk`（美元）、`timeToImpactDays`、`confidenceLevel`（High/Medium/Low）、`recommendedAction`
- 用途：用金额和时间量化业务影响，确定响应优先级

**MitigationAction（缓解措施）**
- 减少或消除中断影响的具体行动
- 关键属性：`actionId`、`type`（Activate Alternative Supplier/Increase Safety Stock/Redesign Component/Reduce Production/Expedite Shipment/Customer Communication）、`status`（Proposed/Approved/In Progress/Completed/Cancelled）、`estimatedCost`（美元）、`leadTimeSavedDays`
- 用途：记录已采取的措施，并比较实际效果与预期效果

### 第四层：后备来源

**AlternativeSupplier（备选供应商）**
- 经过认证、能够替代主供应商的后备供应商
- 关键属性：`altSupplierId`、`name`、`country`、`qualificationStatus`（Pre-qualified/Approved/Pending Audit/Not Qualified）、`capacityAvailable`（件/月）、`pricePremiumPercent`（%）
- 用途：在明确产能和成本影响的前提下快速启用后备来源

## 属性类型与校验

属性的类型决定智能体和仪表板如何使用它：

| 类型 | 示例 | 智能体中的用途 |
|------|---------|---------------|
| `string` | 供应商名称、零部件类别 | 搜索、筛选、报表 |
| `integer` | 库存可用天数、产能、数量 | 基于阈值的预警 |
| `decimal` | 收入、溢价、可靠性评分 | 成本收益计算 |
| `date` | 中断开始日期 | 时间比较 |
| `datetime` | 风险评估时间戳 | 审计追踪、趋势分析 |
| `enum` | 供应商层级、中断类型、严重程度 | 分类、决策树 |
| `boolean` | 是否单一来源 | 风险标记 |

## 标识符属性

每个实体都有唯一标识符：

```
Supplier → supplierId（例如 SUPP-00456）
Component → componentId（例如 COMP-SEM-0821）
ProductLine → productLineId（例如 PL-LAP-2024）
DisruptionEvent → eventId（例如 DISR-202405-TAIWAN-001）
RiskAssessment → assessmentId（例如 RA-20240501-SEM-001）
MitigationAction → actionId（例如 MA-20240501-ALT-SUPP）
AlternativeSupplier → altSupplierId（例如 ALTSUPP-00789）
```

你和智能体通过这些 ID 在查询和报告中引用具体实例。

## 基数与关系

实体之间通过具有明确基数的关系连接：

- **一对多**：供应商提供多个零部件；中断事件影响多个供应商
- **多对多**：零部件用于多条产品线；缓解措施启用多个备选供应商
- **多对一**：多个备选供应商可替代同一个主供应商

下一步将查看完整的关系图。
