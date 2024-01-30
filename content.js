async function handleBtnClick(event) {
  const selector = ".sub-list-li";
  const elements = document.querySelectorAll(selector);

  const danmuTimeline = [];

  elements.forEach((element) => {
    const danmuTime = element.getAttribute("data-danmu-time");
    const danmuTextElement = element.querySelector(".sub_content");
    const danmuText = danmuTextElement.textContent.trim();

    const danmu = {
      mode: 1,
      text: danmuText,
      stime: parseInt(danmuTime) * 100,
      size: 22,
      color: 0xffffff,
    };
    danmuTimeline.push(danmu);
  });

  //console.log("sending " + danmuTimeline.length + " danmu");
  await chrome.runtime.sendMessage({ data: danmuTimeline });
  //console.log("sent");
}

var danmuPlayerBtn = document.createElement('button');
danmuPlayerBtn.id = "danmu-player-btn";
danmuPlayerBtn.textContent = "play danmu";
danmuPlayerBtn.style.height = "30px";
danmuPlayerBtn.style.width = "100px";
danmuPlayerBtn.style.marginBottom = "5px";
danmuPlayerBtn.style.opacity = 100;

window.addEventListener("load", function () {
  setTimeout(function() {
    const tipContainer = document.getElementsByClassName("anime-tip")[0];
    tipContainer.appendChild(danmuPlayerBtn);
    danmuPlayerBtn.addEventListener("click", handleBtnClick);
  }, 1000);
});
