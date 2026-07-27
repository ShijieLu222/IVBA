# 核心状态机（草案 v0.1）

> 与 [DATA_MODEL.md](./DATA_MODEL.md) 配套。  
> 标注「第一切片」的是现在就要实现的；其余等业务确认后再收紧。

---

## 1. 场地 `venues.status`

```text
draft
  → pending_review     (场地方提交审核)
  → archived           (场地方归档草稿)

pending_review
  → published          (管理员批准)
  → changes_requested  (管理员退回)
  → rejected           (管理员拒绝)

changes_requested
  → pending_review     (场地方改完再提)
  → archived

published
  → pending_review     (关键字段变更需再审；规则另定)
  → archived           (下架/归档)

rejected
  → draft              (允许基于拒绝意见重建/编辑后再提)
  → archived
```

| 状态 | 谁可见 |
| --- | --- |
| `draft` / `changes_requested` / `pending_review` / `rejected` | 本组织成员 + 平台管理员 |
| `published` | 公众只读 + 本组织可管理 |
| `archived` | 本组织 + 管理员；不出现在公开搜索 |

---

## 2. 场地租用 `venue_hire_requests.status`

### 2.1 需求文档完整版（目标态）

```text
draft → submitted → under_review → quoted → accepted → payment_pending → confirmed
                         ↘ changes_requested
                         ↘ rejected

quoted / accepted / payment_pending / confirmed → cancelled
```

### 2.2 第一切片精简版（推荐先实现）

付款规则未确认时，先打通申请闭环：

```text
draft
  → submitted              (主办方提交)

submitted
  → under_review           (场地方打开处理；也可合并跳过)
  → cancelled              (主办方取消)

under_review
  → accepted               (场地方接受；此时可写 confirmed_* 时段)
  → rejected
  → changes_requested
  → cancelled

changes_requested
  → submitted              (主办方修改后重提)
  → cancelled

accepted
  → cancelled              (双方按政策取消)
  → confirmed              (若首版无付款，可在接受时直接 confirmed；或 accepted 即终态)

rejected / cancelled       (终态)
confirmed                  (终态；启用 exclusion 防重叠)
```

**建议：** 第一切片让 `accepted` 写入 `confirmed_starts_at/ends_at/range` 并视同占档；待付款规则明确后，再拆出 `quoted` / `payment_pending`。

### 2.3 转换时必须写

每次变更插入 `venue_hire_status_history`：`from` / `to` / `changed_by` / `reason` / `created_at`。

---

## 3. 活动 `events.status`（第二刀）

```text
draft → pending_review → published
              ↘ changes_requested → pending_review
              ↘ rejected

published → paused → published
published → cancelled
任意非终态 → archived（按规则）
```

公开可见：`published` 且在展示/售票时间窗内，且未 `paused`/`cancelled`。

---

## 4. 订单 `orders.status`（购票切片）

```text
pending → paid
pending → payment_failed
pending → cancelled          (锁过期/用户取消)

paid → partially_refunded → refunded
paid → refunded
```

规则：

- 客户端 success page **不能**单独把订单标 `paid`
- 以 Stripe webhook + `webhook_events.provider_event_id` 唯一约束为准

---

## 5. 票券 `tickets.status`

```text
valid → used                 (首次成功核销)
valid → refunded | void | cancelled
used 不可再变回 valid
```

每次扫码写 `ticket_scans`，无论成功失败。

---

## 6. 库存锁 `inventory_holds.status`

```text
active → consumed            (下单成功占用)
active → expired             (worker 超时释放)
active → released            (用户放弃/失败释放)
```

---

## 7. 内容审核 `content_reviews.decision`

```text
pending → approved | changes_requested | rejected
```

与 `venues.status` / `events.status` 联动更新（同一事务）。
