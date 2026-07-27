# 技术栈与架构决策

## 1. 推荐方案

| 层级 | 选择 | 用途 |
| --- | --- | --- |
| 仓库 | pnpm workspaces + Turborepo | 管理 Web、App 和共享包 |
| Web | Next.js App Router + TypeScript | 公共 SEO 页面、全部管理后台、服务端业务接口 |
| App | React Native + Expo + Expo Router | iOS/Android 普通用户体验 |
| Web UI | Tailwind CSS + shadcn/ui | 可访问、易维护的响应式界面 |
| App UI | NativeWind + 自有组件 | 原生导航与触控体验 |
| 表单/校验 | React Hook Form + Zod | 前后端共享输入契约 |
| 服务端状态 | TanStack Query | App 数据缓存、重试与失效管理 |
| 数据库 | Supabase PostgreSQL + PostGIS | 交易、时段、库存、地理位置与报表 |
| 身份认证 | Supabase Auth | 邮箱登录、OAuth、会话管理 |
| 授权 | PostgreSQL Row Level Security + 服务端策略 | 用户、组织和管理员的数据隔离 |
| 文件 | Supabase Storage | 场地图、活动图、组织资料 |
| 后端逻辑 | Next.js Route Handlers/Server Actions + PostgreSQL functions | 支付、库存、审核和管理流程 |
| 异步任务 | Supabase Cron/Queues 或托管工作流（按需求引入） | 过期锁单、邮件、webhook 重试 |
| 支付 | Stripe Connect + Stripe Checkout/Payment Element | 平台支付、身份验证、退款与分账 |
| 邮件 | Resend + React Email | 登录外的交易邮件与运营通知 |
| 推送 | Expo Notifications | App 订单与活动提醒 |
| 地图 | Mapbox 或 Google Maps（成本评估后确定） | 地址搜索、地图和距离筛选 |
| 监控 | Sentry | Web/App 错误与性能监控 |
| 产品分析 | PostHog（获得有效 consent 后） | 漏斗与功能使用分析 |
| Web 部署 | Vercel | 预览环境与生产部署 |
| App 构建 | EAS Build / Submit / Update | 原生构建、商店提交和安全 OTA 更新 |
| CI | GitHub Actions | lint、typecheck、测试、迁移检查 |
| 测试 | Vitest + Testing Library + Playwright + Maestro | 单元、组件、Web E2E、App E2E |

版本号在真正 scaffold 时锁定，避免架构文档很快过期；依赖升级由 Renovate 或 Dependabot 管理。

## 2. 为什么替换旧架构

### Helix 图数据库 → PostgreSQL/PostGIS

这个产品的核心是订单、付款、时间段和有限库存，最需要的是事务、约束、锁和审计，而不是图遍历。PostgreSQL 更适合：

- 防止同一空间在同一时段重复确认；
- 防止高并发售票超卖；
- 保证订单、付款和票券状态一致；
- 使用 PostGIS 完成“距离我多远”等位置查询；
- 用 SQL 直接完成运营报表。

好友图谱和推荐如果未来真的成为核心，可在 PostgreSQL 中先实现；不应为远期 stretch goal 提前引入图数据库。

### Cognito + API Gateway + Lambda + CDK → Supabase + 少量服务端逻辑

旧 AWS 组合本身可行，但对小团队的早期产品意味着多套配置、IAM、部署和本地模拟。Supabase 将 PostgreSQL、Auth、Storage 和行级权限放在同一平台，减少运维面。支付 webhook、管理员操作和跨表事务仍必须走可信服务端，不能把 service role key 放入客户端。

如果客户未来明确要求全 AWS、已有 AWS 运维团队或签署了相应企业合同，再考虑迁移到 RDS PostgreSQL、Cognito、S3、Lambda 和 EventBridge；领域模型与客户端契约保持可迁移。

### Redux → TanStack Query + 局部状态

旧项目把 API 数据放进 Redux slices。新版中：

- 服务端数据由 TanStack Query 管理；
- 表单由 React Hook Form 管理；
- 登录会话由 Auth SDK 管理；
- 少量界面状态使用 React state；
- 只有出现真正复杂的跨页面客户端状态时才引入 Zustand。

### Web 与 App 的共享边界

共享以下内容：

- 领域类型和枚举；
- Zod schemas；
- 数据访问接口/API client；
- 日期、金额和权限工具；
- 设计 token 与品牌资源。

不强求共享 Web 和 React Native 的呈现组件。强行“一套 UI 跑所有端”通常会牺牲 SEO、可访问性或原生交互，并增加调试成本。

## 3. 建议仓库结构

```text
.
├── apps/
│   ├── web/                 # Next.js 公共站点 + dashboards + server routes
│   └── mobile/              # Expo iOS/Android app
├── packages/
│   ├── api-client/          # Typed client and query keys
│   ├── domain/              # Zod schemas, enums, business types
│   ├── config/              # Shared TypeScript/lint configuration
│   ├── design-tokens/       # Colours, spacing, typography primitives
│   └── test-utils/
├── supabase/
│   ├── migrations/          # Reviewed, versioned SQL migrations
│   ├── seed.sql             # Local development fixtures
│   └── functions/           # Only where an Edge Function is justified
├── docs/
│   ├── adr/                 # Architecture decision records
│   ├── PRODUCT_BRIEF.md
│   ├── TECH_STACK.md
│   └── ROADMAP.md
└── .github/workflows/
```

## 4. 核心数据模型

首批实体应包括：

- `profiles`
- `organizations`, `organization_members`
- `venues`, `venue_spaces`, `venue_media`
- `availability_rules`, `availability_exceptions`
- `venue_hire_requests`, `venue_hire_status_history`
- `events`, `event_sessions`, `ticket_types`
- `orders`, `order_items`, `inventory_holds`
- `tickets`, `ticket_scans`
- `payments`, `refunds`, `payout_accounts`
- `favorites`, `notification_preferences`
- `audit_logs`

所有金额使用最小货币单位整数（例如 pence）并存储货币代码；所有时间在数据库中使用 `timestamptz`，场地另存 IANA timezone；重要状态变化写入 append-only history/audit 表。

## 5. API 与安全边界

- 公共读取可通过受 RLS 保护的 Supabase client；
- 普通用户只能读写自己的订单、收藏和资料；
- 组织数据通过 membership + role 策略授权；
- 创建支付、确认库存、退款、核销和管理员操作只允许可信服务端执行；
- Stripe webhook 是付款状态事实来源，处理必须幂等；
- 票务库存锁定与下单必须在数据库事务中完成；
- 图片上传使用有时效的 signed URL，并验证文件类型、大小和所有权；
- 管理员操作、退款、审核和权限变更全部进入审计日志；
- 生产、预览和本地环境使用独立数据库与密钥。

## 6. GDPR / UK 合规基线

- 项目启动时完成数据地图、保留期限和 DPIA 判断，不能等上线前补；
- 默认最小化收集个人信息，participant 信息仅在活动确实需要时收集；
- 营销 consent 与服务通知分开，记录 consent 版本和时间；
- 提供数据导出、删除请求与账号停用流程；
- 使用欧洲/英国可接受的数据区域，并与供应商签署/核对 DPA；
- 分析、广告和非必要 cookie 在获得有效 consent 前不启用；
- 日志与错误追踪不得记录支付卡、密码、token 或完整敏感表单；
- 若服务可能被儿童访问，需要单独评估年龄适宜设计要求。

合规责任不能仅靠技术栈解决，Merchant of Record、退款、税务、保险、KYC 和平台责任必须由客户与法律/财务顾问确认。

## 7. 暂不采用

- Helix/Neo4j 等图数据库；
- 为 MVP 拆微服务；
- GraphQL（当前领域没有抵消额外复杂度的需求）；
- Kubernetes；
- 自建认证或自建支付表单；
- 同时使用多个全局状态库；
- 让 App 与 Web 共享全部 UI 组件；
- 在业务规则未确认前构建自动场地重分配或推荐系统。

## 8. 需要在开发前验证的架构风险

1. Stripe Connect 的账户类型、charge 模式与 Merchant of Record 责任；
2. Supabase 所选区域、DPA、备份/PITR 和客户的数据驻留要求；
3. 场地可用性是规则型日历还是外部日历同步；
4. 场地租用与票务退款是否需要平台审批；
5. 首版票务容量是否按场次、票种、区域或座位管理；
6. App Store 对实物/线下服务支付路径的当前政策确认。

