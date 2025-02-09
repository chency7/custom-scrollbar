// 默认配置
const defaultConfig = {
  width: 32,
  borderRadius: 16,
  trackColor: "#e0e0e0",
  thumbColorStart: "#2196F3",
  thumbColorEnd: "#1976D2",
};

// 获取所有需要的DOM元素
const elements = {
  preview: document.getElementById("preview"),
  scrollbarWidth: document.getElementById("scrollbarWidth"),
  borderRadius: document.getElementById("borderRadius"),
  trackColor: document.getElementById("trackColor"),
  thumbColorStart: document.getElementById("thumbColorStart"),
  thumbColorEnd: document.getElementById("thumbColorEnd"),
  widthValue: document.getElementById("widthValue"),
  radiusValue: document.getElementById("radiusValue"),
  trackColorValue: document.getElementById("trackColorValue"),
  thumbColorStartValue: document.getElementById("thumbColorStartValue"),
  thumbColorEndValue: document.getElementById("thumbColorEndValue"),
  saveConfig: document.getElementById("saveConfig"),
  resetConfig: document.getElementById("resetConfig"),
};

// 更新预览区域的滚动条样式
function updateScrollbarStyle(config) {
  const style = `
        .preview-section::-webkit-scrollbar {
            width: ${config.width}px !important;
            height: ${config.width}px !important;
        }
        
        .preview-section::-webkit-scrollbar-track {
            background: ${config.trackColor} !important;
            border-radius: ${config.borderRadius}px !important;
            border: 3px solid #fff !important;
        }
        
        .preview-section::-webkit-scrollbar-thumb {
            background: linear-gradient(45deg, ${config.thumbColorStart}, ${
    config.thumbColorEnd
  }) !important;
            border-radius: ${config.borderRadius}px !important;
            border: 3px solid #fff !important;
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2) !important;
        }
        
        .preview-section::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(45deg, ${
              config.thumbColorEnd
            }, ${darkenColor(config.thumbColorEnd, 20)}) !important;
        }
        
        .preview-section {
            overflow-y: scroll !important;
            scrollbar-width: auto !important;
            scrollbar-color: ${config.thumbColorStart} ${
    config.trackColor
  } !important;
        }
    `;

  // 更新预览区域的样式
  const styleElement =
    document.getElementById("previewStyle") || document.createElement("style");
  styleElement.id = "previewStyle";
  styleElement.textContent = style;
  document.head.appendChild(styleElement);
}

// 加载配置
function loadConfig() {
  chrome.storage.sync.get(["scrollbarConfig"], function (result) {
    const config = result.scrollbarConfig || defaultConfig;

    // 更新输入控件的值
    elements.scrollbarWidth.value = config.width;
    elements.borderRadius.value = config.borderRadius;
    elements.trackColor.value = config.trackColor;
    elements.thumbColorStart.value = config.thumbColorStart;
    elements.thumbColorEnd.value = config.thumbColorEnd;

    // 更新显示的值
    elements.widthValue.textContent = config.width;
    elements.radiusValue.textContent = config.borderRadius;
    elements.trackColorValue.textContent = config.trackColor;
    elements.thumbColorStartValue.textContent = config.thumbColorStart;
    elements.thumbColorEndValue.textContent = config.thumbColorEnd;

    // 更新预览
    updateScrollbarStyle(config);
  });
}

// 保存配置
function saveConfig() {
  const config = {
    width: parseInt(elements.scrollbarWidth.value),
    borderRadius: parseInt(elements.borderRadius.value),
    trackColor: elements.trackColor.value,
    thumbColorStart: elements.thumbColorStart.value,
    thumbColorEnd: elements.thumbColorEnd.value,
  };

  chrome.storage.sync.set({ scrollbarConfig: config }, function () {
    alert("配置已保存！");
    // 通知用户需要刷新页面
    if (confirm("配置已保存！需要刷新当前页面来查看效果，是否立即刷新？")) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.reload(tabs[0].id);
      });
    }
  });
}

// 重置配置
function resetConfig() {
  if (confirm("确定要重置所有设置吗？")) {
    chrome.storage.sync.set({ scrollbarConfig: defaultConfig }, function () {
      loadConfig();
      alert("已重置为默认配置！");
    });
  }
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

// 添加事件监听器
document.addEventListener("DOMContentLoaded", function () {
  // 加载初始配置
  loadConfig();

  // 监听滑块和颜色选择器的变化
  elements.scrollbarWidth.addEventListener("input", function () {
    elements.widthValue.textContent = this.value;
    updateScrollbarStyle({
      width: parseInt(this.value),
      borderRadius: parseInt(elements.borderRadius.value),
      trackColor: elements.trackColor.value,
      thumbColorStart: elements.thumbColorStart.value,
      thumbColorEnd: elements.thumbColorEnd.value,
    });
  });

  elements.borderRadius.addEventListener("input", function () {
    elements.radiusValue.textContent = this.value;
    updateScrollbarStyle({
      width: parseInt(elements.scrollbarWidth.value),
      borderRadius: parseInt(this.value),
      trackColor: elements.trackColor.value,
      thumbColorStart: elements.thumbColorStart.value,
      thumbColorEnd: elements.thumbColorEnd.value,
    });
  });

  elements.trackColor.addEventListener("input", function () {
    elements.trackColorValue.textContent = this.value;
    updateScrollbarStyle({
      width: parseInt(elements.scrollbarWidth.value),
      borderRadius: parseInt(elements.borderRadius.value),
      trackColor: this.value,
      thumbColorStart: elements.thumbColorStart.value,
      thumbColorEnd: elements.thumbColorEnd.value,
    });
  });

  elements.thumbColorStart.addEventListener("input", function () {
    elements.thumbColorStartValue.textContent = this.value;
    updateScrollbarStyle({
      width: parseInt(elements.scrollbarWidth.value),
      borderRadius: parseInt(elements.borderRadius.value),
      trackColor: elements.trackColor.value,
      thumbColorStart: this.value,
      thumbColorEnd: elements.thumbColorEnd.value,
    });
  });

  elements.thumbColorEnd.addEventListener("input", function () {
    elements.thumbColorEndValue.textContent = this.value;
    updateScrollbarStyle({
      width: parseInt(elements.scrollbarWidth.value),
      borderRadius: parseInt(elements.borderRadius.value),
      trackColor: elements.trackColor.value,
      thumbColorStart: elements.thumbColorStart.value,
      thumbColorEnd: this.value,
    });
  });

  // 保存和重置按钮
  elements.saveConfig.addEventListener("click", saveConfig);
  elements.resetConfig.addEventListener("click", resetConfig);
});
