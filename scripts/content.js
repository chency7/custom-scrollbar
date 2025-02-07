// 获取当前网站的域名
const currentDomain = window.location.hostname;

// 从存储中获取启用自定义滚动条的网站列表
chrome.storage.sync.get(["enabledSites"], function (result) {
  const enabledSites = result.enabledSites || [];

  // 检查当前网站是否在启用列表中
  if (enabledSites.includes(currentDomain)) {
    // 如果在启用列表中，应用自定义滚动条样式
    document.documentElement.classList.add("custom-scrollbar");
  }
});
