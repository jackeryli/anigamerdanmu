var danmuTimeline = [];

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "setDanmuTimeline") {
    danmuTimeline.length = 0;
    danmuTimeline = request.data;
    //console.log(danmuTimeline);
    CM.load(danmuTimeline);
    $("danmuCount").textContent = danmuTimeline.length;
  }
});

function $(element) {
  return document.getElementById(element);
}

function formatPlayhead(milliseconds) {
  // Convert milliseconds to seconds
  const totalSeconds = Math.floor(milliseconds / 1000);

  // Calculate minutes and seconds
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Format the result as MM:SS
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  return formattedTime;
}

function convertTimeToMilliseconds(timeInput) {
  // Split the input into minutes and seconds
  const [minutes, seconds] = timeInput.split(":").map(Number);

  // Validate the input
  if (
    isNaN(minutes) ||
    isNaN(seconds) ||
    minutes < 0 ||
    seconds < 0 ||
    seconds >= 60
  ) {
    alert('Invalid input. Please enter a valid time in the "MM:SS" format.');
    return 0;
  }

  // Convert minutes and seconds to milliseconds
  const totalMilliseconds = (minutes * 60 + seconds) * 1000;

  return totalMilliseconds;
}

window.addEventListener("load", function () {
  var CM = new CommentManager($("my-comment-stage"));
  CM.init();

  CM.start();

  var tmr = 0;
  var start = 0;
  var playhead = 0;

  function timeupdate() {
    playhead = Date.now() - start;
    CM.time(playhead);
    $("txPlayPos").textContent = formatPlayhead(playhead);
  }

  function timestop() {
    CM.stop();
    clearTimeout(tmr);
    clearInterval(tmr);
  }

  function timeresume() {
    CM.start();
    start = new Date().getTime() - playhead;
    if (tmr >= 0) {
      clearInterval(tmr);
    }
    tmr = setInterval(timeupdate, 100);
  }

  function timereset() {
    CM.clear();
    CM.stop();
    playhead = 0;
    $("txPlayPos").textContent = formatPlayhead(playhead);
    clearInterval(tmr);
  }

  $("btnStop").addEventListener("click", function (e) {
    e.preventDefault();
    timestop();
  });

  $("btnResume").addEventListener("click", function (e) {
    e.preventDefault();
    timeresume();
  });

  $("btnReset").addEventListener("click", function (e) {
    e.preventDefault();
    timereset();
  });

  $("txPlayPos").addEventListener("click", function (e) {
    e.preventDefault();
    timestop();
    let targetTime = prompt("Time: (MM:SS)");
    playhead = convertTimeToMilliseconds(targetTime);
    $("txPlayPos").textContent = formatPlayhead(playhead);
    timeresume();
  });

  window.CM = CM;
});
