// 检查功能是否启用
async function isFeatureEnabled() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(["isEnabled"], function (result) {
      const enabled = result.isEnabled ?? true; // 默认启用
      console.log("功能是否启用:", enabled);
      resolve(enabled);
    });
  });
}

// 检查当前网站是否在白名单中
async function isWhitelisted(url) {
  try {
    const hostname = new URL(url).hostname;
    return new Promise((resolve) => {
      chrome.storage.sync.get(["whitelistedDomains"], function (result) {
        const domains = result.whitelistedDomains || ["chat.qwenlm.ai"];
        const isAllowed = domains.some((domain) => hostname.includes(domain));
        console.log("当前域名:", hostname, "是否在白名单中:", isAllowed);
        resolve(isAllowed);
      });
    });
  } catch (e) {
    console.error("检查白名单出错:", e);
    return false;
  }
}

// 主要功能代码
function initializeScrollbarCustomization() {
  // 添加自定义滚动条样式
  const style = document.createElement("style");
  style.textContent = `
    ::-webkit-scrollbar {
      width: 8px !important;
      height: 8px !important;
    }
    
    ::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.1) !important;
      border-radius: 4px !important;
    }
    
    ::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.3) !important;
      border-radius: 4px !important;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 0, 0, 0.5) !important;
    }
  `;
  document.head.appendChild(style);
  console.log("滚动条自定义样式已应用");
}

// 移除自定义样式
function removeScrollbarCustomization() {
  const styles = document.querySelectorAll("style");
  styles.forEach((style) => {
    if (style.textContent.includes("::-webkit-scrollbar")) {
      style.remove();
    }
  });
  console.log("滚动条自定义样式已移除");
}

// 初始化
async function initialize() {
  const [enabled, whitelisted] = await Promise.all([
    isFeatureEnabled(),
    isWhitelisted(window.location.href),
  ]);

  if (!enabled || !whitelisted) {
    removeScrollbarCustomization();
    console.log("功能未启用或网站不在白名单中");
    return;
  }

  initializeScrollbarCustomization();
}

// 监听存储变化
chrome.storage.onChanged.addListener(function (changes, namespace) {
  if (
    namespace === "sync" &&
    (changes.isEnabled || changes.whitelistedDomains)
  ) {
    console.log("设置已更改，重新初始化");
    initialize();
  }
});

// 当页面加载完成时启动
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialize);
} else {
  initialize();
}
