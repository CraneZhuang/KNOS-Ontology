---
title: 本体设计模式
slug: ontology-design-patterns
description: 了解数据平台本体设计中的实用命名约定、建模模式及应避免的常见反模式。
order: 5
embed: official/healthcare
---

## 面向人来命名

命名是最重要的设计决策。实体类型与属性会被人和机器共同读取，清晰名称能提高自然语言查询的准确度。

**推荐：**
- 实体类型使用单数名词：Customer、Product、Order
- 属性使用驼峰命名：firstName、totalAmount、createdDate
- 关系使用动词短语：placedBy、worksAt、contains

**避免：**
- 使用内部表名：tbl_cust_v2、DIM_PRODUCT
- 使用 qty、amt、dt 等缩写，应完整写出含义
- 使用 Item、Record、Thing 等过于泛化的名称

## 一个实体，一个概念

每个实体类型应表示**单一业务概念**。如果不断加入无关属性，通常意味着需要拆分实体。

**反模式：**Person 同时包含 salary、patientId、courseGrade 和 accountBalance，把员工、患者、学生和客户四个概念强行合并。

**更好的方式：**分别建模，必要时通过关系连接，例如 Person 可以关联 Employee 记录、Patient 记录等。

## 谨慎选择标识符

标识符决定如何计数、分组与关联实例。好的标识符应当：

- 在全部实例中**唯一**
- **稳定**，不随时间变化
- **有业务含义**，优先使用业务键，而非内部自增值

例如图书的 isbn、用户的 email、订单的 orderId；使用可变业务字段时，应额外考虑其稳定性。

尽量避免由多个字段共同组成的复合标识符，许多本体工具期望每个实体使用单一标识符。

## 建模关系，而不是外键

关系数据库通过外键连接表，本体则使用语义明确的**具名关系**。

| 关系型模型 | 本体 |
|-----------|----------|
| `orders.customer_id → customers.id` | `Order` → `placedBy` → `Customer` |
| `order_items.product_id → products.id` | `OrderItem` → `contains` → `Product` |

关系**名称**告诉查询引擎和使用者这条连接的含义。placedBy 比 fk_cust_id 这样的列名清晰得多。

## 正确设置基数

错误的基数会造成错误汇总。请问自己：“一个 A 实例可以对应多少个 B 实例？”

- 一位客户可以下**多个**订单 → 一对多
- 一个订单在**一家**门店处理 → 多对一
- 一位学生可选**多门**课程，一门课程有**多名**学生 → 多对多

<ontology-embed id="official/healthcare" height="400px"></ontology-embed>

*医疗本体是学习基数的好示例：患者有多次预约，每次预约对应一位医护人员；诊断属于一位患者，却可关联多张处方。*

## 避免常见问题

| 常见错误 | 问题 | 修正方法 |
|---------|---------|-----|
| **万能实体** | 一个实体包含 30 多个属性 | 拆分成职责聚焦的实体 |
| **缺少标识符** | 无法计数或分组实例 | 添加唯一标识符属性 |
| **关系名称模糊** | relatedTo、hasLink | 使用 prescribes、enrolledIn 等具体动词 |
| **循环一对一** | A → B 和 B → A 都是 1:1 | 检查是否其实是同一实体，必要时合并 |
| **过度建模** | 每张内部表都成为实体 | 建模用户会查询的概念，而非照搬数据库结构 |

## 何时添加说明

实体类型、属性和关系都可以有可选**说明**。以下情况尤其需要：

- 仅靠名称可能有歧义，如 status 有多种含义
- 概念具有领域专用性，如 formulary、SKU、yield
- 希望引导自然语言查询的理解方式

## 核心要点

- 面向人命名：单数名词、驼峰属性名、动词短语
- 一个实体一个概念，拆分承载过多职责的实体
- 选择稳定、唯一、有业务含义的标识符
- 用具名关系建模，而不是外键列
- 正确设置基数以支持正确汇总
- 名称有歧义时补充说明

```quiz
Q: Person 同时具有 salary、patientId、courseGrade 和 accountBalance，应如何改进？
- 添加标识符属性
- 把所有属性合并到说明字段
- 拆成 Employee、Patient、Student、Customer 等独立实体，并按需连接 [correct]
- 只保留一个属性，删除其余属性
> 当实体积累了许多无关属性时，就成为万能实体。应将每个概念拆成独立类型，再按需用关系连接。
```
