---
title: 零售履约
slug: retail-fulfillment
description: 添加 RetailDC、Store 和 Order，将 Zava 供应链连接到零售伙伴与收入。
order: 5
embed: official/zava-grove-to-shelf-step-4
---

## 供应链连接销售端

上一步停留在运输途中。这一步明确接收方：哪家零售商、哪个配送中心、哪些门店和订单。

三个新实体补齐 Zava 的商业侧：

- **RetailDC（零售配送中心）**——接收 Zava 发货的零售商配送中心。
- **Store（门店）**——由某个配送中心供货的零售门店。
- **Order（订单）**——门店针对特定水果品种下达的采购订单。

## 实体

### RetailDC（零售配送中心）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `dcId` | string | ✓ |
| `name` | string | |
| `country` | string | |
| `city` | string | |
| `retailerCode` | string | |

### Store（门店）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `storeId` | string | ✓ |
| `name` | string | |
| `retailerName` | string | |
| `country` | string | |
| `city` | string | |

### 订单（Order）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `orderId` | string | ✓ |
| `kilograms` | decimal (kg) | |
| `orderDate` | date | |
| `deliveryDate` | date | |
| `status` | string | |
| `unitPriceEur` | decimal (EUR) | |

## 新增关系

| 起点 | 关系动词 | 终点 | 基数 |
|---|---|---|---|
| Shipment | deliveredTo | RetailDC | 多对一 |
| RetailDC | supplies | Store | 一对多 |
| Store | places | Order | 一对多 |
| Order | forVariety | FruitVariety | 多对一 |

## 冷链超限查询形成闭环

回顾第三步的超限问题。加入零售侧后，完整路径为：

```
ColdChainSensor[breach]
   → Shipment
   → HarvestLot ─ ofVariety → FruitVariety
   → Shipment
   → RetailDC
   → Store
   → Order[forVariety = same variety, status = open]
```

在完成数据接入后，可向 Fabric IQ 数据智能体提出客户影响问题：

> *“运输任务 SH-2026-04812 发生冷链超限，哪些零售订单面临风险？涉及多少收入（kg × unitPriceEur）？”*

## 当前图谱

<ontology-embed id="official/zava-grove-to-shelf-step-4" diff="official/zava-grove-to-shelf-step-3" height="480px"></ontology-embed>

*十一个实体。零售分支 RetailDC → Store → Order 通过 Order forVariety FruitVariety 连接品种枢纽，补齐从果园到货架的路径。*

```quiz
Q: 在超限查询中，已有 Shipment carries HarvestLot ofVariety FruitVariety，为什么还需要 Order forVariety FruitVariety？
- 因为 Fabric IQ 要求冗余
- 因为订单按品种而非具体批次下单，需要将风险批次匹配到同品种的未完成订单 [correct]
- 只是为了可视化效果
- 否则图必然不连通
> 零售商按品种下单，而不是按采收批次下单。要识别某批次超限影响哪些订单，需通过 Order.forVariety 交叉匹配品种。缺少此连接，就难以从风险运输任务定位相应的未完成订单。
```

最后添加一个实体，将 Zava 的 CSR 业务纳入模型。
