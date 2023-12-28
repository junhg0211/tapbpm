const bpmPlaceholder = document.querySelector("#bpm-placeholder");
const bpmPlaceholder8 = document.querySelector("#bpm-placeholder-8");
const bpmPlaceholder24 = document.querySelector("#bpm-placeholder-24");
const square = document.querySelector("#square");

let timing = [];

document.addEventListener("keydown", e => {
    if (e.code == 'Space') {
        updateBpm();
        updateBackground();
    }
});

function updateBpm() {
    timing.push(new Date());

    let allSum = 0,
        allCount = 0;
    let eightSum = 0,
        eightCount = 0;
    let twentyeightSum = 0,
        twentyeightCount = 0;
    for (let i = 1; i < timing.length; i++) {
        let previous = timing[i-1];
        let now = timing[i];
        let delta = now - previous;

        if (i >= timing.length - 8) {
            eightSum += delta;
            eightCount++;
        }

        if (i >= timing.length - 36) {
            twentyeightSum += delta;
            twentyeightCount++;
        }

        allSum += delta;
        allCount++;
    }

    let all = allSum / allCount;
    let eight = eightSum / eightCount;
    let twentyeight = twentyeightSum / twentyeightCount;

    let allBpm = 1000 * 60 / all;
    let eightBpm = 1000 * 60 / eight;
    let twentyeightBpm = 1000 * 60 / twentyeight;

    bpmPlaceholder.innerText = Math.round(allBpm * 100) / 100;
    bpmPlaceholder8.innerText = Math.round(eightBpm * 100) / 100;
    bpmPlaceholder24.innerText = Math.round(twentyeightBpm * 100) / 100;

    if (Math.abs(twentyeightBpm - Math.round(twentyeightBpm)) < 0.1) {
        bpmPlaceholder24.style.color = "#5a8265";
    } else {
        bpmPlaceholder24.style.color = "black";
    }
}

let backgroundColor = 0;
function updateBackground() {
    backgroundColor = 0xff;
}

setInterval(() => {
    backgroundColor = backgroundColor * 0.95;
    square.style.backgroundColor = `rgb(${backgroundColor}, ${backgroundColor}, ${backgroundColor})`;
}, 1000/60);
