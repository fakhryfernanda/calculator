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