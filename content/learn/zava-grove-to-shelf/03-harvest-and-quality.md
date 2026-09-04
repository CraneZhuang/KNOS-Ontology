---
title: 采收与质量
slug: harvest-and-quality
description: 添加 HarvestLot 与 QualityCheck，记录可追溯的采收事件及 Zava 四阶段质检制度。
order: 3
embed: official/zava-grove-to-shelf-step-2
---

## 每箱水果都有批次

地块采收得到的水果形成一个 **HarvestLot（采收批次）**，它是贯穿后续供应链的追溯单元。温度超限、零售退货、客户索赔等事件最终都会关联到采收批次。

Zava 实施**四阶段质量控制**：同一批次分别在田间、包装中心、目的地配送中心和门店检查。每次检查都是独立的 `QualityCheck` 事件，并记录阶段编号。

## 实体

### HarvestLot（采收批次）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `lotId` | string | ✓ |
| `harvestDate` | date | |
| `kilograms` | decimal (kg) | |
| `qcGrade` | string | |

### QualityCheck（质量检查）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `checkId` | string | ✓ |
| `stage` | integer (1–4) | |
| `passed` | boolean | |
| `defectRate` | decimal (%) | |
| `checkedAt` | datetime | |

`stage` 字段把四阶段制度显式纳入语义层。“哪些种植者经常未通过第三阶段检查？”可直接转化为属性筛选。

## 新增关系

| 起点 | 关系动词 | 终点 | 基数 |
|---|---|---|---|
| HarvestLot | fromPlot | Plot | 多对一 |
| HarvestLot | ofVariety | FruitVariety | 多对一 |
| QualityCheck | checks | HarvestLot | 多对一 |

已有 fromPlot → grows → FruitVariety 路径时，`ofVariety` 看似冗余，但它让运输品种构成查询少走一跳；更重要的是，它保存**采收时的品种**，避免换种后地块当前品种与历史采收品种不一致。

## 当前图谱

<ontology-embed id="official/zava-grove-to-shelf-step-2" diff="official/zava-grove-to-shelf-step-1" height="420px"></ontology-embed>

*六个实体。注意两个新节点：HarvestLot 是追溯锚点，QualityCheck 从侧面与它连接。*

## 新增可表达的业务问题

- *“过去 30 天哪些种植者的蓝莓未通过质检？”*
  → 沿 `QualityCheck[passed=false] → HarvestLot → Plot → Farm → Grower`，按 `ofVariety.category = "berry"` 筛选。
- *“按阶段和原产国统计，质检通过率是多少？”*
  → 按 `QualityCheck.stage` 和 `HarvestLot → Plot → Farm.country` 分组。

```quiz
Q: 为什么把 QualityCheck 建模为独立实体，而不是 HarvestLot 上的四个布尔字段（如 qc1Passed、qc2Passed）？
- 因为 RDF 不支持布尔值
- 因为每次检查需要记录自己的 inspector、defectRate、checkedAt，并能按 stage 统计和筛选 [correct]
- 为了提高图渲染性能
- 因为 Fabric IQ 不支持布尔字段
> 只用布尔值会丢失检查人员、时间戳和缺陷率。将 QualityCheck 建模为事件实体后，便可汇总、筛选和关联检查记录，回答“哪些种植者最常在第三阶段不合格？”等问题。
```

接下来连接采收批次与冷链业务。
