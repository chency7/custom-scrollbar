# 🎨 自定义滚动条样式 Chrome 扩展

一个简单而强大的 Chrome 扩展，用于自定义网页滚动条样式。让你的浏览体验更加优雅！ ✨

## ✨ 功能特点

- 🎯 自定义滚动条宽度和样式
- 🌐 支持针对不同网站单独设置
- 🎨 美观的渐变色和动画效果
- 🚀 简单易用的操作界面
- 💝 完全免费，无广告

## 📥 安装方法

### 🛍️ 从 Chrome 网上应用店安装

1. 访问 Chrome 网上应用店（链接待添加）
2. 点击"添加到 Chrome"

### 🔧 手动安装

1. 下载此仓库的 zip 文件
2. 解压到本地文件夹
3. 打开 Chrome 浏览器，访问 `chrome://extensions/`
4. 开启右上角的"开发者模式"
5. 点击"加载已解压的扩展程序"
6. 选择解压后的文件夹

## 📖 使用方法

1. 点击浏览器工具栏中的扩展图标
2. 点击"为当前网站启用/禁用"按钮
3. 在选项页面可以管理已启用的网站列表

## 👨‍💻 开发说明

### 📁 项目结构

```
├── manifest.json          // 扩展配置文件
├── popup.html            // 弹出窗口
├── options.html          // 选项页面
├── images/               // 图标文件
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── styles/               // 样式文件
│   └── scrollbar.css
└── scripts/             // JavaScript 文件
    ├── content.js
    ├── popup.js
    └── options.js
```

### 🚀 本地开发

1. 克隆仓库：

```bash
git clone https://github.com/chency7/custom-scrollbar.git
```

2. 在 Chrome 扩展管理页面加载解压的扩展程序
3. 修改代码后点击扩展卡片上的"重新加载"按钮即可看到效果

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！让我们一起把这个扩展做得更好！ 💪

## 📄 许可证

MIT License

---

⭐ 如果这个项目对你有帮助，欢迎给个星标支持！
