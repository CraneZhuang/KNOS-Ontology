---
title: 完整模型
slug: complete-model
description: 添加 SustainabilityProgram，完成含 12 个实体、13 条关系的从果园到货架演示模型。
order: 6
embed: official/zava-grove-to-shelf-step-5
---

## 最后一个实体：可持续发展

Zava 的种植者发展计划名为 **Dreams**，合作农场可自愿参加。计划资助节水、公平薪酬和生物多样性项目。相关数据原先位于营销系统，与供应链分离。

添加一个实体和一条关系，将它纳入模型：

### SustainabilityProgram（可持续发展计划）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `programId` | string | ✓ |
| `name` | string | |
| `focusArea` | string | |
| `startYear` | integer | |

### 新增关系

| 起点 | 关系动词 | 终点 | 基数 |
|---|---|---|---|
| Farm | participatesIn | SustainabilityProgram | 多对多 |

这是多对多关系：一个农场可参加多个计划（如 Dreams Water 和 Dreams Biodiversity），一个计划也可覆盖多个农场。

## 完整图谱

<ontology-embed id="official/zava-grove-to-shelf-step-5" diff="official/zava-grove-to-shelf-step-4" height="520px"></ontology-embed>

*12 个实体、13 条关系。Zava 关注的各业务领域均已作为独立概念，通过具名关系连接。*

## 完整模型支持的演示问题

以下五类跨系统问题可用同一本体表达；实际回答仍依赖数据与查询集成：

| 问题 | 路径 |
|---|---|
| *“按零售连锁和原产国统计，上季度柑橘收入是多少？”* | `Order forVariety FruitVariety[category=citrus]`，按 Store.retailerName 和 HarvestLot → Plot → Farm.country 分组 |
| *“过去 30 天哪些种植者的蓝莓未通过质量检查？”* | `QualityCheck[passed=false] → HarvestLot[ofVariety.category=berry] → Plot → Farm ← owns ← Grower` |
| *“哪些在途运输任务的温度超过所载品种的安全阈值？”* | `Shipment monitoredBy ColdChainSensor[temperatureC > carries.harvestLot.ofVariety.maxStorageTempC]` |
| *“SH-2026-04812 超限后，哪些订单面临风险？涉及多少收入？”* | `Shipment[id=SH-2026-04812] → RetailDC supplies Store places Order[forVariety = breached variety, status=open]`，汇总 kilograms × unitPriceEur |
| *“本季浆果数量中，有多少比例来自 Dreams 计划农场？”* | `HarvestLot[ofVariety.category=berry, harvestDate∈season]`，按 fromPlot → Farm participatesIn SustainabilityProgram[name~"Dreams"] 是否成立分组 |

## 已构建的模型

| 步骤 | 新增实体 | 累计数量 | 关键概念 |
|---|---|---|---|
| 1 | Grower、Farm、Plot、FruitVariety | 4 | 多产地采购、追溯锚点 |
| 2 | HarvestLot、QualityCheck | 6 | 来源事件、四阶段质检 |
| 3 | Shipment、ColdChainSensor | 8 | 枢纽实体、时序绑定 |
| 4 | RetailDC、Store、Order | 11 | 连接收入形成闭环 |
| 5 | SustainabilityProgram | 12 | 多对多 CSR 关联 |

## 核心要点

1. **一套词汇覆盖五个系统。**农业 ERP、包装质检应用、物联网 Eventhouse、零售 EDI 和 CSR 记录均可绑定到同一个 12 实体模型。
2. **枢纽实体很重要。**HarvestLot 是来源枢纽，Shipment 是 Lakehouse 与 Eventhouse 之间的枢纽，FruitVariety 是供需枢纽。
3. **时序遥测是正式概念。**ColdChainSensor 与其他实体一样，提问者无需关心底层选择了 Eventhouse 存储。
4. **可持续发展不再是旁支表格。**SustainabilityProgram 让 CSR 问题与收入问题共享同一张图。
5. **本体成为统一约定。**GQL 查询、Fabric 数据智能体提示词和 Activator 规则可引用同样的实体名和关系名。

```quiz
Q: “本季浆果数量中，有多少比例来自 Dreams 计划农场？”需要哪条路径？
- Order → Store → RetailDC → Farm
- HarvestLot → Plot → Farm → SustainabilityProgram [correct]
- ColdChainSensor → Shipment → Farm → SustainabilityProgram
- FruitVariety → SustainabilityProgram
> 数量记录在 HarvestLot 上。沿 HarvestLot → fromPlot → Plot →（所属）Farm → participatesIn → SustainabilityProgram，按计划名称筛选，即可判断批次是否来自 Dreams 计划农场。
```

你已完成 Zava 从果园到货架实验！在[第五步本体](#/catalogue/official/zava-grove-to-shelf-step-5)中继续探索、扩展或导出。
