const calculator = document.querySelector('.calculator');
const resultDiv = calculator.querySelector('.result');
const numbers = calculator.querySelectorAll('[data-button="number"]');
const operators = calculator.querySelectorAll('[data-button*="operator"]');
const equalSign = calculator.querySelector('[data-button="equal-sign"]');
const backSpace = calculator.querySelector('[data-button="backspace"]');
const clearButton = calculator.querySelector('[data-button="clear"]');

const myCalc = new Calculator();

// VARIABLES

operationSign = {
    'add-operator' : '&plus;', 
    'substract-operator' : '&minus;', 
    'multiply-operator' : '&times;', 
    'divide-operator' : '&divide;',
    'equal-sign' : '&equals;'
};

const actions = ['leftOperand', 'operator', 'rightOperand', 'result'];
let pointer = actions[0];

let operatorClicked = false;
let equalSignClicked = false;

let currentValue = 0; // berkaitan dengan nilai asli leftOperand atau rightOperand
let resultText = ''; // berkaitan dengan apa yang akan ditampilkan di monitor
let variables = []; // riwayat operasi

let history = []; // riwayat operasi sebelumnya

// DEBUGGING

calculator.addEventListener('click', () => console.log(variables));

// NUMBERS

numbers.forEach(number => {
    number.addEventListener('click', e => {

        // jika perhitungan sebelumnya sudah selesai, tampilkan hasil perhitungan sebelumnya pada previous-calculation
        // dan gunakan hasil sebelumnya sebagai leftOperand
        if (variables.length === 5) {
            clearAll();
        };
        
        // jika operator sudah ditekan, pindahkan pointer
        if (operatorClicked) {
            pointer = actions[2];
        };    

        // proses utama
        currentValue = 10*currentValue + parseInt(e.target.innerText);

        if (pointer === actions[0]) {
            variables[0] = currentValue;
        } else if (pointer === actions[2]) {
            variables[2] = currentValue;
        };

        monitorResult();
    });
});

// OPERATORS

operators.forEach(operator => {
    // memastikan operator tidak dapat diklik dua kali
    if (!operatorClicked) {
        operator.addEventListener('click', (e) => {

            // menandai bahwa operator sudah ditekan
            operatorClicked = true;
    
            // jika operator ditekan sebelum memasukkan leftOperand, otomatis leftOperand = 0
            if (variables[0] === undefined) {
                variables[0] = 0;
            };
    
            // memindahkan pointer
            pointer = actions[1];
    
            // memasukkan operator ke array variables
            variables[1] = e.target.getAttribute('data-button');
    
            currentValue = 0;
    
            monitorResult();
        });
    }
});

// EQUAL SIGN

// mencegah equal-sign ditekan dua kali
!equalSignClicked && equalSign.addEventListener('click', (e) => {
    // menandai equal-sign sudah ditekan
    equalSignClicked = true;

    // memindahkan pointer
    pointer = actions[3];

    // memasukkan equal-sign ke array variables
    variables[3] = e.target.getAttribute('data-button');

    // menampilkan riwayat operasi pada previous-result div
    monitorCalculation();

    // melakukan perhitungan berdasarkan leftOperand, operator, dan rightOperand
    currentValue = myCalc.calculate(variables[0], variables[2], variables[1]);

    // memasukkan hasil perhitungan ke array variables
    variables[4] = currentValue;

    // console.log(variables);
    
    // menampilkan hasil perhitungan pada monitor
    monitorResult();
});

// BACKSPACING

backSpace.addEventListener('click', backSpacing);

// CLEAR MONITOR

clearButton.addEventListener('click', clearAll);

// FUNCTIONS

function monitorCalculation() {
    const calculationDiv = calculator.querySelector('.previous-calculation');

    let monitorText;
    if (pointer !== null) {
        monitorText = variables[0] + ' ' + operationSign[variables[1]] + ' ' + variables[2] + ' ' + operationSign[variables[3]];
    } else {
        monitorText = `Ans = ${variables[4]}`;
    };

    calculationDiv.innerHTML = monitorText;
};

function monitorResult() {
    const resultDiv = calculator.querySelector('.result');
    let monitorText;

    switch(pointer) {
        case actions[0]:
            monitorText = variables[0];
            break;
        case actions[1]:
            monitorText = variables[0] + ' ' + operationSign[variables[1]];
            break;
        case actions[2]:
            monitorText = variables[0] + ' ' + operationSign[variables[1]] + ' ' + variables[2];
            break;
        case actions[3]:
            monitorText = variables[4];
            break;
        case null:
            monitorText = 0;
    };

    resultDiv.innerHTML = monitorText;
};

function backSpacing() {
    switch(pointer) {
        case actions[0]:
            currentValue = Math.floor(currentValue / 10);
            variables[0] = currentValue;
            break;
        case actions[1]:
            operatorClicked = false;
            pointer = actions[0];
            variables = variables.slice(0, -1);
            currentValue = variables[0];
            break;
        case actions[2]:
            currentValue = Math.floor(currentValue / 10);
            variables[2] = currentValue;
            if (currentValue === 0) {
                if (operatorClicked) {
                    variables = variables.slice(0, -1);
                    pointer = actions[1];
                }
            };
            break;
        case actions[3]:
            clearAll();
            break;
    };

    monitorResult();

    if (currentValue === 0) {
        monitorResult(0);
    };
};

function clearAll() {

    pointer = null;
    if (variables.length === 5) {
        monitorCalculation();
    }
    monitorResult();
    pointer = actions[0];
    
    operatorClicked = false;
    equalSignClicked = false;
    variables = [];
    currentValue = 0;
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