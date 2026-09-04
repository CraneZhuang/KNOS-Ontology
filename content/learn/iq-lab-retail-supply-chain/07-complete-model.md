---
title: 完整模型
slug: complete-model
description: 添加 Promotion 和 Return，完成包含 15 个实体的零售供应链本体，并探索完整图谱。
order: 7
embed: official/iq-lab-retail-step-6
---

## 最后两个实体

最后两个实体类型使零售生命周期形成闭环：

- **Promotion（促销）**：促进销售的营销活动
- **Return（退货）**：退回的商品，同时连接订单和产品

## 促销（Promotion）

针对特定产品的营销活动：

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `promotionId` | string | ✓ |
| `promotionName` | string | |
| `isActivePromotion` | boolean | |

isActivePromotion 支持筛选当前活动。“哪些正在进行的促销关联到退货率较高的产品？”对应路径为 Promotion → Product ← Return。

## 退货（Return）

退回的商品关联到原订单和产品：

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `returnId` | string | ✓ |
| `returnDate` | date | |
| `reason` | string | |

## 新增关系

最后三条关系：

- **PromotionForProduct（促销产品）**：`Promotion` → `Product`（多对一）
  表示促销针对哪个产品。

- **ReturnForOrder（退货订单）**：`Return` → `Order`（多对一）
  表示退货关联哪个订单。

- **ReturnOfProduct（退货产品）**：`Return` → `Product`（多对一）
  表示退回了哪个产品。

## 完整图谱

<ontology-embed id="official/iq-lab-retail-step-6" diff="official/iq-lab-retail-step-5" height="500px"></ontology-embed>

*完整零售供应链本体包含 15 个实体类型、18 条关系。每个实体至少连接一个其他实体，形成可遍历的丰富图谱。*

## 完整模型支持的能力

完整本体可以自然地回答以下问题：

| 问题 | 图谱路径 |
|---|---|
| 哪些促销带动了退货？ | Promotion → Product ← Return |
| 退货产品的库存是多少？ | Return → Product ← Inventory → Warehouse |
| 哪些承运商服务于高需求区域？ | DemandSignal → Region ← Store；Shipment → Carrier |
| 哪些客户购买了促销产品？ | Customer ← Order → OrderLine → Product ← Promotion |
| 库存不足产品的预测需求是多少？ | Inventory → Product ← Forecast |

这些问题通常需要复杂的多表 SQL 关联。在本体中，它们可以表达为图谱遍历；Fabric IQ 的自然语言数据智能体可依据本体结构查询回答。

## GQL 查询示例

第一个问题“哪些促销带动了退货？”可以写成如下 GQL：

```gql
MATCH (r:Return)-[:ReturnOfProduct]->(p:Product)<-[:PromotionForProduct]-(promo:Promotion)
WHERE promo.isActivePromotion = true
RETURN promo.promotionName, p.name, r.reason
```

GQL 模式直接对应你设计的本体关系，模型和查询之间无需转换成另一套结构。

## 已构建的模型

我们通过六个步骤逐渐构建了完整本体：

| 步骤 | 新增实体 | 累计数量 | 关键概念 |
|---|---|---|---|
| 1 | Customer、Order、Product | 3 | 实体类型、标识符、基数 |
| 2 | OrderLine、ProductCategory | 5 | 关联实体、层级结构 |
| 3 | Region、Store | 7 | 地理结构、布尔属性 |
| 4 | Shipment、Carrier、Warehouse | 10 | 枢纽实体、跨领域连接 |
| 5 | Inventory、Forecast、DemandSignal | 13 | 跨来源统一、规划数据 |
| 6 | Promotion、Return | 15 | 形成闭环、GQL 查询 |

## 核心要点

1. **从小模型开始，逐步扩展**：三个实体就能创造价值
2. **关联实体**解决多对多关联的属性问题
3. Shipment 等**枢纽实体**连接不同领域
4. **跨数据源统一**是核心价值：一个本体，多个数据引擎
5. **图谱遍历**用直观路径代替复杂 SQL 关联
6. **本体就是接口**：GQL 查询和数据智能体问题都遵循同一结构

```quiz
Q: 在完整零售本体中，“哪些促销带动了退货？”应对应哪条图谱路径？
- Customer → Order → Product → Promotion
- Promotion → Product ← Return [correct]
- Return → Order → Customer → Promotion
- Promotion → Return → Product
> Promotion → Product ← Return 沿 PromotionForProduct 和 ReturnOfProduct 两条关系，通过共享的 Product 实体连接促销与退货。
```

你已完成 IQ 零售供应链实验。可从[本体目录](#/catalogue)加载任意步骤，在探索平台中交互式查看。
