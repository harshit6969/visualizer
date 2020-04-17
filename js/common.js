function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function generateArray(elementCount, max, returnSorted = true) {
    let array = [];
    for (let count = 0; count < elementCount; count++) {
        array.push(getRandomInt(max));
    }
    if (returnSorted) {
        return (array.sort(function (a, b) {
            return a - b;
        }));
    }
    return array;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updateButtonState(state = true) {
    document.getElementById("UserInput").querySelectorAll("button").forEach(button => {
        button.disabled = state;
    });
}