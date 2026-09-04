---
title: "交易平台核心模型"
slug: core-marketplace
description: "定义 Buyer、Product 和 Order，构建电商平台的基础实体。"
order: 2
embed: official/ecommerce-step-1
---

## 购买流程

每个交易平台都围绕三个概念运转：

- **Buyer（买家）**：谁在购买？
- **Product（产品）**：销售什么？
- **Order（订单）**：完成了什么交易？

这三个实体描述了基本购买流程，后续添加的内容都在此基础上扩展。

## 定义实体

### 买家（Buyer）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `buyerId` | string | ✓ |
| `email` | string | |
| `memberSince` | date | |
| `loyaltyTier` | string | |
| `totalSpent` | decimal (USD) | |

与实体零售顾客不同，电商买家始终以 `email` 作为主要联系方式。`totalSpent` 属性支持按客户终身价值进行分群。

### 产品（Product）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `sku` | string | ✓ |
| `name` | string | |
| `category` | string | |
| `price` | decimal (USD) | |
| `stockQty` | integer | |

这里使用 `sku`（库存单位）作为标识符，这是电商中标准的产品标识方式。`stockQty` 属性跟踪实时库存。

### 订单（Order）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `orderId` | string | ✓ |
| `orderDate` | datetime | |
| `status` | string | |
| `total` | decimal (USD) | |
| `shippingMethod` | string | |

## 关系

- **places（下单）**：`Buyer` → `Order`（一对多）
  买家可以在不同时间提交多个订单。

- **includes（包含）**：`Order` → `Product`（多对多）
  订单可以包含多个产品，每个产品也会出现在许多订单中。

## 当前图谱

<ontology-embed id="official/ecommerce-step-1" height="350px"></ontology-embed>

*Buyer、Product 和 Order 通过购买流程的关系连接起来。*

## 本节总结

- **SKU** 是电商产品的标准标识符
- 整数属性 `stockQty` 支持库存查询
- 基本购买流程 Buyer → Order → Product 是交易平台的骨架

```quiz
Q: 为什么 Product 使用 sku 而不是 productId 作为标识符？
- SKU 输入起来更短
- SKU（库存单位）是电商和零售系统中标准的产品标识符 [correct]
- productId 会造成命名冲突
- SKU 始终是数字
> SKU 是 Stock Keeping Unit（库存单位）的缩写，是库存管理、仓储和电商系统中用于唯一标识商品的行业标准。
```

接下来添加 Shopping-Cart，描述购买前的体验。
