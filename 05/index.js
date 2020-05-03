const rangeDescription = document.querySelector("#range_description"),
    range = document.querySelector("#range"),
    guessInput = document.querySelector("#guess"),
    playButton = document.querySelector("#play"),
    currentDescription = document.querySelector("#current_description"),
    result = document.querySelector("#result");

const DEFAULT_MIN = 0, DEFAULT_MAX = 10;
let currentMin, currentMax;


function changedRange() {
    currentMax = range.value;
    updateRangeDescription();
}

function updateRangeDescription() {
    rangeDescription.innerHTML = `Generate a number between ${currentMin} and ${currentMax}`
}

function updateCurrentDescription(random, userNumber) {
    currentDescription.innerHTML = `You chose: ${userNumber}, the machine chose : ${random}`
}

function generateRandom() {
    const min = Math.ceil(currentMin);
    const max = Math.floor(currentMax)+1;
    return Math.floor(Math.random() * (max - min)) + min;
}

function guess() {
    const random = generateRandom();
    const userNumber = parseInt(guessInput.value);
    updateCurrentDescription(random, userNumber);
    if(userNumber === random) {
        result.innerHTML = 'You won!'
    } else {
        result.innerHTML = 'You lose!'
    }

}

function configGuess() {
    playButton.addEventListener("click", guess);
}

function init() {
    range.min = currentMin = DEFAULT_MIN;
    range.value = currentMax = DEFAULT_MAX;
    updateRangeDescription();
    range.addEventListener("change", changedRange);
    

    guessInput.addEventListener("change", configGuess);
}

init();