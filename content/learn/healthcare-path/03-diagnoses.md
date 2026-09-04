---
title: "诊断"
slug: diagnoses
description: "添加 Diagnosis，将患者连接到临床诊断结果，将医护人员连接到其评估。"
order: 3
embed: official/healthcare-step-2
---

## 记录临床发现

就诊会产生临床发现：患者有什么病情？**Diagnosis（诊断）**实体使用标准化编码记录这些发现。

添加 Diagnosis 后，可以回答：
- 哪些患者被诊断为糖尿病？
- 上个季度哪位医护人员识别的重症最多？
- 各科室最常见的诊断是什么？

## 诊断实体（Diagnosis）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `diagnosisId` | string | ✓ |
| `icdCode` | string | |
| `description` | string | |
| `severity` | string | |
| `diagnosedDate` | date | |

`icdCode` 存储 ICD（国际疾病分类）标准编码，这是全球通用的编码体系，使本体能够与保险、计费和科研系统互操作。

## 新增关系

- **diagnosed_with（诊断为）**：`Patient` → `Diagnosis`（一对多）
  患者在整个病史中可以有多项诊断。

- **diagnoses（做出诊断）**：`Provider` → `Diagnosis`（一对多）
  医护人员根据临床评估记录诊断。

> **双重关联：**Diagnosis 同时连接 Patient（谁患病）和 Provider（谁识别病情），既支持以患者为中心查看全部病情，也支持以医护人员为中心查看其识别的所有病情。

## 持续扩展的图谱

<ontology-embed id="official/healthcare-step-2" diff="official/healthcare-step-1" height="400px"></ontology-embed>

*Diagnosis 加入图谱，并同时连接 Patient 和 Provider。高亮显示新增内容。*

## 本节总结

- **标准化编码** ICD 让本体能够与外部系统互操作
- **双向关联实体** Patient → Diagnosis ← Provider 描述两种视角
- **严重程度属性**支持风险分层和临床优先级判断
- 图谱现在既支持通过 Appointment 查询预约，也支持通过 Diagnosis 查询临床情况

```quiz
Q: 为什么 ICD 编码属性对 Diagnosis 很重要？
- 让诊断标识符更短
- 提供全球标准化编码，支持与保险、计费和科研系统互操作 [correct]
- 所有本体格式都要求 ICD 编码
- 防止重复记录诊断
> ICD（国际疾病分类）编码是医疗病情分类的通用标准。在本体中包含它们后，同一个编码在 EHR、保险理赔、临床试验和公共卫生系统中代表同一病情，从而实现互操作。
```

接下来添加 Prescription，补齐治疗链。
