---
title: "步骤 4：监管背景"
slug: regulatory-context
description: 添加银行监管规则、集中度限额和跨领域连接，完成模型。
order: 5
embed: official/fibo-risk-step-4
reviewStatus: under-human-review
---

## 形成闭环

前三步建立了行业、地理和贷款分类等参考数据。最后一步加入**监管约束层**，即限制组合集中度的规则和定量限额。

这让本体具备更强的业务价值：从具体贷款追踪到集中度类别，再到适用限额，并识别每个限额的监管依据。

## 新增实体类型

### 监管规则（Regulation）

由银行监管机构发布的监管框架。

| 属性 | 类型 | 说明 |
|---|---|---|
| `regulationCode` | string | 标识符，如 OCC_CRE_2006 |
| `name` | string | 监管规则名称 |
| `issuingAuthority` | string | 发布机构，如 OCC、FDIC、巴塞尔委员会 |
| `effectiveDate` | date | 生效日期 |
| `scope` | string | 覆盖范围 |
| `description` | string | 完整说明 |

### 监管限额（RegulatoryLimit）

监管规则中的具体定量阈值。

| 属性 | 类型 | 说明 |
|---|---|---|
| `limitId` | string | 标识符 |
| `limitName` | string | 显示名称 |
| `category` | string | 所约束的维度 |
| `thresholdPct` | decimal（%） | 限额数值 |
| `severity` | string | 超限后果，如 warning、action required、supervisory intervention |
| `description` | string | 限额含义 |

主要示例：

| 限额 | 阈值 | 法规 |
|---|---|---|
| 商业房地产集中度 | 资本的 300% | OCC 指引 2006-46 |
| 气候与飓风 | 组合的 15% | 内部风险政策 |
| 地理集中度 | 组合的 20% | OCC 公告 2011-12 |
| 行业集中度 | 组合的 25% | FDIC 风险管理 |

## 新增关系

- **mandatedBy（规定依据）**：`RegulatoryLimit` → `Regulation`（`many-to-one`），每个限额由特定规则规定。
- **limitAppliesToCategory（适用类别）**：`RegulatoryLimit` → `ConcentrationCategory`（`many-to-one`），将限额连接到所约束的集中度类别。

## 设计模式：跨领域连接

通过 limitAppliesToCategory，监管层经由 ConcentrationCategory 连接到贷款分类层，形成**跨领域查询路径**：

```
Jurisdiction (hurricaneZone=true)
  → [地理维度]
    → ConcentrationCategory
      → [监管维度]
        → RegulatoryLimit (thresholdPct)
          → Regulation (issuingAuthority)
```

从行业侧看：

```
IndustryGroup (climateSensitivity="high")
  → [行业维度]
    → Subsector → Sector
```

## 完整模型

最终本体跨越四个领域，包含 **11 个实体类型**和 **10 条关系**：

| 领域 | 实体 | 关系 |
|---|---|---|
| 行业 | Sector、Subsector、IndustryGroup | partOfSector、belongsToSubsector |
| 地理 | Region、Country、Jurisdiction | inCountry、inRegion |
| 贷款分类 | ConcentrationCategory、LoanType、CollateralType | loanClassifiedAs、collateralClassifiedAs、typicallySecuredBy |
| 监管 | Regulation、RegulatoryLimit | mandatedBy、limitAppliesToCategory |

## 步骤 4 图谱（与步骤 3 对比）

<ontology-embed id="official/fibo-risk-step-4" diff="official/fibo-risk-step-3" height="480px"></ontology-embed>

*Regulation 和 RegulatoryLimit 补齐了模型。limitAppliesToCategory 将监管约束连接到贷款分类。*

## 完整外部参考本体

你也可以在外部目录中分别探索各个领域：

- [FIBO 行业分类](/#/catalogue/external/fibo/industry-classification)
- [FIBO 地理层级](/#/catalogue/external/fibo/geographic-hierarchy)
- [FIBO 贷款分类](/#/catalogue/external/fibo/loan-classification)
- [FIBO 监管背景](/#/catalogue/external/fibo/regulatory-context)

## 你已构建的内容

现在，你拥有一个受 FIBO 启发的完整风险管理本体，支持：

- **行业集中度分析**：按行业大类、子类和行业组汇总风险敞口
- **地理风险评估**：按灾害区域标记筛选，并与组合数据交叉分析
- **巴塞尔 III 资本计算**：为贷款类型应用标准化风险权重
- **监管合规监测**：将组合集中度与规定限额进行比较

这类跨领域风险查询，在传统数仓中需要复杂的多表 JOIN，在本体驱动系统中则可表达为简单的图谱遍历。

## 许可

本实验引用的所有 FIBO 本体内容：

- **版权所有** © 2016–2025 EDM Council, Inc. 和 Object Management Group, Inc.
- 按照 [MIT 许可证](https://opensource.org/licenses/MIT)**授权**

```quiz
Q: ConcentrationCategory 在完整模型中承担什么角色？
- 存储地理坐标
- 作为枢纽实体，跨领域连接贷款分类、抵押物类型和监管限额 [correct]
- 为每笔贷款定义巴塞尔风险权重
- 取代 Regulation 实体来跟踪合规
> ConcentrationCategory 是连接贷款分类与监管领域的核心枢纽。LoanType 和 CollateralType 都归入其中，RegulatoryLimit 则对其施加约束，因此它是跨领域集中度风险查询的关键节点。
```
