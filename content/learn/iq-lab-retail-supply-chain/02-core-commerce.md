---
title: 核心交易
slug: core-commerce
description: 定义零售本体的三个基础实体 Customer、Order 和 Product，并通过关系连接。
order: 2
embed: official/iq-lab-retail-step-1
---

## 模型基础

每个零售系统都从三个核心概念开始：

- **Customer（客户）**：谁在购买？
- **Order（订单）**：发生了什么交易？
- **Product（产品）**：购买了什么？

这三个实体类型构成本体核心，后续步骤添加的内容都与它们连接。

## 定义实体类型

每个实体类型都需要：

1. **名称**：使用单数且含义清晰，如 Customer，而非 Customers 或 tbl_cust
2. **标识符属性**：每个实例的唯一键
3. **属性**：描述各实例的特征

### 客户（Customer）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `customerId` | string | ✓ |
| `name` | string | |
| `email` | string | |
| `loyaltyTier` | string | |
| `lifetimeValue` | decimal (USD) | |

customerId 唯一标识客户。loyaltyTier、lifetimeValue 等具有业务含义的属性名，可以映射到源数据库中较难理解的列名。

### 订单（Order）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `orderId` | string | ✓ |
| `orderDate` | datetime | |
| `status` | string | |
| `totalAmount` | decimal (USD) | |

### 产品（Product）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `productId` | string | ✓ |
| `name` | string | |
| `unitCost` | decimal (USD) | |
| `discountPercent` | decimal (%) | |

## 通过关系建立连接

只有实体时，模型还是孤立的表。**关系**将它们变为连通图谱：

- **OrderPlacedByCustomer（下单客户）**：`Order` → `Customer`（多对一）
  每个订单只由一位客户下单，但客户可以提交多个订单。

- **OrderContainsProduct（订单包含产品）**：`Order` → `Product`（多对多）
  订单可以包含多个产品，产品也可以出现在多个订单中。

### 基数的重要性

基数告诉系统如何计数与汇总：

| 基数 | 含义 | 示例 |
|---|---|---|
| one-to-one（一对一） | 双方各对应一个对象 | Employee → Badge |
| one-to-many（一对多） | 一个父对象对应多个子对象 | Customer → Orders |
| many-to-one（多对一） | 多个子对象对应一个父对象 | Orders → Customer |
| many-to-many（多对多） | 双方数量都不受单个对象限制 | Orders ↔ Products |

正确的基数可以确保“每位客户下了多少订单？”等查询返回正确计数。

## 当前图谱

只需三个实体、两条关系，就已经能得到连通图谱：

<ontology-embed id="official/iq-lab-retail-step-1" height="350px"></ontology-embed>

*Customer、Order 和 Product 由两条关系连接，是后续模型的基础。*

## 本节总结

- 每个实体类型都需要标识符属性
- 使用具有业务含义的名称，而不是内部列名
- 关系的基数影响数据如何计数
- 仅三个实体也能形成有用的连通图谱

```quiz
Q: 一位 Customer 可以下多个 Order，但每个 Order 只属于一位 Customer。这是什么基数？
- 一对一
- 多对多
- 一对多 [correct]
- 多对一
> 从 Customer 的视角，这是“一位客户拥有多个订单”的一对多关系；从 Order 的视角则是多对一。若定义方向为 Customer → Order，基数就是一对多。
```

接下来为订单添加明细，并将产品组织为类别。
