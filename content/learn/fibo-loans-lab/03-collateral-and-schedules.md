---
title: 抵押物与还款计划
slug: collateral-and-schedules
description: 使用 FIBO 的抵押物和还款计划概念，为模型加入担保协议与还款节奏。
order: 3
embed: official/fibo-loans-step-2
reviewStatus: under-human-review
---

## 从合同到结构

添加两个 FIBO 概念后，贷款才具备具体的业务执行结构：

- **Collateral（抵押物）**：用什么保障还款，改编自 [FBC/DebtAndEquities/Debt](https://github.com/edmcouncil/fibo/tree/master/FBC/DebtAndEquities/Debt) 中的 `fibo-fbc-dae-dbt:Collateral`。
- **LoanPaymentSchedule（还款计划）**：预期如何随时间还款，改编自 [LOAN/LoansGeneral/Loans](https://github.com/edmcouncil/fibo/tree/master/LOAN/LoansGeneral/Loans) 中的 `fibo-loan-ln-ln:LoanPaymentSchedule`。

这些内容体现了 FIBO 的两个核心关注点：**担保协议**和**时间性义务**。

## 新增属性

### 抵押物（Collateral）

| 属性 | 类型 | 说明 |
|---|---|---|
| `assetType` | string | 标识符：资产类别，如 real property、vehicle、securities |
| `appraisedValue` | decimal（USD） | 评估时的市场价值 |

> **FIBO 参考：**完整本体使用 `fibo-fbc-dae-dbt:Collateral` 表示债务抵押物，可涵盖实体和非实体的担保资产。在[按揭模块](https://github.com/edmcouncil/fibo/tree/master/LOAN/RealEstateLoans/Mortgages)中，`LoanSecuredByRealEstate` 将抵押物约束为 `fibo-fnd-plc-rp:RealProperty`，并通过 `owl:Restriction` 关联到 `SecurityAgreement`。

### 还款计划（LoanPaymentSchedule）

| 属性 | 类型 | 说明 |
|---|---|---|
| `scheduleId` | string | 标识符 |
| `expectedPayments` | integer | 预期还款期数 |

## 新增关系

- **securedBy（担保物）**：`Loan` → `Collateral`（`one-to-many`），一笔贷款可由多项资产担保。
- **repaidBySchedule（还款计划）**：`Loan` → `LoanPaymentSchedule`（`one-to-one`），每笔贷款有一份主要还款计划。

## 步骤 2 图谱（与步骤 1 对比）

<ontology-embed id="official/fibo-loans-step-2" diff="official/fibo-loans-step-1" height="380px"></ontology-embed>

*高亮的新增实体 Collateral 和 LoanPaymentSchedule，为贷款模型加入担保和时间结构。*

```quiz
Q: FIBO 中的 Collateral 概念来自哪个模块？
- LOAN/LoansGeneral/Loans
- FBC/DebtAndEquities/Debt [correct]
- FND/Agreements/Contracts
- FND/Places/RealProperty
> Collateral 定义在 FIBO 的金融业务与商务领域 FBC 下的 DebtAndEquities/Debt 模块中，表示为保障还款义务而提供的资产。它适用于各种担保贷款，不仅限于按揭。
```
