---
title: "风险传播模型"
slug: risk-propagation-model
description: "了解中断如何逐级传导：用 7 条关系描述供应商受影响、零部件风险、产品敞口与缓解措施。"
order: 3
---

## 级联传播：7 条关系

本体的力量在于关系：它们编码了影响在供应链中的传播路径。数据智能体可沿这些路径回答“有多少产品线暴露于此次供应商故障？”等问题。

### 1. **Supplier supplies Component（供应商供应零部件）**（一对多）

```
Supplier "ChipX Corp" 
  supplies→ Component "GPU 模块"
         → Component "内存板"
         → Component "电源"
```

- **重要性**：一个供应商中断，会影响依赖它的所有零部件
- **查询示例**：“显示来自台湾地区供应商的所有零部件”

### 2. **Component used in ProductLine（零部件用于产品线）**（多对多）

```
Component "GPU 模块"
  usedIn→ ProductLine "2024 游戏笔记本"
       → ProductLine "专业工作站"
       → ProductLine "增强型平板"
```

- **重要性**：单个零部件断供可能导致多条产品线停产
- **查询示例**：“有多少产品线依赖这个零部件？”

### 3. **DisruptionEvent affects Supplier（中断事件影响供应商）**（多对多）

```
DisruptionEvent "台湾地区停电 2024-05-01"
  affects→ Supplier "ChipX Corp"
        → Supplier "Memory Inc"
```

- **重要性**：一场灾害可能同时影响多个供应商
- **查询示例**：“哪些供应商位于洪水影响区域？”

### 4. **DisruptionEvent triggers RiskAssessment（中断事件触发风险评估）**（一对多）

```
DisruptionEvent "台湾地区停电"
  triggers→ RiskAssessment "游戏笔记本影响分析"
         → RiskAssessment "工作站影响分析"
```

- **重要性**：每次中断都会触发针对受影响产品线的详细分析
- **查询示例**：“此次中断使多少总收入面临风险？”

### 5. **RiskAssessment recommends MitigationAction（风险评估推荐缓解措施）**（一对多）

```
RiskAssessment "游戏笔记本影响分析"
  recommends→ MitigationAction "启用备选供应商 X"
           → MitigationAction "增加安全库存"
           → MitigationAction "重新设计零部件"
```

- **重要性**：每次影响分析产生按优先级排列的行动清单
- **查询示例**：“哪项措施最能减少中断影响？”

### 6. **MitigationAction activates AlternativeSupplier（缓解措施启用备选供应商）**（多对多）

```
MitigationAction "启用备选供应商 X"
  activates→ AlternativeSupplier "ChipX Europe"
          → AlternativeSupplier "SemiCorp Japan"
```

- **重要性**：一项措施可以同时启用多个后备来源
- **查询示例**：“哪些预先认证的供应商可以接替供货？”

### 7. **AlternativeSupplier canReplace Supplier（备选供应商可替代主供应商）**（多对一）

```
AlternativeSupplier "ChipX Europe"
  canReplace→ Supplier "ChipX Corp"

AlternativeSupplier "SemiCorp Japan"  
  canReplace→ Supplier "ChipX Corp"
```

- **重要性**：关键供应商应有多个已获批准的后备来源
- **查询示例**：“这个供应商是否有已获批准的替代来源？”

## 完整级联示例

下面通过一个示例追踪影响：

```
中断事件
│
├─ 台湾地区停电（2024-05-01，严重程度 Critical）
│
├─ 影响
│  └─ Supplier "ChipX Corp" (singleSourced=true)
│     ├─ 供应
│     │  ├─ Component "GPU 模块"（daysOfSupplyOnHand=3）
│     │  │  ├─ 用于
│     │  │  │  ├─ ProductLine "2024 游戏笔记本"（年收入 5,000 万美元）
│     │  │  │  ├─ ProductLine "专业工作站"（年收入 3,000 万美元）
│     │  │  │
│     │  │  └─ 触发 RiskAssessment
│     │  │     ├─ revenueAtRisk=$80M
│     │  │     ├─ timeToImpactDays=3
│     │  │     │
│     │  │     └─ 推荐
│     │  │        ├─ MitigationAction "启用 ChipX Europe"
│     │  │        │  ├─ estimatedCost=$2M
│     │  │        │  ├─ leadTimeSavedDays=2
│     │  │        │  │
│     │  │        │  └─ 启用
│     │  │        │     ├─ AlternativeSupplier "ChipX Europe" 
│     │  │        │     │  ├─ qualificationStatus=Approved
│     │  │        │     │  ├─ capacityAvailable=50,000 件/月
│     │  │        │     │  ├─ pricePremiumPercent=12%
│     │  │        │     │  │
│     │  │        │     │  └─ 可替代
│     │  │        │     │     └─ Supplier "ChipX Corp"
│     │  │        │     │
│     │  │        │     └─ AlternativeSupplier "SemiCorp Japan"
│     │  │        │        └─（次选方案）
│     │  │        │
│     │  │        └─ MitigationAction "增加安全库存"
│     │  │           └─ estimatedCost=$500K
│     │  │
│     │  └─ Component "内存板"
│     │     └─（相似的级联影响……）
```

## 这种结构为何有助于自动化

完成必要集成后，数据智能体可支持：

1. **检测**——“监控这些供应商和该区域”
2. **追溯**——“ChipX Corp 出现问题时，追溯示例中全部 14 条受影响的产品线”
3. **量化**——“计算示例中的收入风险（8,000 万美元）和影响到达时间（3 天）”
4. **推荐**——“比较启用后备供应商的 200 万美元成本、节省的 2 天与 8,000 万美元潜在损失”
5. **执行**——“按授权发送采购预警、更新生产计划并通知相关人员”
6. **复盘**——“记录哪些措施有效，以及实际影响与预估的差异”

## 基数规则

| 关系 | 基数 | 原因 |
|---|---|---|
| Supplier → Component | 1:N | 一个供应商可提供多个零部件 |
| Component → ProductLine | M:N | 零部件可复用，产品线可共享零部件 |
| Disruption → Supplier | M:N | 一场灾害影响多个供应商，一个供应商也可能面临多种威胁 |
| Disruption → Assessment | 1:N | 每次中断为各受影响产品线产生评估 |
| Assessment → Action | 1:N | 每次评估推荐多项措施 |
| Action → Alternative | M:N | 一项措施启用多个后备来源，同一来源可应对多种情况 |
| Alternative → Supplier | M:1 | 同一主供应商可有多个预先认证的后备来源 |

接下来了解如何利用此模型执行缓解流程。
