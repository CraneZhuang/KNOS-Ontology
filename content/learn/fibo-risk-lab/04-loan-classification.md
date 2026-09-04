---
title: "步骤 3：贷款分类"
slug: loan-classification
description: 添加带有巴塞尔风险权重的贷款类型、抵押物类别，以及 OCC/FDIC 集中度分类。
order: 4
embed: official/fibo-risk-step-3
reviewStatus: under-human-review
---

## 产品维度

我们已经描述风险*在哪里*（地理），以及暴露于*哪些行业*。现在加入**贷款产品维度**，按贷款类型、抵押物和所属监管集中度类别进行分类。

巴塞尔 III 风险权重也在此引入模型。

## 新增实体类型

### 集中度类别（ConcentrationCategory）

依据 OCC/FDIC 指引划分的监管类别，银行需要监测每类的风险敞口。

| 属性 | 类型 | 说明 |
|---|---|---|
| `categoryId` | string | 标识符，如 CRE、C&I、CONSUMER |
| `name` | string | 显示名称 |
| `description` | string | 该类别包含的内容 |
| `occGuidance` | string | 相关 OCC/FDIC 指引引用 |

示例类别包括 **CRE（商业房地产）**、**C&I（工商业）**、**消费**和**农业**。

### 贷款类型（LoanType）

具有巴塞尔 III 资本要求的具体贷款产品。

| 属性 | 类型 | 说明 |
|---|---|---|
| `loanTypeCode` | string | 标识符，如 residential_mortgage |
| `name` | string | 显示名称 |
| `baselRiskWeight` | decimal（%） | 巴塞尔 III 标准法风险权重 |
| `regulatoryTreatment` | string | 监管机构对产品的分类处理 |
| `capitalTier` | string | 资本处理层级 |
| `description` | string | 产品说明 |

主要示例：

| 贷款类型 | 巴塞尔风险权重 |
|---|---|
| 住宅按揭 | 35% |
| 汽车贷款 | 75% |
| SBA 贷款 | 0%（政府担保） |
| 建筑贷款 | 150% |
| 商业房地产按揭 | 100% |

### 抵押物类型（CollateralType）

为贷款提供担保的资产类别，以及相应回收预期。

| 属性 | 类型 | 说明 |
|---|---|---|
| `collateralTypeCode` | string | 标识符 |
| `name` | string | 显示名称 |
| `recoveryExpectation` | string | 预期回收程度，如 high、moderate、low |
| `description` | string | 资产类别说明 |

## 新增关系

- **loanClassifiedAs（贷款分类）**：`LoanType` → `ConcentrationCategory`（`many-to-one`），每种贷款类型映射到一个集中度类别。
- **collateralClassifiedAs（抵押物分类）**：`CollateralType` → `ConcentrationCategory`（`many-to-one`），抵押物类型也映射到集中度类别。
- **typicallySecuredBy（典型担保关联）**：`CollateralType` → `LoanType`（`many-to-many`），连接通常为某类贷款提供担保的抵押物类型。

## 设计模式：枢纽实体

**ConcentrationCategory** 是一个*枢纽实体*，连接贷款分类子图与模型其他部分。LoanType 和 CollateralType 都指向它，形成监管分析的共同参照点。

步骤 4 中，RegulatoryLimit 也会连接到 ConcentrationCategory，使它成为合规查询的核心节点。

## 巴塞尔 III 风险权重为什么重要

巴塞尔 III 风险权重影响银行针对不同贷款类型所需持有的资本。在本例中，住宅按揭的 35% 权重意味着每单位贷款所需资本较低，而建筑贷款的 150% 权重意味着所需资本更多。

这直接影响：

- **盈利能力**：较低风险权重意味着占用资本较少，从而可能提高净资产收益率
- **组合策略**：银行在优化贷款组合时会考虑风险权重
- **监管合规**：超过风险加权资产限额可能触发监管措施

## 步骤 3 图谱（与步骤 2 对比）

<ontology-embed id="official/fibo-risk-step-3" diff="official/fibo-risk-step-2" height="440px"></ontology-embed>

*三个新实体构成贷款分类组，ConcentrationCategory 是连接贷款类型和抵押物类型的枢纽。*

```quiz
Q: 在本示例中，为什么建筑贷款的巴塞尔风险权重为 150%，而 SBA 贷款为 0%？
- 建筑贷款办理时间更长
- 本示例假设 SBA 贷款由政府担保、银行不承担信用风险，而建筑贷款面临较高违约和完工风险 [correct]
- 建筑公司的盈利能力较低
- SBA 的含义是 Safe Banking Asset
> 巴塞尔 III 风险权重反映银行承担的信用风险。本教学示例将 SBA（美国小企业管理局）贷款视为政府担保、银行信用风险为零的情形。建筑贷款则面临完工、市场及较高违约风险，示例使用 150% 风险权重。
```
