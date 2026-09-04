---
title: "交易记录"
slug: transactions
description: "添加 Transaction，跟踪账户中的每次借记、贷记和转账。"
order: 3
embed: official/finance-step-2
---

## 跟踪活动

没有交易历史的账户只有静态余额。添加 **Transaction（交易）**后，即可记录每次购买、存款、转账和收费，描述资金流动。

这样可以回答：
- 这位客户上个月在餐厅消费了多少？
- 哪些账户存在异常交易模式？
- 各账户类型的平均交易金额是多少？

## 交易实体（Transaction）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `transactionId` | string | ✓ |
| `amount` | decimal (USD) | |
| `type` | string | |
| `timestamp` | datetime | |
| `merchant` | string | |

`timestamp` 使用 datetime 而非仅有日期的 date，因为金融交易要求精确时间。对于欺诈检测，下午 2:30 和 2:31 的购买行为并不相同。

`merchant` 记录交易发生的商户，适用于消费类别分析。

## 新增关系

- **has_transaction（拥有交易）**：`Account` → `Transaction`（一对多）
  账户会随时间产生多笔交易，但每笔交易属于一个账户。

所有权链因此扩展为 `Customer → Account → Transaction`。

## 持续扩展的图谱

<ontology-embed id="official/finance-step-2" diff="official/finance-step-1" height="400px"></ontology-embed>

*Transaction 增加活动层，所有权链扩展为 Customer → Account → Transaction。*

## 本节总结

- **日期时间精度**对金融和合规场景很重要
- **所有权链** Customer → Account → Transaction 支持下钻查询
- 无需添加 Merchant 实体，merchant 属性就能支持消费分析
- 每个新实体都会加深模型能够回答的问题

```quiz
Q: 为什么 Transaction 的 timestamp 使用 datetime 而不是 date？
- datetime 是所有时间字段的默认属性类型
- 金融交易需要一天内的精确时间，支持欺诈检测和审计轨迹 [correct]
- 现代本体已经弃用 date 类型
- datetime 比 date 占用的存储更少
> 金融合规与欺诈检测需要精确时间戳。同一天相隔几分钟的两笔交易，可能表明某种欺诈模式。datetime 同时记录日期和时间，提供所需精度。
```

接下来添加 Loan 和 Investment，补齐银行产品模型。
