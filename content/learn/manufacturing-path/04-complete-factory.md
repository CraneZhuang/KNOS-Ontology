---
title: "完整工厂模型"
slug: complete-factory
description: "添加 Quality-Check，形成从生产到检验的闭环，完成制造本体。"
order: 4
embed: official/manufacturing-step-3
---

## 形成质量闭环

制造并不止于生产完成，还必须检验。**Quality-Check（质量检验）**通过验证零部件是否符合规格，补齐生产流程。

## 质量检验实体（Quality-Check）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `checkId` | string | ✓ |
| `inspector` | string | |
| `checkDate` | date | |
| `passed` | boolean | |
| `defectCode` | string | |

passed 是关键布尔属性，决定零部件出货还是返工。defectCode 对不合格情况分类，支持根因分析。

## 新增关系

- **inspects（检验）**：`Quality-Check` → `Part`（多对一）
  每次质检针对一个具体零部件。零部件可能接受多次检验，如初检和返工复检。

> **反馈闭环：**质检不合格时，可以反向追踪生产链：`Quality-Check (passed=false) → Part → Work-Order → Machine`。智能工厂由此识别问题设备，持续改善生产质量。

## 完整图谱

<ontology-embed id="official/manufacturing-step-3" diff="official/manufacturing-step-2" height="500px"></ontology-embed>

*完整智能制造本体包含 5 个实体、5 条关系。Quality-Check 建立从检验返回生产的反馈闭环。*

## 完整模型支持的能力

| 问题 | 图谱路径 |
|---|---|
| 哪些设备生产的零部件检验不合格？ | Machine → Part ← Quality-Check（passed=false） |
| 生产不合格零部件时，哪些传感器异常？ | Sensor → Machine → Part ← Quality-Check（passed=false） |
| 不同工单优先级对应的缺陷率是多少？ | Work-Order（priority）→ Part ← Quality-Check |
| 哪些零部件需要复检？ | Part ← Quality-Check（passed=false，count > 1） |

## GQL 查询示例

将传感器异常与质量不合格关联分析：

```gql
MATCH (s:Sensor)-[:monitors]->(m:Machine)-[:has_part]->(p:Part)<-[:inspects]-(qc:QualityCheck)
WHERE s.lastReading > s.threshold AND qc.passed = false
RETURN m.name, s.type, s.lastReading, p.name, qc.defectCode
```

## 已构建的模型

| 步骤 | 新增实体 | 累计数量 | 关键概念 |
|---|---|---|---|
| 1 | Machine、Sensor | 2 | 物联网层级、遥测 |
| 2 | Work-Order、Part | 4 | 生产链、公差 |
| 3 | Quality-Check | 5 | 反馈闭环、检验 |

## 核心要点

1. **物联网层级**将传感器组织在设备之下，支持遥测汇总
2. **生产链**通过排期实体连接设备与产出
3. **质量反馈闭环**支持跨生产链根因分析
4. **阈值告警**支持预测性维护
5. **布尔属性** passed 在工作流中形成清晰决策点

```quiz
Q: Quality-Check 如何在制造本体中形成反馈闭环？
- 它直接连接 Machine
- 不合格检验经由 Part → Work-Order → Machine 回溯，识别缺陷来源 [correct]
- 它循环回到 Sensor 实体
- 质量检验不会形成反馈闭环
> 质检失败后，Quality-Check → Part → Work-Order → Machine 将缺陷追溯到源头。识别哪些设备、工单或条件产生不合格零部件，是智能制造持续改进的基础。
```

你已完成智能制造学习路径！从[本体目录](#/catalogue)加载任意步骤，即可交互式探索。
