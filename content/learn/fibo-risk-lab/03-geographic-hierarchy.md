---
title: "步骤 2：地理层级"
slug: geographic-hierarchy
description: 添加区域、国家和辖区，并加入灾害区域标记，支持地理集中度分析。
order: 3
embed: official/fibo-risk-step-2
reviewStatus: under-human-review
---

## 风险在哪里

行业分类说明组合暴露于*哪些行业*，地理层级说明风险*在哪里*。集中在佛罗里达州的组合与集中在加利福尼亚州的组合面临不同风险：前者是飓风，后者是地震和野火。

本步骤添加三个粒度逐渐细化的地理实体，并补充自然灾害标记。

## 新增实体类型

### 区域（Region）

大洲或宏观经济区域，例如北美、欧洲和亚太地区。

| 属性 | 类型 | 说明 |
|---|---|---|
| `regionCode` | string | 标识符 |
| `regionName` | string | 显示名称 |
| `description` | string | 区域说明 |
| `disasterProfile` | string | 该区域的主要灾害类型 |

### 国家（Country）

具有经济与监管属性的国家。

| 属性 | 类型 | 说明 |
|---|---|---|
| `countryCode` | string | 标识符：ISO 国家代码 |
| `countryName` | string | 显示名称 |
| `economicZone` | string | 经济分类，如 developed、emerging |
| `currency` | string | 国家货币代码 |
| `regulatoryFramework` | string | 主要银行监管机构 |

### 辖区（Jurisdiction）

州、省等国家以下行政辖区，带有表示灾害区域的布尔标记。

| 属性 | 类型 | 说明 |
|---|---|---|
| `code` | string | 标识符，如 FL、CA |
| `name` | string | 显示名称 |
| `hurricaneZone` | boolean | 是否暴露于飓风风险 |
| `floodZone` | boolean | 是否暴露于洪水风险 |
| `earthquakeZone` | boolean | 是否暴露于地震风险 |
| `wildfireZone` | boolean | 是否暴露于野火风险 |
| `coastal` | boolean | 是否为沿海辖区 |
| `latitude` | decimal | 纬度 |
| `longitude` | decimal | 经度 |

## 新增关系

- **inCountry（所在国家）**：`Jurisdiction` → `Country`（`many-to-one`），每个辖区属于一个国家。
- **inRegion（所在区域）**：`Jurisdiction` → `Region`（`many-to-one`），每个辖区映射到一个地理区域。

## 设计模式：布尔风险标记

Jurisdiction 特意使用**布尔标记**，而不是单一 riskType 枚举，因为辖区可能同时处于多个灾害区域。佛罗里达州同时是 hurricaneZone 和 floodZone，加利福尼亚州同时是 earthquakeZone 和 wildfireZone。

这种模式支持精确筛选：

- 显示同时满足 `hurricaneZone = true` 和 `coastal = true` 的所有辖区
- 在 `earthquakeZone` 辖区中的总风险敞口是多少？

## 两套独立层级

此时模型包含两个独立子图：

1. **行业**：Sector ← Subsector ← IndustryGroup
2. **地理**：Region ← Country（经由 Jurisdiction），以及 Region ← Jurisdiction

后续添加贷款产品与监管限额时，会建立进一步连接。

## 步骤 2 图谱（与步骤 1 对比）

<ontology-embed id="official/fibo-risk-step-2" diff="official/fibo-risk-step-1" height="400px"></ontology-embed>

*三个新增实体以高亮显示，为模型加入地理维度。注意这两个独立子图，后续步骤将进一步扩展连接。*

```quiz
Q: 为什么 Jurisdiction 使用布尔标记，而不是单一 riskType 属性？
- 布尔标记更容易存入数据库
- 辖区可能同时位于多个灾害区域，单个枚举无法表达 [correct]
- 布尔标记在图谱中显示得更好
- FIBO 要求所有分类器都使用布尔属性
> 同一个辖区可能同时面临多种自然灾害风险，例如佛罗里达州同时易受飓风和洪水影响。布尔标记支持精确的多维筛选，对“飓风区且沿海且洪水区”等复合风险查询很重要。
```
