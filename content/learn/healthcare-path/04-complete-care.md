---
title: "完整医疗护理模型"
slug: complete-care
description: "添加 Prescription，将诊断连接到治疗，完成医疗本体和护理流程。"
order: 4
embed: official/healthcare-step-3
---

## 治疗链

医疗模型的最后一部分是 **Prescription（处方）**，即针对诊断采取的治疗响应。它使预约 → 诊断 → 治疗构成完整护理流程。

## 处方实体（Prescription）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `rxNumber` | string | ✓ |
| `medication` | string | |
| `dosage` | string | |
| `frequency` | string | |
| `refillsRemaining` | integer | |

标识符 `rxNumber` 是药房常用的处方号。整数属性 `refillsRemaining` 支持续配跟踪与用药依从性监测。

## 新增关系

- **treated_by（治疗方案）**：`Diagnosis` → `Prescription`（一对多）
  一项诊断可能对应多张处方，例如同一种病情需要多种药物。

- **prescribes（开具处方）**：`Provider` → `Prescription`（一对多）
  医护人员为患者开具处方。

> **护理链：**完整路径为 `Patient → Diagnosis → Prescription`。Provider 连接到每个阶段：接诊、诊断和开方，反映真实临床工作流。

## 完整图谱

<ontology-embed id="official/healthcare-step-3" diff="official/healthcare-step-2" height="500px"></ontology-embed>

*完整医疗本体包含 5 个实体、6 条关系。护理链从 Patient 经 Diagnosis 到达 Prescription。*

## 完整模型支持的能力

| 问题 | 图谱路径 |
|---|---|
| 哪些患者需要续配处方？ | Patient → Diagnosis → Prescription（refillsRemaining=0） |
| 哪些医护人员开具的药物最多？ | Provider → Prescription（计数） |
| 哪些重症诊断尚无治疗方案？ | Diagnosis（severity=severe），且不存在 → Prescription |
| 哪些专科医生既做出诊断又开具处方？ | Provider → Diagnosis 且 Provider → Prescription |

## GQL 查询示例

查找诊断为重症且处方续配次数即将用尽的患者：

```gql
MATCH (p:Patient)-[:diagnosed_with]->(d:Diagnosis)-[:treated_by]->(rx:Prescription)
WHERE d.severity = 'severe' AND rx.refillsRemaining <= 1
RETURN p.patientId, d.description, rx.medication, rx.refillsRemaining
```

## 已构建的模型

| 步骤 | 新增实体 | 累计数量 | 关键概念 |
|---|---|---|---|
| 1 | Patient、Provider、Appointment | 3 | 共享实体、预约安排 |
| 2 | Diagnosis | 4 | 标准化编码、双重连接 |
| 3 | Prescription | 5 | 护理链、治疗跟踪 |

## 核心要点

1. **共享实体**（Appointment、Diagnosis）连接多个参与方
2. **标准化编码**（ICD、Rx）支持跨系统互操作
3. **护理链** Patient → Diagnosis → Prescription 描述临床工作流
4. **Provider 连接每个阶段**，反映其在医疗服务中的核心角色
5. **整数属性** refillsRemaining 和 duration 支持业务查询

```quiz
Q: Provider 在完整医疗本体中如何建立连接？
- Provider 只连接 Appointment
- Provider 连接 Appointment、Diagnosis 和 Prescription，反映其参与每个护理阶段的角色 [correct]
- Provider 直接连接 Patient
- Provider 只连接 Prescription
> Provider 是本体中连接最多的实体，负责接诊、诊断和开方。这反映现实工作流中，医护人员参与医疗服务链每个阶段的事实。
```

你已完成医疗系统学习路径！从[本体目录](#/catalogue)加载任意步骤，即可交互式探索。
