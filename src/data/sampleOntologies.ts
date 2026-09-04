import type { Ontology, DataBinding } from './ontology';

export interface SampleOntologyEntry {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'retail' | 'healthcare' | 'finance' | 'manufacturing' | 'education' | 'iq-lab';
  ontology: Ontology;
  bindings: DataBinding[];
}

// E-Commerce Ontology
const ecommerceOntology: Ontology = {
  name: "电子商务平台",
  description: "包含客户、产品与订单的在线零售业务模型",
  entityTypes: [
    {
      id: "buyer",
      name: "Buyer",
      description: "进行购买的注册客户",
      icon: "🛒",
      color: "#0078D4",
      properties: [
        { name: "buyerId", type: "string", isIdentifier: true },
        { name: "email", type: "string" },
        { name: "memberSince", type: "date" },
        { name: "loyaltyTier", type: "string" },
        { name: "totalSpent", type: "decimal", unit: "USD" }
      ]
    },
    {
      id: "product",
      name: "Product",
      description: "可供购买的商品",
      icon: "📦",
      color: "#107C10",
      properties: [
        { name: "sku", type: "string", isIdentifier: true },
        { name: "name", type: "string" },
        { name: "category", type: "string" },
        { name: "price", type: "decimal", unit: "USD" },
        { name: "stockQty", type: "integer" }
      ]
    },
    {
      id: "cart",
      name: "Shopping-Cart",
      description: "当前购物会话",
      icon: "🛍️",
      color: "#FFB900",
      properties: [
        { name: "cartId", type: "string", isIdentifier: true },
        { name: "createdAt", type: "datetime" },
        { name: "itemCount", type: "integer" },
        { name: "subtotal", type: "decimal", unit: "USD" }
      ]
    },
    {
      id: "order",
      name: "Order",
      description: "已完成的购买交易",
      icon: "📋",
      color: "#8764B8",
      properties: [
        { name: "orderId", type: "string", isIdentifier: true },
        { name: "orderDate", type: "datetime" },
        { name: "status", type: "string" },
        { name: "total", type: "decimal", unit: "USD" },
        { name: "shippingMethod", type: "string" }
      ]
    },
    {
      id: "review",
      name: "Review",
      description: "客户对产品的评价与评分",
      icon: "⭐",
      color: "#00B7C3",
      properties: [
        { name: "reviewId", type: "string", isIdentifier: true },
        { name: "rating", type: "integer" },
        { name: "title", type: "string" },
        { name: "body", type: "string" },
        { name: "verified", type: "boolean" }
      ]
    }
  ],
  relationships: [
    { id: "buyer_has_cart", name: "has_cart", from: "buyer", to: "cart", cardinality: "one-to-one", description: "买家的当前购物车" },
    { id: "cart_contains", name: "contains", from: "cart", to: "product", cardinality: "many-to-many", description: "购物车中的产品" },
    { id: "buyer_places", name: "places", from: "buyer", to: "order", cardinality: "one-to-many", description: "买家提交的订单" },
    { id: "order_includes", name: "includes", from: "order", to: "product", cardinality: "many-to-many", description: "订单中的产品" },
    { id: "buyer_writes", name: "writes", from: "buyer", to: "review", cardinality: "one-to-many", description: "买家撰写的评价" },
    { id: "review_for", name: "reviews", from: "review", to: "product", cardinality: "many-to-one", description: "被评价的产品" }
  ]
};

// Healthcare Ontology
const healthcareOntology: Ontology = {
  name: "医疗系统",
  description: "涵盖医护人员、预约与治疗的患者护理管理",
  entityTypes: [
    {
      id: "patient",
      name: "Patient",
      description: "接受医疗服务的个人",
      icon: "🏥",
      color: "#0078D4",
      properties: [
        { name: "patientId", type: "string", isIdentifier: true },
        { name: "mrn", type: "string" },
        { name: "dateOfBirth", type: "date" },
        { name: "bloodType", type: "string" },
        { name: "allergies", type: "string" }
      ]
    },
    {
      id: "provider",
      name: "Provider",
      description: "医疗专业人员",
      icon: "👨‍⚕️",
      color: "#107C10",
      properties: [
        { name: "providerId", type: "string", isIdentifier: true },
        { name: "name", type: "string" },
        { name: "specialty", type: "string" },
        { name: "licenseNumber", type: "string" },
        { name: "department", type: "string" }
      ]
    },
    {
      id: "appointment",
      name: "Appointment",
      description: "已安排的患者就诊",
      icon: "📅",
      color: "#FFB900",
      properties: [
        { name: "appointmentId", type: "string", isIdentifier: true },
        { name: "scheduledTime", type: "datetime" },
        { name: "duration", type: "integer", unit: "minutes" },
        { name: "type", type: "string" },
        { name: "status", type: "string" }
      ]
    },
    {
      id: "diagnosis",
      name: "Diagnosis",
      description: "已确认的病情",
      icon: "🩺",
      color: "#D13438",
      properties: [
        { name: "diagnosisId", type: "string", isIdentifier: true },
        { name: "icdCode", type: "string" },
        { name: "description", type: "string" },
        { name: "severity", type: "string" },
        { name: "diagnosedDate", type: "date" }
      ]
    },
    {
      id: "prescription",
      name: "Prescription",
      description: "用药处方",
      icon: "💊",
      color: "#8764B8",
      properties: [
        { name: "rxNumber", type: "string", isIdentifier: true },
        { name: "medication", type: "string" },
        { name: "dosage", type: "string" },
        { name: "frequency", type: "string" },
        { name: "refillsRemaining", type: "integer" }
      ]
    }
  ],
  relationships: [
    { id: "patient_has_appt", name: "has_appointment", from: "patient", to: "appointment", cardinality: "one-to-many", description: "患者的预约就诊" },
    { id: "provider_sees", name: "sees", from: "provider", to: "appointment", cardinality: "one-to-many", description: "医护人员的预约安排" },
    { id: "patient_diagnosed", name: "diagnosed_with", from: "patient", to: "diagnosis", cardinality: "one-to-many", description: "患者诊断" },
    { id: "provider_diagnoses", name: "diagnoses", from: "provider", to: "diagnosis", cardinality: "one-to-many", description: "医护人员做出的诊断" },
    { id: "diagnosis_treated", name: "treated_by", from: "diagnosis", to: "prescription", cardinality: "one-to-many", description: "针对诊断的处方" },
    { id: "provider_prescribes", name: "prescribes", from: "provider", to: "prescription", cardinality: "one-to-many", description: "医护人员开具的处方" }
  ]
};

// Financial Services Ontology
const financeOntology: Ontology = {
  name: "银行与金融",
  description: "涵盖账户、交易与投资的金融服务",
  entityTypes: [
    {
      id: "customer",
      name: "Customer",
      description: "银行账户持有人",
      icon: "👤",
      color: "#0078D4",
      properties: [
        { name: "customerId", type: "string", isIdentifier: true },
        { name: "name", type: "string" },
        { name: "ssn", type: "string" },
        { name: "creditScore", type: "integer" },
        { name: "riskProfile", type: "string" }
      ]
    },
    {
      id: "account",
      name: "Account",
      description: "金融账户",
      icon: "🏦",
      color: "#107C10",
      properties: [
        { name: "accountNumber", type: "string", isIdentifier: true },
        { name: "type", type: "string" },
        { name: "balance", type: "decimal", unit: "USD" },
        { name: "interestRate", type: "decimal", unit: "%" },
        { name: "openDate", type: "date" }
      ]
    },
    {
      id: "transaction",
      name: "Transaction",
      description: "金融交易",
      icon: "💳",
      color: "#FFB900",
      properties: [
        { name: "transactionId", type: "string", isIdentifier: true },
        { name: "amount", type: "decimal", unit: "USD" },
        { name: "type", type: "string" },
        { name: "timestamp", type: "datetime" },
        { name: "merchant", type: "string" }
      ]
    },
    {
      id: "loan",
      name: "Loan",
      description: "信贷产品",
      icon: "📄",
      color: "#D13438",
      properties: [
        { name: "loanId", type: "string", isIdentifier: true },
        { name: "principal", type: "decimal", unit: "USD" },
        { name: "apr", type: "decimal", unit: "%" },
        { name: "term", type: "integer", unit: "months" },
        { name: "status", type: "string" }
      ]
    },
    {
      id: "investment",
      name: "Investment",
      description: "投资持仓",
      icon: "📈",
      color: "#8764B8",
      properties: [
        { name: "holdingId", type: "string", isIdentifier: true },
        { name: "symbol", type: "string" },
        { name: "shares", type: "decimal" },
        { name: "purchasePrice", type: "decimal", unit: "USD" },
        { name: "currentValue", type: "decimal", unit: "USD" }
      ]
    }
  ],
  relationships: [
    { id: "customer_owns_acct", name: "owns", from: "customer", to: "account", cardinality: "one-to-many", description: "客户的账户" },
    { id: "account_has_txn", name: "has_transaction", from: "account", to: "transaction", cardinality: "one-to-many", description: "账户交易" },
    { id: "customer_has_loan", name: "has_loan", from: "customer", to: "loan", cardinality: "one-to-many", description: "客户贷款" },
    { id: "account_funds_loan", name: "funds", from: "account", to: "loan", cardinality: "one-to-many", description: "还款来源" },
    { id: "customer_holds", name: "holds", from: "customer", to: "investment", cardinality: "one-to-many", description: "投资组合" },
    { id: "account_linked", name: "linked_to", from: "account", to: "investment", cardinality: "one-to-many", description: "经纪账户关联" }
  ]
};

// Manufacturing Ontology
const manufacturingOntology: Ontology = {
  name: "智能制造",
  description: "包含设备、传感器与质量控制的生产线",
  entityTypes: [
    {
      id: "machine",
      name: "Machine",
      description: "生产设备",
      icon: "🏭",
      color: "#0078D4",
      properties: [
        { name: "machineId", type: "string", isIdentifier: true },
        { name: "model", type: "string" },
        { name: "location", type: "string" },
        { name: "status", type: "string" },
        { name: "lastMaintenance", type: "date" }
      ]
    },
    {
      id: "sensor",
      name: "Sensor",
      description: "物联网监测设备",
      icon: "📡",
      color: "#00B7C3",
      properties: [
        { name: "sensorId", type: "string", isIdentifier: true },
        { name: "type", type: "string" },
        { name: "unit", type: "string" },
        { name: "minThreshold", type: "decimal" },
        { name: "maxThreshold", type: "decimal" }
      ]
    },
    {
      id: "workorder",
      name: "Work-Order",
      description: "生产任务",
      icon: "📋",
      color: "#FFB900",
      properties: [
        { name: "workOrderId", type: "string", isIdentifier: true },
        { name: "product", type: "string" },
        { name: "quantity", type: "integer" },
        { name: "priority", type: "string" },
        { name: "dueDate", type: "date" }
      ]
    },
    {
      id: "part",
      name: "Part",
      description: "零部件或原材料",
      icon: "🔩",
      color: "#107C10",
      properties: [
        { name: "partNumber", type: "string", isIdentifier: true },
        { name: "name", type: "string" },
        { name: "stockLevel", type: "integer" },
        { name: "reorderPoint", type: "integer" },
        { name: "unitCost", type: "decimal", unit: "USD" }
      ]
    },
    {
      id: "qualitycheck",
      name: "Quality-Check",
      description: "检验结果",
      icon: "✅",
      color: "#8764B8",
      properties: [
        { name: "checkId", type: "string", isIdentifier: true },
        { name: "timestamp", type: "datetime" },
        { name: "passed", type: "boolean" },
        { name: "defectType", type: "string" },
        { name: "inspector", type: "string" }
      ]
    }
  ],
  relationships: [
    { id: "machine_has_sensor", name: "monitored_by", from: "machine", to: "sensor", cardinality: "one-to-many", description: "设备上的传感器" },
    { id: "machine_runs", name: "executes", from: "machine", to: "workorder", cardinality: "one-to-many", description: "设备上的工单" },
    { id: "workorder_uses", name: "uses", from: "workorder", to: "part", cardinality: "many-to-many", description: "消耗的零部件" },
    { id: "workorder_checked", name: "inspected_by", from: "workorder", to: "qualitycheck", cardinality: "one-to-many", description: "质量检验" },
    { id: "machine_maintains", name: "requires", from: "machine", to: "part", cardinality: "many-to-many", description: "所需备件" }
  ]
};

// University Ontology
const universityOntology: Ontology = {
  name: "大学系统",
  description: "涵盖学生、课程与教职人员的教育机构",
  entityTypes: [
    {
      id: "student",
      name: "Student",
      description: "已注册的学习者",
      icon: "🎓",
      color: "#0078D4",
      properties: [
        { name: "studentId", type: "string", isIdentifier: true },
        { name: "name", type: "string" },
        { name: "major", type: "string" },
        { name: "gpa", type: "decimal" },
        { name: "enrollmentYear", type: "integer" }
      ]
    },
    {
      id: "professor",
      name: "Professor",
      description: "教职人员",
      icon: "👨‍🏫",
      color: "#107C10",
      properties: [
        { name: "facultyId", type: "string", isIdentifier: true },
        { name: "name", type: "string" },
        { name: "department", type: "string" },
        { name: "tenure", type: "boolean" },
        { name: "researchArea", type: "string" }
      ]
    },
    {
      id: "course",
      name: "Course",
      description: "教学课程",
      icon: "📚",
      color: "#FFB900",
      properties: [
        { name: "courseCode", type: "string", isIdentifier: true },
        { name: "title", type: "string" },
        { name: "credits", type: "integer" },
        { name: "level", type: "string" },
        { name: "maxEnrollment", type: "integer" }
      ]
    },
    {
      id: "department",
      name: "Department",
      description: "教学单位",
      icon: "🏛️",
      color: "#8764B8",
      properties: [
        { name: "deptCode", type: "string", isIdentifier: true },
        { name: "name", type: "string" },
        { name: "building", type: "string" },
        { name: "budget", type: "decimal", unit: "USD" }
      ]
    },
    {
      id: "enrollment",
      name: "Enrollment",
      description: "选课登记",
      icon: "📝",
      color: "#00B7C3",
      properties: [
        { name: "enrollmentId", type: "string", isIdentifier: true },
        { name: "semester", type: "string" },
        { name: "grade", type: "string" },
        { name: "status", type: "string" }
      ]
    }
  ],
  relationships: [
    { id: "student_enrolls", name: "enrolled_in", from: "student", to: "enrollment", cardinality: "one-to-many", description: "学生登记记录" },
    { id: "enrollment_for", name: "for_course", from: "enrollment", to: "course", cardinality: "many-to-one", description: "课程选修记录" },
    { id: "prof_teaches", name: "teaches", from: "professor", to: "course", cardinality: "one-to-many", description: "讲授的课程" },
    { id: "prof_belongs", name: "belongs_to", from: "professor", to: "department", cardinality: "many-to-one", description: "教师所属院系" },
    { id: "course_offered", name: "offered_by", from: "course", to: "department", cardinality: "many-to-one", description: "课程所属院系" },
    { id: "student_advised", name: "advised_by", from: "student", to: "professor", cardinality: "many-to-one", description: "学业导师" }
  ]
};

export const sampleOntologies: SampleOntologyEntry[] = [
  {
    id: "ecommerce",
    name: "电子商务平台",
    description: "包含买家、产品、购物车、订单与评价的在线零售模型",
    icon: "🛒",
    category: "retail",
    ontology: ecommerceOntology,
    bindings: []
  },
  {
    id: "healthcare",
    name: "医疗系统",
    description: "包含医护人员、预约、诊断与处方的患者护理模型",
    icon: "🏥",
    category: "healthcare",
    ontology: healthcareOntology,
    bindings: []
  },
  {
    id: "finance",
    name: "银行与金融",
    description: "包含账户、交易、贷款与投资的金融服务模型",
    icon: "🏦",
    category: "finance",
    ontology: financeOntology,
    bindings: []
  },
  {
    id: "manufacturing",
    name: "智能制造",
    description: "包含设备、传感器、工单与质量检验的生产模型",
    icon: "🏭",
    category: "manufacturing",
    ontology: manufacturingOntology,
    bindings: []
  },
  {
    id: "university",
    name: "大学系统",
    description: "包含学生、教授、课程与院系的教育机构模型",
    icon: "🎓",
    category: "education",
    ontology: universityOntology,
    bindings: []
  }
];

export const categoryLabels: Record<string, string> = {
  retail: "零售",
  healthcare: "医疗健康",
  finance: "金融",
  manufacturing: "制造业",
  education: "教育",
  'iq-lab': "IQ Lab"
};

export const categoryColors: Record<string, string> = {
  retail: "#0078D4",
  healthcare: "#D13438",
  finance: "#107C10",
  manufacturing: "#FFB900",
  education: "#8764B8",
  'iq-lab': "#0099BC"
};
