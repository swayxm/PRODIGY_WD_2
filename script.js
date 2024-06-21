let startTime;
let updatedTime;
let difference = 0;
let tInterval;
let running = false;
let lapNumber = 0;
let totalLapTime = 0;
const display = document.getElementById("display");
const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const laps = document.getElementById("laps");
const lapCount = document.getElementById("lapCount");
const totalTime = document.getElementById("totalTime");

function startPauseTimer() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(getShowTime, 1);
        startPauseBtn.innerText = "Pause";
        running = true;
    } else {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        startPauseBtn.innerText = "Start";
        running = false;
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    startPauseBtn.innerText = "Start";
    display.innerHTML = "00:00:00.000";
    difference = 0;
    totalLapTime = 0;
    laps.innerHTML = "";
    lapCount.innerText = 0;
    totalTime.innerHTML = "00:00:00.000";
    lapNumber = 0;
}

function lapTime() {
    if (running) {
        lapNumber++;
        lapCount.innerText = lapNumber;
        const lap = document.createElement("li");
        lap.innerHTML = `Lap ${lapNumber}: <span>${display.innerHTML}</span>`;
        laps.appendChild(lap);
        totalLapTime += difference;
        const totalLapTimeDisplay = new Date(totalLapTime);
        totalTime.innerHTML = (totalLapTimeDisplay.getUTCHours() > 9 ? totalLapTimeDisplay.getUTCHours() : "0" + totalLapTimeDisplay.getUTCHours()) + ":"
                            + (totalLapTimeDisplay.getUTCMinutes() > 9 ? totalLapTimeDisplay.getUTCMinutes() : "0" + totalLapTimeDisplay.getUTCMinutes()) + ":"
                            + (totalLapTimeDisplay.getUTCSeconds() > 9 ? totalLapTimeDisplay.getUTCSeconds() : "0" + totalLapTimeDisplay.getUTCSeconds()) + "."
                            + (totalLapTimeDisplay.getUTCMilliseconds() > 99 ? totalLapTimeDisplay.getUTCMilliseconds() : (totalLapTimeDisplay.getUTCMilliseconds() > 9 ? "0" : "00") + totalLapTimeDisplay.getUTCMilliseconds());
    }
}

function getShowTime() {
    difference = new Date().getTime() - startTime;
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000));
    display.innerHTML = (hours > 9 ? hours : "0" + hours) + ":"
                        + (minutes > 9 ? minutes : "0" + minutes) + ":"
                        + (seconds > 9 ? seconds : "0" + seconds) + "."
                        + (milliseconds > 99 ? milliseconds : (milliseconds > 9 ? "0" : "00") + milliseconds);
}

startPauseBtn.addEventListener("click", startPauseTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", lapTime);
