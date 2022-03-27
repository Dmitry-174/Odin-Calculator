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

const calculation = {
    operator: '',
    firstNumber: 0,
    secondNumber: 0,
    result: 0,
    evaluate: false,
}

const currentInput = document.querySelector('.current-input');
const previousInput = document.querySelector('.previous-input');
const keyboardEl = document.querySelector('.keyboard');
const equalBtn = document.querySelector('.equal');
const clearBtn = document.querySelector('.clear');

let inputedValue = '';

function ShowCurrentInput() {
    if (calculation.evaluate) {
        currentInput.textContent = calculation.result;
    } else if (calculation.operator) {
        currentInput.textContent = calculation.secondNumber;
    } else {
        currentInput.textContent = calculation.firstNumber;
    }
}

function ShowPreviousInput() {
    if (calculation.evaluate) {
        previousInput.textContent = `${calculation.firstNumber} ${calculation.operator} ${calculation.secondNumber}`;
    } else if (calculation.operator) {
        previousInput.textContent = `${calculation.firstNumber} ${calculation.operator}`;
    } else {
        previousInput.textContent = '';
    }
}

function addInputedValue(e) {
    if (!e.target.classList.contains('digit')) return;
    inputedValue += e.target.textContent;
    if (calculation.operator === '') {
        calculation.firstNumber = Number.parseFloat(inputedValue);
    } else {
        calculation.secondNumber = Number.parseFloat(inputedValue);
    }
    ShowCurrentInput();
}

keyboardEl.addEventListener('click', addInputedValue);

function setOperator(e) {
    if (!e.target.classList.contains('operator')) return;
    calculation.operator = e.target.textContent;
    ShowPreviousInput();
    inputedValue = '';
}

keyboardEl.addEventListener('click', setOperator);

function evaluate(e) {
    calculation.result = operate(calculation.operator, calculation.firstNumber,
        calculation.secondNumber);
    calculation.evaluate = true;
    ShowPreviousInput();
    ShowCurrentInput();
    inputedValue = '';
}

equalBtn.addEventListener('click', evaluate);

function clear(e) {
    if (e.target == clearBtn) {
        calculation.operator = '';
        calculation.firstNumber = 0;
        calculation.secondNumber = 0;
        calculation.result = 0;
        calculation.evaluate = false;
        ShowPreviousInput();
        ShowCurrentInput();
        inputedValue = '';
    } else if (e.target.classList.contains('digit') && calculation.evaluate) {
        inputedValue = e.target.textContent;
        calculation.operator = '';
        calculation.firstNumber = Number.parseFloat(inputedValue);
        calculation.secondNumber = 0;
        calculation.result = 0;
        calculation.evaluate = false;
        ShowPreviousInput();
        ShowCurrentInput();
    } else if (e.target.classList.contains('operator') && calculation.evaluate) {
        calculation.operator = e.target.textContent;
        calculation.firstNumber = calculation.result;
        calculation.secondNumber = 0;
        calculation.result = 0;
        calculation.evaluate = false;
        ShowPreviousInput();
        ShowCurrentInput();
        inputedValue = '';
    }
}

keyboardEl.addEventListener('click', clear);