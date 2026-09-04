---
title: "客户与账户"
slug: customer-accounts
description: "定义 Customer 和 Account，通过所有权关系及金融属性建立银行业基础模型。"
order: 2
embed: official/finance-step-1
---

## 银行业基础

每家金融机构都从两个核心概念开始：

- **Customer（客户）**：谁持有账户？
- **Account（账户）**：资金在哪里存储和管理？

这两个实体构成银行本体的基础，其他金融产品都通过它们连接。

## 定义实体

### 客户（Customer）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `customerId` | string | ✓ |
| `name` | string | |
| `ssn` | string | |
| `creditScore` | integer | |
| `riskProfile` | string | |

`creditScore` 是用于贷款决策的整数评分（300–850）。`riskProfile` 记录银行用于合规和监测的风险评估。

> **敏感数据说明：**ssn 等属性在本体中只是元数据，描述*存在什么数据*，而不是存储实际值。本体是结构定义，不是数据库。

### 账户（Account）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `accountNumber` | string | ✓ |
| `type` | string | |
| `balance` | decimal (USD) | |
| `interestRate` | decimal (%) | |
| `openDate` | date | |

`type` 区分活期、储蓄和经纪账户。`interestRate` 使用百分比单位。

## 所有权关系

- **owns（拥有）**：`Customer` → `Account`（一对多）
  客户可以拥有多个活期、储蓄或经纪账户，但每个账户只属于一个客户。

## 当前图谱

<ontology-embed id="official/finance-step-1" height="300px"></ontology-embed>

*Customer 和 Account 通过所有权关系连接，简单却十分基础。*

## 本节总结

- **整数属性**适合评分与评级，如 creditScore
- **百分比单位**（%）表示比率类属性
- **owns** 关系建立基本所有权链
- 本体描述数据的*结构*，而非数据本身；SSN 等敏感字段只是元数据

```quiz
Q: 为什么 creditScore 使用整数，而不是字符串？
- 字符串更难存入数据库
- 整数支持数值比较和范围查询，例如 creditScore > 700 [correct]
- 信用评分始终恰好是三位数
- 整数占用更少存储空间
> 整数类型向查询引擎表明，creditScore 支持比较、范围、平均值和阈值等数值运算。字符串类型无法传递这种语义。
```

接下来添加 Transaction，跟踪账户活动。
