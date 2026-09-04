---
title: 地理信息
slug: geography
description: 使用 Region 和 Store 描述订单履约区域和门店位置，加入地理结构。
order: 4
embed: official/iq-lab-retail-step-3
---

## 添加地点信息

交易发生在具体**地点**。加入地理实体后，可以回答：

- 西南地区的销售总额是多少？
- 东北地区哪些门店的订单量正在下降？
- 西南地区是否需要冷链物流？

## 区域（Region）

Region 表示包含门店和仓库的较大地理区域：

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `regionId` | string | ✓ |
| `regionName` | string | |
| `timezone` | string | |
| `coldChainRequired` | boolean | |

`coldChainRequired` 是**布尔属性**的好例子，它把“该区域是否需要冷藏运输”这个是非业务规则变成可查询属性，而不是埋在文档里。

## 门店（Store）

Store 是客户下单的实体零售地点：

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `storeId` | string | ✓ |
| `storeName` | string | |
| `address` | string | |

## 新增关系

- **OrderFulfilledToRegion（履约区域）**：`Order` → `Region`（多对一）
  每个订单在一个区域履约，支持区域销售分析。

- **StoreInRegion（门店区域）**：`Store` → `Region`（多对一）
  每家门店属于一个区域。结合订单关系后，会形成两条通往 Region 的路径，支持不同分析视角。

## 地理层级

**Store** → **Region** 构成**地理层级**。更细致的本体还可以添加 City、State 和 Country。关键原则是：

> 每个层级都通过多对一关系连接到上一级，从而支持自动向上汇总：门店级数据汇总为区域总量。

## 步骤 3 图谱

<ontology-embed id="official/iq-lab-retail-step-3" diff="official/iq-lab-retail-step-2" height="400px"></ontology-embed>

*七个实体类型。Region 和 Store 加入地理信息。Order 现在同时连接 Customer（谁购买）和 Region（在哪里履约）。*

## 本节总结

- **地理实体**支持基于地点的分析
- **布尔属性**如 coldChainRequired 可以描述业务规则
- **层级结构**支持从细粒度数据向上汇总
- 一个实体可以连接多个不同实体：Order 连接 Customer、Product（经 OrderLine）和 Region

```quiz
Q: 为什么将 Region 建成独立实体，而不是只在 Store 上增加 region 文本属性？
- 节省存储空间
- 支持向上汇总查询，并使地理数据具有单一事实来源 [correct]
- 让本体图更美观
- Fabric IQ 强制要求如此
> 独立 Region 实体建立 Store → Region 层级，让 IQ 能按区域汇总数据，如“东北地区销售总额”，并确保区域元数据只定义一次，不在每家门店重复存储。
```

接下来描述订单如何实际送达。
