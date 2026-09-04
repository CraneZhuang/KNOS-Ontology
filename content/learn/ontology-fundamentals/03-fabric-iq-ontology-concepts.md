---
title: Microsoft Fabric IQ 本体概念
slug: fabric-iq-ontology-concepts
description: 了解 Microsoft Fabric 如何利用实体类型、标识符、关系与基数，支持结构化数据的自然语言查询。
order: 3
embed: official/ecommerce
---

## 什么是 Fabric IQ？

**Microsoft Fabric** 是整合数据工程、数据科学、实时分析和商业智能的统一分析平台。**IQ** 是 Fabric 的一项能力，让用户使用**自然语言**从结构化数据中获取答案，而不必编写 SQL。

核心要素是**本体**，它正式描述实体类型、属性和关系。IQ 读取本体，理解数据结构，将自然语言问题转换为相应查询。

## IQ 如何使用本体

用户提问*“上个月各区域的销售总额是多少？”*时，IQ 需要知道：

1. **实体类型**：Order、Store、Region
2. **属性**：Order.totalAmount、Order.date、Store.region
3. **关系**：Order → placedAt → Store，Store → locatedIn → Region
4. **标识符属性**：哪些字段唯一标识各个实体，如 Order.orderId

本体提供这四类信息。否则 IQ 无法区分门店与产品，也无法知道应如何关联。

## 实体类型

实体类型是一类业务对象。在 Fabric IQ 中，每个实体类型：

- 具有**名称**和可选**说明**
- 包含一个或多个**属性**，即带类型的数据列
- 至少具有一个能够唯一区分实例的**标识符属性**

可将其理解为表定义：`Customer(customerId, name, email, tier)`。

## 属性与类型

每个属性都有数据类型：

| 类型 | 说明 | 示例 |
|------|-------------|---------|
| string | 文本 | 客户姓名、产品 SKU |
| integer | 整数 | 数量、年份 |
| decimal | 小数 | 价格、评分 |
| date | 日期 | 下单日期、出生日期 |
| datetime | 日期与时间 | 创建时间戳 |
| boolean | 真 / 假 | 是否启用、是否高级会员 |

带钥匙图标的**标识符属性**十分关键，它告诉 IQ 如何正确计数、分组和关联实体。

## 关系与基数

关系连接实体类型，每条关系指定：

- **源实体与目标实体**类型
- **名称**：动作动词，如 places、contains、worksAt
- **基数**：双方可以连接多少个实例

| 基数 | 含义 | 示例 |
|------------|---------|---------|
| 一对一 | 每个 A 对应一个 B | Employee → Badge |
| 一对多 | 每个 A 对应多个 B | Customer → Order |
| 多对一 | 多个 A 对应一个 B | Order → Store |
| 多对多 | 多个 A 对应多个 B | Student → Course |

IQ 根据基数生成正确的汇总逻辑。Customer 与 Order 的一对多关系意味着可以统计每位客户的订单数，而每个订单的客户数通常为 1。

<ontology-embed id="official/ecommerce" height="400px"></ontology-embed>

*电商本体展示了适用于 IQ 的模式：每个实体有标识符、每个属性有类型、每条关系有基数。*

## 面向 IQ 设计

为 Fabric IQ 构建本体时，遵循以下原则：

1. **命名清晰**：使用用户熟悉的业务术语，如 Customer，而不是 tbl_cust
2. **补充说明**：帮助 IQ 区分相似概念
3. **标记标识符**：每个实体必须至少有一个标识符属性
4. **设置基数**：帮助 IQ 生成正确的 GROUP BY 与 JOIN 逻辑
5. **保持聚焦**：建模用户会查询的概念，而不是每张内部表

## 核心要点

- Fabric IQ 利用本体将自然语言问题转换为查询
- 实体类型、属性、关系与基数是四个支柱
- 每个实体都需要标识符，才能正确计数与关联
- 良好命名与说明有助于提高问答准确度
- 使用[本体设计器](#/designer)，可视化创建适用于 IQ 的本体

```quiz
Q: 为什么 Fabric IQ 要求每个实体类型具有标识符属性？
- 让本体看起来更专业
- 告诉 IQ 如何正确计数、分组和关联实体 [correct]
- 作为实体显示名称
- 设置默认排序
> 标识符属性唯一区分某一类型的各个实例。没有它，IQ 就无法正确生成 COUNT、GROUP BY 或 JOIN 操作。
```

```quiz
Q: 关系的基数向 Fabric IQ 传递什么信息？
- 绘制关系时使用的颜色
- 关系两端各可以连接多少个实例 [correct]
- 关系是可选还是必需
- 实体的显示顺序
> 一对一、一对多、多对一和多对多等基数，帮助 IQ 生成正确的汇总与关联，例如理解一位客户可以拥有多个订单。
```
