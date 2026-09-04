---
title: "步骤 1：行业分类"
slug: industry-classification
description: 建立 Sector、Subsector 和 IndustryGroup 经济层级模型，并加入气候与周期性属性。
order: 2
embed: official/fibo-risk-step-1
reviewStatus: under-human-review
---

## 为什么要对行业分类？

银行需要理解其在各经济行业中的风险敞口。如果组合中 40% 的贷款投向建筑公司，住房市场低迷就可能造成严重影响。**NAICS（北美行业分类体系）**提供了 FIBO 所借鉴的标准分类法。

本步骤建立 Sector → Subsector → IndustryGroup 三级层级，并补充风险相关属性。

## 实体类型

### 行业大类（Sector）

最宽泛的分类，例如制造业、金融业和医疗健康。

| 属性 | 类型 | 说明 |
|---|---|---|
| `sectorCode` | string | 标识符，如 31-33 |
| `sectorName` | string | 显示名称 |
| `description` | string | 行业大类的覆盖范围 |

### 行业子类（Subsector）

大类内部的细分，例如制造业中的食品制造业。

| 属性 | 类型 | 说明 |
|---|---|---|
| `subsectorCode` | string | 标识符，如 311 |
| `subsectorName` | string | 显示名称 |

### 行业组（IndustryGroup）

最细粒度的层级，包含组合分析所需的风险属性。

| 属性 | 类型 | 说明 |
|---|---|---|
| `naicsCode` | string | 标识符：正式 NAICS 代码 |
| `name` | string | 行业名称 |
| `cyclicality` | string | 对经济周期的敏感程度，如 high、low、counter-cyclical |
| `climateSensitivity` | string | 对气候事件的风险暴露，如 high、moderate、low |
| `essentialServices` | boolean | 是否提供基本服务，此类行业通常更有韧性 |
| `description` | string | 行业说明 |

## 关系

- **partOfSector（所属大类）**：`Subsector` → `Sector`（`many-to-one`），每个子类恰好属于一个大类。
- **belongsToSubsector（所属子类）**：`IndustryGroup` → `Subsector`（`many-to-one`），每个行业组属于一个子类。

由此形成严格层级：`Sector` ← `Subsector` ← `IndustryGroup`。

## 设计模式：分类层级

这是最常见的本体模式之一：**严格树状层级**，每个子节点恰好只有一个父节点。它支持：

- **向上汇总**：汇总一个 Subsector 下各 IndustryGroup 的贷款，获得子类敞口
- **向下钻取**：从 Sector 下钻到 Subsector，再到具体 IndustryGroup
- **风险属性继承**：如果 Sector 具有周期性，其子节点都处于相应风险背景中

## 步骤 1 图谱

<ontology-embed id="official/fibo-risk-step-1" height="340px"></ontology-embed>

*三个实体构成分类树，是行业集中度分析的基础模式。*

```quiz
Q: 为什么 IndustryGroup 包含 climateSensitivity 属性？
- 跟踪行业碳排放
- 支持按照行业对飓风、野火等气候事件的风险暴露，筛选投资组合 [correct]
- 满足 ESG 报告要求
- 计算贷款保险费
> climateSensitivity 让风险分析人员识别贷款组合中暴露于气候事件的部分。结合下一步的地理数据，即可开展跨领域集中度查询。
```
