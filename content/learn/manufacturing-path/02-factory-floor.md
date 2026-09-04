---
title: "生产车间"
slug: factory-floor
description: "定义 Machine 和 Sensor，建立实时监测工厂设备的物联网基础。"
order: 2
embed: official/manufacturing-step-1
---

## 物联网基础

每座智能工厂都从两个概念开始：

- **Machine（设备）**：车间里有什么设备？
- **Sensor（传感器）**：它正在产生什么数据？

设备与传感器构成遥测骨架。在跟踪生产或质量之前，需要知道哪些设备正在运行、报告了什么数据。

## 定义实体

### 设备（Machine）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `machineId` | string | ✓ |
| `name` | string | |
| `type` | string | |
| `status` | string | |
| `installDate` | date | |

status 跟踪 running、idle、maintenance、offline 等运行状态，支持实时看板和维护排期。

### 传感器（Sensor）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `sensorId` | string | ✓ |
| `type` | string | |
| `unit` | string | |
| `lastReading` | float | |
| `threshold` | float | |

threshold 定义告警阈值。当 lastReading 超过阈值时，系统触发告警。这是预测性维护的基础模式。

## 关系

- **monitors（监测）**：`Sensor` → `Machine`（多对一）
  多个传感器可以监测同一设备，例如一个测温，另一个测振动。

> **归属层级：**物联网本体中，传感器属于设备。方向很重要：传感器监测设备，而不是反过来。这种父子层级用于组织遥测数据。

## 当前图谱

<ontology-embed id="official/manufacturing-step-1" height="300px"></ontology-embed>

*简单但有意义的起点：由传感器监测的设备。*

## 本节总结

- **物联网层级**使用 Sensor → Machine 父子关系
- **状态属性**支持实时运行跟踪
- **阈值属性**支持预测性维护告警
- 仅两个实体也能构成有用的遥测骨架

```quiz
Q: 为什么 Sensor 同时具有 lastReading 和 threshold？
- 当一个数值出错时用另一个作为备份
- threshold 定义告警边界，lastReading 超限时可触发告警，支持预测性维护 [correct]
- 所有物联网标准都要求这两个值
- threshold 用于计算传感器精度
> 阈值模式是预测性维护的基础。将当前读数与已知安全边界比较，可以自动发现异常，并在设备故障前提醒操作人员。
```

接下来添加 Work-Order 和 Part，跟踪生产。
