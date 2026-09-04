---
title: "购物车"
slug: shopping-carts
description: "添加 Shopping-Cart，描述当前购物会话，并引入一对一关系模式。"
order: 3
embed: official/ecommerce-step-2
---

## 购买之前

并非每次浏览都会转化为购买。**购物车**记录买家结算前考虑购买的商品。它是一种临时、可变的会话实体。

添加购物车后，可以回答：
- 本周有多少购物车被放弃？
- 平均购物车金额与平均订单金额有何差异？
- 哪些产品最常被加入购物车，却没有被购买？

## 购物车实体（Shopping-Cart）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `cartId` | string | ✓ |
| `createdAt` | datetime | |
| `itemCount` | integer | |
| `subtotal` | decimal (USD) | |

`itemCount` 和 `subtotal` 是反规范化的汇总属性。虽然可以根据购物车内容计算，但直接存储能加快查询。

## 新增关系

- **has_cart（拥有购物车）**：`Buyer` → `Shopping-Cart`（一对一）
  每位买家恰好拥有一个当前购物车，每个购物车也只属于一位买家。

- **contains（包含）**：`Shopping-Cart` → `Product`（多对多）
  购物车可以包含多个产品，同一产品也可以出现在多个购物车中。

> **一对一模式：**每位买家只有一个当前购物会话，因此 has_cart 是一对一关系。这与订单的一对多不同：订单会随时间累积，但任一时刻只有一个购物车。

## 持续扩展的图谱

<ontology-embed id="official/ecommerce-step-2" diff="official/ecommerce-step-1" height="400px"></ontology-embed>

*Shopping-Cart 通过两条新关系连接 Buyer 和 Product。差异高亮展示了相对于步骤 1 的变化。*

## 本节总结

- **会话实体**描述临时或进行中的状态，如购物车、草稿和会话
- **一对一关系**约束严格配对，如一位买家对应一个购物车
- **反规范化属性**（itemCount、subtotal）用存储空间换取查询速度
- 购物车分析支持**转化漏斗**分析，如购物车转订单比例

```quiz
Q: 为什么 Buyer 与 Shopping-Cart 之间的 has_cart 关系是一对一而非一对多？
- 因为购物车不需要唯一标识符
- 因为每位买家在任意时刻恰好只有一个当前购物车 [correct]
- 因为一对一更容易实现
- 因为购买后购物车会被删除
> 买家同时只维护一个当前购物会话。订单会在买家的整个生命周期中累积，而购物车表示当前状态：一位买家，一个当前购物车。
```

接下来通过客户评价完成平台模型。
