# 比特币价格预测归档 | BTC Predictions Archive

一个优雅的比特币价格预测收集和归档网站，记录来自全球金融机构、专家和分析师对比特币价格的预测。

## ✨ 特性

- 📊 **实时统计** - 显示总预测数、平均价格、最高/最低预测
- 🔍 **智能搜索** - 搜索机构、人名或预测内容
- 🎯 **多维筛选** - 按情绪（看涨/看跌/中性）筛选
- 📈 **灵活排序** - 按日期或价格排序
- 🌓 **主题切换** - 支持深色和浅色主题
- 📱 **响应式设计** - 完美支持移动端和桌面端
- ⚡ **静态部署** - 纯静态网站，可部署到 Cloudflare Pages、GitHub Pages 等

## 🚀 快速开始

### 本地预览

1. 克隆仓库
```bash
git clone <your-repo-url>
cd <your-repo-name>
```

2. 使用任何静态服务器运行
```bash
# 使用 Python
python -m http.server 8000

# 或使用 Node.js
npx serve

# 或使用 PHP
php -S localhost:8000
```

3. 访问 `http://localhost:8000`

### 部署到 Cloudflare Pages

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 Pages 部分
3. 连接你的 GitHub 仓库
4. 构建设置：
   - 框架预设：`None`
   - 构建命令：留空
   - 构建输出目录：`/`
5. 点击部署

### 部署到 GitHub Pages

1. 进入仓库设置
2. 找到 Pages 部分
3. 选择分支（通常是 `main` 或 `master`）
4. 保存设置
5. 访问 `https://<your-username>.github.io/<your-repo-name>/`

## 📝 添加新数据

### 方法一：使用脚本（推荐）

我们提供了一个交互式脚本来快速添加数据：

```bash
python3 scripts/add-prediction.py
```

脚本会引导你输入所有必要的信息，并自动添加到数据文件中。

### 方法二：手动编辑

编辑 `data/predictions.json` 文件，按照以下格式添加新的预测：

```json
{
  "id": 6,
  "date": "2025-12-20",
  "institution": "机构名称",
  "person": "人名",
  "role": "职位",
  "targetPrice": 150000,
  "targetDate": "2026",
  "sentiment": "bullish",
  "content": "预测详细内容...",
  "sourceUrl": "https://source-url.com"
}
```

### 字段说明

- `id`: 唯一标识符（递增数字）
- `date`: 预测发布日期（格式：YYYY-MM-DD）
- `institution`: 机构或公司名称
- `person`: 预测者姓名（可选）
- `role`: 职位或头衔（可选）
- `targetPrice`: 目标价格（美元）
- `targetDate`: 预期达到时间
- `sentiment`: 情绪（`bullish` 看涨 / `bearish` 看跌 / `neutral` 中性）
- `content`: 预测的详细描述
- `sourceUrl`: 原文链接
- `change`: 预期涨跌幅百分比（可选）
- `longTermPrice`: 长期目标价格（可选）
- `longTermDate`: 长期目标时间（可选）

## 🎨 自定义

### 修改主题颜色

编辑 `css/style.css` 中的 CSS 变量：

```css
:root {
    --accent-primary: #f59e0b;  /* 主要强调色 */
    --accent-secondary: #8b5cf6; /* 次要强调色 */
    --bullish: #10b981;          /* 看涨颜色 */
    --bearish: #ef4444;          /* 看跌颜色 */
    /* ... 更多变量 */
}
```

### 修改页面结构

- `index.html` - 主页面结构
- `css/style.css` - 样式定义
- `js/app.js` - 交互逻辑

## 📂 项目结构

```
.
├── index.html                    # 主页面
├── css/
│   └── style.css                # 样式文件
├── js/
│   └── app.js                   # JavaScript 逻辑
├── data/
│   ├── predictions.json         # 预测数据
│   └── prediction-template.json # 数据模板
├── scripts/
│   └── add-prediction.py        # 添加数据脚本
├── CONTRIBUTING.md              # 贡献指南
├── LICENSE                      # 许可证
├── README.md                    # 项目说明
└── .gitignore                   # Git 忽略文件
```

## 🤝 贡献

欢迎提交预测数据或改进建议！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/new-prediction`)
3. 提交更改 (`git commit -m 'Add new prediction'`)
4. 推送到分支 (`git push origin feature/new-prediction`)
5. 创建 Pull Request

## ⚠️ 免责声明

本网站收集的所有预测数据均来自公开报道，仅供参考和学习使用。
这些预测不构成投资建议，投资有风险，请谨慎决策。

## 📄 许可证

MIT License

## 📧 联系方式

如有问题或建议，请通过 GitHub Issues 联系。

---

**记住：过往预测不代表未来表现，理性投资，珍惜财富！** 🚀
