# IVBA 数据模型规划（草案 v0.1）

> 状态：工程脚手架前的详细 ERD 草案。  
> 依据：[PRODUCT_BRIEF.md](./PRODUCT_BRIEF.md)、[REQUIREMENTS.md](./REQUIREMENTS.md)、[TECH_STACK.md](./TECH_STACK.md)。  
> 配套状态机：[STATE_MACHINES.md](./STATE_MACHINES.md)。

本文回答三件事：

1. 有哪些表、表之间怎么连  
2. 关键字段与数据库级约束（防超卖、防时段重叠）  
3. **第一刀业务切片**先建哪些表

尚未写成 Goose migration；字段类型以 PostgreSQL 为准，实现时可微调。

---

## 1. 设计原则

1. **两条交易链分开**：场地租用（`venue_hire_*`）与门票订单（`orders` / `tickets`）绝不共用一张 `bookings`。
2. **权限看组织成员，不看全局用户类型**：用户可同时属于多个组织，角色挂在 `organization_members`。
3. **Auth 不管业务角色**：Supabase（或同类）只提供 `auth_user_id`；业务档案在 `profiles`，权限在本库查。
4. **钱用最小货币单位整数** + `currency`（如 GBP 便士）；不用 `float`。
5. **时间一律 `timestamptz`**；场地另存 IANA `timezone`。
6. **位置用 PostGIS** `geography(Point, 4326)`，距离筛选走数据库。
7. **状态变更可审计**：关键状态机写 `*_status_history` 或统一 `audit_logs`。
8. **软归档优先于物理删**：`archived_at` / `status`；GDPR 删除走专门流程与法定保留例外。

### 通用约定

| 约定 | 说明 |
| --- | --- |
| 主键 | `uuid`，应用生成或 `gen_random_uuid()` |
| 时间戳 | `created_at` / `updated_at`（`timestamptz`） |
| 操作者 | 可变字段尽量带 `created_by` / `updated_by` → `profiles.id` |
| 枚举 | 首版可用 Postgres `text` + check，或独立 enum type |
| 金额 | `amount_minor bigint` + `currency char(3)` |
| 删除 | MVP 多用 `status` / `archived_at`，少用硬删 |

---

## 2. 全局关系总览（ERD）

```mermaid
erDiagram
  AUTH_USERS["Auth 服务 auth.users\n(邮箱/密码/OAuth/会话)\n不在本业务库"] ||--|| profiles : "auth_user_id"
  profiles ||--o{ organization_members : joins
  profiles ||--o{ consent_records : accepts
  profiles ||--o{ data_requests : requests
  organizations ||--o{ organization_members : has
  organizations ||--o{ organization_invitations : invites
  organizations ||--o{ venues : owns
  organizations ||--o{ events : hosts
  organizations ||--o{ venue_hire_requests : "as host or venue"
  venues ||--o{ venue_spaces : contains
  venues ||--o{ venue_media : has
  venue_spaces ||--o{ venue_hire_requests : requested
  venue_hire_requests ||--o{ venue_hire_quotes : quoted
  venue_hire_requests ||--o{ venue_hire_messages : discusses
  venue_hire_requests ||--o{ venue_hire_status_history : tracks
  events ||--o{ event_sessions : schedules
  event_sessions ||--o{ ticket_types : prices
  events }o--o| venue_hire_requests : "optional confirmed hire"
  profiles ||--o{ orders : buys
  orders ||--o{ order_items : lines
  orders ||--o{ payments : pays
  orders ||--o{ refunds : refunds
  order_items ||--o{ tickets : issues
  ticket_types ||--o{ inventory_holds : locks
  tickets ||--o{ ticket_scans : scans
  profiles ||--o{ favorites : saves
  organizations ||--o| payout_accounts : settles
```

### 域分组

| 域 | 表 | 第一切片 |
| --- | --- | --- |
| 身份与组织 | `profiles`, `organizations`, `organization_members`, `organization_invitations` | ✅ 必需 |
| 场地目录 | `venues`, `venue_spaces`, `venue_media`, `content_reviews` | ✅ 必需 |
| 场地租用 | `venue_hire_requests`, `venue_hire_quotes`, `venue_hire_messages`, `venue_hire_status_history` | ✅ 申请提交起 |
| 可用性 | `availability_rules`, `availability_exceptions` | P1，可后补 |
| 活动票务 | `events`, `event_sessions`, `ticket_types` | 第二刀 |
| 订单支付 | `orders`, `order_items`, `inventory_holds`, `payments`, `refunds`, `payout_accounts` | 购票切片 |
| 票券核销 | `tickets`, `ticket_scans` | 购票切片 |
| 用户侧 | `favorites`, `notification_preferences`, `notifications` | 收藏可早、通知可并行 |
| 平台基础设施 | `outbox_jobs`, `webhook_events`, `audit_logs`, `consent_records`, `data_requests` | 骨架期预留 |

---

## 3. 身份与组织

### 3.0 用户在哪？为什么没有 `users` 表？

很多人会找一张叫 `users` 的表，里面放「邮箱 + 密码哈希 + 登录状态」。  
**本项目故意不这么做。**

| 东西 | 存在哪里 | 说明 |
| --- | --- | --- |
| 邮箱 / 密码 / 验证邮件 / 重置密码 / OAuth / MFA | **Auth 服务**（推荐 Supabase Auth） | 登录凭证与会话由专业 Auth 托管，**不进我们业务库** |
| access token / refresh token | **客户端安全存储**（Web 按 Auth SDK；App 用 SecureStore） | 明文 token **不进** Redux persist / AsyncStorage / 我们的 Postgres |
| 业务用户档案（姓名、头像、电话、是否管理员…） | 我们库的 **`profiles`** | 这就是业务意义上的「User」 |
| 「能管哪个组织」 | **`organization_members`** | 角色不写死在 JWT 里 |
| 接受条款 / 隐私版本 | **`consent_records`** | AUTH-006 |
| 导出 / 删除账号请求 | **`data_requests`** | AUTH-005 |

一句话：

> **Auth = 你是谁（能登录）**  
> **`profiles` = 平台里的这个人（业务用户）**  
> **`organization_members` = 这个人在某个组织里是 Owner 还是 Staff**

对应关系（1:1）：

```text
Supabase auth.users          我们的 PostgreSQL
┌─────────────────┐         ┌──────────────────────┐
│ id (uuid)       │────────▶│ profiles.auth_user_id │
│ email           │  同步/冗余│ profiles.email        │
│ encrypted_pw    │         │ profiles.display_name │
│ email_confirmed │         │ profiles.phone        │
│ …登录专用字段    │         │ profiles.is_platform… │
└─────────────────┘         └──────────┬───────────┘
                                       │
                                       ▼
                            organization_members
                            orders / favorites / …
```

登录时序（实现时按这个做）：

```text
1. 用户在 Web/App 用邮箱密码（或 magic link / Google）向 Auth 登录
2. Auth 返回 JWT（access token）
3. 客户端带 Authorization: Bearer <token> 调 Go API
4. Go 用 JWKS 校验 JWT → 取出 auth_user_id（sub）
5. Go 查 profiles WHERE auth_user_id = ? 得到业务用户
6. 若尚无 profile（首次登录）→ 自动创建一行 profiles + 必要时写 consent
7. 再查 organization_members 判断能不能改某场地/某申请
```

**我们业务库里不存：**

- 密码或密码哈希  
- refresh token / session 表（除非以后做「撤销其他设备」且自己管会话；P1 的 AUTH-103 可再议）  
- 长期「角色列表」塞进 JWT（角色以 DB 为准）

若你更习惯口头叫「User」，可以等价理解：

> `profiles` ≈ User 表；只是不叫 `users`，避免和 Auth 的 `auth.users` 混淆。

### 3.1 `profiles`（业务用户 = 你要找的 User）

业务侧用户档案。**一行对应一个已注册/已登录的人。**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | uuid PK | **业务用户 ID**（订单、成员、审计都引用它） |
| `auth_user_id` | text UNIQUE NOT NULL | 外键语义 → Auth 的 user id（跨库，故不建 DB FK） |
| `email` | citext UNIQUE NOT NULL | 冗余便于查询与展示；改邮箱以 Auth 为准再同步 |
| `display_name` | text NOT NULL | 姓名/昵称（AUTH-004） |
| `avatar_url` | text NULL | 头像 |
| `phone` | text NULL | 联系电话 |
| `locale` | text NOT NULL DEFAULT `'en-GB'` | 语言偏好 |
| `is_platform_admin` | boolean NOT NULL DEFAULT false | 平台管理员；高风险操作仍写审计 |
| `status` | text NOT NULL | `active` / `disabled` / `pending_deletion` |
| `created_at` / `updated_at` | timestamptz | |

索引：`auth_user_id`，`email`。

首次登录创建 profile 时建议同时写入 `consent_records`（服务条款/隐私版本）。

### 3.2 `organizations`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | uuid PK | |
| `kind` | text NOT NULL | `host`（主办）/ `venue`（场地）；允许后续扩展，一组织一种主类型 |
| `legal_name` | text NOT NULL | |
| `display_name` | text NOT NULL | |
| `slug` | text UNIQUE NOT NULL | URL 友好 |
| `bio` | text NULL | |
| `contact_email` | text NOT NULL | |
| `contact_phone` | text NULL | |
| `address_line1` … `country_code` | text | 组织通讯地址 |
| `verification_status` | text NOT NULL | `unverified` / `pending` / `verified` / `rejected` |
| `payout_status` | text NOT NULL | `not_started` / `pending` / `active` / `restricted` |
| `created_by` | uuid → profiles | |
| `archived_at` | timestamptz NULL | |
| `created_at` / `updated_at` | timestamptz | |

说明：同一自然人可建多个组织；`kind` 便于默认权限与引导，不阻止「场地组织偶尔办活动」类扩展（若业务确认，可用成员权限覆盖）。

### 3.3 `organization_members`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | uuid PK | |
| `organization_id` | uuid NOT NULL → organizations | |
| `profile_id` | uuid NOT NULL → profiles | |
| `role` | text NOT NULL | MVP：`owner` / `staff` |
| `status` | text NOT NULL | `active` / `removed` |
| `created_at` / `updated_at` | timestamptz | |

约束：

- `UNIQUE (organization_id, profile_id)`
- 应用层保证：每个组织至少 1 个 `active` + `owner`（可用 deferrable 约束或服务层事务检查）

### 3.4 `organization_invitations`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | uuid PK | |
| `organization_id` | uuid → organizations | |
| `email` | citext NOT NULL | |
| `role` | text NOT NULL | `owner` / `staff` |
| `token_hash` | text NOT NULL | 只存哈希 |
| `status` | text NOT NULL | `pending` / `accepted` / `declined` / `revoked` / `expired` |
| `invited_by` | uuid → profiles | |
| `expires_at` | timestamptz NOT NULL | |
| `created_at` / `updated_at` | timestamptz | |

---

## 4. 场地目录（第一切片核心）

### 4.1 `venues`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | uuid PK | |
| `organization_id` | uuid NOT NULL → organizations | 场地方组织 |
| `name` | text NOT NULL | |
| `slug` | text NOT NULL | 组织内或全局唯一（建议全局 UNIQUE） |
| `summary` | text NULL | 短简介 |
| `description` | text NULL | |
| `address_line1` | text NOT NULL | |
| `address_line2` | text NULL | |
| `city` | text NOT NULL | |
| `region` | text NULL | |
| `postcode` | text NOT NULL | |
| `country_code` | char(2) NOT NULL DEFAULT `'GB'` | |
| `location` | geography(Point,4326) NULL | 发布前应具备；草稿可空 |
| `timezone` | text NOT NULL | IANA，如 `Europe/London` |
| `transport_info` | text NULL | |
| `accessibility_info` | text NULL | |
| `house_rules` | text NULL | |
| `contact_email` | text NULL | |
| `contact_phone` | text NULL | |
| `status` | text NOT NULL | 见状态机：`draft` / `pending_review` / `published` / `changes_requested` / `rejected` / `archived` |
| `published_at` | timestamptz NULL | |
| `cover_media_id` | uuid NULL → venue_media | 可空，设封面后填 |
| `created_by` | uuid → profiles | |
| `created_at` / `updated_at` | timestamptz | |

索引：

- `(status)` 部分索引 `WHERE status = 'published'`
- GIST(`location`)
- `(organization_id)`
- 全文/trigram 可后加（`name`, `city`）

### 4.2 `venue_spaces`

一个场地多个可租空间。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | uuid PK | |
| `venue_id` | uuid NOT NULL → venues | |
| `name` | text NOT NULL | |
| `description` | text NULL | |
| `capacity` | int NOT NULL CHECK (capacity > 0) | |
| `area_sqm` | numeric(10,2) NULL | |
| `layout_notes` | text NULL | |
| `pricing_model` | text NOT NULL | `fixed` / `from` / `enquiry`（VEN-009） |
| `price_amount_minor` | bigint NULL | `enquiry` 时可空；`fixed`/`from` 必填 |
| `currency` | char(3) NOT NULL DEFAULT `'GBP'` | |
| `price_unit` | text NULL | `hour` / `day` / `session` / `event` |
| `amenities` | jsonb NOT NULL DEFAULT `'[]'` | 设施标签数组 |
| `allowed_event_types` | jsonb NOT NULL DEFAULT `'[]'` | |
| `prohibited_event_types` | jsonb NOT NULL DEFAULT `'[]'` | |
| `sort_order` | int NOT NULL DEFAULT 0 | |
| `status` | text NOT NULL | `active` / `archived` |
| `created_at` / `updated_at` | timestamptz | |

### 4.3 `venue_media`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | uuid PK | |
| `venue_id` | uuid NOT NULL → venues | |
| `space_id` | uuid NULL → venue_spaces | 空=场地级图片 |
| `storage_key` | text NOT NULL | 对象存储 key |
| `url` | text NOT NULL | CDN/访问 URL（或运行时签名） |
| `mime_type` | text NOT NULL | |
| `width` / `height` | int NULL | |
| `sort_order` | int NOT NULL DEFAULT 0 | |
| `created_by` | uuid → profiles | |
| `created_at` | timestamptz | |

### 4.4 `content_reviews`（场地/活动审核共用）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | uuid PK | |
| `subject_type` | text NOT NULL | `venue` / `event` / `organization` |
| `subject_id` | uuid NOT NULL | |
| `requested_by` | uuid → profiles | |
| `reviewed_by` | uuid NULL → profiles | |
| `decision` | text NOT NULL | `pending` / `approved` / `changes_requested` / `rejected` |
| `notes` | text NULL | 给提交方的说明 |
| `created_at` / `resolved_at` | timestamptz | |

索引：`(subject_type, subject_id, created_at DESC)`。

---

## 5. 场地租用（与订单分离）

### 5.1 `venue_hire_requests`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | uuid PK | |
| `space_id` | uuid NOT NULL → venue_spaces | |
| `host_organization_id` | uuid NOT NULL → organizations | 主办方 |
| `venue_organization_id` | uuid NOT NULL → organizations | 冗余便于授权与列表（由 space→venue 派生写入） |
| `status` | text NOT NULL | 见 [STATE_MACHINES.md](./STATE_MACHINES.md) |
| `title` | text NULL | 活动/用途简称 |
| `event_type` | text NOT NULL | |
| `expected_attendees` | int NOT NULL CHECK (expected_attendees > 0) | |
| `starts_at` | timestamptz NOT NULL | 期望开始 |
| `ends_at` | timestamptz NOT NULL | 期望结束 |
| `setup_starts_at` | timestamptz NULL | 进场 |
| `teardown_ends_at` | timestamptz NULL | 退场 |
| `requirements` | text NULL | |
| `contact_name` | text NOT NULL | |
| `contact_email` | text NOT NULL | |
| `contact_phone` | text NULL | |
| `confirmed_starts_at` | timestamptz NULL | 确认后落库的最终时段 |
| `confirmed_ends_at` | timestamptz NULL | |
| `confirmed_range` | tstzrange NULL | 生成列或应用维护，供 exclusion |
| `created_by` | uuid → profiles | |
| `created_at` / `updated_at` | timestamptz | |

约束（关键）：

```text
CHECK (ends_at > starts_at)

-- 仅对已确认租用：同 space 时段不得重叠
EXCLUDE USING gist (
  space_id WITH =,
  confirmed_range WITH &&
) WHERE (status = 'confirmed' AND confirmed_range IS NOT NULL)
```

`confirmed_range` 建议在进入 `confirmed` 时写入  
`tstzrange(confirmed_starts_at, confirmed_ends_at, '[)')`。

### 5.2 `venue_hire_quotes`

支持报价版本（为 HIRE-102 留扩展；MVP 至少一版有效报价）。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | uuid PK | |
| `hire_request_id` | uuid NOT NULL → venue_hire_requests | |
| `version` | int NOT NULL | 从 1 递增 |
| `amount_minor` | bigint NOT NULL | |
| `currency` | char(3) NOT NULL DEFAULT `'GBP'` | |
| `message` | text NULL | |
| `valid_until` | timestamptz NOT NULL | |
| `status` | text NOT NULL | `active` / `accepted` / `rejected` / `superseded` / `expired` |
| `created_by` | uuid → profiles | 场地方成员 |
| `created_at` | timestamptz | |

`UNIQUE (hire_request_id, version)`。

### 5.3 `venue_hire_messages`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | uuid PK | |
| `hire_request_id` | uuid NOT NULL → venue_hire_requests | |
| `author_profile_id` | uuid NOT NULL → profiles | |
| `body` | text NOT NULL | |
| `created_at` | timestamptz | |

非实时聊天；结构化留言即可。

### 5.4 `venue_hire_status_history`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | uuid PK | |
| `hire_request_id` | uuid NOT NULL | |
| `from_status` | text NULL | |
| `to_status` | text NOT NULL | |
| `changed_by` | uuid NULL → profiles | 系统动作可空 |
| `reason` | text NULL | |
| `created_at` | timestamptz | |

append-only，不更新不删除。

### 5.5 可用性（P1，模型预留）

**`availability_rules`**：重复规则（每周几、时段）。  
**`availability_exceptions`**：临时关闭/开放。  

第一切片**不依赖**它们做硬性拦截；提交申请只做必填校验，文案上不承诺「一定可订」。

---

## 6. 活动、场次、票种（第二刀）

### 6.1 `events`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | uuid PK | |
| `host_organization_id` | uuid NOT NULL → organizations | |
| `hire_request_id` | uuid NULL → venue_hire_requests | 平台内已确认租用 |
| `external_venue_address` | text NULL | 管理员允许的外部地址 |
| `title` | text NOT NULL | |
| `slug` | text UNIQUE NOT NULL | |
| `description` | text NULL | |
| `category` | text NOT NULL | |
| `age_restriction` | text NULL | |
| `accessibility_info` | text NULL | |
| `refund_policy_text` | text NULL | |
| `cover_image_url` | text NULL | |
| `status` | text NOT NULL | `draft` / `pending_review` / `published` / `changes_requested` / `rejected` / `paused` / `cancelled` / `archived` |
| `published_at` | timestamptz NULL | |
| `created_by` | uuid → profiles | |
| `created_at` / `updated_at` | timestamptz | |

约束：`hire_request_id` 与 `external_venue_address` 至少一类有值（发布前校验）。

### 6.2 `event_sessions`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | uuid PK | |
| `event_id` | uuid NOT NULL → events | |
| `starts_at` / `ends_at` | timestamptz NOT NULL | |
| `timezone` | text NOT NULL | |
| `sales_starts_at` / `sales_ends_at` | timestamptz NOT NULL | |
| `capacity_total` | int NOT NULL CHECK (capacity_total >= 0) | |
| `status` | text NOT NULL | `scheduled` / `cancelled` |
| `created_at` / `updated_at` | timestamptz | |

### 6.3 `ticket_types`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | uuid PK | |
| `session_id` | uuid NOT NULL → event_sessions | |
| `name` | text NOT NULL | |
| `description` | text NULL | |
| `price_amount_minor` | bigint NOT NULL CHECK (>= 0) | 0 = 免费票 |
| `currency` | char(3) NOT NULL DEFAULT `'GBP'` | |
| `quantity_total` | int NOT NULL CHECK (> 0) | |
| `quantity_sold` | int NOT NULL DEFAULT 0 CHECK (>= 0) | 可由订单聚合维护，或事务内更新 |
| `max_per_order` | int NOT NULL DEFAULT 10 | |
| `sales_starts_at` / `sales_ends_at` | timestamptz NULL | 空则继承场次 |
| `status` | text NOT NULL | `active` / `archived` |
| `created_at` / `updated_at` | timestamptz | |

超卖防护：下单事务内  
`UPDATE ... SET quantity_sold = quantity_sold + :n WHERE quantity_sold + :n + active_holds <= quantity_total`，  
或独立库存表；与 `inventory_holds` 一起设计（见下）。

---

## 7. 订单、库存锁、支付（购票切片）

### 7.1 `inventory_holds`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | uuid PK | |
| `ticket_type_id` | uuid NOT NULL | |
| `profile_id` | uuid NOT NULL | |
| `quantity` | int NOT NULL CHECK (> 0) | |
| `expires_at` | timestamptz NOT NULL | |
| `status` | text NOT NULL | `active` / `consumed` / `expired` / `released` |
| `idempotency_key` | text NULL | |
| `order_id` | uuid NULL → orders | 转正后关联 |
| `created_at` | timestamptz | |

索引：`(ticket_type_id, status, expires_at)`；worker 扫过期释放。

### 7.2 `orders`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | uuid PK | |
| `buyer_profile_id` | uuid NOT NULL → profiles | |
| `status` | text NOT NULL | `pending` / `paid` / `cancelled` / `payment_failed` / `partially_refunded` / `refunded` |
| `currency` | char(3) NOT NULL | |
| `items_amount_minor` | bigint NOT NULL | 快照 |
| `fees_amount_minor` | bigint NOT NULL DEFAULT 0 | 平台费等 |
| `discount_amount_minor` | bigint NOT NULL DEFAULT 0 | |
| `tax_amount_minor` | bigint NOT NULL DEFAULT 0 | |
| `total_amount_minor` | bigint NOT NULL | |
| `idempotency_key` | text NOT NULL | 防重复下单 |
| `created_at` / `updated_at` | timestamptz | |

`UNIQUE (buyer_profile_id, idempotency_key)` 或全局 `UNIQUE (idempotency_key)`（按 API 约定）。

### 7.3 `order_items`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | uuid PK | |
| `order_id` | uuid NOT NULL → orders | |
| `ticket_type_id` | uuid NOT NULL | |
| `session_id` | uuid NOT NULL | 冗余快照便于展示 |
| `event_id` | uuid NOT NULL | 冗余快照 |
| `quantity` | int NOT NULL | |
| `unit_amount_minor` | bigint NOT NULL | 下单时单价快照 |
| `currency` | char(3) NOT NULL | |
| `title_snapshot` | text NOT NULL | 票种/活动名快照 |

### 7.4 `payments` / `refunds` / `payout_accounts`

**`payments`**：`order_id`、`provider`（stripe）、`provider_payment_id`、`status`、`amount_minor`、`currency`、原始事件引用。  
**`refunds`**：`payment_id` / `order_id`、金额、原因、操作者、状态。  
**`payout_accounts`**：组织级 Stripe Connect 账户状态（KYC），未 onboarding 不得收款。  

**商业规则（MoR / Connect 模式）未确认前，字段保留，实现可先用 test mode 桩。**

### 7.5 `webhook_events`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | uuid PK | |
| `provider` | text NOT NULL | `stripe` |
| `provider_event_id` | text NOT NULL UNIQUE | 幂等关键 |
| `payload` | jsonb NOT NULL | 注意脱敏/保留策略 |
| `processed_at` | timestamptz NULL | |
| `status` | text NOT NULL | `received` / `processed` / `failed` |
| `created_at` | timestamptz | |

---

## 8. 票券与核销

### 8.1 `tickets`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | uuid PK | |
| `order_item_id` | uuid NOT NULL → order_items | |
| `order_id` | uuid NOT NULL | 冗余 |
| `session_id` | uuid NOT NULL | |
| `ticket_type_id` | uuid NOT NULL | |
| `owner_profile_id` | uuid NOT NULL | |
| `qr_token_hash` | text NOT NULL UNIQUE | 只存哈希；明文 token 仅签发时给出 |
| `status` | text NOT NULL | `valid` / `used` / `refunded` / `void` / `cancelled` |
| `issued_at` | timestamptz NOT NULL | |
| `used_at` | timestamptz NULL | |

一单一票种多张 = 多行 `tickets`（每人一码）。

### 8.2 `ticket_scans`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | uuid PK | |
| `ticket_id` | uuid NOT NULL | |
| `scanned_by` | uuid NOT NULL → profiles | |
| `result` | text NOT NULL | `success` / `already_used` / `invalid` / `wrong_session` / `refunded` … |
| `device_info` | text NULL | |
| `created_at` | timestamptz | |

每次扫描都记一行（含失败），便于审计。

---

## 9. 用户侧与平台基础设施

### 9.1 `favorites`

`profile_id` + `event_id`，`UNIQUE` 成对；可扩 `venue_id`。

### 9.2 `notification_preferences` / `notifications`

偏好：按渠道（email/push/in_app）与类型开关；**交易/安全类不可关**。  
`notifications`：站内信；邮件/推送走 `outbox_jobs`。

### 9.3 `outbox_jobs`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | uuid PK | |
| `job_type` | text NOT NULL | `email` / `push` / `expire_hold` … |
| `dedupe_key` | text NOT NULL UNIQUE | |
| `payload` | jsonb NOT NULL | |
| `status` | text NOT NULL | `pending` / `processing` / `done` / `failed` |
| `attempts` | int NOT NULL DEFAULT 0 | |
| `available_at` | timestamptz NOT NULL | |
| `last_error` | text NULL | |
| `created_at` / `updated_at` | timestamptz | |

### 9.4 `audit_logs`

高风险操作 append-only：`actor_profile_id`、`action`、`subject_type`、`subject_id`、`metadata`、`created_at`。  
成员变更、审核、退款、封禁等必写。

### 9.5 `consent_records` / `data_requests`

- consent：条款/隐私/营销版本、时间、actor  
- data_requests：导出/删除请求与处理状态（PRIV）

---

## 10. 第一切片最小表集合（现在就按这个建）

对应：`场地草稿 → 审核 → 公开搜索 → 提交租用申请`

| 优先级 | 表 | 用途 |
| --- | --- | --- |
| M1 | `profiles` | 登录后的业务用户 |
| M1 | `organizations` | 场地组织 / 主办组织 |
| M1 | `organization_members` | Owner/Staff |
| M1 | `venues` | 场地草稿与发布 |
| M1 | `venue_spaces` | 可申请的空间 |
| M1 | `venue_media` | 图片（可先做 URL 占位） |
| M1 | `content_reviews` | 管理员审核 |
| M1 | `venue_hire_requests` | 主办方提交申请 |
| M1 | `venue_hire_status_history` | 状态轨迹 |
| M1 | `audit_logs` | 审核/成员等审计 |
| M1 | `outbox_jobs` | 邮件通知可异步 |

第一切片**明确不做**（表可先不建）：

- 支付 / Stripe webhook / payout  
- `orders` / `tickets` / 库存锁  
- `events` 全套（除非展示需要极简 mock）  
- `availability_rules`（P1）  
- 报价多版本可简化：申请提交后场地方「接受/拒绝/改期」即可；`venue_hire_quotes` 可在切片 1.1 加入

建议切片内状态先支持：

```text
hire: draft → submitted → under_review → accepted|rejected|changes_requested|cancelled
venue: draft → pending_review → published | changes_requested | rejected
```

`quoted` / `payment_pending` / `confirmed` 在商业规则清楚后再收紧 exclusion 约束。

---

## 11. 授权如何落到行上（实现提示）

| 动作 | 判定 |
| --- | --- |
| 编辑场地 | `venues.organization_id` 上成员 `owner|staff` |
| 审核场地 | `profiles.is_platform_admin` |
| 公开读场地 | `venues.status = published` |
| 提交租用申请 | 主办组织成员 + 目标 `space` 所属 venue 已 `published` |
| 处理申请 | `venue_organization_id` 上成员 |

Go 服务层查 membership；**不要**把组织角色写死进长期 JWT。

---

## 12. 仍待业务确认（会影响表结构）

| # | 问题 | 对模型的影响 |
| --- | --- | --- |
| 1 | 场地租用首版是否含付款 | 是否早期启用 `payment_pending` / hire 专用 payment |
| 2 | 组织 `kind` 是否严格互斥 | 约束与产品引导 |
| 3 | 票种库存用 `quantity_sold` 列还是独立 ledger | 并发模型 |
| 4 | 是否收集参与者姓名/年龄 | 是否需要 `ticket_holders` |
| 5 | 货币是否仅 GBP | `currency` 是否可写死默认 |
| 6 | Merchant of Record / Connect 模式 | `payout_accounts`、费用字段语义 |

未确认前：表可建，**支付相关列允许 NULL，业务代码不写死收费逻辑**。

---

## 13. 下一步

1. 评审本文 + [STATE_MACHINES.md](./STATE_MACHINES.md)  
2. 无大异议 → Stage C 脚手架里用 Goose 落地 **M1 表**  
3. 同步写第一段 OpenAPI：`POST /v1/venues`、`POST /v1/spaces/{id}/hire-requests`

相关阅读：

- 学习阶段：[knowledge/stage-b-product-prep.md](./knowledge/stage-b-product-prep.md)  
- 技术约束：[TECH_STACK.md](./TECH_STACK.md) §4.3、§9  
