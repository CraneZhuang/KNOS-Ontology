---
title: 场景概览
slug: scenario-overview
description: 了解 FIBO 的定义、来源，以及本实验将构建的模型。
order: 1
reviewStatus: under-human-review
---

## 什么是 FIBO？

**金融行业业务本体**（FIBO）是由 [EDM Council](https://edmcouncil.org/) 和[对象管理组织](https://www.omg.org/)（OMG）开发的行业标准本体族，为金融工具、参与方、合同和监管概念提供正式、机器可读的词汇体系。

FIBO 的特点：

- 按照 [MIT 许可证](https://opensource.org/licenses/MIT)**开源**
- **托管在 GitHub**：[edmcouncil/fibo](https://github.com/edmcouncil/fibo)
- 在 [spec.edmcouncil.org/fibo](https://spec.edmcouncil.org/fibo/) **以 OWL 本体形式发布**
- **自 2012 年起开发**，主要金融机构、监管机构和标准组织共同参与

> **来源：**本实验主要改编自 `LOAN/LoansGeneral/Loans`，并使用 `FBC/DebtAndEquities/Debt`、`FBC/ProductsAndServices/ClientsAndAccounts` 和 `FND/OwnershipAndControl/Ownership` 中的辅助概念。完整模块见 [FIBO GitHub 仓库](https://github.com/edmcouncil/fibo)。

## 为什么设计这个实验

FIBO 规模很大，数百个本体模块覆盖证券、衍生品、公司行动、指数等领域。仅 `LOAN` 领域就包含多个子模块：

| FIBO 模块 | 覆盖内容 |
|---|---|
| `LOAN/LoansGeneral/Loans` | 贷款生命周期：贷款、贷后服务、还款历史、担保权及所有权分类 |
| `FBC/DebtAndEquities/Debt` | 借款人和贷款人角色、抵押物、担保协议、债务条款 |
| `FBC/ProductsAndServices/ClientsAndAccounts` | 还款历史使用的交易记录和单笔交易 |
| `LOAN/RealEstateLoans/Mortgages` | 房地产专用约束：不动产抵押物及按揭结构 |
| `FND/OwnershipAndControl/Ownership` | 贷款所有权分类复用的所有权语义 |

*来源：[FIBO 本体结构](https://github.com/edmcouncil/fibo/tree/master/LOAN)。*

本实验提取围绕贷款合同与还款流程的教学子集，让你无需遍历完整模块层级，就能学习 FIBO 建模模式。

## 我们将构建什么

通过四个递进步骤，构建一个包含 10 个实体类型、10 条关系的**贷款本体**：

1. **贷款核心三元组**：`Loan`、`Borrower`、`Lender`
2. **抵押物与还款计划**：`Collateral`、`LoanPaymentSchedule`
3. **贷后服务与还款历史**：`Servicer`、`PaymentHistory`、`PaymentTransaction`
4. **风险分类器**：`OwnershipInterest`、`LenderLienPosition`

## 模型支持的实际问题

- 哪些抵押贷款的担保权顺位较低？
- 哪些借款人拥有本金超过阈值的只付息贷款？
- 不同贷后服务机构的还款交易模式有何差异？
- 哪些所有权结构与还款问题相关？

## 许可与署名

本实验改编自 EDM Council 的 FIBO 本体：

- **版权所有**：EDM Council, Inc. 和 Object Management Group, Inc.（具体年份范围见模块文件头）
- **许可证**：[MIT 许可证](https://opensource.org/licenses/MIT)
- **源代码仓库**：[github.com/edmcouncil/fibo](https://github.com/edmcouncil/fibo)
- **规范**：[spec.edmcouncil.org/fibo](https://spec.edmcouncil.org/fibo/)

本实验中的本体文件是简化后的教学版本，在保留 FIBO 核心语义的同时降低复杂度，便于逐步学习。

```quiz
Q: 哪些组织开发和维护 FIBO？
- 世界银行
- EDM Council 和对象管理组织（OMG） [correct]
- 欧洲中央银行
- W3C Web 本体工作组
> FIBO 由企业数据管理委员会 EDM Council 与对象管理组织共同开发，采用 MIT 许可证开源，GitHub 仓库为 edmcouncil/fibo。
```
