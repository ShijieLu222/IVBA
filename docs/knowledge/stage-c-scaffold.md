# Stage C · 工程脚手架（Phase 1）

> 前置：[Stage B](./stage-b-product-prep.md)  
> 决策依据：[TECH_STACK.md](../TECH_STACK.md)

---

## 目标

把仓库从「只有文档」变成「Web / App / Go / OpenAPI / DB 能本地跑起来」，**先不写完整业务**。

---

## 清单

- [x] 初始化 pnpm workspaces + Turborepo
- [x] 建 `apps/web`（Next.js）、`apps/mobile`（Expo）、`services/api`（Go）
- [x] 建 `openapi/openapi.yaml` 最小骨架
- [x] 接通 OpenAPI → TS（`openapi-typescript`）+ RTK Query base API
- [x] Docker Compose：Postgres/PostGIS + migrate + seed
- [x] Makefile：`make up/migrate/seed/api/test-go/generate/...`
- [x] GitHub Actions：typecheck / web build / go test / migration

> 说明：完整 `oapi-codegen` strict server 可在第一个业务接口落地时再接；当前 Go 手写 `/healthz` 与 stub `/v1/me`，TS 侧已能 generate。

---

## 本地验证

```bash
cp .env.example .env
pnpm install
make up && make migrate && make seed
make api
# 另开终端
curl http://localhost:8080/healthz
pnpm dev:web
pnpm dev:mobile
```

---

## 退出条件

- [x] Web / App / Go 脚手架可构建或启动
- [x] 数据库可从空库 migrate + seed
- [ ] 预览部署可访问（可稍后接 Vercel）

下一阶段 → [Stage D · 第一个业务切片](./stage-d-first-slice.md)
