# 更新日志

记录项目的重要变更。

## [1.0.0] - 2025-12-16

### ✨ 新功能

#### 核心功能
- 🎨 优雅的比特币价格预测归档网站
- 📊 实时统计展示（总数、平均价格、最高/最低预测）
- 🔍 智能搜索功能（支持机构、人名、内容搜索）
- 🎯 多维度筛选（按情绪筛选）
- 📈 灵活排序（日期、价格升序/降序）
- 🌓 深色/浅色主题切换
- 📱 完全响应式设计

#### 数据管理
- 📝 JSON 数据存储
- 🤖 自动数据验证（GitHub Actions）
- 🛠️ 交互式数据添加脚本 (`add-prediction.py`)
- 📋 数据模板文件

#### 用户体验
- 🎴 卡片式预测展示
- 🏷️ 情绪标签（看涨/看跌/中性）
- 🔗 原文链接跳转
- 💾 主题偏好本地保存
- ⚡ 即时搜索响应

#### 设计特色
- 🎨 现代化渐变设计
- 🌈 精心设计的配色方案
- ✨ 平滑动画效果
- 💎 优雅的交互反馈

### 📚 文档

- README.md - 完整项目文档
- QUICKSTART.md - 快速入门指南
- CONTRIBUTING.md - 贡献指南
- CHANGELOG.md - 更新日志
- docs/DATA_STRUCTURE.md - 数据结构文档
- docs/SCREENSHOTS.md - 截图说明

### 🔧 技术栈

- 纯静态网站（HTML + CSS + JavaScript）
- 无构建依赖
- 适合 Cloudflare Pages / GitHub Pages 部署
- Python 辅助脚本

### 📦 初始数据

包含 5 条来自权威机构的预测记录：
- 彭博智库 - Mike McGlone
- 渣打银行
- 摩根大通
- Exodus
- BitMEX - Arthur Hayes

### 🎯 SEO 优化

- 完整的 meta 标签
- Open Graph 支持
- Twitter Card 支持
- robots.txt
- sitemap.xml

---

## 版本说明

遵循 [语义化版本](https://semver.org/lang/zh-CN/) 规范：

- **主版本号**：不兼容的 API 修改
- **次版本号**：向下兼容的功能性新增
- **修订号**：向下兼容的问题修正

## 变更类型

- ✨ **新功能** (Added)
- 🔧 **修改** (Changed)
- 🐛 **修复** (Fixed)
- 🗑️ **移除** (Removed)
- ⚠️ **废弃** (Deprecated)
- 🔒 **安全** (Security)

---

[1.0.0]: https://github.com/your-repo/releases/tag/v1.0.0
