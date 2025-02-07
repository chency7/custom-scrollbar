document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("toggleSite");
  const optionsButton = document.getElementById("options");

  // 获取当前标签页信息
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentUrl = new URL(tabs[0].url);
    const currentDomain = currentUrl.hostname;

    // 检查当前网站是否已启用
    chrome.storage.sync.get(["enabledSites"], function (result) {
      const enabledSites = result.enabledSites || [];
      toggleButton.textContent = enabledSites.includes(currentDomain)
        ? "禁用当前网站的自定义滚动条"
        : "启用当前网站的自定义滚动条";
    });
  });

  // 切换当前网站的启用状态
  toggleButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentUrl = new URL(tabs[0].url);
      const currentDomain = currentUrl.hostname;

      chrome.storage.sync.get(["enabledSites"], function (result) {
        let enabledSites = result.enabledSites || [];
        const index = enabledSites.indexOf(currentDomain);

        if (index === -1) {
          enabledSites.push(currentDomain);
        } else {
          enabledSites.splice(index, 1);
        }

        chrome.storage.sync.set({ enabledSites: enabledSites }, function () {
          // 刷新当前页面以应用更改
          chrome.tabs.reload(tabs[0].id);
          window.close();
        });
      });
    });
  });

  // 打开选项页面
  optionsButton.addEventListener("click", function () {
    chrome.runtime.openOptionsPage();
  });
});
