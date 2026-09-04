---
title: 履约与物流
slug: fulfillment-and-logistics
description: 添加 Shipment、Carrier 和 Warehouse，描述订单从仓库到客户的配送流程。
order: 5
embed: official/iq-lab-retail-step-4
---

## 配送流程

客户下单后，订单如何送达？履约层把订单连接到实体物流设施：

- **Shipment（发货单）**：一次配送记录
- **Carrier（承运商）**：物流服务商，如 FedEx、UPS
- **Warehouse（仓库）**：存储和发送产品的履约中心

## 发货单（Shipment）

每个 Shipment 表示一次配送：

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `shipmentId` | string | ✓ |
| `shipDate` | date | |
| `deliveryDate` | date | |
| `status` | string | |

## 承运商（Carrier）

负责配送的物流企业：

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `carrierId` | string | ✓ |
| `carrierName` | string | |
| `serviceType` | string | |

## 仓库（Warehouse）

履约中心：

| 属性 | 类型 | 是否为标识符？ |
|---|---|---|
| `warehouseId` | string | ✓ |
| `warehouseName` | string | |
| `capacity` | integer | |

## 新增关系

三条新关系连接物流实体：

- **ShipmentFulfillsOrder（履约订单）**：`Shipment` → `Order`（多对一）
  每批发货对应一个订单。同一个订单可以拆分成多批发货。

- **ShipmentByCarrier（承运方）**：`Shipment` → `Carrier`（多对一）
  每批货物由一个承运商负责。

- **ShipmentDepartedFromWarehouse（发货仓库）**：`Shipment` → `Warehouse`（多对一）
  每批货物从一个仓库发出。

## 枢纽模式

**Shipment** 是**枢纽实体**，同时连接 Order、Carrier 和 Warehouse。连接多个概念的交易或事件实体经常使用这种模式：

```
Carrier ← Shipment → Order → Customer
              ↓
          Warehouse
```

从 Carrier 经 Shipment、Order 到 Customer，一次图谱遍历即可回答“哪些客户收到了 CarrierX 承运的货物？”

## 步骤 4 图谱

<ontology-embed id="official/iq-lab-retail-step-4" diff="official/iq-lab-retail-step-3" height="450px"></ontology-embed>

*十个实体构成丰富的连通图谱。Shipment 将物流层 Carrier、Warehouse 与交易层 Order、Customer 连接起来，可以沿图谱从仓库追踪到客户。*

## 本节总结

- Shipment 等**枢纽实体**连接多个业务领域
- 物流层扩展交易层，无需修改已有实体
- 图谱遍历使“哪些仓库向西南地区发货？”等跨领域问题无需手写 SQL 关联
- 模型已增长到 10 个实体、10 条关系，仍保持可读性

```quiz
Q: Shipment 在本体中承担什么角色？
- 取代 Order 实体
- 作为枢纽连接物流层与交易层 [correct]
- 存储客户地址
- 定义 Warehouse 与 Carrier 之间的基数
> Shipment 将 Order 与 Carrier、Warehouse 等物流设施连接，作为跨领域枢纽，在不修改已有实体的情况下支持跨领域查询。
```

接下来添加库存跟踪与需求预测。
