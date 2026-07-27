# Independent Venue Booking Platform

Independent Venue Booking Platform（暂称 IVBA）是一个服务英国独立艺术空间的双边平台：

- 场地方发布和管理空间；
- 活动主办方寻找场地、提交租用申请并发布活动；
- 普通用户发现本地活动、购票和管理订单；
- Artspace Lifespace 负责审核、运营和数据分析。

本仓库是旧大学项目的重新启动版本。旧代码没有迁入；产品边界与技术架构已重新设计。

## 当前阶段

当前处于产品定义与架构阶段，尚未开始生成应用代码。

- [产品范围与核心业务](docs/PRODUCT_BRIEF.md)
- [MVP 产品需求规格](docs/REQUIREMENTS.md)
- [技术栈与架构决策](docs/TECH_STACK.md)
- [实施路线图](docs/ROADMAP.md)

## 一句话架构

使用 monorepo 管理 Next.js 网站、Expo App 与 Go 模块化单体 API；以 OpenAPI 作为前后端契约并生成 RTK Query API slices；PostgreSQL/PostGIS 是业务事实来源，Stripe Connect 处理平台型支付。
