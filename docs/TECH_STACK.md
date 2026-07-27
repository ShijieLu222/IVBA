# 技术栈与架构决策

## 1. 已确认的方向

- 后端：Go；
- App：React Native、Expo、Expo Router；
- 数据库：PostgreSQL/PostGIS；
- 前端状态：Redux Toolkit + RTK Query API slices；
- 接口：REST + OpenAPI；
- 架构：模块化单体，首版不拆微服务。

## 2. 推荐的完整技术栈

| 层级 | 选择 | 用途 |
| --- | --- | --- |
| 仓库 | pnpm workspaces + Turborepo + Go modules | 管理 Web、App、共享 TS 包和 Go API |
| Website | Next.js App Router + TypeScript | 公共 SEO 页面与全部管理后台 |
| Mobile App | React Native + Expo + Expo Router | iOS/Android 活动发现、购票和票券 |
| Web UI | Tailwind CSS + shadcn/ui | 响应式、可访问的 Web UI |
| App UI | NativeWind + 自有 RN 组件 | 原生触控与跨平台样式 |
| 前端状态 | Redux Toolkit + RTK Query | API cache、鉴权视图和跨页面状态 |
| 表单 | React Hook Form | Web/App 表单状态与错误展示 |
| API 契约 | OpenAPI 3.0 | 接口事实来源、文档与代码生成 |
| Go HTTP | Go `net/http` ServeMux | REST API 和 middleware |
| Go API 生成 | oapi-codegen strict server | 生成 Go 类型和 handler interface |
| 数据访问 | pgx/v5 + sqlc | PostgreSQL driver 与类型安全 SQL |
| 数据迁移 | Goose，仅 SQL migrations | 可审查、可回滚的 schema 版本 |
| 数据库 | PostgreSQL + PostGIS | 事务、时段、库存、位置和报表 |
| Authentication | 推荐 Supabase Auth | 邮箱/OAuth/MFA；Go 验证 JWT/JWKS |
| Authorization | Go policy/service 层 + DB constraints | 用户、组织成员和管理员权限 |
| 文件存储 | S3-compatible object storage | 图片/资料与 signed upload URL |
| 支付 | Stripe Connect | 收款、平台费、退款、KYC 和分账 |
| 邮件 | Resend | 交易邮件、邀请和状态通知 |
| App 推送 | Expo Notifications | 订单、申请和活动提醒 |
| 地图 | Mapbox 或 Google Maps，后续评估 | 地址输入与地图；PostGIS 负责距离查询 |
| Go 日志 | `log/slog` JSON | 结构化 request/job 日志 |
| 可观测性 | OpenTelemetry + Sentry | trace/metrics 和前后端错误监控 |
| 产品分析 | PostHog，有效 consent 后启用 | 搜索、申请和购票漏斗 |
| Web 部署 | Vercel | Next.js preview/production |
| App 构建 | EAS Build / Submit / Update | 构建、商店发布和安全 OTA |
| Go 部署 | Docker；托管商待预算确认 | API 与 worker 同镜像、不同 command |
| CI | GitHub Actions | generate、lint、typecheck、test、migration |
| 测试 | Go test、testcontainers-go、Jest/RNTL、Playwright、Maestro | 后端、组件与 E2E |

初始化时锁定当前受支持版本，使用 Renovate 或 Dependabot 管理升级。

## 3. Website 不能只写“React Native + Expo”

App 与 Website 的需求不同：

- App 强调原生导航、推送、相机扫码、票券和触控；
- 公共 Website 强调 SEO、分享预览、无障碍和首次加载；
- 管理后台强调桌面表格、复杂表单、批量操作和键盘使用。

推荐结构是：

- `apps/mobile` 使用 Expo；
- `apps/web` 使用 Next.js；
- 两端共享 OpenAPI 生成的 RTK Query client、Redux 约定、领域枚举、设计 tokens 和纯工具；
- 不强求共享所有 UI 组件。

Expo Web 可用于原型或简单登录后页面，但不建议成为公开网站的唯一方案。当前 Expo Router SSR 仍处于 alpha，不应让核心公开页面依赖未稳定能力。未来稳定后再通过 ADR 评估。

## 4. Go 后端

### 4.1 模块化单体

一个 API 服务和一个 worker，共享领域代码与数据库：

```text
services/api/
├── cmd/
│   ├── api/                 # HTTP server
│   └── worker/              # async jobs
├── internal/
│   ├── auth/
│   ├── organizations/
│   ├── venues/
│   ├── hires/
│   ├── events/
│   ├── ticketing/
│   ├── payments/
│   ├── notifications/
│   └── platformadmin/
├── db/
│   ├── migrations/
│   ├── queries/
│   └── generated/
├── go.mod
└── Dockerfile
```

模块分 transport、service/use-case 和 repository/query 边界，但不建立没有价值的抽象层。模块之间通过明确方法或领域事件调用，禁止任意跨模块改表。

### 4.2 HTTP 与 OpenAPI

- 使用标准库 `net/http` ServeMux，首版不引入 Gin/Fiber 等框架；
- `openapi/openapi.yaml` 是接口唯一事实来源；
- oapi-codegen 生成 Go 类型与 strict handler interface；
- `@rtk-query/codegen-openapi` 生成 TypeScript API slice；
- 一个 base API slice，通过 endpoint injection 按模块拆文件；
- 错误统一为 `code`, `message`, `field_errors`, `request_id`；
- API 从 `/v1` 开始；
- 创建订单、支付和退款支持 idempotency key。

生成代码提交进 Git，CI 重新生成并检查无差异，防止契约漂移。

### 4.3 PostgreSQL 访问与规则

使用 pgx pool + sqlc，不采用全功能 ORM。预订和售票需要明确控制 transaction、row lock、isolation、PostGIS、range 与 exclusion constraint；SQL 比 ORM 更直接可审查。

- 金额使用最小货币单位整数并存 `currency`；
- 时间使用 `timestamptz`，场地另存 IANA timezone；
- 经纬度使用 `geography(Point, 4326)`；
- 已确认场地租用使用时间范围 + GiST exclusion constraint 防重叠；
- 门票库存锁定与订单创建在同一事务中；
- Stripe event ID 设唯一约束，确保 webhook 幂等；
- 关键状态历史与管理员操作写 append-only 表。

### 4.4 异步任务

首版不引入 Kafka，也不因邮件而拆服务：

- 业务事务同时写 transactional outbox；
- Go worker 领取任务并处理重试；
- 任务包含唯一 key、attempt、available_at 和最终失败状态；
- 库存锁过期、webhook 后续处理、邮件和推送由 worker 执行；
- 规模真正超过 PostgreSQL job queue 后，再评估专用队列。

## 5. RTK Query API slices 规则

继续使用 RTK Query 合理，但不要把所有状态都做成 Redux slice：

- API 服务端数据：RTK Query；
- token：Auth SDK + Expo SecureStore，不明文进入 Redux persist/AsyncStorage；
- Redux 只保留最小 session view；
- 表单：React Hook Form；
- 短暂 UI 状态：component state；
- 真正跨页面客户端状态：普通 Redux slice；
- 不同时引入 TanStack Query、SWR 或 Zustand；
- tag 按实体/列表设计，mutation 后精确 invalidation；
- 持久化 cache 不能成为业务事实来源。

## 6. Authentication 与 Authorization

不自建密码系统：

1. Expo/Next.js 向托管 Auth 登录；
2. 客户端携带短期 access token 调用 Go API；
3. Go 通过 issuer、audience 与 JWKS 验证 JWT；
4. Go 从 `profiles`, `organizations`, `organization_members` 判断权限；
5. 管理员、退款和发布审核二次授权并写审计日志。

Auth provider 负责“你是谁”；Go 负责“你能对哪个组织的什么资源做什么”。不要把长期业务角色写进不能及时失效的 JWT。

## 7. 仓库结构

```text
.
├── apps/
│   ├── web/                     # Next.js
│   └── mobile/                  # Expo
├── packages/
│   ├── api-client/              # generated RTK Query API
│   ├── store/                   # shared Redux setup
│   ├── domain/
│   ├── design-tokens/
│   └── config/
├── services/
│   └── api/                     # Go API + worker + migrations
├── openapi/
│   └── openapi.yaml
├── docs/
│   └── adr/
├── pnpm-workspace.yaml
├── turbo.json
└── Makefile
```

Turborepo 只管理 TypeScript workspaces；Go 由 Go toolchain 管理。根目录 Makefile 提供 `make dev/test/generate/migrate`，不引入 Bazel。

## 8. 环境与部署

至少设置 local、test、staging、production 四种环境：

- local：Docker Compose Postgres/PostGIS + seed；
- test：CI 临时 Postgres/PostGIS；
- staging：独立 Auth、DB、storage、Stripe test mode；
- production：独立账户/项目、备份、PITR、告警和最小权限。

Go API 使用 non-root multi-stage Docker image；API/worker 同镜像不同 command；migration 是单次受控 release step；secrets 只进入部署平台 secret manager。API 与数据库选择相近的欧洲区域。

具体 Go/数据库托管商需要结合客户预算、数据驻留、备份/PITR 与运维能力确定，不能只按开发偏好决定。

## 9. 核心数据模型

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
- `outbox_jobs`, `webhook_events`, `audit_logs`

场地租用与门票订单必须分开，不能共用一张含糊的 `bookings` 表。

## 10. 质量门槛

每个 PR 至少运行：

- OpenAPI/Go/RTK Query generate drift check；
- Go format、vet/static analysis、unit tests；
- 真实 Postgres/PostGIS container integration tests；
- TypeScript typecheck、lint、component tests；
- migrations 从空库执行与升级测试；
- Web Playwright；
- App Maestro（主干或发布构建）。

支付、超卖、时段冲突、重复 webhook、越权和退款必须有后端集成测试。

## 11. 暂不采用

- Helix/Neo4j、GraphQL；
- 微服务、Kubernetes、Kafka；
- 重型 Go Web framework 或全功能 ORM；
- 自建密码认证、自建支付表单；
- Redis（真实瓶颈出现前）；
- RTK Query 之外的 server-state library；
- 强行共享 Web/RN 全部 UI；
- 业务规则未确认前的自动重分配或推荐系统。

## 12. 仍需确定

### 开发前必须确定

1. Website 使用独立 Next.js（推荐），还是接受 Expo Web 限制；
2. Auth provider 与邮箱密码、magic link、Google/Apple、MFA 范围；
3. PostgreSQL 托管商、区域、备份、PITR 和连接池；
4. object storage、图片处理与 CDN；
5. Stripe Connect 模式、Merchant of Record、费用、退款/拒付责任；
6. 场地租用是即时确认还是 request/quote/accept；
7. 票务按场次/票种，还是需要分区/选座；
8. 地图/地址 provider 与 geocoding 数据使用权限；
9. 首发地区、货币、税务、时区和语言；
10. GDPR 保留、删除、营销 consent 与未成年人范围。

### 上线前确定

1. Go/数据库托管商及 staging/production 拓扑；
2. 邮件域名、模板与退信处理；
3. App push 深链和通知偏好；
4. SLO、告警接收人和备份恢复演练；
5. App Store/Play Store 账号、隐私标签和发布负责人；
6. 审核、退款、封禁和客服权限矩阵。

## 13. 下一项产物

scaffold 前先完成：

1. 系统上下文图与容器图；
2. 核心 ERD；
3. 场地申请与门票订单状态机；
4. 首个 OpenAPI vertical slice：登录用户提交场地租用申请。
