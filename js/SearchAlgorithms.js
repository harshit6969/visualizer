var arr = [];
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
function initArray() {
    arr = generateArray();
    document.getElementById("Arrows").innerHTML="";
    document.getElementById("Iterations").innerHTML="";
    document.getElementById("BinaryDesc").style.display = "none";
    document.getElementById("LinearDesc").style.display = "none";
    let ArrayElements = document.getElementById("ArrayElements");
    let ArrayIndexes = document.getElementById("ArrayIndexes");
    ArrayElements.innerHTML = "";
    ArrayIndexes.innerHTML = "";
    for (let index in arr) {
        let element = document.createElement("div");
        element.id = "Element" + index;
        element.classList.add("col");
        element.classList.add("border");
        element.innerText = arr[index];
        ArrayElements.appendChild(element);
        element = document.createElement("div");
        element.id = "Indices" + index;
        element.classList.add("col");
        element.innerText = index;
        ArrayIndexes.appendChild(element);
    }
}
function generateArrowAndIterationDiv() {
    let Arrows = document.getElementById("Arrows");
    let Iterations = document.getElementById("Iterations");
    Arrows.innerHTML = "";
    Iterations.innerHTML = "";
    for (let index in arr) {
        let element = document.createElement("div");
        element.id = "Arrow" + index;
        element.classList.add("col");
        Arrows.appendChild(element);
        element = document.createElement("div");
        element.id = "Iteration" + index;
        element.classList.add("col");
        Iterations.appendChild(element);
    }
}
function generateArrow(id, iteration, isFound = false) {
    let elem = '<svg class="bi bi-arrow-up" width="2em" height="4em" viewBox="0 0 16 16" fill="red" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 3.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V4a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.646 2.646a.5.5 0 01.708 0l3 3a.5.5 0 01-.708.708L8 3.707 5.354 6.354a.5.5 0 11-.708-.708l3-3z" clip-rule="evenodd"/></svg>';
    if(isFound){
        elem = '<svg class="bi bi-arrow-up" width="2em" height="4em" viewBox="0 0 16 16" fill="green" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 3.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V4a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.646 2.646a.5.5 0 01.708 0l3 3a.5.5 0 01-.708.708L8 3.707 5.354 6.354a.5.5 0 11-.708-.708l3-3z" clip-rule="evenodd"/></svg>';
    }
    // let element = '<div class="col row"><div class="col-12">' + elem + '</div><div class="col-12">' + iteration + '</div></div>';
    document.getElementById("Arrow" + id).innerHTML = elem;
    document.getElementById("Iteration" + id).innerHTML = iteration;
}

function getRandomInt() {
    return Math.floor(Math.random() * Math.floor(1000));
}

function generateArray() {
    let array = [];
    for (let count = 0; count < 15; count++) {
        array.push(getRandomInt());
    }
    return (array.sort(function(a, b) {
        return a - b;
    }));
}

async function linearSearch(elToFind) {
    for (var i = 0; i < arr.length; i++) {
        generateArrow(i, i+1);
        if (arr[i] == elToFind) {
            generateArrow(i, i+1, true);
            return i;
        }
        await sleep(1000);
    } return null;
}

async function binarySearch(elToFind) {
    var lowIndex = 0;
    var highIndex = arr.length - 1;
    let iterations = 1;
    while (lowIndex <= highIndex) {
        var midIndex = Math.floor((lowIndex + highIndex) / 2);
        generateArrow(midIndex, iterations);
        if (arr[midIndex] == elToFind) {
            generateArrow(midIndex, iterations, true);
            return midIndex;
        } else if (arr[midIndex] < elToFind) {
            lowIndex = midIndex + 1;
        } else {
            highIndex = midIndex - 1;
        }
        ++iterations;
        await sleep(1000);
    } return null;
}
document.getElementById("UserInput").addEventListener("submit",async function (event) {
    event.preventDefault();
    generateArrowAndIterationDiv();
    let elemToFind = document.getElementById("SearchItem").value;
    document.getElementById("SearchingItem").innerText = elemToFind;
    let Algo = document.getElementById("Algo").value;
    let result = -1;
    if(Algo == "Linear Search"){
        document.getElementById("BinaryDesc").style.display = "none";
        document.getElementById("LinearDesc").style.display = "block";
        result = await linearSearch(elemToFind);
    }else{
        document.getElementById("LinearDesc").style.display = "none";
        document.getElementById("BinaryDesc").style.display = "block";
        result = await binarySearch(elemToFind);
    }
    let FoundResult = "Not Found";
    let FoundIndex = -1;
    if(result){
        FoundResult = "Found";
        FoundIndex = result;
    }
    document.getElementById("ItemIndex").innerText = FoundIndex;
    document.getElementById("Result").innerText = FoundResult;
});
