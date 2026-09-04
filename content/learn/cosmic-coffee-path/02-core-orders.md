---
title: "核心订单模型"
slug: core-orders
description: "定义咖啡业务的基础实体 Customer、Order 和 Product，并通过关系连接它们。"
order: 2
embed: official/cosmic-coffee-step-1
---

## 模型基础

每个商业系统都从三个核心概念开始：

- **Customer（客户）**：谁在购买？
- **Order（订单）**：发生了什么交易？
- **Product（产品）**：购买了什么？

这三个实体类型构成 Fourth Coffee 本体的核心。后续添加的所有内容都会与它们连接。

## 定义实体

### 客户（Customer）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `customerId` | string | ✓ |
| `name` | string | |
| `email` | string | |
| `loyaltyTier` | enum (Bronze, Silver, Gold, Platinum) | |
| `joinDate` | date | |
| `totalSpend` | decimal (USD) | |

`customerId` 唯一标识每位客户。`loyaltyTier` 使用枚举，将取值限制在有效的会员等级内，避免下游分析出现数据质量问题。

### 订单（Order）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `orderId` | string | ✓ |
| `timestamp` | datetime | |
| `total` | decimal (USD) | |
| `status` | enum (Pending, Preparing, Ready, Completed, Cancelled) | |
| `paymentMethod` | enum (Card, Cash, Mobile, Gift Card) | |

### 产品（Product）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `productId` | string | ✓ |
| `name` | string | |
| `category` | enum (Espresso, Brewed, Cold Brew, Tea, Food, Merchandise) | |
| `price` | decimal (USD) | |
| `origin` | string | |
| `isOrganic` | boolean | |

`isOrganic` 是布尔标记，可用于后续的筛选和合规查询。

## 通过关系建立连接

只有实体时，模型仍是一组孤立的表。**关系**将它们变成图谱：

- **places（下单）**：`Customer` → `Order`（一对多）
  每位客户可以下多个订单，但每个订单只属于一位客户。

- **contains（包含）**：`Order` → `Product`（多对多）
  一个订单可以包含多个产品，一个产品也可以出现在多个订单中。

## 当前图谱

<ontology-embed id="official/cosmic-coffee-step-1" height="350px"></ontology-embed>

*三个实体、两条关系，是后续模型的基础。*

## 本节总结

- 每个实体都需要一个**标识符属性**，即唯一键
- **枚举属性**将取值限制为有效选项
- **布尔属性**支持简单筛选
- **基数**（一对多或多对多）决定实体如何关联

```quiz
Q: 为什么 Order 与 Product 之间的 contains 关系是多对多，而不是一对多？
- 每个订单只能包含一个产品
- 一个产品在同一时间只能出现在一个订单中
- 一个订单可以包含多个产品，同一个产品也可以出现在多个订单中 [correct]
- 多对多始终是默认的关系类型
> 订单通常包含多个产品，如拿铁、松饼和一袋咖啡豆；每个产品又会出现在许多不同订单中。这种双向的多重对应需要多对多关系。
```

接下来添加 Store，跟踪订单的处理地点。
