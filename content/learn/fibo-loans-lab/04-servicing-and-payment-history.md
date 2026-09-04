---
title: 贷后服务与还款历史
slug: servicing-and-payment-history
description: 使用 FIBO 的贷后服务机构和可审计还款事件扩展模型。
order: 4
embed: official/fibo-loans-step-3
reviewStatus: under-human-review
---

## 业务生命周期

贷款发起后进入贷后服务阶段。FIBO 跨两个模块描述这一过程：

- **Servicer（贷后服务机构）**：收取和处理还款的组织，改编自 [LOAN/LoansGeneral/Loans](https://github.com/edmcouncil/fibo/tree/master/LOAN/LoansGeneral/Loans) 中的 `fibo-loan-ln-ln:Servicer`。
- **PaymentHistory（还款历史）**：汇总还款记录，改编自 [LOAN/LoansGeneral/Loans](https://github.com/edmcouncil/fibo/tree/master/LOAN/LoansGeneral/Loans) 中的 `fibo-loan-ln-ln:PaymentHistory`，该概念扩展了 [FBC/ProductsAndServices/ClientsAndAccounts](https://github.com/edmcouncil/fibo/tree/master/FBC/ProductsAndServices/ClientsAndAccounts) 的交易记录模式。
- **PaymentTransaction（还款交易）**：单笔还款事件，改编自 `fibo-loan-ln-ln:IndividualPaymentTransaction`，后者基于 `fibo-fbc-pas-caa:IndividualTransaction`。

这反映了实际贷款平台将合同约定与执行日志分离的做法。

## 新增属性

### 贷后服务机构（Servicer）

| 属性 | 类型 | 说明 |
|---|---|---|
| `servicerId` | string | 标识符 |
| `organizationName` | string | 贷后服务机构名称 |

### 还款历史（PaymentHistory）

| 属性 | 类型 | 说明 |
|---|---|---|
| `paymentHistoryId` | string | 标识符 |

### 还款交易（PaymentTransaction）

| 属性 | 类型 | 说明 |
|---|---|---|
| `paymentTransactionId` | string | 标识符 |
| `amount` | decimal（USD） | 还款金额 |
| `postedAt` | datetime | 还款入账时间 |

## 新增关系

- **servicedBy（服务方）**：`Loan` → `Servicer`（`many-to-one`），一家机构可为多笔贷款提供服务。
- **hasPaymentHistory（还款历史）**：`LoanPaymentSchedule` → `PaymentHistory`（`one-to-one`），连接计划预期与实际记录。
- **hasIndividualPayment（单笔还款）**：`PaymentHistory` → `PaymentTransaction`（`one-to-many`），每份还款历史包含多笔交易事件。

## 审计轨迹

通过这些连接，可以沿模型中的清晰路径追踪：

`Loan` → `LoanPaymentSchedule` → `PaymentHistory` → `PaymentTransaction`

这条路径支持审计查询、逾期分析和贷后服务质量指标，体现了本体驱动的数据集成中图谱遍历的价值。

> **FIBO 参考：**实际 FIBO 的贷后服务与还款历史模式连接 LOAN 和 FBC 模块：Loan 关联贷款专用账户，还款历史建模为交易记录，单笔还款交易记录事件级事实。这里保留了这一核心模式。参见 [LOAN/LoansGeneral/Loans](https://github.com/edmcouncil/fibo/tree/master/LOAN/LoansGeneral/Loans) 和 [FBC/ProductsAndServices/ClientsAndAccounts](https://github.com/edmcouncil/fibo/tree/master/FBC/ProductsAndServices/ClientsAndAccounts)。

## 步骤 3 图谱（与步骤 2 对比）

<ontology-embed id="official/fibo-loans-step-3" diff="official/fibo-loans-step-2" height="420px"></ontology-embed>

*Servicer、PaymentHistory 和 PaymentTransaction 三个新增实体构成业务执行层，用于跟踪贷款生命周期事件。*

```quiz
Q: amount、postedAt 等单笔还款事件信息应放在哪个实体中？
- Loan
- Servicer
- PaymentHistory
- PaymentTransaction [correct]
> PaymentHistory 是汇总容器，单笔事件属于 PaymentTransaction，后者存储用于对账与审计的事件级明细。这种分离遵循 FIBO 区分汇总记录与单笔交易的建模模式。
```
