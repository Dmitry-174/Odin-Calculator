function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) return 'Divide by 0 is prohibited'
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}

function showInputedValue() {
    keyboardEl.addEventListener('click', (e) => {
        if (!e.target.classList.contains('digit')) return;
        inputedValue += e.target.textContent;
        currentInput.textContent = inputedValue;
    })
} 

function makeCalculations() {
    keyboardEl.addEventListener('click', (e) => {
        if (!e.target.classList.contains('operator')) return;
        operator = e.target.textContent;
        first = Number(inputedValue);
        previousInput.textContent = `${first} ${operator}`;
        inputedValue = '';
    })
}

function ShowResult() {
    keyboardEl.addEventListener('click', (e) => {
        if (!e.target.classList.contains('equal')) return;
        second = Number(inputedValue)
        const result = operate(operator, first, second)
        previousInput.textContent = `${first} ${operator} ${second} =`;
        inputedValue = '';
        currentInput.textContent = result;
    })
}

let operator = '';
let first = 0;
let second = 0;
let inputedValue = '';
const keyboardEl = document.querySelector('.keyboard');
const currentInput = document.querySelector('.current-input');
const previousInput = document.querySelector('.previous-input');

showInputedValue();
makeCalculations();
ShowResult();
