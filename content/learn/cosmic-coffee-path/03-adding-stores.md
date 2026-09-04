---
title: "添加门店"
slug: adding-stores
description: "将 Store 地点引入本体，并把订单连接到处理它们的门店。"
order: 3
embed: official/cosmic-coffee-step-2
---

## 订单发生在哪里

目前我们知道*谁*购买了*什么*，但还不知道*在哪里*。Fourth Coffee 在多个城市经营门店，每个订单都在特定门店处理。

添加 **Store（门店）** 实体后，可以回答以下地点相关问题：
- 哪家门店的订单最多？
- 每个城市的平均订单金额是多少？
- 根据订单量，哪些门店需要增加员工？

## 门店实体（Store）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `storeId` | string | ✓ |
| `name` | string | |
| `city` | string | |
| `state` | string | |
| `openDate` | date | |
| `capacity` | integer | |

`capacity` 表示座位容量，使用**整数**类型，适合运营规划。`city` 和 `state` 提供地理信息，无需引入完整地址层级的复杂性。

## 新增关系

- **processedAt（处理于）**：`Order` → `Store`（多对一）
  每个订单只在一家门店处理，但一家门店会处理多个订单。

> **设计说明：**这是多对一关系：多个订单对应一家门店。这也是“属于”或“发生于”关系最常见的基数模式。

## 持续扩展的图谱

<ontology-embed id="official/cosmic-coffee-step-2" diff="official/cosmic-coffee-step-1" height="400px"></ontology-embed>

*Store 通过 processedAt 关系加入图谱。差异高亮展示了相对于步骤 1 的新增内容。*

## 本节总结

- **多对一关系**用于“属于”或“位于”等模式
- **整数属性**适合可计数的数量，如容量、楼层和座位
- 添加一个实体，就能支持一整类地点相关查询
- `diff` 视图精确展示变化，便于跟踪本体的演进

```quiz
Q: Order 与 Store 之间的 processedAt 关系应使用什么基数？
- 一对一：每家门店只有一个订单
- 一对多：每个订单在多家门店处理
- 多对一：多个订单在一家门店处理 [correct]
- 多对多：订单可以同时在多家门店处理
> 每个订单只在一个门店地点处理，但门店全天会处理许多订单。从 Order 出发，这是多对一关系。
```

接下来通过 Supplier 和 Shipment 补齐供应链。
