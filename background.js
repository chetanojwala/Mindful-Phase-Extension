// Mindful Pause - Background Service Worker (Manifest V3)

// Configure the side panel to open on clicking the extension toolbar icon
chrome.runtime.onInstalled.addListener(() => {
  if (chrome.sidePanel && typeof chrome.sidePanel.setPanelBehavior === 'function') {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
      .catch((error) => console.error("Error setting panel behavior:", error));
  }
});

// Fallback listener for extension action click if setPanelBehavior is not supported
chrome.action.onClicked.addListener((tab) => {
  if (chrome.sidePanel && typeof chrome.sidePanel.open === 'function') {
    chrome.sidePanel.open({ windowId: tab.windowId })
      .catch((error) => console.error("Error opening side panel:", error));
  }
});
