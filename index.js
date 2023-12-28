const bpmPlaceholder = document.querySelector("#bpm-placeholder");
const bpmPlaceholder8 = document.querySelector("#bpm-placeholder-8");
const bpmPlaceholder24 = document.querySelector("#bpm-placeholder-24");
const square = document.querySelector("#square");

let timing = [];

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

        if (timing[timing.length-1] - now <= 10000) {
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

    bpmPlaceholder24.innerText = Math.round(twentyeightBpm);

    bpmPlaceholder.innerText = Math.round(allBpm * 100) / 100;
    bpmPlaceholder8.innerText = Math.round(eightBpm * 100) / 100;
}

let backgroundColor = 0x2c;
function updateBackground() {
    backgroundColor = 0xff;
}

setInterval(() => {
    backgroundColor = (backgroundColor - 0x2c) * 0.95 + 0x2c;
    square.style.backgroundColor = `rgb(${backgroundColor}, ${backgroundColor}, ${backgroundColor})`;
}, 1000/60);

document.addEventListener("keydown", e => {
    if (e.code == 'Space') {
        updateBpm();
        updateBackground();
    }
});

square.addEventListener("click", e => {
    updateBpm();
    updateBackground();
});
