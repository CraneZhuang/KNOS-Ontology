---
title: "完整供应链"
slug: complete-supply-chain
description: "添加 Supplier 和 Shipment，连接采购、物流与零售，完成 Fourth Coffee 本体。"
order: 4
embed: official/cosmic-coffee-step-3
---

## 补齐全貌

Fourth Coffee 不仅销售咖啡，还从全球供应商采购咖啡豆，在门店接收货物，并跟踪整条供应链。添加 **Supplier（供应商）**和 **Shipment（发货单）**后即可形成完整模型。

## 供应商（Supplier）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `supplierId` | string | ✓ |
| `name` | string | |
| `country` | string | |
| `certification` | enum (Fair Trade, Rainforest Alliance, Organic, Direct Trade, None) | |
| `rating` | decimal | |

`certification` 使用枚举记录可持续认证。`rating` 是 1–5 分的十进制质量评分。

## 发货单（Shipment）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `shipmentId` | string | ✓ |
| `dispatchDate` | date | |
| `arrivalDate` | date | |
| `status` | enum (In Transit, Delivered, Delayed) | |
| `weight` | decimal (kg) | |

Shipment 是一个**枢纽实体**：它通过 Product 将 Supplier 与 Store 连接起来，贯通采购与零售业务。

## 新增关系

四条新增关系补齐了供应链：

- **sourcedFrom（采购自）**：`Product` → `Supplier`（多对一）
  每种产品的咖啡豆来自一个供应商。

- **sentBy（发出方）**：`Shipment` → `Supplier`（多对一）
  每批货物由一个供应商发出。

- **deliveredTo（送达）**：`Shipment` → `Store`（多对一）
  每批货物送达一家门店。

- **carries（承运）**：`Shipment` → `Product`（多对多）
  一批货物可以包含多种产品，同一产品也可以分布在多批货物中。

> **枢纽实体模式：**Shipment 连接 Supplier、Store 和 Product 三个不同实体。枢纽实体能够贯通图谱中原本分离的部分，因此非常有用。

## 完整图谱

<ontology-embed id="official/cosmic-coffee-step-3" diff="official/cosmic-coffee-step-2" height="500px"></ontology-embed>

*完整的 Fourth Coffee 本体包含 6 个实体类型、7 条关系。Shipment 作为枢纽，连接 Supplier、Store 和 Product。*

## 完整模型支持的能力

| 问题 | 图谱路径 |
|---|---|
| 哪些供应商提供有机咖啡豆？ | Product（isOrganic=true）→ Supplier |
| 哪些门店收到了延迟货物？ | Shipment（status=Delayed）→ Store |
| 头部供应商的评分是多少？ | Product → Supplier（按 rating 排序） |
| 哪些认证供应商向最大的门店发货？ | Supplier → Shipment → Store（按 capacity 排序） |

## GQL 查询示例

查找通过公平贸易认证、并向加利福尼亚州门店发货的供应商：

```gql
MATCH (sup:Supplier)<-[:sentBy]-(s:Shipment)-[:deliveredTo]->(st:Store)
WHERE sup.certification = 'Fair Trade' AND st.state = 'CA'
RETURN sup.name, st.name, s.status
```

## 已构建的模型

| 步骤 | 新增实体 | 累计数量 | 关键概念 |
|---|---|---|---|
| 1 | Customer、Order、Product | 3 | 实体类型、标识符、基数 |
| 2 | Store | 4 | 地点建模、多对一 |
| 3 | Supplier、Shipment | 6 | 供应链、枢纽实体 |

## 核心要点

1. **从小模型开始**：三个实体就能创造价值
2. Shipment 等**枢纽实体**可以连接不同业务领域
3. **枚举属性**在模型层面约束数据质量
4. **图谱逐步扩展**：每一步都会增加新的查询能力
5. **GQL 查询**直接对应本体结构，无需在不同模型之间进行转换

```quiz
Q: 为什么 Shipment 被视为这个本体中的枢纽实体？
- 它拥有最多的属性
- 它连接 Supplier、Store 和 Product 三个不同实体 [correct]
- 它是查询频率最高的实体
- 它是最后加入模型的实体
> Shipment 通过 sentBy 连接 Supplier，通过 deliveredTo 连接 Store，通过 carries 连接 Product。一个实体就贯通了采购、物流和零售领域，因此它是枢纽。
```

你已完成 Fourth Coffee 学习路径！从[本体目录](#/catalogue)加载任意步骤，即可交互式探索。
