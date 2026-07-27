# Independent Venue Booking Platform

Independent Venue Booking Platform（暂称 IVBA）是一个服务英国独立艺术空间的双边平台：

- 场地方发布和管理空间；
- 活动主办方寻找场地、提交租用申请并发布活动；
- 普通用户发现本地活动、购票和管理订单；
- Artspace Lifespace 负责审核、运营和数据分析。

## 一句话架构

Monorepo：`apps/web`（Next.js）+ `apps/mobile`（Expo/React Native）+ `services/api`（Go）+ `openapi/` 契约；PostgreSQL/PostGIS 为业务事实来源。

## 仓库结构

```text
apps/web                 Next.js website
apps/mobile              Expo + Expo Router (React Native)
packages/api-client      OpenAPI → TS + RTK Query base API
packages/store           Shared Redux store setup
packages/domain          Shared enums / domain constants
packages/design-tokens   Shared design tokens
services/api             Go API + worker + Goose migrations
openapi/openapi.yaml     API contract source of truth
docs/                    Product, ERD, knowledge notes
```

## 本地快速开始

前置：Node 20、pnpm、Go 1.24+、Docker Desktop。

```bash
cp .env.example .env
pnpm install

make up          # Postgres/PostGIS
make migrate     # M1 schema
make seed        # optional demo rows
make api         # Go API on :8080

# another terminal
pnpm dev:web     # http://localhost:3000
pnpm dev:mobile  # Expo
```

常用命令：

| 命令 | 作用 |
| --- | --- |
| `make up` / `make down` | 启停数据库 |
| `make migrate` / `make seed` | 迁移 / 种子数据 |
| `make api` / `make worker` | 跑 API / worker |
| `make test-go` | Go 测试 |
| `pnpm generate` | OpenAPI → TS schema |
| `pnpm typecheck` / `pnpm build` | 类型检查 / 构建 |

## 文档

1. [知识点文件夹](docs/knowledge/README.md)
2. [数据模型](docs/DATA_MODEL.md)
3. [状态机](docs/STATE_MACHINES.md)
4. [本机环境](docs/SETUP.md)
5. [产品 / 需求 / 技术栈 / 路线图](docs/)

## 当前阶段

脚手架已就绪（Phase 1 骨架）。下一步是第一个业务切片：

> 场地草稿 → 管理员审核 → 公开搜索 → 租用申请
