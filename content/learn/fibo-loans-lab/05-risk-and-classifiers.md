---
title: 风险与分类器
slug: risk-and-classifiers
description: 添加 FIBO 所有权和担保权顺位分类器，支持授信评估和抵押物风险分析。
order: 5
embed: official/fibo-loans-step-4
reviewStatus: under-human-review
---

## 分类层

FIBO 广泛使用显式分类器，即主要用于给其他实体分类的实体。最后一步添加两个对按揭及担保贷款风险分析至关重要的概念：

- **OwnershipInterest（所有权权益）**：对抵押物的法律所有权类型分类，改编自 [LOAN/LoansGeneral/Loans](https://github.com/edmcouncil/fibo/tree/master/LOAN/LoansGeneral/Loans) 中的 `fibo-loan-ln-ln:OwnershipInterest`，以 `fibo-fnd-oac-own:Ownership` 为基础。
- **LenderLienPosition（贷款人担保权顺位）**：对贷款人就抵押资产提出的债权优先级分类，改编自 [LOAN/LoansGeneral/Loans](https://github.com/edmcouncil/fibo/tree/master/LOAN/LoansGeneral/Loans) 中的 `fibo-loan-ln-ln:LenderLienPosition`。

## 为什么分类器重要

在 FIBO 的[按揭模块](https://github.com/edmcouncil/fibo/tree/master/LOAN/RealEstateLoans/Mortgages)中，担保权顺位决定止赎处置时的受偿优先级。第一顺位按揭的预期回收能力强于次级顺位，这直接影响：

- 信用风险建模
- 违约损失率估计
- 投资组合风险汇总
- 监管资本计算

> **FIBO 参考：**按揭本体使用 `owl:Restriction` 约束不动产抵押物和合同语义。LOAN 本体中的 `SecurityAgreement` 与 `Loan` 还通过 `LenderLienPosition`、`OwnershipInterest` 等分类器进一步约束。参见 [Mortgages.rdf](https://github.com/edmcouncil/fibo/blob/master/LOAN/RealEstateLoans/Mortgages.rdf) 和 [Loans.rdf](https://github.com/edmcouncil/fibo/blob/master/LOAN/LoansGeneral/Loans.rdf)。

## 新增关系

- **classifiesCollateralOwnership（抵押物所有权分类）**：`OwnershipInterest` → `Collateral`（`one-to-many`）
- **hasLienPosition（担保权顺位）**：`Collateral` → `LenderLienPosition`（`many-to-one`）

## 步骤 4 图谱（与步骤 3 对比）

<ontology-embed id="official/fibo-loans-step-4" diff="official/fibo-loans-step-3" height="460px"></ontology-embed>

*OwnershipInterest 和 LenderLienPosition 两个分类实体为完整模型补充风险与授信语义。*

## 完整改编模型

还可以查看根据相同 FIBO 源概念构建的完整外部子集：

<ontology-embed id="external/fibo/loans-general" height="420px"></ontology-embed>

## 你已构建的内容

现在，你拥有一个受 FIBO 启发、逐步构建的贷款本体，覆盖：

| 模型层 | 实体 | FIBO 源模块 |
|---|---|---|
| 合同参与方 | Loan、Borrower、Lender | [LOAN/LoansGeneral/Loans](https://github.com/edmcouncil/fibo/tree/master/LOAN/LoansGeneral/Loans) |
| 担保与计划 | Collateral、LoanPaymentSchedule | [FBC/DebtAndEquities/Debt](https://github.com/edmcouncil/fibo/tree/master/FBC/DebtAndEquities/Debt) |
| 贷后服务 | Servicer、PaymentHistory、PaymentTransaction | [LOAN/LoansGeneral/Loans](https://github.com/edmcouncil/fibo/tree/master/LOAN/LoansGeneral/Loans) + [FBC/ProductsAndServices/ClientsAndAccounts](https://github.com/edmcouncil/fibo/tree/master/FBC/ProductsAndServices/ClientsAndAccounts) |
| 风险分类器 | OwnershipInterest、LenderLienPosition | [LOAN/LoansGeneral/Loans](https://github.com/edmcouncil/fibo/tree/master/LOAN/LoansGeneral/Loans) + [FND/OwnershipAndControl/Ownership](https://github.com/edmcouncil/fibo/tree/master/FND/OwnershipAndControl) |

这是继续扩展按揭类型、房屋净值信用额度（HELOC）、汽车贷款或小企业贷款等专用模块的坚实基础。

## 延伸阅读

- **FIBO GitHub 仓库**：[github.com/edmcouncil/fibo](https://github.com/edmcouncil/fibo)
- **FIBO 规范**：[spec.edmcouncil.org/fibo](https://spec.edmcouncil.org/fibo/)
- **EDM Council**: [edmcouncil.org](https://edmcouncil.org/)
- **FIBO 贷款模块**：[LOAN/LoansGeneral/Loans 源码](https://github.com/edmcouncil/fibo/tree/master/LOAN/LoansGeneral/Loans)
- **FIBO 按揭模块**：[LOAN/RealEstateLoans/Mortgages 源码](https://github.com/edmcouncil/fibo/tree/master/LOAN/RealEstateLoans/Mortgages)
- **FIBO 债务模块**：[FBC/DebtAndEquities/Debt 源码](https://github.com/edmcouncil/fibo/tree/master/FBC/DebtAndEquities/Debt)
- **FIBO 客户与账户模块**：[FBC/ProductsAndServices/ClientsAndAccounts 源码](https://github.com/edmcouncil/fibo/tree/master/FBC/ProductsAndServices/ClientsAndAccounts)

## 许可

本实验引用的所有 FIBO 本体内容：

- **版权所有**：EDM Council, Inc. 和 Object Management Group, Inc.（具体年份范围见模块文件头）
- 按照 [MIT 许可证](https://opensource.org/licenses/MIT)**授权**

MIT 许可证允许使用、修改和再分发本体文件，包括商业用途，但必须保留版权声明。本实验中的本体文件是为教学目的制作的改编子集。

```quiz
Q: 在抵押物模型中加入 LenderLienPosition 的主要价值是什么？
- 可以取代借款人信息
- 描述贷款人债权的优先级，这是信用风险和损失建模的关键 [correct]
- 存储还款时间戳
- 自动确定贷款利率
> 担保权顺位描述债权优先级，如第一顺位与次级顺位，直接影响止赎处置时的回收预期。它对授信评估、组合风险模型及监管资本计算至关重要，是 FIBO 债务与权益模块中的核心概念。
```
