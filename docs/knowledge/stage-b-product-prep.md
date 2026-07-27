# Stage B · 产品与模型准备（Phase 0 可独自推进）

> 前置：[Stage A 热身](./stage-a-warmup.md)  
> 业务方未确认前：**支付与资金流先别深挖实现**。

---

## 目标

把「脑子里的产品」落成图和状态，避免 AI 擅自替你做商业决策。

---

## 清单

- [ ] 画系统上下文图：用户 / Web / App / Go / DB / Auth / Stripe
- [x] 画核心 ERD 草案 → [DATA_MODEL.md](../DATA_MODEL.md)
- [x] 写出场地申请状态机草案 → [STATE_MACHINES.md](../STATE_MACHINES.md)
- [ ] 列出 MVP 验收场景对应的测试意图（先写意图，不必先写测试代码）
- [ ] 把「待确认商业问题」单独记一页（收费、MoR、退款责任等）

---

## 已产出

- [DATA_MODEL.md](../DATA_MODEL.md) — 表、字段、约束、第一切片最小表集合  
- [STATE_MACHINES.md](../STATE_MACHINES.md) — 场地 / 租用 / 订单 / 票券状态  

```text
docs/DATA_MODEL.md
docs/STATE_MACHINES.md
docs/knowledge/notes.md    # 你的理解与疑问
```

---

## 提醒

第一个业务切片仍然不是首页，而是：

> 场地方创建场地草稿 → 管理员审核 → 公开搜索 → 主办方提交租用申请

但要先有 ERD + 状态机，再进脚手架会稳很多。

下一阶段 → [Stage C · 工程脚手架](./stage-c-scaffold.md)
