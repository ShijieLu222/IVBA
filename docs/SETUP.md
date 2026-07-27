# 本机环境初始化

目标：在写业务代码前，把本地工具链装齐，并能跑起 PostgreSQL/PostGIS。

学习节奏与阶段计划见 [knowledge/](./knowledge/README.md)。  
工具分别干什么、带例子：见 [knowledge/stage-a-environment-tools.md](./knowledge/stage-a-environment-tools.md)。

---

## 1. 需要安装的工具

| 工具 | 用途 | 建议版本 |
| --- | --- | --- |
| Node.js | Web / App / 工具链 | 20 LTS |
| pnpm | monorepo 包管理 | 9+ / 10+ |
| Go | API / worker | 1.22+（本机已见 1.24） |
| Docker Desktop | 本地 Postgres/PostGIS、后续 API 容器 | 最新稳定版 |
| Git | 版本管理 | 已有即可 |
| Watchman（可选） | Expo/Metro 文件监听 | Homebrew 安装 |
| Make | 统一常用命令 | macOS 自带 |

可选后续再装：

- Xcode / Android Studio：真正跑 iOS/Android 模拟器时再装
- `sqlc`、`goose`、`oapi-codegen`：脚手架阶段用 Go/`go run` 或全局安装

---

## 2. macOS 安装命令

### 2.1 已有的话先检查

```bash
node -v
pnpm -v
go version
git --version
docker -v
docker compose version
```

### 2.2 缺失时用 Homebrew 安装

```bash
# Node（若没有）
brew install node@20

# pnpm（若没有）
brew install pnpm
# 或
corepack enable && corepack prepare pnpm@latest --activate

# Go（若没有）
brew install go

# Docker Desktop（本项目当前最关键缺失项）
brew install --cask docker
```

安装 Docker Desktop 后：

1. 打开 **Docker.app**，完成首次启动与权限授权
2. 等到菜单栏鲸鱼图标就绪
3. 再执行 `docker -v` 与 `docker compose version`

### 2.3 验证 Go 环境

```bash
go env GOPATH GOROOT
mkdir -p "$HOME/go/bin"
echo 'export PATH="$PATH:$HOME/go/bin"' >> ~/.zshrc
source ~/.zshrc
```

脚手架阶段常用工具（可稍后装）：

```bash
go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest
go install github.com/pressly/goose/v3/cmd/goose@latest
go install github.com/oapi-codegen/oapi-codegen/v2/cmd/oapi-codegen@latest
```

---

## 3. 本地数据库（Phase 1 会进仓库）

脚手架完成后，预期会有类似文件：

```text
docker-compose.yml          # Postgres + PostGIS
services/api/db/migrations/ # Goose SQL
```

届时常用命令（以 Makefile 为准）：

```bash
docker compose up -d        # 启动数据库
make migrate                # 执行迁移
make seed                   # 写入开发数据
make dev                    # 启动 Web / API（具体以 Makefile 定义为准）
```

在脚手架还没生成前，你可以先手动验证 Docker：

```bash
# 推荐直接用仓库 compose（映射到本机 5433，避开本机 Postgres 的 5432）
docker compose up -d
```

或临时单容器：

```bash
docker run --rm -p 5433:5432 \
  -e POSTGRES_PASSWORD=postgres \
  postgis/postgis:16-3.4
```

```bash
docker ps
# 能看到容器在跑即表示 Docker 可用
```

用完后 `docker compose down`，或对临时容器 `Ctrl+C`。

---

## 4. 账号与外部服务（现在只需注册/了解，不必全接）

| 服务 | 何时需要 | 现在做什么 |
| --- | --- | --- |
| GitHub | 立刻 | 确认仓库权限、准备开 PR |
| Supabase Auth | Phase 2 登录前 | 先注册，建开发项目即可 |
| Stripe | Phase 3/4 支付前 | 先开 test mode 账号；资金流未确认前别写死 |
| Vercel | Web 预览部署 | Phase 1 末再接 |
| Expo / EAS | App 构建 | Phase 1 可先用 Expo Go |
| Resend | 交易邮件 | 有通知需求时再接 |
| S3 兼容存储 | 图片上传 | 场地媒体前再接 |
| Mapbox / Google Maps | 地图与地址 | 搜索/地图 UI 前再评估 |

原则：**本地能跑通身份 + DB + API 之前，不要同时开一堆云服务。**

---

## 5. 推荐目录与环境文件习惯

- 密钥只放 `.env`（已被 gitignore）
- 仓库只提交 `.env.example`（无真实密钥）
- 至少区分：`local` / `test` / `staging` / `production`
- **生产数据禁止拷到本地**

脚手架阶段会补一份 `.env.example`，字段大致包括：

```bash
DATABASE_URL=postgres://postgres:postgres@localhost:5433/ivba?sslmode=disable
API_ADDR=:8080
AUTH_ISSUER=
AUTH_AUDIENCE=
# Stripe / S3 / Resend 等稍后按需加入
```

---

## 6. 完成标准（勾选）

环境就绪 = 下面全部为是：

- [ ] `node -v` 显示 v20+
- [ ] `pnpm -v` 可用
- [ ] `go version` 可用
- [ ] Docker Desktop 已启动，`docker compose version` 成功
- [ ] 能拉起 PostGIS 容器并监听 `5433`（避免和本机 Postgres 抢 5432）
- [ ] 已读 [knowledge/stage-a-environment-tools.md](./knowledge/stage-a-environment-tools.md)
- [ ] 已读 [knowledge/stage-a-warmup.md](./knowledge/stage-a-warmup.md)

完成后，下一步不要急着做首页，而是：

1. 按知识点 Stage A 做热身（TS / SQL / Go / HTTP）
2. 初始化 monorepo 脚手架（Stage C）
3. 第一个业务切片：场地草稿 → 审核 → 公开 → 租用申请
