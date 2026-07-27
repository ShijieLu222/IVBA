# 关键概念速查

| 概念 | 一句话 |
| --- | --- |
| 模块化单体 | 一个部署单元，内部分模块边界清晰，先不拆微服务 |
| OpenAPI 契约优先 | 接口先定义，再生成前后端类型，防止口口相传漂移 |
| sqlc | SQL 是源，生成类型安全 Go 代码，而不是 ORM 反客为主 |
| 幂等 | 同一请求重试多次，业务效果只发生一次 |
| webhook 真相 | 付款成功以 Stripe webhook 为准，不以前端 success page 为准 |
| outbox | 业务事务里先记「待办任务」，worker 异步发出，失败可重试 |
| JWT 验证 | Auth 发 token；Go 用 JWKS 验签；角色权限查自己的 DB |
| exclusion constraint | 数据库层禁止同一空间确认时段重叠 |
| Merchant of Record | 法律上谁对买家负责收款/退款——未确认前别写死资金流 |
| brew / cask | brew 装命令行工具；`--cask` 装带界面的 App（如 Docker Desktop） |
| 容器 | 隔离、可丢弃的运行环境；本地常用它跑 Postgres |
