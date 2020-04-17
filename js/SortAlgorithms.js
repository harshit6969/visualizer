var arr = [];
function initArray() {
    arr = generateArray(10, 100, false);
    for (let index in arr) {
        let value = arr[index];
        document.getElementById("Element" + index).innerText = value;
        document.getElementById("Bar" + index).style.width = value.toString() + "%";
    }
}
document.getElementById("UserInput").addEventListener("submit",async function (event) {
    event.preventDefault();
    updateButtonState();
    updateIteration(true);
    updateSwaps(true);
    let Algo = document.getElementById("Algo").value;
    if(Algo == "Bubble sort"){
        await bubbleSort();
    }else if(Algo == "Selection sort"){
        await selectionSort();
    }
    updateButtonState(false);
});

function updateIteration(IsReset=false){
    document.getElementById("Iterations").innerText = IsReset ? 0 : parseInt(document.getElementById("Iterations").innerText) + 1;
}
function updateSwaps(IsReset=false){
    document.getElementById("Swaps").innerText = IsReset ? 0 : parseInt(document.getElementById("Swaps").innerText) + 1;
}
function switchBarColor(pos1, pos2, classToRemove, classToAdd){
    document.getElementById("Bar"+pos1).classList.remove(classToRemove);
    document.getElementById("Bar"+pos2).classList.remove(classToRemove);
    document.getElementById("Bar"+pos1).classList.add(classToAdd);
    document.getElementById("Bar"+pos2).classList.add(classToAdd);
}
function switchBarElement(pos1, value1, pos2, value2){
    document.getElementById("Bar"+pos1).style.width = value1 + "%";
    document.getElementById("Element"+pos1).innerText = value1;
    document.getElementById("Bar"+pos2).style.width = value2 + "%";
    document.getElementById("Element"+pos2).innerText = value2;
}

async function bubbleSort() {
    var len = arr.length;
    for (var i = len - 1; i >= 0; i--) {
        for (var j = 1; j <= i; j++) {
            updateIteration();
            switchBarColor(j, j-1, "bg-info", "bg-danger");
            await sleep(500);
            if (arr[j - 1] > arr[j]) {
                updateSwaps();
                var temp = arr[j - 1];
                switchBarElement(j, temp, j-1, arr[j]);
                arr[j - 1] = arr[j];
                arr[j] = temp;
                await sleep(1000);
            }
            switchBarColor(j, j-1, "bg-danger", "bg-info");
            await sleep(500);
        }
    }
}

async function selectionSort() {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        let min = i;
        for (let j = i + 1; j < len; j++) {
            updateIteration();
            if (arr[min] > arr[j]) {
                min = j;
            }
        }
        switchBarColor(i, min, "bg-info", "bg-danger");
        await sleep(500);
        if (min !== i) {
            updateSwaps();
            let temp = arr[i];
            switchBarElement(min, temp, i, arr[min]);
            arr[i] = arr[min];
            arr[min] = temp;
            await sleep(1000);
        }
        switchBarColor(i, min, "bg-danger", "bg-info");
        await sleep(500);
    }
}

async function insertionSort(){
    let length = arr.length;
    for (let i = 1; i < length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}