---
title: "完整电商平台"
slug: complete-platform
description: "添加 Review，形成买家反馈闭环，完成电商本体。"
order: 4
embed: official/ecommerce-step-3
---

## 形成反馈闭环

电商模型的最后一块拼图是**客户评价**。评价把买家重新连接到产品，形成影响未来购买行为的反馈闭环。

## 评价实体（Review）

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `reviewId` | string | ✓ |
| `rating` | integer | |
| `title` | string | |
| `body` | string | |
| `verified` | boolean | |

布尔属性 `verified` 表示评价者是否实际购买过产品，是其他买家和分析系统判断可信度的重要信号。

## 新增关系

- **writes（撰写）**：`Buyer` → `Review`（一对多）
  买家可以在不同时间撰写多条评价。

- **reviews（评价）**：`Review` → `Product`（多对一）
  每条评价只针对一个产品，但一个产品可以拥有多条评价。

> **反馈闭环：**路径 `Buyer → writes → Review → reviews → Product` 返回到 Product。买家消费产品后进行评价，进而影响其他买家。

## 完整图谱

<ontology-embed id="official/ecommerce-step-3" diff="official/ecommerce-step-2" height="500px"></ontology-embed>

*完整电商本体包含 5 个实体、6 条关系。Review 形成了买家反馈闭环。*

## 完整模型支持的能力

| 问题 | 图谱路径 |
|---|---|
| 哪些产品拥有评分最高的已验证评价？ | Review（verified=true）→ Product |
| 哪些买家的购物车有商品，但没有订单？ | Buyer → Cart（itemCount > 0），且不存在 Buyer → Order |
| 某个类别的产品平均评分是多少？ | Review → Product（按 category 分组） |
| 哪些忠诚买家撰写的评价最多？ | Buyer（loyaltyTier=Gold）→ Review（计数） |

## GQL 查询示例

查找当前位于某人购物车中的产品所对应的已验证评价：

```gql
MATCH (b:Buyer)-[:has_cart]->(c:Cart)-[:contains]->(p:Product)<-[:reviews]-(r:Review)
WHERE r.verified = true
RETURN p.name, r.rating, r.title
```

## 已构建的模型

| 步骤 | 新增实体 | 累计数量 | 关键概念 |
|---|---|---|---|
| 1 | Buyer、Product、Order | 3 | 购买流程、SKU 标识符 |
| 2 | Shopping-Cart | 4 | 会话实体、一对一 |
| 3 | Review | 5 | 反馈闭环、已验证可信度 |

## 核心要点

1. **会话实体**（Cart）描述进行中的状态
2. **一对一**关系描述排他归属
3. **布尔属性**（verified）支持基于可信度的筛选
4. **反馈闭环**提供比线性链条更丰富的查询路径
5. 完整图谱支持从浏览到评价的**漏斗分析**

```quiz
Q: Review 为什么能在本体中形成反馈闭环？
- 它连接图谱中的所有其他实体
- 它通过一条不同于购买路径的路线，将 Buyer 重新连接到 Product [correct]
- 它拥有最多的属性
- 它使用了布尔属性 verified
> 没有 Review 时，Buyer 只能通过 Order 到达 Product。Review 新增了 Buyer → Review → Product 路径，形成闭环。双路径结构支持比较查询，例如“买过但未评价”和“评价过但未购买”。
```

你已完成电商平台学习路径！从[本体目录](#/catalogue)加载任意步骤，即可交互式探索。
