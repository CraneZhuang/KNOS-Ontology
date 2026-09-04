---
title: 冷链物流
slug: cold-chain-logistics
description: 添加 Shipment 与 ColdChainSensor，建模易腐品物流及支持冷链预警的实时温度遥测。
order: 4
embed: official/zava-grove-to-shelf-step-3
---

## 冷链中的关键时刻

采收批次离开包装中心后，保鲜时间便开始倒计时。温度超出该品种的安全范围可能导致整箱水果报损；具体阈值、持续时间和损失取决于品种及真实业务规则。冷链是 Zava 语义模型的重要应用场景。

两个新实体描述这一领域：

- **Shipment（运输批次）**——装载一个或多个 HarvestLot、前往零售配送中心的冷藏集装箱或卡车运输任务。
- **ColdChainSensor（冷链传感器）**——附着于运输任务、持续上报温湿度遥测的传感器。

## 实体

### Shipment（运输批次）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `shipmentId` | string | ✓ |
| `departureDate` | datetime | |
| `etaDate` | datetime | |
| `modality` | string | |
| `containerId` | string | |

### ColdChainSensor（冷链传感器）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `sensorId` | string | ✓ |
| `sensorModel` | string | |
| `temperatureC` | decimal (°C) | |
| `humidityPct` | decimal (%) | |

在此 Fabric IQ 示例中，ColdChainSensor 是**时序实体**：读数绑定到 Eventhouse，而非 Lakehouse 表。本体在概念层隐藏这种差异，提问者无需了解底层引擎即可表达 Sensor → Shipment 的路径。

## 新增关系

| 起点 | 关系动词 | 终点 | 基数 |
|---|---|---|---|
| Shipment | carries | HarvestLot | 一对多 |
| Shipment | monitoredBy | ColdChainSensor | 一对多 |

Shipment 是**枢纽实体**，连接静态 Lakehouse 数据（采收批次来源）与流式 Eventhouse 数据（传感器遥测）。

## 冷链超限查询

Zava 演示中的核心问题：

> *“运输任务 SH-2026-04812 的温度刚超过 9°C。哪些零售订单面临风险？”*

原先需要人工跨五个系统追查；本体把它表达为一条连贯的遍历路径：

```
ColdChainSensor[temperatureC > FruitVariety.maxStorageTempC + 2]
   → Shipment
   → HarvestLot
   →（后续添加）Order → Store → Retailer
```

下一步将连接零售侧。

## 当前图谱

<ontology-embed id="official/zava-grove-to-shelf-step-3" diff="official/zava-grove-to-shelf-step-2" height="450px"></ontology-embed>

*八个实体。右侧分支 Sensor → Shipment 表示实时遥测；左侧 HarvestLot → Plot → Farm → Grower 表示来源追溯。本体将两者统一。*

```quiz
Q: Shipment 被称为“枢纽实体”意味着什么？
- 它是图中最大的实体
- 它通过一个共同概念，连接原本独立的来源追溯（采收批次）和遥测（传感器）领域 [correct]
- 其他所有实体都必须经过它连接
- RDF 合规要求必须有枢纽实体
> 枢纽实体连接原本分散在不同系统中的领域。Shipment 连接 HarvestLot（Lakehouse 来源数据）与 ColdChainSensor（Eventhouse 遥测），一条图路径便可跨越两个领域。
```

下一步连接配送中心、门店与风险订单，完成零售闭环。
