// Fourth Coffee - Sample Ontology for Microsoft Fabric IQ Demo

export interface Property {
  name: string;
  type: 'string' | 'integer' | 'decimal' | 'double' | 'date' | 'datetime' | 'boolean' | 'enum';
  isIdentifier?: boolean;
  unit?: string;
  values?: string[];
  description?: string;
}

export interface RelationshipAttribute {
  name: string;
  type: string;
}

export interface Relationship {
  id: string;
  name: string;
  from: string;
  to: string;
  cardinality: 'one-to-one' | 'one-to-many' | 'many-to-one' | 'many-to-many';
  description?: string;
  attributes?: RelationshipAttribute[];
}

export interface EntityType {
  id: string;
  name: string;
  description: string;
  properties: Property[];
  icon: string;
  color: string;
}

export interface EntityInstance {
  id: string;
  entityTypeId: string;
  values: Record<string, unknown>;
}

export interface Ontology {
  name: string;
  description: string;
  entityTypes: EntityType[];
  relationships: Relationship[];
}

export interface DataBinding {
  entityTypeId: string;
  source: string;
  table: string;
  columnMappings: Record<string, string>;
}

// The Fourth Coffee Ontology
export const cosmicCoffeeOntology: Ontology = {
  name: "Fourth Coffee",
  description: "以现代咖啡连锁为背景的示例本体，涵盖供应商、产品、门店、客户与订单。",
  entityTypes: [
    {
      id: "customer",
      name: "Customer",
      description: "在门店购买咖啡产品的顾客",
      icon: "👤",
      color: "#0078D4", // Microsoft Blue
      properties: [
        { name: "customerId", type: "string", isIdentifier: true, description: "客户唯一标识符" },
        { name: "name", type: "string", description: "客户全名" },
        { name: "email", type: "string", description: "联系电子邮箱" },
        { name: "loyaltyTier", type: "enum", values: ["Bronze", "Silver", "Gold", "Platinum"], description: "会员等级" },
        { name: "joinDate", type: "date", description: "客户加入日期" },
        { name: "totalSpend", type: "decimal", unit: "USD", description: "累计消费金额" }
      ]
    },
    {
      id: "order",
      name: "Order",
      description: "客户在门店发生的购买交易",
      icon: "🧾",
      color: "#107C10", // Microsoft Green
      properties: [
        { name: "orderId", type: "string", isIdentifier: true, description: "订单唯一标识符" },
        { name: "timestamp", type: "datetime", description: "下单时间" },
        { name: "total", type: "decimal", unit: "USD", description: "订单总金额" },
        { name: "status", type: "enum", values: ["Pending", "Preparing", "Ready", "Completed", "Cancelled"], description: "订单当前状态" },
        { name: "paymentMethod", type: "enum", values: ["Card", "Cash", "Mobile", "Gift Card"], description: "所用支付方式" }
      ]
    },
    {
      id: "product",
      name: "Product",
      description: "可销售的咖啡产品或商品",
      icon: "☕",
      color: "#5C2D91", // Microsoft Purple
      properties: [
        { name: "productId", type: "string", isIdentifier: true, description: "产品唯一标识符" },
        { name: "name", type: "string", description: "产品名称" },
        { name: "category", type: "enum", values: ["Espresso", "Brewed", "Cold Brew", "Tea", "Food", "Merchandise"], description: "产品类别" },
        { name: "price", type: "decimal", unit: "USD", description: "单价" },
        { name: "origin", type: "string", description: "咖啡豆原产国" },
        { name: "isOrganic", type: "boolean", description: "产品是否通过有机认证" }
      ]
    },
    {
      id: "store",
      name: "Store",
      description: "实体咖啡门店",
      icon: "🏪",
      color: "#FFB900", // Microsoft Yellow/Gold
      properties: [
        { name: "storeId", type: "string", isIdentifier: true, description: "门店唯一标识符" },
        { name: "name", type: "string", description: "门店名称" },
        { name: "city", type: "string", description: "所在城市" },
        { name: "state", type: "string", description: "州 / 省" },
        { name: "openDate", type: "date", description: "门店开业日期" },
        { name: "capacity", type: "integer", description: "座位容量" }
      ]
    },
    {
      id: "supplier",
      name: "Supplier",
      description: "咖啡豆或商品供应商合作伙伴",
      icon: "🚚",
      color: "#D83B01", // Microsoft Orange
      properties: [
        { name: "supplierId", type: "string", isIdentifier: true, description: "供应商唯一标识符" },
        { name: "name", type: "string", description: "供应商公司名称" },
        { name: "country", type: "string", description: "经营所在国家" },
        { name: "certification", type: "enum", values: ["Fair Trade", "Rainforest Alliance", "Organic", "Direct Trade", "None"], description: "可持续认证" },
        { name: "rating", type: "decimal", description: "质量评分（1–5）" }
      ]
    },
    {
      id: "shipment",
      name: "Shipment",
      description: "从供应商发送到门店的一批货物",
      icon: "📦",
      color: "#00A9E0", // Light Blue
      properties: [
        { name: "shipmentId", type: "string", isIdentifier: true, description: "发货单唯一标识符" },
        { name: "dispatchDate", type: "date", description: "供应商发货日期" },
        { name: "arrivalDate", type: "date", description: "门店收货日期" },
        { name: "status", type: "enum", values: ["In Transit", "Delivered", "Delayed"], description: "发货状态" },
        { name: "weight", type: "decimal", unit: "kg", description: "货物总重量" }
      ]
    }
  ],
  relationships: [
    {
      id: "customer_places_order",
      name: "places",
      from: "customer",
      to: "order",
      cardinality: "one-to-many",
      description: "一个客户可以下一个或多个订单"
    },
    {
      id: "order_contains_product",
      name: "contains",
      from: "order",
      to: "product",
      cardinality: "many-to-many",
      description: "一个订单包含一个或多个产品",
      attributes: [
        { name: "quantity", type: "integer" },
        { name: "customizations", type: "string" }
      ]
    },
    {
      id: "order_processed_at_store",
      name: "processedAt",
      from: "order",
      to: "store",
      cardinality: "many-to-one",
      description: "订单在指定门店处理"
    },
    {
      id: "product_sourced_from_supplier",
      name: "sourcedFrom",
      from: "product",
      to: "supplier",
      cardinality: "many-to-one",
      description: "产品原料来自供应商"
    },
    {
      id: "shipment_from_supplier",
      name: "sentBy",
      from: "shipment",
      to: "supplier",
      cardinality: "many-to-one",
      description: "货物由供应商发出"
    },
    {
      id: "shipment_to_store",
      name: "deliveredTo",
      from: "shipment",
      to: "store",
      cardinality: "many-to-one",
      description: "货物配送到门店"
    },
    {
      id: "shipment_contains_product",
      name: "carries",
      from: "shipment",
      to: "product",
      cardinality: "many-to-many",
      description: "货物包含产品",
      attributes: [
        { name: "quantity", type: "integer" }
      ]
    }
  ]
};

// Sample entity instances for demonstration
export const sampleInstances: EntityInstance[] = [
  // Customers
  { id: "cust-001", entityTypeId: "customer", values: { customerId: "CUST-001", name: "Arif Ramadhan", email: "customer001@example.com", loyaltyTier: "Gold", joinDate: "2024-03-15", totalSpend: 1245.50 }},
  { id: "cust-002", entityTypeId: "customer", values: { customerId: "CUST-002", name: "Jaroslav Cerny", email: "customer002@example.com", loyaltyTier: "Platinum", joinDate: "2023-01-20", totalSpend: 3420.00 }},
  { id: "cust-003", entityTypeId: "customer", values: { customerId: "CUST-003", name: "Sumber Agvaan", email: "customer003@example.com", loyaltyTier: "Bronze", joinDate: "2025-11-01", totalSpend: 89.00 }},
  
  // Products
  { id: "prod-001", entityTypeId: "product", values: { productId: "PROD-001", name: "Ethiopian Single Origin", category: "Brewed", price: 4.50, origin: "Ethiopia", isOrganic: true }},
  { id: "prod-002", entityTypeId: "product", values: { productId: "PROD-002", name: "Colombian Latte", category: "Espresso", price: 5.75, origin: "Colombia", isOrganic: false }},
  { id: "prod-003", entityTypeId: "product", values: { productId: "PROD-003", name: "Nebula Cold Brew", category: "Cold Brew", price: 5.25, origin: "Guatemala", isOrganic: true }},
  
  // Stores
  { id: "store-001", entityTypeId: "store", values: { storeId: "STORE-001", name: "Fourth Coffee - Downtown Seattle", city: "Seattle", state: "WA", openDate: "2022-06-15", capacity: 45 }},
  { id: "store-002", entityTypeId: "store", values: { storeId: "STORE-002", name: "Fourth Coffee - Capitol Hill", city: "Seattle", state: "WA", openDate: "2023-02-28", capacity: 32 }},
  
  // Suppliers
  { id: "supp-001", entityTypeId: "supplier", values: { supplierId: "SUPP-001", name: "Ethiopia Highlands Farm", country: "Ethiopia", certification: "Fair Trade", rating: 4.8 }},
  { id: "supp-002", entityTypeId: "supplier", values: { supplierId: "SUPP-002", name: "Colombian Mountain Roasters", country: "Colombia", certification: "Rainforest Alliance", rating: 4.6 }},
  
  // Orders
  { id: "order-001", entityTypeId: "order", values: { orderId: "ORD-2025-001", timestamp: "2025-01-28T09:15:00", total: 12.50, status: "Completed", paymentMethod: "Mobile" }},
  { id: "order-002", entityTypeId: "order", values: { orderId: "ORD-2025-002", timestamp: "2025-01-28T10:30:00", total: 8.75, status: "Preparing", paymentMethod: "Card" }},
  
  // Shipments
  { id: "ship-001", entityTypeId: "shipment", values: { shipmentId: "SHIP-001", dispatchDate: "2025-01-20", arrivalDate: "2025-01-27", status: "Delivered", weight: 250.5 }},
];

// Sample data bindings showing connection to a data lakehouse platform
export const sampleBindings: DataBinding[] = [
  {
    entityTypeId: "customer",
    source: "Data Lakehouse",
    table: "lakehouse.bronze.customers",
    columnMappings: {
      customerId: "customer_id",
      name: "full_name",
      email: "email_address",
      loyaltyTier: "loyalty_status",
      joinDate: "registration_date",
      totalSpend: "lifetime_value"
    }
  },
  {
    entityTypeId: "order",
    source: "Data Lakehouse",
    table: "lakehouse.silver.orders",
    columnMappings: {
      orderId: "order_id",
      timestamp: "order_timestamp",
      total: "order_total",
      status: "order_status",
      paymentMethod: "payment_type"
    }
  },
  {
    entityTypeId: "product",
    source: "Semantic model",
    table: "semantic_model.Products",
    columnMappings: {
      productId: "ProductKey",
      name: "ProductName",
      category: "ProductCategory",
      price: "UnitPrice",
      origin: "OriginCountry"
    }
  }
];
