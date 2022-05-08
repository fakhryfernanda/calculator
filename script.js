const calculator = document.querySelector('.calculator');
const numbers = calculator.querySelectorAll('[data-button="number"]');
const clearButton = calculator.querySelector('[data-button="clear"]');

let resultVal = 0;

numbers.forEach(number => {
    number.addEventListener('click', e => {
    
    resultVal = 10*resultVal + parseInt(e.target.innerText);
    showResult(resultVal);

    });
});

clearButton.addEventListener('click', clearMonitor);

function showResult(value) {
    const resultDiv = calculator.querySelector('.result');
    resultDiv.innerText = value;
};

function clearMonitor() {
    resultVal = 0;
    showResult(0);
};

function add(a,b) {return (a + b)};
function subtract(a,b) {return (a - b)};
function multiply(a,b) {return (a * b)};
function divide(a,b) {return (a / b)};

function operate(leftOperand, rightOperand, operator) {
    switch(operator) {
        case 'add':
            return add(leftOperand, rightOperand);
            break;
        case 'substract':
            return substract(leftOperand, rightOperand);
            break;
        case 'multiply':
            return multiply(leftOperand, rightOperand);
            break;        
        case 'divide':
            return divide(leftOperand, rightOperand);
            break;    
    
    }
};

