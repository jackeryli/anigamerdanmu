// Listen for messages from content scripts or other parts of the extension
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  chrome.windows.create(
    {
      url: "hello.html",
      type: "popup",
      width: 800,
      height: 600,
    },
    function (newWindow) {
      // Wait for tab creation
      // https://stackoverflow.com/questions/70122768/
      setTimeout(() => {
        chrome.tabs.sendMessage(newWindow.tabs[0].id, {
          action: "setDanmuTimeline",
          data: request.data,
        });
      }, 1000);
    }
  );
});
