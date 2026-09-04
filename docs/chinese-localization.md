# 简体中文版本

## 页面范围

| 页面 | 本地地址 |
| --- | --- |
| 图谱、探索任务、自然语言查询 | `http://127.0.0.1:5173/` |
| 本体目录 | `http://127.0.0.1:5173/#/catalogue` |
| 可视化设计器 | `http://127.0.0.1:5173/#/designer` |
| 本体学堂 | `http://127.0.0.1:5173/#/learn` |
| 课程示例 | `http://127.0.0.1:5173/#/learn/ontology-fundamentals` |
| 独立图谱嵌入 | `http://127.0.0.1:5173/#/embed/official/cosmic-coffee` |
| 嵌入示例文档（生产预览） | `http://127.0.0.1:4173/embed/samples.html` |

菜单、弹窗、辅助标签、加载/错误提示、设计器、任务及查询输出均采用简体中文。学习内容含 13 个课程、61 篇文章；71 个本体条目包含渐进课程步骤，因此目录默认浏览数量可能少于 71。

## 保留的技术内容

- RDF/OWL URI、实体/关系 ID、实体名、关系动词、属性名、类型、枚举值与标签键不翻译；品牌名、作者、许可证与来源链接保留。
- 本体标题和人类可读说明可以使用中文；用于 Fabric IQ 的实体及属性名称仍须满足现有 ASCII 命名校验。新实体默认使用 `NewEntity`，说明可写中文。
- 导入的用户文件不会被自动翻译或改写；代码示例、GQL、JSON 键和路径保持可执行格式。
- 此版本直接使用中文文案，没有新增语言切换器。中文字体优先匹配微软雅黑、苹方与思源黑体等系统字体，不下载字体。

## 中文查询

首页支持有限的教学句式，例如：

```text
什么是客户？
显示所有客户
Customer 如何连接到 Order？
查看 Customer 的 email 属性
订单有多少条？
显示所有金卡会员
西雅图有哪些门店？
```

中文别名转换为原有实体名后交给本地规则引擎，原有英文查询仍兼容。Fourth Coffee 的会员、产地和门店结果是固定示例，不代表真实记录；其他本体查询主要返回模型结构。语音识别默认 `zh-CN`，是否可用取决于浏览器及授权。可选 AI 生成和 Fabric API 功能仍需其原有配置，本地启动不意味着这些外部服务已接通。

## 开发与验证

```powershell
npm.cmd ci
npm.cmd run build
npm.cmd test
npm.cmd run lint
npm.cmd run dev -- --host 127.0.0.1 --port 5173
```

修改 Markdown 或目录 RDF 后，运行 `npm.cmd run learn:build` 或 `npm.cmd run catalogue:build`，再刷新页面。完整构建会生成两份清单及 `build/embed/ontology-embed.js`。

独立的 `public/embed/samples.html` 依赖构建后的嵌入脚本，需使用生产预览：

```powershell
npm.cmd run build
npm.cmd run preview -- --host 127.0.0.1 --port 4173
```

回归测试覆盖中文查询与英文结果一致性、全部目录的生成查询、中文 RDF 序列化往返、课程标题与测验答案标记，以及原有导入导出、图谱、设计器与安全测试。课程中的时间、金额及自动化工作流属于教学场景，不构成生产系统能力、权限、SLA 或效果承诺。
