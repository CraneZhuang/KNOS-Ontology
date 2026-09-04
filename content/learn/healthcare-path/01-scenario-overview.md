---
title: "场景概览"
slug: scenario-overview
description: "认识医疗系统：通过本体连接患者、医护人员、诊断与治疗的患者护理平台。"
order: 1
---

## 业务场景

你正在为**医疗管理系统**设计数据模型。医院网络需要跟踪：

- 具有病历、血型和过敏信息的**患者**
- 具有执照与科室归属的**医护人员**，如医生和专科医师
- 安排患者与指定医护人员就诊的**预约**
- 以 ICD 编码和严重程度记录病情的**诊断**
- 跟踪药品、剂量和续配次数的**处方**

数据分散在电子健康记录（EHR）、预约系统、药房数据库和计费平台中。

## 为什么需要本体？

临床问题**“哪些被心脏科医护人员诊断为重症的患者，仍持有剩余续配次数为零的处方？”**，需要跨患者记录、诊断历史、医生专科和药房数据查询。

在本体中，对应路径为 `Patient → Diagnosis (severity=severe) ← Provider (specialty=Cardiology)`，以及 `Diagnosis → Prescription (refillsRemaining=0)`。

## 我们将构建什么

| 步骤 | 实体 | 学习内容 |
|---|---|---|
| 1 | Patient、Provider、Appointment | 临床核心实体、预约关系 |
| 2 | + Diagnosis | 病情、多来源关系 |
| 3 | + Prescription | 治疗链、完整护理流程 |

完成后，你将获得包含 5 个实体、6 条关系的本体，覆盖从预约到治疗的完整患者护理过程。

## 关键概念

- **临床工作流**：预约、诊断与治疗
- **共享关系**：Patient 和 Provider 都连接到 Appointment
- **护理链**：Patient → Diagnosis → Prescription
- **标准化标识符**：MRN（病历号）、ICD 编码和 Rx 处方号

先从医疗服务的基础模型开始。
