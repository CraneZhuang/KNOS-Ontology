---
title: "生产跟踪"
slug: production
description: "添加 Work-Order 和 Part，连接设备与制造产出，跟踪正在生产的内容。"
order: 3
embed: official/manufacturing-step-2
---

## 从监测到生产

传感器告诉我们设备运行得*怎样*，但还需要知道设备生产了*什么*。**Work-Order（工单）**和 **Part（零部件）**为工厂模型加入生产跟踪。

添加生产跟踪后，可以回答：
- 本班次哪台设备生产的零部件最多？
- 有多少工单落后于计划？
- CNC-01 当前正在制造哪些零部件？

## 工单实体（Work-Order）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `workOrderId` | string | ✓ |
| `priority` | string | |
| `status` | string | |
| `startDate` | date | |
| `dueDate` | date | |

工单同时具有 startDate 和 dueDate，可计算计划达成情况；结合 priority，还能支持生产规划查询。

## 零部件实体（Part）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `partId` | string | ✓ |
| `name` | string | |
| `material` | string | |
| `weight` | float | |
| `tolerance` | float | |

tolerance 定义允许的制造偏差。公差越严格，所需设备精度越高，这是生产规划的重要约束。

## 新增关系

- **assigned_to（分配到）**：`Work-Order` → `Machine`（多对一）
  工单被分配到指定设备生产。

- **produces（生产）**：`Work-Order` → `Part`（一对多）
  一个工单生产一个或多个零部件。

- **has_part（产出零部件）**：`Machine` → `Part`（一对多）
  从产出视角描述设备生产的零部件。

> **生产链：**`Machine ← Work-Order → Part` 通过排期实体连接设备与产出，类似医疗场景中 Appointment 连接 Patient 和 Provider：中间实体表示事件。

## 持续扩展的图谱

<ontology-embed id="official/manufacturing-step-2" diff="official/manufacturing-step-1" height="400px"></ontology-embed>

*Work-Order 和 Part 加入图谱，为物联网基础补充生产跟踪。差异视图显示新增内容。*

## 本节总结

- **生产链**通过 Work-Order 等排期实体连接设备和产出
- **双日期属性** startDate、dueDate 支持计划达成跟踪
- **公差属性**描述制造精度要求
- 工厂模型同时覆盖传感器监测和工单生产

```quiz
Q: Part 上的 tolerance 属性代表什么？
- 允许出现缺陷的最大零部件数量
- 允许的制造偏差；越严格的公差要求越高精度的设备 [correct]
- 制造零部件允许使用的时间
- 零部件可以承受的温度范围
> 公差定义实际尺寸偏离规格的允许范围。更严格的公差需要更高精度设备和更细致的质量控制，因此是生产规划的重要约束。
```

接下来添加 Quality-Check，完成生产闭环。
