---
title: 果园基础
slug: orchard-foundation
description: 定义 Grower、Farm、Plot 和 FruitVariety，描述 Zava 多产地采购模式的四个核心实体。
order: 2
embed: official/zava-grove-to-shelf-step-1
---

## Zava 数据的起点

Zava 从合作生产商网络采购优质水果。在讨论质量、运输和零售订单之前，先要建立描述**谁在何处种什么**的词汇。

由四个实体表达：

- **Grower（种植者）**——合作企业，例如 *Finca La Marina S.L.*。
- **Farm（农场）**——种植者拥有或运营的地理场所。
- **Plot（地块）**——农场内种植某个品种的管理单元。
- **FruitVariety（水果品种）**——商业品种，例如 *Nadorcott* 柑橘、*Sekoya Pop* 蓝莓。

## 实体

### Grower（种植者）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `growerId` | string | ✓ |
| `name` | string | |
| `country` | string | |
| `partnerSince` | date | |
| `isMasterGrower` | boolean | |

`isMasterGrower` 标记 Zava 的长期战略合作伙伴。

### Farm（农场）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `farmId` | string | ✓ |
| `name` | string | |
| `country` | string | |
| `region` | string | |
| `hectares` | decimal (ha) | |

### Plot（地块）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `plotId` | string | ✓ |
| `hectares` | decimal (ha) | |
| `plantingYear` | integer | |

### FruitVariety（水果品种）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `varietyId` | string | ✓ |
| `commercialName` | string | |
| `category` | string | |
| `shelfLifeDays` | integer（天） | |

## 关系

| 起点 | 关系动词 | 终点 | 基数 |
|---|---|---|---|
| Grower | owns | Farm | 一对多 |
| Farm | contains | Plot | 一对多 |
| Plot | grows | FruitVariety | 多对一 |

Grower → Farm → Plot → FruitVariety 路径提供**端到端追溯**的基础：从货架上的水果追溯到具体产地地块。

## 当前图谱

<ontology-embed id="official/zava-grove-to-shelf-step-1" height="380px"></ontology-embed>

*仅四个实体、三条关系，就能表达“Zava 在西班牙采购的 Nadorcott 柑橘对应多少公顷种植面积？”等问题。*

```quiz
Q: 为什么 Zava 将 Plot 建模为独立实体，而不是 Farm 的一个属性？
- 为了让图看起来更密集
- 一个农场可有多个种植不同品种的地块，追溯需要地块级标识 [correct]
- 因为地块与农场的所有者必然不同
- 因为 RDF 强制要求这样做
> 同一农场通常同时种植多个品种。Zava 需要把每个采收批次追溯到具体地块，而不只是农场，因此地块应是独立实体。
```

接下来添加**采收事件**与**四阶段质量检查**。
