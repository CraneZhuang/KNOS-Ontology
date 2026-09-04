---
title: "医疗服务"
slug: care-delivery
description: "定义 Patient、Provider 和 Appointment，建立医疗预约与服务的核心实体。"
order: 2
embed: official/healthcare-step-1
---

## 医疗服务基础

医疗服务围绕三个概念展开：

- **Patient（患者）**：谁接受医疗服务？
- **Provider（医护人员）**：谁提供医疗服务？
- **Appointment（预约）**：服务在何时、何地发生？

这三个实体描述医疗服务的安排与交付，每项诊断和治疗都从就诊预约开始。

## 定义实体

### 患者（Patient）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `patientId` | string | ✓ |
| `mrn` | string | |
| `dateOfBirth` | date | |
| `bloodType` | string | |
| `allergies` | string | |

`mrn`（病历号）是医院内部标识符。`patientId` 用作本体标识符，mrn 则是映射到 EHR 系统的领域专用属性。

### 医护人员（Provider）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `providerId` | string | ✓ |
| `name` | string | |
| `specialty` | string | |
| `licenseNumber` | string | |
| `department` | string | |

`specialty` 和 `department` 支持按临床专业筛选医护人员，对转诊与分诊查询十分重要。

### 预约（Appointment）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `appointmentId` | string | ✓ |
| `scheduledTime` | datetime | |
| `duration` | integer（分钟） | |
| `type` | string | |
| `status` | string | |

`duration` 使用以分钟为单位的整数，支持排期计算与利用率分析。

## 关系

- **has_appointment（拥有预约）**：`Patient` → `Appointment`（一对多）
  患者可以在不同时间拥有多次预约。

- **sees（接诊）**：`Provider` → `Appointment`（一对多）
  医护人员会处理多次预约。

> **共享实体模式：**Appointment 同时连接 Patient 和 Provider，是两个独立实体发生交互的交汇点。两个参与方共同参与同一事件时，经常使用这种模式。

## 当前图谱

<ontology-embed id="official/healthcare-step-1" height="350px"></ontology-embed>

*Patient 和 Provider 都连接到 Appointment，这里是医疗服务的交汇点。*

## 本节总结

- **共享实体** Appointment 连接两个独立参与方 Patient 和 Provider
- **时长属性**使用带单位的整数，如分钟、小时和天
- **领域专用标识符** MRN 与本体标识符 patientId 可以共存
- Patient–Appointment–Provider 预约三角是医疗模型的基础

```quiz
Q: 为什么 Appointment 同时连接 Patient 和 Provider，而非只连接其中一个？
- 让图谱看起来更完整
- 因为 Appointment 是共享实体，表示两个参与方的交互点 [correct]
- 因为每个实体至少要有两条关系
- 因为 Patient 和 Provider 具有相同属性
> 就诊预约本身就是患者和医护人员共同参与的事件。两条关系完整描述预约安排，并支持从任一视角查询：“患者下次何时就诊？”或“这位医生每天接诊多少患者？”
```

接下来添加 Diagnosis，跟踪病情。
