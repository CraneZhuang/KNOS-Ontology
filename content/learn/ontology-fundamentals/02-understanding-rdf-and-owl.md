---
title: 理解 RDF 与 OWL
slug: understanding-rdf-and-owl
description: 了解 RDF/OWL 如何表示本体，以及语义网中描述类、属性和关系的标准语言。
order: 2
embed: official/ecommerce
---

## 什么是 RDF？

**RDF（资源描述框架）**是 W3C 标准，将信息描述为相互连接的资源图谱。RDF 中的信息都表示为**三元组**：主语 → 谓语 → 宾语。

```
:Customer  rdf:type       owl:Class .
:name      rdf:type       owl:DatatypeProperty .
:name      rdfs:domain    :Customer .
:name      rdfs:range     xsd:string .
```

上面的示例表达：存在一个名为 Customer 的类，它具有名为 name、类型为字符串的属性。

## OWL 建立在 RDF 之上

**OWL（Web 本体语言）**为 RDF 加入更丰富的建模能力，包括基数约束、类层级和逻辑公理。本体设计中的关键 OWL 构件包括：

| OWL 概念 | 对应含义 | 示例 |
|-------------|---------|---------|
| owl:Class | 实体类型 | Customer、Product |
| owl:DatatypeProperty | 具有基本值类型的属性 | name（string）、price（decimal） |
| owl:ObjectProperty | 实体之间的关系 | placedBy（Order → Customer） |
| rdfs:domain / rdfs:range | 属性所属实体 / 值的类型 | price 属于 Product，类型为 xsd:decimal |

## 命名空间消除歧义

每个 RDF 资源都有全局唯一的 **URI**。为避免处处书写长 URI，RDF/XML 使用**命名空间前缀**：

```xml
<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
         xmlns:owl="http://www.w3.org/2002/07/owl#"
         xmlns="https://mycompany.com/ontology/">
```

xmlns= 定义默认命名空间，因此 `<owl:Class rdf:about="Customer">` 实际表示 `https://mycompany.com/ontology/Customer`。

## 阅读 RDF/OWL 文件

以下是仅包含一个实体类型和一个属性的最小本体：

```xml
<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
         xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#"
         xmlns:owl="http://www.w3.org/2002/07/owl#"
         xmlns:xsd="http://www.w3.org/2001/XMLSchema#"
         xmlns="https://example.com/shop/">

  <!-- Entity type: Product -->
  <owl:Class rdf:about="Product">
    <rdfs:label>Product</rdfs:label>
  </owl:Class>

  <!-- Property: productName (string, identifier) -->
  <owl:DatatypeProperty rdf:about="productName">
    <rdfs:domain rdf:resource="Product"/>
    <rdfs:range rdf:resource="http://www.w3.org/2001/XMLSchema#string"/>
    <rdfs:label>productName</rdfs:label>
  </owl:DatatypeProperty>
</rdf:RDF>
```

本体探索平台可以直接导入这样的文件，也可以先可视化设计，再导出 RDF。

<ontology-embed id="official/ecommerce" height="400px"></ontology-embed>

*电商本体提供了更丰富的示例，包含多个实体类型以及连接它们的对象属性。*

## JSON 与 RDF：如何选择

| | JSON | RDF/OWL |
|---|------|---------|
| **可读性** | 易于阅读和编辑 | 较冗长，但定义精确 |
| **工具支持** | 任意文本编辑器 | 语义网工具、SPARQL 端点 |
| **互操作性** | 取决于应用 | W3C 标准，通用性强 |
| **适用场景** | 快速原型、应用配置 | 正式数据模型、跨系统集成 |

本体探索平台同时支持两种格式：在可视化编辑器中设计，快速使用时导出 JSON，正式发布时导出 RDF/OWL。

## 核心要点

- RDF 使用**主语 → 谓语 → 宾语**三元组表示知识
- OWL 在 RDF 基础上加入类、数据属性和对象属性
- 命名空间让 URI 的写法简洁且无歧义
- 平台支持标准 RDF/OWL 导入导出，无需手写代码

```quiz
Q: RDF 使用什么方式表示信息？
- 具有行和列的表
- JSON 键值对
- 主语 → 谓语 → 宾语三元组 [correct]
- 二进制数据流
> RDF 的三元组是一种三部分陈述：主语通过谓语连接到宾语，将信息表达为相互连接的资源图谱。
```

```quiz
Q: owl:ObjectProperty 表示什么？
- 字符串等基本值类型的属性
- 两个实体类型之间的关系 [correct]
- 本体的命名空间
- 数据类型约束
> OWL 中的 ObjectProperty 定义两个类之间的关系，例如 placedBy 连接 Order 与 Customer。基本值类型则使用 DatatypeProperty。
```
