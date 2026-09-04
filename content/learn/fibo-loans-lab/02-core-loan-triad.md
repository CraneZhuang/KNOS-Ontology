---
title: 贷款核心三元组
slug: core-loan-triad
description: 使用属性和关系，建立 FIBO 的基础贷款三元组：Loan、Borrower 和 Lender。
order: 2
embed: official/fibo-loans-step-1
reviewStatus: under-human-review
---

## 合同核心

每个贷款系统都从 FIBO 贷款和债务模块的三个核心概念开始：

- **Loan（贷款）**：债务工具及合同载体（`LOAN/LoansGeneral/Loans`）
- **Borrower（借款人）**：负有还款义务的参与方角色（`FBC/DebtAndEquities/Debt`）
- **Lender（贷款人）**：发起融资的参与方角色（`FBC/DebtAndEquities/Debt`）

在 FIBO 的 OWL 本体中，它们分别建模为 `fibo-loan-ln-ln:Loan`、`fibo-fbc-dae-dbt:Borrower` 和 `fibo-fbc-dae-dbt:Lender`。
LOAN 模块导入这些参与方角色，并增加贷款场景约束。这里简化类层级，但保留核心语义。

## 关键属性

### 贷款（Loan）

| 属性 | 类型 | 说明 |
|---|---|---|
| `loanId` | string | 标识符 |
| `principalAmount` | decimal（USD） | 合同最初约定的金额 |
| `isInterestOnly` | boolean | 借款人在初始期限内是否只支付利息 |

### 借款人（Borrower）

| 属性 | 类型 | 说明 |
|---|---|---|
| `borrowerId` | string | 标识符 |
| `name` | string | 参与方名称 |
| `creditScore` | integer | 授信评估指标，如 FICO 评分 |

### 贷款人（Lender）

| 属性 | 类型 | 说明 |
|---|---|---|
| `lenderId` | string | 标识符 |
| `name` | string | 组织名称 |
| `lenderType` | string | 分类，如 bank、credit union、mortgage company |

## 关系

FIBO 使用从合同对象指向参与方的关系，描述贷款参与方角色：

- **owedBy（借款方）**：`Loan` → `Borrower`（`many-to-one`）。一笔贷款只由一个借款人承担，但借款人可以持有多笔贷款。
- **originatedBy（发起方）**：`Loan` → `Lender`（`many-to-one`）。一笔贷款由一个贷款人发起，但贷款人可以发起多笔贷款。

> **FIBO 参考：**完整模型中的借款人和贷款人属于合同参与方角色，贯穿债务与贷款本体，角色语义建立在参与方和合同模式之上。这里使用直接实体模型以便理解。参见 [FBC 债务模块](https://github.com/edmcouncil/fibo/tree/master/FBC/DebtAndEquities/Debt)、[LOAN 通用贷款模块](https://github.com/edmcouncil/fibo/tree/master/LOAN/LoansGeneral/Loans)及 [FND 参与方模块](https://github.com/edmcouncil/fibo/tree/master/FND/Parties)。

## 步骤 1 图谱

<ontology-embed id="official/fibo-loans-step-1" height="340px"></ontology-embed>

*三个实体和两条关系构成贷款核心三元组，是 FIBO 贷款模型的基础。*

```quiz
Q: 哪条关系最适合表示贷款的还款责任？
- Borrower → Loan (originatedBy)
- Loan → Borrower (owedBy) [correct]
- Lender → Loan (owedBy)
- Loan → Lender (hasCollateral)
> 在此模型中，贷款通过 owedBy 指向借款人，使还款义务从合同对象出发得到明确表达。这遵循了 FIBO 从金融工具有向指向参与方来建模义务的模式。
```
