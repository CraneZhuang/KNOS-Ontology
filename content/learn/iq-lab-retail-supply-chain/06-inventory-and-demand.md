---
title: 库存与需求
slug: inventory-and-demand
description: 添加 Inventory、Forecast 和 DemandSignal，跟踪仓库库存并预测各地区未来需求。
order: 6
embed: official/iq-lab-retail-step-5
---

## 从交易记录到业务规划

步骤 1–4 描述订单、发货、配送等**已经发生**的事情。现在加入库存、需求信号等**正在发生**的数据，以及预测等**将会发生**的数据。本体的优势正是在一个模型中统一历史、实时与预测数据。

## 库存（Inventory）

各仓库的库存水平：

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `inventoryId` | string | ✓ |
| `stockLevel` | integer | |
| `reorderPoint` | integer | |

`reorderPoint` 表示触发补货的库存阈值，是供应链管理的关键指标。

## 预测（Forecast）

产品的预测需求：

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `forecastId` | string | ✓ |
| `forecastDate` | date | |
| `predictedDemand` | integer | |

## 需求信号（DemandSignal）

客户需求的实时指标，例如搜索趋势、社交媒体提及和天气模式：

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `signalId` | string | ✓ |
| `signalDate` | datetime | |
| `signalStrength` | decimal | |

## 新增关系

五条新关系将库存与需求连接到已有实体：

- **InventoryForProduct（库存产品）**：`Inventory` → `Product`（多对一）
  表示特定产品的库存水平。

- **InventoryAtWarehouse（库存仓库）**：`Inventory` → `Warehouse`（多对一）
  表示库存所在仓库。结合 InventoryForProduct，即可回答“仓库 Y 有多少产品 X？”

- **ForecastForProduct（预测产品）**：`Forecast` → `Product`（多对一）
  表示特定产品的预测需求。

- **DemandSignalForProduct（需求产品）**：`DemandSignal` → `Product`（多对一）
  表示产品的实时需求指标。

- **DemandSignalInRegion（需求区域）**：`DemandSignal` → `Region`（多对一）
  表示需求信号产生的区域。

## 跨数据源统一

实际部署 Fabric IQ 时，这些实体可能来自完全不同的数据源：

| 实体 | 典型数据源 |
|---|---|
| Inventory | Eventhouse（实时更新） |
| Forecast | Lakehouse（批量机器学习预测） |
| DemandSignal | Eventhouse（流式数据） |
| Product | Lakehouse（目录）与 Eventhouse（折扣） |

本体在一张连通图谱中**统一所有来源**。“西南地区需求强劲的产品，在附近仓库还有多少库存？”这类查询就能无缝跨越多个来源。

## 步骤 5 图谱

<ontology-embed id="official/iq-lab-retail-step-5" diff="official/iq-lab-retail-step-4" height="450px"></ontology-embed>

*十三个实体类型。Inventory 连接 Product 与 Warehouse，DemandSignal 连接 Product 与 Region。图谱覆盖交易、物流和规划领域。*

## 本节总结

- 本体可以统一**历史、实时与预测**数据
- **Inventory** 是典型的交叉实体，位于 Product 和 Warehouse 之间
- **DemandSignal** 同时连接 Product 和 Region，支持跨维度分析
- 核心价值是跨数据源统一：一个模型，多个数据引擎

```quiz
Q: 为什么 Inventory 被称为交叉实体？
- 它存储的数据比其他实体更多
- 它位于 Product 和 Warehouse 之间，表示特定地点某种产品的库存 [correct]
- 它拥有本体中最多的关系
- 它是唯一来自 Eventhouse 的实体
> 每条 Inventory 记录回答“仓库 Y 有多少产品 X？”，因此它是 Product 和 Warehouse 的交叉点，也称关联实体。
```

最后一步添加 Promotion 和 Return，补齐全貌。
