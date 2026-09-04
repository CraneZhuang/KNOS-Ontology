---
title: "完整银行模型"
slug: complete-banking
description: "添加 Loan 和 Investment，连接信贷产品与投资持仓，完成银行本体。"
order: 4
embed: official/finance-step-3
---

## 金融产品

除了基础账户和交易，银行还提供两大类产品：

- **贷款**：银行提供资金的信贷产品
- **投资**：客户用于财富增值的持仓

加入这些内容后，模型更加完整，也会形成多路径关系。

## 贷款（Loan）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `loanId` | string | ✓ |
| `principal` | decimal (USD) | |
| `apr` | decimal (%) | |
| `term` | integer（月） | |
| `status` | string | |

`term` 是以月为单位的整数，是时长属性的常见模式。`apr`（年百分比利率）使用百分比单位。

## 投资（Investment）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `holdingId` | string | ✓ |
| `symbol` | string | |
| `shares` | decimal | |
| `purchasePrice` | decimal (USD) | |
| `currentValue` | decimal (USD) | |

`symbol`（如 MSFT、AAPL）标识股票。同时记录 purchasePrice 和 currentValue，可以计算投资损益。

## 新增关系

四条关系连接金融产品：

- **has_loan（拥有贷款）**：`Customer` → `Loan`（一对多）
  客户可以持有多笔贷款。

- **funds（提供资金）**：`Account` → `Loan`（一对多）
  账户作为贷款还款的资金来源。

- **holds（持有）**：`Customer` → `Investment`（一对多）
  表示客户的投资组合。

- **linked_to（关联）**：`Account` → `Investment`（一对多）
  经纪账户关联到投资持仓。

> **多路径模式：**Investment 通过*两条*路径连接 Customer：直接经过 holds，或间接经过 Account → linked_to。这种冗余是有意设计的，分别描述所有权（谁持有）与资金来源（哪个账户支持）。

## 完整图谱

<ontology-embed id="official/finance-step-3" diff="official/finance-step-2" height="500px"></ontology-embed>

*完整的银行与金融本体包含 5 个实体、6 条关系。Loan 和 Investment 同时通过 Customer 与 Account 连接。*

## 完整模型支持的能力

| 问题 | 图谱路径 |
|---|---|
| 哪些高风险客户持有大额贷款？ | Customer（riskProfile=high）→ Loan（principal > 100K） |
| 头部客户的投资组合价值是多少？ | Customer → Investment（汇总 currentValue） |
| 哪些账户同时为贷款和投资提供资金？ | Account → Loan 且 Account → Investment |
| 哪些客户的投资表现超过贷款成本？ | Customer → Investment（currentValue）与 Customer → Loan（principal × apr）比较 |

## GQL 查询示例

查找投资组合价值超过贷款本金总额的客户：

```gql
MATCH (c:Customer)-[:holds]->(inv:Investment),
      (c)-[:has_loan]->(loan:Loan)
WITH c, SUM(inv.currentValue) AS portfolio, SUM(loan.principal) AS debt
WHERE portfolio > debt
RETURN c.name, portfolio, debt
```

## 已构建的模型

| 步骤 | 新增实体 | 累计数量 | 关键概念 |
|---|---|---|---|
| 1 | Customer、Account | 2 | 所有权、金融标识符 |
| 2 | Transaction | 3 | 活动跟踪、时间精度 |
| 3 | Loan、Investment | 5 | 金融产品、多路径关系 |

## 核心要点

1. **所有权链** Customer → Account → Transaction 支持合规查询
2. **日期时间精度**对金融数据至关重要
3. **多路径关系**描述同一关联的不同侧面
4. **时长属性**（如以月为单位的 term）使用带单位的整数
5. 金融本体描述数据结构，敏感数据保留在源系统中

```quiz
Q: 为什么 Investment 同时通过 holds 连接 Customer，并通过 linked_to 连接 Account？
- 这是错误，只需要一条关系
- 每条关系描述不同侧面：所有权与资金来源 [correct]
- Investment 至少需要两条关系才有效
- 一对多关系总是成对出现
> holds 回答“谁拥有这项投资”，linked_to 回答“哪个账户为其提供资金”。这是两个不同的问题，答案可能不同，例如联名账户为某个人的投资提供资金。
```

你已完成银行与金融学习路径！从[本体目录](#/catalogue)加载任意步骤，即可交互式探索。
