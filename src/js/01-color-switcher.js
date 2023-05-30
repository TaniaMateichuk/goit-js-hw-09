
// Task 1
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
const btnStart = document.querySelector("[data-start]");
const btnStop = document.querySelector("[data-stop]");
const body = document.querySelector("body");
console.log(btnStop);

let timerId = null;

btnStart.addEventListener("click", onClickStart);
btnStop.addEventListener("click", onClickStop);

function onClickStart() {
  btnStart.disabled = true;
  btnStop.disabled = false;
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
    console.log(`Change color ${getRandomHexColor()}`);
  }, 1000);
}

function onClickStop() {
  clearInterval(timerId);
  btnStart.disabled = false;
  btnStop.disabled = true;
  console.log("Stop interval");
}
