# Stage A · 环境验收 + 知识热身

> 前置阅读：[本机工具链](./stage-a-environment-tools.md)  
> 安装步骤：[SETUP.md](../SETUP.md)

你现在处于：

> **产品文档已就绪 → 工程代码尚未开始 → 先把工具与基础语言热身做完**

不要从首页 UI 开工。

---

## 1. 环境验收清单

- [ ] 读懂 Node / pnpm / Go / Git / Watchman / Docker 各自干什么
- [ ] Docker Desktop 已安装并启动，`docker compose version` 成功
- [ ] 能跑通 nginx 或 PostGIS 的最小 `docker run` 例子
- [ ] `node` / `pnpm` / `go` / `git` 版本命令正常

---

## 2. 本周知识热身

- [ ] 读完四份核心文档，各写 5 条「我理解的重点」到 [notes.md](./notes.md)
  - [PRODUCT_BRIEF.md](../PRODUCT_BRIEF.md)
  - [REQUIREMENTS.md](../REQUIREMENTS.md)
  - [TECH_STACK.md](../TECH_STACK.md)
  - [ROADMAP.md](../ROADMAP.md)
- [ ] 1 天：TypeScript + React hooks
- [ ] 1 天：SQL 事务与唯一约束
- [ ] 1–2 天：Go Tour + 最小 `net/http` hello API
- [ ] 弄清这句话：
  - **Auth 管「你是谁」**
  - **Go 管「你能对哪个组织的什么资源做什么」**

---



## 3. Week 1 基础回血顺序

1. TypeScript：`type` / `interface` / `Promise` / 基础泛型
2. React：函数组件、`useState` / `useEffect`、受控表单
3. SQL：主键、外键、唯一约束、事务 `BEGIN/COMMIT`
4. HTTP：GET/POST、401/403/404/409/422、Bearer token
5. Git：feature branch → PR → merge

技术优先级总表见 [tech-stack-map.md](./tech-stack-map.md)。

---



## 4. 完成标准

Stage A 结束 = 工具会用 + 基础不陌生 + 知道下一步不碰支付深水区。

下一阶段 → [Stage B · 产品与模型准备](./stage-b-product-prep.md)