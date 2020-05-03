const display = document.querySelector("#display"),
    numberButtons = document.querySelectorAll(".calc-number"),
    equalsButton = document.querySelector(".calc-equals"),
    initButton = document.querySelector(".calc-init"),
    opButtons = document.querySelectorAll(".calc-op");

const NUMBER_INITIAL = 0;
const OPERATOR_INITIAL = "";
const OPERATOR_PLUS = "+";
const OPERATOR_MINUS = "-";
const OPERATOR_TIMES = "*";
const OPERATOR_DIVIDE = "/";

let leftValue = NUMBER_INITIAL;
let operator = OPERATOR_INITIAL;
let isClickedOp = false;

function hasOperator() {
    return operator !== OPERATOR_INITIAL;
}

function updateDisplay(result) {
    display.value = result.toString();
}

function initHandler() {
    leftValue = NUMBER_INITIAL;
    operator = OPERATOR_INITIAL;
    updateDisplay(NUMBER_INITIAL);
}

function equals() {
    let result;
    switch(operator) {
        case OPERATOR_PLUS:
            result = leftValue + parseInt(display.value);
            break;
        case OPERATOR_MINUS:
            result = leftValue - parseInt(display.value);
            break;
        case OPERATOR_TIMES:
            result = leftValue * parseInt(display.value);
            break;
        case OPERATOR_DIVIDE:
            result = leftValue / parseInt(display.value);
            break;
        case OPERATOR_INITIAL:
            result = leftValue;
            break;
        default: return 0;
    }
    return result;
}

function equalsHandler(event) {
    let result = equals();
    
    leftValue = result;
    operator = OPERATOR_INITIAL;
    updateDisplay(result);
}

function numberClicked(event) {
    let result; 
    if( isClickedOp ) {
        result = event.target.value;
    } else {
        if(display.value === NUMBER_INITIAL.toString()) {
            result = event.target.value;
        } else {
            result = display.value + event.target.value;
        }
    }
    isClickedOp = false;
    updateDisplay(result);
}

function opClicked() {
    if(hasOperator()) {
        equals();
    }
    operator = event.target.value;
    leftValue = parseInt(display.value);
    isClickedOp = true;
}

function init() {
    initButton.addEventListener("click", initHandler);
    
    equalsButton.addEventListener("click", equalsHandler);

    numberButtons.forEach(button => {
      button.addEventListener("click", numberClicked);  
    });

    opButtons.forEach(button => {
        button.addEventListener("click", opClicked);
    });
}

init();