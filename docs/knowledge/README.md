# IVBA 知识点文件夹

给「好久没写代码、准备用 AI 做 vibe coding」的你。  
这里不替代产品/需求/技术决策文档，而是按阶段把它们拆成可学的小块。

## 怎么用

1. 先读本页目录，知道你在哪一阶段  
2. **现在先读 Stage A 工具篇**（解释本机已装/待装的工具）  
3. 做完一阶段再进下一阶段，别一次吞完

## 阶段地图

| 阶段 | 文件 | 你在做什么 |
| --- | --- | --- |
| **现在 → Stage A** | [stage-a-environment-tools.md](./stage-a-environment-tools.md) | 搞懂 Node / pnpm / Go / Git / Watchman / Docker / brew |
| Stage A | [stage-a-warmup.md](./stage-a-warmup.md) | 环境验收 + 知识热身清单 |
| Stage B | [stage-b-product-prep.md](./stage-b-product-prep.md) | ERD、状态机（已产出 [DATA_MODEL](../DATA_MODEL.md) / [STATE_MACHINES](../STATE_MACHINES.md)） |
| Stage C | [stage-c-scaffold.md](./stage-c-scaffold.md) | monorepo 脚手架 |
| Stage D | [stage-d-first-slice.md](./stage-d-first-slice.md) | 第一个业务切片 |
| 全程参考 | [tech-stack-map.md](./tech-stack-map.md) | 技术栈全景与学习优先级 |
| 全程参考 | [vibe-coding.md](./vibe-coding.md) | 和 AI 协作的正确姿势 |
| 全程参考 | [key-concepts.md](./key-concepts.md) | 关键概念速查 |
| 你的本子 | [notes.md](./notes.md) | 个人笔记与打卡 |

## 项目文档入口

- [产品背景](../PRODUCT_BRIEF.md)
- [MVP 需求](../REQUIREMENTS.md)
- [技术栈决策](../TECH_STACK.md)
- [实施路线图](../ROADMAP.md)
- [本机安装步骤](../SETUP.md)

## 一句话项目心智

```text
两个前端（Web + App）
    ↓ 同一套 REST/OpenAPI 契约
一个 Go API（模块化单体）
    ↓
PostgreSQL/PostGIS（业务事实来源）
```

> Website 做 SEO 与专业后台；App 做发现/购票/票券；Go 管规则与权限；数据库说了算。

两条业务链必须分开：

| 链 | 流程 | 关键风险 |
| --- | --- | --- |
| 场地租用 | 搜索 → 申请 → 报价 → 确认 | 时段重叠、状态混乱 |
| 活动购票 | 搜索 → 锁库存 → 支付 → 出票 → 核销 | 超卖、重复 webhook、重复核销 |

**下一步：** 打开 [Stage A · 本机工具链](./stage-a-environment-tools.md)。
