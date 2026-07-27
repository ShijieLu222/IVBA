# 技术栈全景与学习优先级

> 详细架构决策见 [TECH_STACK.md](../TECH_STACK.md)。  
> 本机工具解释见 [stage-a-environment-tools.md](./stage-a-environment-tools.md)。

---

## 1. 全景图

```text
apps/web          Next.js + TS + Tailwind + shadcn
apps/mobile       Expo + RN + Expo Router + NativeWind
packages/*        共享 domain / api-client / store / tokens
openapi/          OpenAPI 契约（前后端共同真相）
services/api      Go 模块化单体 + worker
                  pgx + sqlc + Goose
PostgreSQL+PostGIS
Supabase Auth / Stripe / Resend / S3 / Map*
CI: GitHub Actions
```

---

## 2. 学习标记

- **必会**：能读懂、能改、能向 AI 说清需求
- **会用**：会跑命令、会改配置、会排查常见错
- **知道即可**：先会调用，细节后补

### P0：现在立刻要复习（开工前 1–2 周）

| 技术 | 级别 | 在本项目里干什么 |
| --- | --- | --- |
| Git + GitHub | 必会 | 分支、PR、CI |
| TypeScript | 必会 | Web/App/共享包 |
| React | 必会 | UI |
| HTTP / REST / JSON | 必会 | 前后端通信 |
| OpenAPI | 必会 | 接口事实来源 |
| SQL + PostgreSQL | 必会 | 业务真相 |
| Go 基础 | 必会 | API / worker |
| Docker Compose | 会用 | 本地 DB |
| pnpm + monorepo | 会用 | 多包仓库 |

### P1：Phase 1–2 边做边补

Next.js、Tailwind/shadcn、RTK Query、React Hook Form、Expo、NativeWind、pgx/sqlc、Goose、oapi-codegen、JWT/JWKS、组织 RBAC。

### P2：Phase 3–5 再深入

PostGIS、Stripe Connect、outbox、S3、Resend、Push、Playwright/Maestro、OTel/Sentry、部署、UK GDPR 基础。

---

## 3. 明确先不学

- 微服务、Kubernetes、Kafka
- GraphQL、Neo4j
- 重型 Go Web 框架、全功能 ORM
- 自建密码系统、自建收卡页
- 再引 TanStack Query / Zustand（已选 RTK Query）
- 强行共用 Web/RN 全部 UI

---

## 4. 常见弯路

1. 先画全站 UI → 验不了交易规则  
2. 先接 Stripe → 商业规则未确认会返工  
3. 让 AI 一次生成微服务 → 违背决策  
4. 角色写死进 JWT → 权限难以及时失效  
5. 前端算价格/库存 → 必须服务端重算  
6. 本地用生产数据 → 违规且危险  
