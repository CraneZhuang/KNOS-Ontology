import type { Ontology } from './ontology';
import { nlQueryResponses } from './quests';

export interface QueryResponse {
  query: string;
  result: string;
  highlightEntities: string[];
  highlightRelationships: string[];
  interpretation?: string;
}

function stripLeadingArticle(text: string): string {
  return text.replace(/^(a|an|the)\s+/, '').trim();
}

function singularize(text: string): string {
  return text.endsWith('s') ? text.slice(0, -1) : text;
}

function matchesDemoQuery(normalizedQuery: string, demoQuery: string, matches: string[]): boolean {
  return normalizedQuery === demoQuery || matches.some(match => normalizedQuery.includes(match));
}

/** Normalize the supported Chinese teaching queries without changing schema identifiers. */
export function normalizeChineseQuery(query: string): string {
  const text = query.trim().replace(/[？?！!。]+$/g, '').trim();
  const examples: Record<string, string> = {
    '什么是实体类型': 'what is an entity type',
    '什么是关系': 'what is a relationship',
    '什么是本体': 'how does ontology work',
    '本体如何工作': 'how does ontology work',
    '查看本体结构': 'schema overview',
    '显示所有金卡会员': 'show me all gold tier customers',
    '哪些产品来自埃塞俄比亚': 'which products come from ethiopia',
    'Arif Ramadhan 下了哪些订单': 'what orders did arif ramadhan place',
    '西雅图有哪些门店': 'how many stores are in seattle',
    '哥伦比亚拿铁的供应链': 'what is the supply chain for colombian latte',
    '显示所有白金会员': 'show platinum customers',
    '显示有机产品': 'show organic products',
  };
  if (Object.hasOwn(examples, text)) return examples[text];
  const aliases: Record<string, string> = {
    客户: 'Customer', 订单: 'Order', 产品: 'Product', 门店: 'Store', 供应商: 'Supplier',
    发货单: 'Shipment', 买家: 'Buyer', 购物车: 'Shopping-Cart', 评价: 'Review', 患者: 'Patient',
    医护人员: 'Provider', 预约: 'Appointment', 诊断: 'Diagnosis', 处方: 'Prescription',
    账户: 'Account', 交易: 'Transaction', 贷款: 'Loan', 投资: 'Investment', 学生: 'Student',
    教授: 'Professor', 课程: 'Course', 院系: 'Department', 设备: 'Machine', 传感器: 'Sensor',
  };
  const name = (value: string) => Object.hasOwn(aliases, value.trim()) ? aliases[value.trim()] : value.trim();
  let match = text.match(/^什么是\s*(.+)$/);
  if (match) return `what is ${name(match[1])}`;
  match = text.match(/^(?:显示|列出)(?:所有|全部)\s*(.+)$/);
  if (match) return `show me all ${name(match[1])}`;
  match = text.match(/^(.+?)\s*如何(?:连接到|关联到)\s*(.+)$/);
  if (match) return `how does ${name(match[1])} connect to ${name(match[2])}`;
  match = text.match(/^查看\s*(.+?)\s*的\s*(.+?)\s*属性$/);
  if (match) return `${name(match[1])} ${match[2].trim()}`;
  match = text.match(/^(.+?)\s*有多少(?:个|条)?$/);
  if (match) return `how many ${name(match[1])}`;
  match = text.match(/^(.+?)\s*关系$/);
  if (match) return `${match[1].trim()} relationship`;
  return query;
}

// Generate dynamic query suggestions based on the current ontology
export function generateQuerySuggestions(ontology: Ontology): string[] {
  const suggestions: string[] = [];
  const entities = ontology.entityTypes;
  const relationships = ontology.relationships;

  // Entity-based queries
  if (entities.length > 0) {
    const firstEntity = entities[0];
    suggestions.push(`显示所有 ${firstEntity.name}`);
    
    if (entities.length > 1) {
      const secondEntity = entities[1];
      suggestions.push(`列出所有 ${secondEntity.name}`);
    }
  }

  // Property-based queries
  entities.forEach(entity => {
    entity.properties.forEach(prop => {
      if (prop.type === 'string' && !prop.isIdentifier && prop.name !== 'name') {
        suggestions.push(`查看 ${entity.name} 的 ${prop.name} 属性`);
      }
    });
  });

  // Relationship-based queries
  if (relationships.length > 0) {
    const rel = relationships[0];
    const fromEntity = entities.find(e => e.id === rel.from);
    const toEntity = entities.find(e => e.id === rel.to);
    if (fromEntity && toEntity) {
      suggestions.push(`${fromEntity.name} 如何连接到 ${toEntity.name}？`);
    }
  }

  // Conceptual queries always available
  suggestions.push('什么是实体类型？');
  suggestions.push('什么是关系？');
  suggestions.push('本体如何工作？');

  // Return unique suggestions (max 6)
  return [...new Set(suggestions)].slice(0, 6);
}

// Process a natural language query against the ontology
export function processQuery(query: string, ontology: Ontology): QueryResponse {
  const normalizedQuery = normalizeChineseQuery(query).toLowerCase().trim();
  const normalizedNoPunctuation = normalizedQuery.replace(/[?!.:,;]+/g, '').trim();
  const entities = ontology.entityTypes;
  const relationships = ontology.relationships;

  if (ontology.name === 'Fourth Coffee') {
    const demoResponse = nlQueryResponses.find(response =>
      matchesDemoQuery(normalizedNoPunctuation, response.query, response.matches)
    );

    if (demoResponse) {
      return {
        query,
        result: demoResponse.result,
        highlightEntities: demoResponse.highlightEntities,
        highlightRelationships: demoResponse.highlightRelationships,
        interpretation: "识别结果：Fourth Coffee 示例查询"
      };
    }
  }

  // Conceptual queries (work for any ontology)
  if (normalizedQuery.includes('what is') && (normalizedQuery.includes('entity') || normalizedQuery.includes('ontology'))) {
    return {
      query,
      result: "**实体类型**是现实世界概念（如 Customer、Product、Order）的可复用逻辑模型。在 Fabric IQ 本体中，它统一定义：\n\n• **名称与说明**：共享术语\n• **属性**：具有类型和单位的特征\n• **标识符**：每个实例的唯一键\n\n实体类型确保组织中的所有团队使用一致的定义。",
      highlightEntities: entities.slice(0, 2).map(e => e.id),
      highlightRelationships: [],
      interpretation: "识别结果：关于实体类型的概念问题"
    };
  }

  if (normalizedQuery.includes('what is') && normalizedQuery.includes('relationship')) {
    return {
      query,
      result: "**关系**是实体类型之间有类型、有方向的连接，定义以下内容：\n\n• **名称**：动作动词（如 places、contains）\n• **方向**：从一个实体指向另一个实体\n• **基数**：一对一、一对多等\n• **关系属性**：连接上可选的属性\n\n利用关系可以遍历本体，回答复杂问题。",
      highlightEntities: [],
      highlightRelationships: relationships.slice(0, 2).map(r => r.id),
      interpretation: "识别结果：关于关系的概念问题"
    };
  }

  if (normalizedQuery.includes('how') && (normalizedQuery.includes('ontology') || normalizedQuery.includes('work'))) {
    return {
      query,
      result: `本体 **${ontology.name}** 包含：

• **${entities.length} 个实体类型** — ${entities.map(e => e.name).join(', ')}\n• **${relationships.length} 条关系** — 将实体连接起来

本体充当连接数据平台的语义层，让自然语言查询能够理解业务概念。`,
      highlightEntities: entities.map(e => e.id),
      highlightRelationships: [],
      interpretation: "识别结果：关于本体结构的问题"
    };
  }

  // Entity definition queries: "What is a Customer?"
  if (normalizedNoPunctuation.startsWith('what is ')) {
    const subjectRaw = normalizedNoPunctuation.slice('what is '.length).trim();
    const subject = stripLeadingArticle(subjectRaw);

    for (const entity of entities) {
      const entityNameLower = entity.name.toLowerCase();
      const entityNameSingular = entityNameLower.endsWith('s') ? entityNameLower.slice(0, -1) : entityNameLower;

      if (
        subject === entityNameLower ||
        subject === entityNameSingular ||
        singularize(subject) === entityNameSingular
      ) {
        const propList = entity.properties
          .slice(0, 4)
          .map(p => `• **${p.name}** (${p.type})${p.isIdentifier ? ' 🔑' : ''}`)
          .join('\n');

        return {
          query,
          result: `**${entity.name}** ${entity.icon}\n${entity.description}

**属性：**
${propList}`,
          highlightEntities: [entity.id],
          highlightRelationships: [],
          interpretation: `识别结果：实体定义查询 — ${entity.name}`
        };
      }
    }
  }

  // Entity listing queries
  for (const entity of entities) {
    const entityNameLower = entity.name.toLowerCase();
    const entityNamePlural = entityNameLower + 's';
    
    if (
      normalizedQuery.includes(`show me all ${entityNameLower}`) ||
      normalizedQuery.includes(`show me all ${entityNamePlural}`) ||
      normalizedQuery.includes(`list all ${entityNameLower}`) ||
      normalizedQuery.includes(`list all ${entityNamePlural}`) ||
      normalizedQuery.includes(`show ${entityNamePlural}`) ||
      normalizedQuery.includes(`list ${entityNamePlural}`)
    ) {
      const propList = entity.properties
        .slice(0, 4)
        .map(p => `• **${p.name}** (${p.type})${p.isIdentifier ? ' 🔑' : ''}`)
        .join('\n');
      
      return {
        query,
        result: `**${entity.name}** ${entity.icon}\n${entity.description}

**属性：**
${propList}

_在实际部署中，这会查询数据平台中的真实 ${entityNameLower} 记录。_`,
        highlightEntities: [entity.id],
        highlightRelationships: [],
        interpretation: `识别结果：实体查询 — ${entity.name} 实体`
      };
    }
  }

  // Relationship/connection queries
  for (const rel of relationships) {
    const relationNameNormalized = rel.name.toLowerCase().trim().replace(/\s+/g, ' ');
    const fromEntity = entities.find(e => e.id === rel.from);
    const toEntity = entities.find(e => e.id === rel.to);

    if (
      normalizedNoPunctuation.includes(relationNameNormalized) &&
      (normalizedNoPunctuation.includes('connection') || normalizedNoPunctuation.includes('connections') || normalizedNoPunctuation.includes('relationship'))
    ) {
      return {
        query,
        result: `**${rel.name}** 将 **${fromEntity?.name ?? rel.from}** 连接到 **${toEntity?.name ?? rel.to}** (${rel.cardinality}).${rel.description ? `\n\n${rel.description}` : ''}`,
        highlightEntities: [rel.from, rel.to],
        highlightRelationships: [rel.id],
        interpretation: `识别结果：关系名称查询 — ${rel.name}`
      };
    }
  }

  for (const entity of entities) {
    const entityNameLower = entity.name.toLowerCase();
    
    if (normalizedQuery.includes(`how does ${entityNameLower}`) || 
        normalizedQuery.includes(`${entityNameLower} connect`) ||
        normalizedQuery.includes(`${entityNameLower} relate`)) {
      
      const relatedRels = relationships.filter(r => r.from === entity.id || r.to === entity.id);
      
      if (relatedRels.length > 0) {
        const relList = relatedRels.map(rel => {
          const isOutgoing = rel.from === entity.id;
          const otherEntityId = isOutgoing ? rel.to : rel.from;
          const otherEntity = entities.find(e => e.id === otherEntityId);
          const direction = isOutgoing ? '→' : '←';
          return `• **${rel.name}** ${direction} ${otherEntity?.icon} ${otherEntity?.name} (${rel.cardinality})`;
        }).join('\n');

        return {
          query,
          result: `**${entity.name}** ${entity.icon} 具有 ${relatedRels.length} 条连接：

${relList}`,
          highlightEntities: [entity.id, ...relatedRels.map(r => r.from === entity.id ? r.to : r.from)],
          highlightRelationships: relatedRels.map(r => r.id),
          interpretation: `识别结果：关系查询 — ${entity.name}`
        };
      }
    }
  }

  // Property-based queries
  for (const entity of entities) {
    for (const prop of entity.properties) {
      if (normalizedQuery.includes(prop.name.toLowerCase()) && normalizedQuery.includes(entity.name.toLowerCase())) {
        return {
          query,
          result: `**${entity.name}.${prop.name}**

• 类型： ${prop.type}\n${prop.unit ? `• 单位： ${prop.unit}` : ''}\n${prop.isIdentifier ? "• 这是标识符属性 🔑" : ''}\n${prop.description ? `• ${prop.description}` : ''}

_在实际部署中，可以筛选 ${entity.name.toLowerCase()}的记录，筛选条件使用此属性。_`,
          highlightEntities: [entity.id],
          highlightRelationships: [],
          interpretation: `识别结果：属性查询 — ${entity.name}.${prop.name}`
        };
      }
    }
  }

  // Counting queries
  if (normalizedQuery.includes('how many')) {
    for (const entity of entities) {
      if (normalizedQuery.includes(entity.name.toLowerCase())) {
        return {
          query,
          result: `本体定义了 **${entity.name}** 实体类型。

_在实际部署中，这个查询会统计数据平台中的真实 ${entity.name.toLowerCase()} 记录。_

示例："SELECT COUNT(*) FROM ${entity.name.toLowerCase()}s"`,
          highlightEntities: [entity.id],
          highlightRelationships: [],
          interpretation: `识别结果：计数查询 — ${entity.name}`
        };
      }
    }
  }

  // Schema overview query
  if (normalizedQuery.includes('entities') || normalizedQuery.includes('schema') || normalizedQuery.includes('overview')) {
    const entityList = entities.map(e => `• ${e.icon} **${e.name}** - ${e.description.slice(0, 50)}...`).join('\n');
    return {
      query,
      result: `**${ontology.name}** 结构概览

${entityList}

**合计：** ${entities.length} 个实体， ${relationships.length} 条关系`,
      highlightEntities: entities.map(e => e.id),
      highlightRelationships: [],
      interpretation: "识别结果：结构概览查询"
    };
  }

  // No match found - provide helpful suggestions
  const suggestions = generateQuerySuggestions(ontology).slice(0, 3);
  return {
    query,
    result: `无法理解查询“${query}”，当前本体为 **${ontology.name}**。

试着提问：
${suggestions.map(s => `• "${s}"`).join('\n')}

也可以点击图谱元素，直观地探索本体。`,
    highlightEntities: [],
    highlightRelationships: [],
    interpretation: undefined
  };
}
