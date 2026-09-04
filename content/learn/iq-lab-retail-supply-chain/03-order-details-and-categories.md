---
title: 订单明细与类别
slug: order-details-and-categories
description: 添加 OrderLine 作为 Order 与 Product 的关联实体，并引入 ProductCategory 进行分组。
order: 3
embed: official/iq-lab-retail-step-2
---

## 多对多带来的问题

步骤 1 使用多对多关系直接连接 Order 和 Product，可以回答“订单中有哪些产品？”，但**数量**和**明细金额**该放在哪里？

本例中的直接多对多关系没有承载这些明细属性。若客户 A 购买 3 件产品 X，客户 B 购买 1 件，数量既不属于 Order（订单有多个产品），也不属于 Product（产品出现在多个订单中）。

## 关联实体模式

解决方案是**关联实体**：放在两个实体之间，保存每次关联自身的属性。

**OrderLine（订单明细）**连接 Order 与 Product，并保存：

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `orderLineId` | string | ✓ |
| `quantity` | integer | |
| `lineTotal` | decimal (USD) | |

### 新增关系

- **OrderHasLineItem（订单明细）**：`Order` → `OrderLine`（一对多）
  每个订单包含一条或多条明细。

- **OrderLineReferencesProduct（明细产品）**：`OrderLine` → `Product`（多对一）
  每条明细只引用一个产品。

现在遍历路径为 `Order` → `OrderLine` → `Product`，每条明细承载自己的 quantity 和 lineTotal。

> **设计模式：**当多对多关联需要数量、价格、日期等自身数据时，引入关联实体。这相当于关系数据库中的关联表。

## 通过类别组织产品

产品通常属于冷冻食品、家居或电子产品等**类别**。添加 ProductCategory 后，可以分组并回答“哪个类别的退货最多？”等问题。

**ProductCategory（产品类别）**：

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `categoryId` | string | ✓ |
| `categoryName` | string | |

### 新增关系

- **ProductInCategory（产品类别）**：`Product` → `ProductCategory`（多对一）
  每个产品恰好属于一个类别。

## 步骤 2 图谱

<ontology-embed id="official/iq-lab-retail-step-2" diff="official/iq-lab-retail-step-1" height="400px"></ontology-embed>

*五个实体通过五条关系连接。OrderLine 连接 Order 和 Product 并承载数量数据，ProductCategory 用于产品分组。*

## 本节总结

- **关联实体**解决多对多关联的属性归属问题
- 当关系需要自身数据时，将其建模为实体
- **层级结构** Product → ProductCategory 支持向上汇总查询
- 图谱不断扩展，每个新实体都与已有实体连接

```quiz
Q: 什么时候应使用 OrderLine 这样的关联实体，而不是直接关系？
- 当实体类型超过三个时
- 当两个实体之间的关系需要自身属性时 [correct]
- 当两个实体都具有标识符属性时
- 当两个实体位于不同命名空间时
> 当多对多关联需要保存数量或明细金额等自身数据时，应引入关联实体。本例通过实体承载这些明细，而非只使用直接连线。
```

接下来添加 Region 和 Store，建立地理结构。
