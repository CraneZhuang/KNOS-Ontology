// Quest system for Ontology Playground demo

export interface Quest {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'exploration' | 'traversal' | 'query';
  steps: QuestStep[];
  reward: {
    badge: string;
    badgeIcon: string;
    points: number;
  };
}

export interface QuestStep {
  id: string;
  instruction: string;
  targetType: 'entity' | 'relationship' | 'property' | 'query';
  targetId?: string;
  hint?: string;
}

export const quests: Quest[] = [
  {
    id: "quest-1",
    title: "认识实体",
    description: "通过探索实体类型，认识 Fourth Coffee 本体的核心构成。",
    difficulty: "beginner",
    category: "exploration",
    steps: [
      {
        id: "step-1-1",
        instruction: "点击 Customer 实体，了解客户属性",
        targetType: "entity",
        targetId: "customer",
        hint: "在图谱中寻找 👤 图标"
      },
      {
        id: "step-1-2",
        instruction: "接下来探索 Product 实体",
        targetType: "entity",
        targetId: "product",
        hint: "寻找 ☕ 咖啡杯图标"
      },
      {
        id: "step-1-3",
        instruction: "最后查看 Store 实体",
        targetType: "entity",
        targetId: "store",
        hint: "寻找 🏪 门店图标"
      }
    ],
    reward: {
      badge: "实体探索者",
      badgeIcon: "🎖️",
      points: 100
    }
  },
  {
    id: "quest-2",
    title: "咖啡豆之旅",
    description: "沿着关系，追踪咖啡豆从供应商到客户的旅程。",
    difficulty: "intermediate",
    category: "traversal",
    steps: [
      {
        id: "step-2-1",
        instruction: "从 Supplier 实体开始，这里是咖啡豆的来源",
        targetType: "entity",
        targetId: "supplier",
        hint: "寻找 🚚 卡车图标"
      },
      {
        id: "step-2-2",
        instruction: "沿 sourcedFrom 关系找到 Product",
        targetType: "relationship",
        targetId: "product_sourced_from_supplier",
        hint: "点击 Supplier 与 Product 之间的连线"
      },
      {
        id: "step-2-3",
        instruction: "探索 contains 关系，了解产品如何出现在订单中",
        targetType: "relationship",
        targetId: "order_contains_product",
        hint: "查看 Order 与 Product 之间的连接"
      },
      {
        id: "step-2-4",
        instruction: "最后查看 places 关系，了解是谁下的订单",
        targetType: "relationship",
        targetId: "customer_places_order",
        hint: "寻找 Customer 到 Order 的关系"
      }
    ],
    reward: {
      badge: "咖啡豆侦探",
      badgeIcon: "🔍",
      points: 250
    }
  },
  {
    id: "quest-3",
    title: "供应链导航",
    description: "了解发货记录如何连接供应商与门店。",
    difficulty: "intermediate",
    category: "traversal",
    steps: [
      {
        id: "step-3-1",
        instruction: "点击 Shipment 实体",
        targetType: "entity",
        targetId: "shipment",
        hint: "寻找 📦 包裹图标"
      },
      {
        id: "step-3-2",
        instruction: "沿 sentBy 关系找到 Supplier",
        targetType: "relationship",
        targetId: "shipment_from_supplier",
        hint: "查看货物来自哪里"
      },
      {
        id: "step-3-3",
        instruction: "沿 deliveredTo 关系找到 Store",
        targetType: "relationship",
        targetId: "shipment_to_store",
        hint: "查看货物送往哪里"
      }
    ],
    reward: {
      badge: "供应链大师",
      badgeIcon: "🌐",
      points: 200
    }
  },
  {
    id: "quest-4",
    title: "查询探索者",
    description: "学习使用自然语言提问。",
    difficulty: "advanced",
    category: "query",
    steps: [
      {
        id: "step-4-1",
        instruction: "试着提问：'显示所有金卡会员'",
        targetType: "query",
        hint: "在查询面板中输入"
      },
      {
        id: "step-4-2",
        instruction: "接着提问：'哪些产品来自埃塞俄比亚？'",
        targetType: "query",
        hint: "使用自然语言按产地筛选"
      },
      {
        id: "step-4-3",
        instruction: "尝试遍历查询：'Arif Ramadhan 下了哪些订单？'",
        targetType: "query",
        hint: "这会沿 Customer → Order 关系进行查询"
      }
    ],
    reward: {
      badge: "查询达人",
      badgeIcon: "🧙",
      points: 300
    }
  },
  {
    id: "quest-5",
    title: "探索数据绑定",
    description: "了解本体概念如何连接到实际数据平台的数据源。",
    difficulty: "advanced",
    category: "exploration",
    steps: [
      {
        id: "step-5-1",
        instruction: "选择 Customer 实体并查看数据绑定",
        targetType: "entity",
        targetId: "customer",
        hint: "在详情面板中寻找“数据绑定”区域"
      },
      {
        id: "step-5-2",
        instruction: "检查 Customer 属性与源数据列的映射",
        targetType: "property",
        targetId: "name",
        hint: "注意 name 如何映射到源数据中的 full_name"
      },
      {
        id: "step-5-3",
        instruction: "查看 Product 的绑定，注意其数据源和数据表",
        targetType: "entity",
        targetId: "product",
        hint: "查看 Product 下方的数据绑定卡片"
      }
    ],
    reward: {
      badge: "数据绑定专家",
      badgeIcon: "🔗",
      points: 350
    }
  }
];

// Pre-defined NL query responses for demo
export interface QueryResponse {
  query: string;
  matches: string[];
  result: string;
  highlightEntities: string[];
  highlightRelationships: string[];
}

export const nlQueryResponses: QueryResponse[] = [
  {
    query: "show me all gold tier customers",
    matches: ["gold tier", "gold customers", "customers gold"],
    result: "找到 1 位金卡会员：\n• Arif Ramadhan（CUST-001）— 自 2024 年起为金卡会员",
    highlightEntities: ["customer"],
    highlightRelationships: []
  },
  {
    query: "which products come from ethiopia",
    matches: ["products ethiopia", "ethiopian", "from ethiopia"],
    result: "找到 1 款来自埃塞俄比亚的产品：\n• 埃塞俄比亚单一产地咖啡（☕ 滴滤咖啡）— $4.50\n\n供应来源：Ethiopia Highlands Farm",
    highlightEntities: ["product", "supplier"],
    highlightRelationships: ["product_sourced_from_supplier"]
  },
  {
    query: "what orders did arif ramadhan place",
    matches: ["orders arif", "arif ramadhan orders", "arif placed"],
    result: "Arif Ramadhan 的订单：\n• ORD-2025-001 — $12.50（已完成）\n\n商品：埃塞俄比亚单一产地咖啡 ×2、哥伦比亚拿铁 ×1\n门店：西雅图市中心店",
    highlightEntities: ["customer", "order", "store"],
    highlightRelationships: ["customer_places_order", "order_processed_at_store"]
  },
  {
    query: "how many stores are in seattle",
    matches: ["stores seattle", "seattle stores", "how many stores"],
    result: "找到 2 家西雅图门店：\n• Fourth Coffee — 西雅图市中心店（45 个座位）\n• Fourth Coffee — 国会山店（32 个座位）",
    highlightEntities: ["store"],
    highlightRelationships: []
  },
  {
    query: "show supply chain for colombian latte",
    matches: ["supply chain", "colombian latte", "where does colombian latte come from"],
    result: "哥伦比亚拿铁的供应链：\n• 咖啡豆产地：哥伦比亚 🇨🇴\n• 供应商：Colombian Mountain Roasters\n• 认证：雨林联盟 🌿\n• 最近发货：SHIP-001（1 月 27 日送达）",
    highlightEntities: ["product", "supplier", "shipment"],
    highlightRelationships: ["product_sourced_from_supplier", "shipment_from_supplier"]
  },
  {
    query: "what is an entity type",
    matches: ["what is entity", "entity type", "define entity"],
    result: "实体类型是现实世界概念（如 Customer、Product、Order）的可复用逻辑模型。它统一名称、说明、标识符与属性，确保各团队对同一术语拥有相同理解。",
    highlightEntities: [],
    highlightRelationships: []
  },
  {
    query: "what is a relationship",
    matches: ["what is relationship", "define relationship", "relationships"],
    result: "关系是实体类型之间有类型、有方向的连接。例如，Customer places Order 定义客户与订单的连接方式。关系也可以具有数量、置信度等属性。",
    highlightEntities: [],
    highlightRelationships: []
  },
  {
    query: "show me platinum customers",
    matches: ["platinum", "platinum customers", "customers platinum"],
    result: "找到 1 位白金会员：\n• Jaroslav Cerny（CUST-002）— 白金等级\n\n累计消费：$3,420.00\n入会时间：2023 年 1 月",
    highlightEntities: ["customer"],
    highlightRelationships: []
  },
  {
    query: "list all organic products",
    matches: ["organic", "organic products", "is organic"],
    result: "找到 2 款有机产品：\n• 埃塞俄比亚单一产地咖啡（滴滤咖啡）— $4.50 🌱\n• Nebula 冷萃咖啡（冷萃）— $5.25 🌱",
    highlightEntities: ["product"],
    highlightRelationships: []
  }
];
