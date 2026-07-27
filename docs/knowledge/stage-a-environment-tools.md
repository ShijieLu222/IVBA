# Stage A · 本机工具链：现在安装的都是什么？

> 目标：搞清楚「电脑上这些命令各自是干什么的」，能自己检查版本、跑几个最小例子。  
> 安装步骤清单见 [SETUP.md](../SETUP.md)。

---

## 0. 先看一张「谁服务谁」

```text
你写代码 / 用 AI 改代码
        │
        ├─ Git          记录每一次改动（时光机）
        │
        ├─ Node.js      跑 JavaScript/TypeScript（Web、App 工具链）
        │     └─ pnpm   下载/管理前端依赖包
        │
        ├─ Go           跑后端 API / worker
        │
        ├─ Watchman     盯着文件有没有改（给 Expo/Metro 加速）
        │
        └─ Docker       在隔离「小电脑」里跑 Postgres 等服务
              └─ 通常用 brew 安装 Docker Desktop
```

一句话记忆：

| 工具 | 像什么 |
| --- | --- |
| **brew** | App Store，但面向开发者命令行软件 |
| **Docker** | 能一键开/关的「迷你服务器房间」 |
| **Node** | 前端世界的「运行引擎」 |
| **pnpm** | 前端的「依赖快递员」 |
| **Go** | 后端世界的「运行引擎 + 编译器」 |
| **Git** | 代码的「版本录像机」 |
| **Watchman** | 「文件变动哨兵」 |

---

## 1. Homebrew（`brew`）—— 先说它，因为 Docker 用它装

### 是干什么的？

Homebrew 是 macOS 上最常用的**包管理器**：用一行命令安装/升级开发工具，而不用一个个去官网点下载。

### 两个常见命令形态

```bash
brew install git          # 装「公式」(formula)：命令行工具
brew install --cask docker  # 装「木桶」(cask)：带图形界面的 App，如 Docker Desktop
```

- **formula**：多数是终端里的二进制（`git`、`node`、`go`）
- **cask**：多数是 `/Applications` 里的 App（Docker、VS Code 等）

### 简单例子

```bash
brew --version            # 看 brew 自己版本
brew list                 # 看已装过哪些 formula
brew list --cask          # 看已装过哪些 App 类软件
brew search postgresql    # 搜索可安装的东西
```

### 和本项目的关系

你要装 Docker Desktop 时，推荐：

```bash
brew install --cask docker
```

装完后还要**手动打开一次** `/Applications/Docker.app`，同意权限，等菜单栏鲸鱼图标变就绪，终端里的 `docker` 命令才会真正可用。

> 上次自动安装失败，是因为链接系统路径需要输入 mac 密码（sudo）。请在你自己的终端里跑上面这条命令。

---

## 2. Docker Desktop —— 你现在最该补上的缺口

### 是干什么的？

Docker 用来跑**容器**：把某个服务（比如 PostgreSQL 数据库）连同它的系统依赖，打包成一个隔离环境。  
好处：

- 你不用在 mac 上「永久安装」Postgres，搞脏系统
- 队友用同一份 `docker-compose.yml`，环境一致
- 用完可以关掉、删掉，像开关房间灯

**Docker Desktop** = 给 mac 用的 Docker 图形客户端 + 后台引擎。  
`brew install --cask docker` 装的就是它。

### 在本项目里干什么？

本地跑：

- PostgreSQL + PostGIS（业务数据库、地理位置）
- 以后也可能跑 Go API 容器

没有 Docker，本地数据库环境会很难统一。

### 安装后检查

```bash
docker -v
docker compose version
```

### 简单例子：跑一个临时网页服务器容器

```bash
# 拉取并运行官方 nginx，映射到本机 8080 端口
docker run --rm -p 8080:80 nginx:alpine
```

浏览器打开 <http://localhost:8080>，能看到 nginx 欢迎页。  
终端里 `Ctrl+C` 结束；`--rm` 表示停了就自动删掉这个容器。

### 简单例子：跑一个临时 Postgres（和本项目更接近）

```bash
docker run --rm -p 5432:5432 \
  -e POSTGRES_PASSWORD=postgres \
  postgis/postgis:16-3.4
```

含义拆开看：

| 片段 | 意思 |
| --- | --- |
| `docker run` | 启动一个容器 |
| `--rm` | 退出后自动清理 |
| `-p 5432:5432` | 把容器 5432 端口映射到你电脑 5432 |
| `-e POSTGRES_PASSWORD=...` | 设置环境变量（这里是数据库密码） |
| `postgis/postgis:16-3.4` | 镜像名：带 PostGIS 扩展的 Postgres |

脚手架做好后，日常会改成更省事的：

```bash
docker compose up -d      # 按仓库配置后台启动
docker compose down       # 关掉
docker compose logs -f    # 看日志
```

### 你需要记住的最小命令集

```bash
docker ps                 # 正在跑哪些容器
docker images             # 本地有哪些镜像
docker stop <容器ID>      # 停掉某个容器
docker compose up -d      # （项目里）一键起服务
```

---

## 3. Node.js 20 —— 前端与工具链的运行时

### 是干什么的？

Node.js 让你可以在**电脑终端**里运行 JavaScript/TypeScript，而不是只在浏览器里跑。

本项目里：

- Next.js（Website）靠 Node 启动开发服务器、构建
- Expo（App）的 CLI、打包、Metro 打包器也依赖 Node
- 很多前端工具（lint、codegen、测试）都是 Node 程序

**20** 是主版本号（LTS 长期支持线），适合生产项目。

### 检查

```bash
node -v    # 例如 v20.19.6
npm -v     # Node 通常自带 npm；我们主要用 pnpm
```

### 简单例子：直接跑一段 JS

```bash
node -e "console.log('hello from node', 1 + 1)"
```

### 简单例子：建一个最小脚本文件

```bash
mkdir -p /tmp/node-demo && cd /tmp/node-demo
printf "console.log('IVBA warmup')\n" > hello.js
node hello.js
```

输出应是：`IVBA warmup`。

### 和 TypeScript 的关系（先建立直觉）

你写的是 `.ts` / `.tsx`，通常要先被工具编译/转译，再由 Node 或浏览器执行。  
现在只要知道：**装 Node = 给前端世界装发动机**。

---

## 4. pnpm —— 前端依赖包管理器

### 是干什么的？

前端项目会依赖很多第三方库（React、Next、Expo…）。  
**pnpm** 负责：

- 按 `package.json` 下载依赖到 `node_modules`
- 在 monorepo（一个仓库多个子项目）里共享依赖，省空间、更干净
- 运行脚本：`pnpm dev`、`pnpm test` 等

本项目计划用 **pnpm workspaces + Turborepo**，所以选 pnpm，而不是只靠 npm。

### 检查

```bash
pnpm -v    # 例如 10.x
```

### 简单例子：初始化一个玩具项目

```bash
mkdir -p /tmp/pnpm-demo && cd /tmp/pnpm-demo
pnpm init
pnpm add lodash
node -e "const _ = require('lodash'); console.log(_.capitalize('ivba'))"
```

你应该看到：`Ivba`。

常用心态：

```bash
pnpm install          # 按 lockfile 装齐依赖
pnpm add <包名>       # 新增依赖
pnpm remove <包名>    # 移除依赖
pnpm run <脚本名>     # 跑 package.json 里 scripts 定义的命令
```

仓库脚手架建好后，你更多会在**仓库根目录**跑：

```bash
pnpm install
pnpm --filter web dev
```

---

## 5. Go 1.24 —— 后端 API 的语言与工具链

### 是干什么的？

Go（Golang）是本项目后端语言。用它写：

- HTTP API（场地、申请、订单…）
- worker（发邮件、处理过期库存锁等）

`go` 命令既是**编译器**也是**包管理/测试工具**。  
**1.24** 是你机器上的版本号。

### 检查

```bash
go version    # 例如 go1.24.3 darwin/arm64
```

### 简单例子：Hello API（最小后端直觉）

```bash
mkdir -p /tmp/go-demo && cd /tmp/go-demo
go mod init example.com/hello
```

创建 `main.go`：

```go
package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/healthz", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "ok")
	})
	fmt.Println("listening on :8080")
	http.ListenAndServe(":8080", nil)
}
```

运行：

```bash
go run .
```

另开终端：

```bash
curl http://localhost:8080/healthz
```

应返回：`ok`。

这就是以后 Go API 的缩小版：听端口 → 处理路径 → 返回响应。

### 以后你会碰到的 Go 周边（先混个脸熟）

| 工具 | 作用 |
| --- | --- |
| `sqlc` | 把 SQL 生成类型安全的 Go 代码 |
| `goose` | 数据库 migration（建表变更可回放） |
| `oapi-codegen` | 从 OpenAPI 生成 Go handler/类型 |

现在不必装；Stage C 脚手架时再装即可。

---

## 6. Git —— 代码版本管理

### 是干什么的？

Git 记录「谁在什么时候改了什么」。  
你可以：

- 回到旧版本
- 开分支做实验
- 开 PR 让改动可审查
- 和 GitHub 同步

没有 Git，AI vibe coding 也很容易把自己改丢、改乱。

### 检查

```bash
git --version
```

### 简单例子（在本仓库里只读练习）

```bash
cd /Users/ken/Documents/IVBA
git status                 # 工作区现在怎样
git log --oneline -5       # 最近 5 条提交
git branch                 # 当前分支
```

常见工作流（以后写代码时）：

```bash
git checkout -b feat/venue-draft
# ... 改文件 ...
git add .
git commit -m "Add venue draft endpoint"
git push -u origin HEAD
```

先建立直觉即可：**改代码前开分支；改完小步提交。**

---

## 7. Watchman —— 文件变动监听（给 App 开发加速）

### 是干什么的？

Watchman 是 Meta 出的**文件系统监视服务**：高效回答「这些文件有没有改过？」。

Expo / React Native 的 Metro 打包器在开发时要监视大量文件变化。  
有 Watchman 时，文件监听更稳、更快；没有时有时也能跑，但在大项目上更容易慢或怪问题。

### 检查

```bash
watchman version
# 或
which watchman
```

### 简单例子

```bash
# 看 Watchman 是否在跑、监视了什么（可能为空，正常）
watchman watch-list

# 对某个目录建立监视（演示用；用完可删）
watchman watch-project /tmp
watchman watch-del /tmp
```

对本项目：你暂时**不用每天敲 Watchman 命令**；它属于「装好就静默工作」的基础设施。  
等你跑 `apps/mobile` 的 Expo 开发服务器时，它会在背后帮忙。

---

## 8. 一张对照表（背这张就够）

| 工具 | 状态（上次检查） | 一句话 | 你现在要会的 |
| --- | --- | --- | --- |
| Homebrew (`brew`) | 通常已有 | 安装开发软件 | `brew install` / `brew install --cask` |
| Node.js 20 | ✅ | 跑前端与 JS 工具 | `node -v`、`node 文件.js` |
| pnpm | ✅ | 装前端依赖、跑脚本 | `pnpm -v`、`pnpm init`、`pnpm add` |
| Go 1.24 | ✅ | 写/跑后端 | `go version`、`go run .`、`curl` 测一下 |
| Git | ✅ | 版本管理 | `status` / `log` / 以后会分支提交 |
| Watchman | ✅ | 监视文件变化 | 知道它存在即可 |
| Docker Desktop | ❌ 待你本机安装 | 本地跑数据库等服务 | 安装 → 打开 App → `docker run` 小例子 |

---

## 9. 今日动手验收（建议按顺序勾）

- [ ] 终端执行 `node -v`、`pnpm -v`、`go version`、`git --version`、`watchman version`
- [ ] 读懂：`brew install --cask docker` 在装什么
- [ ] 在自己终端安装并打开 Docker Desktop
- [ ] `docker run --rm -p 8080:80 nginx:alpine` 能打开欢迎页
- [ ] （加分）`go run` 出一个 `/healthz`
- [ ] （加分）`pnpm` 玩具项目 `lodash.capitalize` 跑通

完成后进入：[Stage A · 热身清单](./stage-a-warmup.md)。

---

## 10. 常见疑问

**Q：Node 和 Go 为什么两个都要？**  
A：前端生态在 Node；本项目后端选定 Go。各司其职。

**Q：有 npm 为什么还要 pnpm？**  
A：npm 也能装包；pnpm 对 monorepo 更省、更干净，且是本项目约定。

**Q：Docker 和虚拟机有啥区别？**  
A：容器更轻，共享宿主机内核，启动快；适合「起一个 Postgres」这种开发场景。

**Q：Watchman 坏了怎么办？**  
A：多数情况重装：`brew reinstall watchman`。Expo 报文件监听问题时再查它。
