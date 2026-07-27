# Stage D · 第一个可演示业务切片（Phase 2 开头）

> 前置：脚手架可跑（[Stage C](./stage-c-scaffold.md)）  
> 对应路线图首个里程碑：[ROADMAP.md](../ROADMAP.md)

---

## 切片目标

> 场地方创建场地草稿 → 管理员审核 → 场地出现在公开 Web 搜索 → 主办方提交租用申请

这一刀会尽早验证：身份、组织权限、数据模型、图片、位置、审核与通知。

---

## 清单

- [ ] 登录会话 + profile
- [ ] 组织与成员角色
- [ ] 场地 / 空间草稿
- [ ] 管理员审核发布
- [ ] 公开列表 / 详情
- [ ] 主办方提交租用申请（**可先不做付款**）

---

## 主开发循环（记住这个）

```text
需求编号 → OpenAPI → generate → DB migration/query → Go service → 前端调用 → 测试
```

### Week 3 练习版

1. 手写最小 OpenAPI：`POST /v1/venues`
2. 生成 Go handler + sqlc query + 前端 RTK endpoint
3. 亲自跑通：migrate → API → Web 调一次
4. 补集成测试：未授权不能创建场地

---

## 和 AI 说话时这样说

```text
做第一个 OpenAPI vertical slice：已登录用户创建场地草稿。
约束：遵循 docs/TECH_STACK.md；不要做支付；不要新建微服务。
完成后告诉我如何本地验证，并指出我该复习的 2–3 个点。
```

更多协作方法 → [vibe-coding.md](./vibe-coding.md)
