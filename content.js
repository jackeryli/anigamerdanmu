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

document.addEventListener("click", handleBtnClick);
