// 获取当前网站的域名
const currentDomain = window.location.hostname;

// 默认配置
const defaultConfig = {
  width: 32,
  borderRadius: 16,
  trackColor: "#e0e0e0",
  thumbColorStart: "#2196F3",
  thumbColorEnd: "#1976D2",
};

// 应用滚动条样式
function applyScrollbarStyle(config) {
  // 移除旧的样式（如果存在）
  const oldStyle = document.getElementById("custom-scrollbar-style");
  if (oldStyle) {
    oldStyle.remove();
  }

  const style = document.createElement("style");
  style.id = "custom-scrollbar-style";
  style.textContent = `
        /* 应用到所有可滚动元素 */
        ::-webkit-scrollbar {
            width: ${config.width}px !important;
            height: ${config.width}px !important;
        }
        
        ::-webkit-scrollbar-track {
            background: ${config.trackColor} !important;
            border-radius: ${config.borderRadius}px !important;
            border: 3px solid #fff !important;
        }
        
        ::-webkit-scrollbar-thumb {
            background: linear-gradient(45deg, ${config.thumbColorStart}, ${
    config.thumbColorEnd
  }) !important;
            border-radius: ${config.borderRadius}px !important;
            border: 3px solid #fff !important;
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2) !important;
        }
        
        ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(45deg, ${
              config.thumbColorEnd
            }, ${darkenColor(config.thumbColorEnd, 20)}) !important;
        }

        /* 强制显示滚动条 */
        html {
            overflow-y: scroll !important;
            overflow-x: auto !important;
        }
        
        * {
            scrollbar-width: auto !important;
            scrollbar-color: ${config.thumbColorStart} ${
    config.trackColor
  } !important;
        }
    `;
  document.head.appendChild(style);
}

// 辅助函数：使颜色变暗
function darkenColor(color, percent) {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) - amt;
  const G = ((num >> 8) & 0x00ff) - amt;
  const B = (num & 0x0000ff) - amt;
  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 0 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
}

// 监听存储变化
chrome.storage.onChanged.addListener(function (changes, namespace) {
  if (namespace === "sync" && changes.scrollbarConfig) {
    chrome.storage.sync.get(["enabledSites"], function (result) {
      const enabledSites = result.enabledSites || [];
      if (enabledSites.includes(currentDomain)) {
        applyScrollbarStyle(changes.scrollbarConfig.newValue);
      }
    });
  }
});

// 初始检查当前网站是否启用并应用样式
chrome.storage.sync.get(["enabledSites", "scrollbarConfig"], function (result) {
  const enabledSites = result.enabledSites || [];
  const config = result.scrollbarConfig || defaultConfig;

  if (enabledSites.includes(currentDomain)) {
    applyScrollbarStyle(config);
  }
});
