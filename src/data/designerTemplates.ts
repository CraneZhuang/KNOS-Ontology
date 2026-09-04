/**
 * Starter templates for the Ontology Designer.
 *
 * Each template provides a small, domain-specific ontology (2–3 entities with
 * relationships) so users don't face a blank page when they open the designer.
 */
import type { Ontology } from './ontology';

export interface DesignerTemplate {
  id: string;
  label: string;
  description: string;
  icon: string;
  ontology: Ontology;
}

export const designerTemplates: DesignerTemplate[] = [
  {
    id: 'retail',
    label: "零售",
    description: "客户、产品和订单",
    icon: '🛒',
    ontology: {
      name: '零售本体',
      description: "包含客户、产品和订单的零售领域模型。",
      entityTypes: [
        {
          id: 'customer',
          name: 'Customer',
          description: "购买产品的人",
          icon: '👤',
          color: '#4A90D9',
          properties: [
            { name: 'customerId', type: 'string', isIdentifier: true },
            { name: 'name', type: 'string' },
            { name: 'email', type: 'string' },
            { name: 'memberSince', type: 'date' },
          ],
        },
        {
          id: 'product',
          name: 'Product',
          description: "可供购买的商品",
          icon: '📦',
          color: '#E74C3C',
          properties: [
            { name: 'sku', type: 'string', isIdentifier: true },
            { name: 'name', type: 'string' },
            { name: 'price', type: 'decimal', unit: 'USD' },
            { name: 'category', type: 'string' },
          ],
        },
        {
          id: 'order',
          name: 'Order',
          description: "一次购买交易",
          icon: '🧾',
          color: '#27AE60',
          properties: [
            { name: 'orderId', type: 'string', isIdentifier: true },
            { name: 'orderDate', type: 'date' },
            { name: 'total', type: 'decimal', unit: 'USD' },
          ],
        },
      ],
      relationships: [
        { id: 'r-places', name: 'places', from: 'customer', to: 'order', cardinality: 'one-to-many', description: "客户下订单" },
        { id: 'r-contains', name: 'contains', from: 'order', to: 'product', cardinality: 'many-to-many', description: "订单包含产品" },
      ],
    },
  },
  {
    id: 'healthcare',
    label: "医疗健康",
    description: "患者、医护人员和就诊记录",
    icon: '🏥',
    ontology: {
      name: '医疗本体',
      description: "包含患者、医护人员和就诊记录的医疗模型。",
      entityTypes: [
        {
          id: 'patient',
          name: 'Patient',
          description: "接受医疗服务的人",
          icon: '🩺',
          color: '#3498DB',
          properties: [
            { name: 'patientId', type: 'string', isIdentifier: true },
            { name: 'name', type: 'string' },
            { name: 'dateOfBirth', type: 'date' },
            { name: 'bloodType', type: 'enum', values: ['A+', 'A−', 'B+', 'B−', 'AB+', 'AB−', 'O+', 'O−'] },
          ],
        },
        {
          id: 'provider',
          name: 'Provider',
          description: "医疗专业人员",
          icon: '👨‍⚕️',
          color: '#2ECC71',
          properties: [
            { name: 'npi', type: 'string', isIdentifier: true },
            { name: 'name', type: 'string' },
            { name: 'specialty', type: 'string' },
          ],
        },
        {
          id: 'encounter',
          name: 'Encounter',
          description: "一次就诊或预约",
          icon: '📋',
          color: '#9B59B6',
          properties: [
            { name: 'encounterId', type: 'string', isIdentifier: true },
            { name: 'date', type: 'datetime' },
            { name: 'diagnosis', type: 'string' },
          ],
        },
      ],
      relationships: [
        { id: 'r-has-encounter', name: 'hasEncounter', from: 'patient', to: 'encounter', cardinality: 'one-to-many', description: "患者拥有就诊记录" },
        { id: 'r-seen-by', name: 'seenBy', from: 'encounter', to: 'provider', cardinality: 'many-to-one', description: "就诊对应医护人员" },
      ],
    },
  },
  {
    id: 'finance',
    label: "金融",
    description: "账户、交易和参与方",
    icon: '💰',
    ontology: {
      name: '金融本体',
      description: "包含账户、交易和参与方的金融领域模型。",
      entityTypes: [
        {
          id: 'party',
          name: 'Party',
          description: "个人或组织",
          icon: '🏦',
          color: '#2C3E50',
          properties: [
            { name: 'partyId', type: 'string', isIdentifier: true },
            { name: 'name', type: 'string' },
            { name: 'type', type: 'enum', values: ['Individual', 'Corporation', 'Trust'] },
          ],
        },
        {
          id: 'account',
          name: 'Account',
          description: "金融账户",
          icon: '💳',
          color: '#E67E22',
          properties: [
            { name: 'accountNumber', type: 'string', isIdentifier: true },
            { name: 'accountType', type: 'enum', values: ['Checking', 'Savings', 'Loan', 'Credit'] },
            { name: 'balance', type: 'decimal', unit: 'USD' },
            { name: 'openedDate', type: 'date' },
          ],
        },
        {
          id: 'transaction',
          name: 'Transaction',
          description: "资金变动",
          icon: '🔄',
          color: '#1ABC9C',
          properties: [
            { name: 'transactionId', type: 'string', isIdentifier: true },
            { name: 'amount', type: 'decimal', unit: 'USD' },
            { name: 'timestamp', type: 'datetime' },
            { name: 'type', type: 'enum', values: ['Debit', 'Credit', 'Transfer'] },
          ],
        },
      ],
      relationships: [
        { id: 'r-owns', name: 'owns', from: 'party', to: 'account', cardinality: 'one-to-many', description: "参与方拥有账户" },
        { id: 'r-has-txn', name: 'hasTransaction', from: 'account', to: 'transaction', cardinality: 'one-to-many', description: "账户包含交易" },
      ],
    },
  },
  {
    id: 'iot',
    label: 'IoT',
    description: "设备、传感器和读数",
    icon: '📡',
    ontology: {
      name: '物联网本体',
      description: "包含设备、传感器和读数的物联网模型。",
      entityTypes: [
        {
          id: 'device',
          name: 'Device',
          description: "联网的物联网设备",
          icon: '🖥️',
          color: '#34495E',
          properties: [
            { name: 'deviceId', type: 'string', isIdentifier: true },
            { name: 'manufacturer', type: 'string' },
            { name: 'firmwareVersion', type: 'string' },
            { name: 'installedDate', type: 'date' },
          ],
        },
        {
          id: 'sensor',
          name: 'Sensor',
          description: "设备上的测量组件",
          icon: '🌡️',
          color: '#E74C3C',
          properties: [
            { name: 'sensorId', type: 'string', isIdentifier: true },
            { name: 'sensorType', type: 'enum', values: ['Temperature', 'Humidity', 'Pressure', 'Motion'] },
            { name: 'unit', type: 'string' },
          ],
        },
        {
          id: 'reading',
          name: 'Reading',
          description: "传感器在某个时点的测量值",
          icon: '📊',
          color: '#3498DB',
          properties: [
            { name: 'readingId', type: 'string', isIdentifier: true },
            { name: 'value', type: 'decimal' },
            { name: 'timestamp', type: 'datetime' },
          ],
        },
      ],
      relationships: [
        { id: 'r-has-sensor', name: 'hasSensor', from: 'device', to: 'sensor', cardinality: 'one-to-many', description: "设备安装传感器" },
        { id: 'r-produces', name: 'produces', from: 'sensor', to: 'reading', cardinality: 'one-to-many', description: "传感器产生读数" },
      ],
    },
  },
  {
    id: 'education',
    label: "教育",
    description: "学生、课程和选课记录",
    icon: '🎓',
    ontology: {
      name: '教育本体',
      description: "包含学生、课程和选课记录的教育模型。",
      entityTypes: [
        {
          id: 'student',
          name: 'Student',
          description: "选修课程的人",
          icon: '🧑‍🎓',
          color: '#8E44AD',
          properties: [
            { name: 'studentId', type: 'string', isIdentifier: true },
            { name: 'name', type: 'string' },
            { name: 'enrollmentYear', type: 'integer' },
          ],
        },
        {
          id: 'course',
          name: 'Course',
          description: "教学课程",
          icon: '📚',
          color: '#D35400',
          properties: [
            { name: 'courseCode', type: 'string', isIdentifier: true },
            { name: 'title', type: 'string' },
            { name: 'credits', type: 'integer' },
          ],
        },
        {
          id: 'instructor',
          name: 'Instructor',
          description: "教师或教授",
          icon: '👩‍🏫',
          color: '#16A085',
          properties: [
            { name: 'instructorId', type: 'string', isIdentifier: true },
            { name: 'name', type: 'string' },
            { name: 'department', type: 'string' },
          ],
        },
      ],
      relationships: [
        { id: 'r-enrolled-in', name: 'enrolledIn', from: 'student', to: 'course', cardinality: 'many-to-many', description: "学生选修课程" },
        { id: 'r-taught-by', name: 'taughtBy', from: 'course', to: 'instructor', cardinality: 'many-to-one', description: "课程由教师讲授" },
      ],
    },
  },
];
