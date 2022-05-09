const calculator = document.querySelector('.calculator');
const resultDiv = calculator.querySelector('.result');
const numbers = calculator.querySelectorAll('[data-button="number"]');
const operators = calculator.querySelectorAll('[data-button*="operator"]');
const equalSign = calculator.querySelector('[data-button="equal-sign"]');
const clearButton = calculator.querySelector('[data-button="clear"]');

const myCalc = new Calculator();

// VARIABLES

let operatorClicked = false;
let equalSignClicked = false;

let monitorText = '';
let currentValue = 0;
let variables = [];

// NUMBERS

numbers.forEach(number => {
    number.addEventListener('click', e => {
    
    currentValue = 10*currentValue + parseInt(e.target.innerText);
    monitorText += e.target.innerText;
    updateMonitor(monitorText);

    });
});

// OPERATORS

!operatorClicked && operators.forEach(operator => {
    operator.addEventListener('click', (e) => {
        operatorClicked = true;
        if (monitorText === '') {monitorText += '0'};

        variables.push(currentValue);
        variables.push(e.target.getAttribute('data-button'));
        monitorText += ' ' + e.target.innerText + ' ';
        currentValue = 0;

        updateMonitor(monitorText);
    });
});

// EQUAL SIGN

!equalSignClicked && equalSign.addEventListener('click', (e) => {
    equalSignClicked = true;

    variables.push(currentValue);
    variables.push(e.target.getAttribute('data-button'));
    monitorText += ' ' + e.target.innerText + ' ';
    currentValue = myCalc.calculate(variables[0], variables[2], variables[1]);
    variables.push(currentValue);
    monitorText += currentValue;
    updateMonitor(monitorText);
});

// CLEAR MONITOR

clearButton.addEventListener('click', clearAll);

// FUNCTIONS

function updateMonitor(monitorText) {
    const resultDiv = calculator.querySelector('.result');
    resultDiv.innerText = monitorText;
};

function clearAll() {
    operatorClicked = false;
    equalSignClicked = false;
    variables = [];

    currentValue = 0;
    monitorText = '';
    updateMonitor(0);
};

function Calculator() {
    this.add = (a,b) => a + b;
    this.substract = (a,b) => a - b;
    this.multiply = (a,b) => a * b;
    this.divide = (a,b) => a / b;

    this.calculate = function(a,b,operator) {
        switch(operator) {
            case 'add-operator':
                return this.add(a,b);
            case 'substract-operator':
                return this.substract(a,b);
            case 'multiply-operator':
                return this.multiply(a,b);        
            case 'divide-operator':
                if (b !== 0) {
                    return this.divide(a,b);
                } else {
                    alert("You can't divide by zero")
                }
                break;
        };
    };
};