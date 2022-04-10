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
    if (b === 0) return zeroDivisionMessage;
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
    continue: false,
    point: false,
}

const zeroDivisionMessage = 'Divide by 0 error'
const currentInput = document.querySelector('.current-input');
const previousInput = document.querySelector('.previous-input');
const keyboardEl = document.querySelector('.keyboard');
const equalBtn = document.querySelector('.equal');
const clearBtn = document.querySelector('.clear');
const maxLength = 14;
const pointBtn = document.querySelector('.point')

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
        calculation.firstNumber = Number.parseFloat(calculation.firstNumber);
        previousInput.textContent = `${calculation.firstNumber} ${calculation.operator}`;
    } else {
        previousInput.textContent = '';
    }
}

function addInputedValue(e) {
    if (!e.target.classList.contains('digit')) return;
    if (checkMaxNumLegth(inputedValue)) return;
    inputedValue += e.target.textContent;
    if (calculation.operator === '') {
        calculation.firstNumber = inputedValue;
    } else {
        calculation.secondNumber = inputedValue;
    }
    ShowCurrentInput();
}

keyboardEl.addEventListener('click', addInputedValue);

function setOperator(e) {
    if (!e.target.classList.contains('operator')) return;
    if (calculation.evaluate) return;
    if (calculation.operator) {
        calculation.continue = true;
        evaluate();
        calculation.operator = e.target.textContent;
        return
    }
    calculation.operator = e.target.textContent;
    ShowPreviousInput();
    ShowCurrentInput();
    inputedValue = '';
    calculation.point = false;
}

keyboardEl.addEventListener('click', setOperator);

function evaluate(e) {
    if (!calculation.operator) return;
    calculation.secondNumber = Number.parseFloat(calculation.secondNumber);
    calculation.result = operate(calculation.operator, 
        calculation.firstNumber,
        calculation.secondNumber);
    if (checkMaxNumLegth(calculation.result)) {
        toFitResult();
    }
    calculation.evaluate = true;
    ShowPreviousInput();
    ShowCurrentInput();
    inputedValue = '';
    calculation.point = false;
}

equalBtn.addEventListener('click', evaluate);

function clear(e) {
    if (e.target == clearBtn) {
        calculation.operator = '';
        calculation.firstNumber = 0;
        calculation.secondNumber = 0;
        calculation.result = 0;
        calculation.evaluate = false;
        calculation.point = false;
        ShowPreviousInput();
        ShowCurrentInput();
        inputedValue = '';
    } else if (e.target.classList.contains('digit') && calculation.evaluate && !calculation.continue) {
        inputedValue = e.target.textContent;
        calculation.operator = '';
        calculation.firstNumber = Number.parseFloat(inputedValue);
        calculation.secondNumber = 0;
        calculation.result = 0;
        calculation.evaluate = false;
        calculation.point = false;
        ShowPreviousInput();
        ShowCurrentInput();
    } else if (e.target.classList.contains('operator') && calculation.evaluate && !calculation.continue) {
        calculation.operator = e.target.textContent;
        calculation.firstNumber = calculation.result;
        calculation.secondNumber = 0;
        calculation.result = 0;
        calculation.evaluate = false;
        calculation.point = false;
        ShowPreviousInput();
        ShowCurrentInput();
        inputedValue = '';
    } else if (e.target.classList.contains('digit') && calculation.evaluate && calculation.continue) {
        inputedValue = e.target.textContent;
        calculation.firstNumber = calculation.result;
        calculation.secondNumber = Number.parseFloat(inputedValue);
        calculation.result = 0;
        calculation.evaluate = false;
        calculation.continue = false;
        calculation.point = false;
        ShowPreviousInput();
        ShowCurrentInput();
    }
}

keyboardEl.addEventListener('click', clear);

function checkMaxNumLegth(num) {
    num = num.toString();
    if (num.length < maxLength) {
        return false;
    } else {
        return true;
    }
}

function toFitResult() {
    if (calculation.result == zeroDivisionMessage) return;
    if (calculation.result.isInt) {
        calculation.result = calculation.result.toExponential(2);
    } else {
        intPart = Math.trunc(calculation.result);
        if (checkMaxNumLegth(intPart)) {
            calculation.result = calculation.result.toExponential(2);
        } else {
            calculation.result = calculation.result
            .toFixed(maxLength - 1 - intPart.toString().length);
        }
    }

}

function addPoint() {
    if (calculation.point) return;
    if (!inputedValue) {
        inputedValue = '0.';
    } else {
        inputedValue += '.';
    }
    calculation.point = true;
    if (calculation.operator === '') {
        calculation.firstNumber = inputedValue;
    } else {
        calculation.secondNumber = inputedValue;
    }
    ShowCurrentInput();
}

pointBtn.addEventListener('click', addPoint);

document.addEventListener('keypress', (e) => console.dir(e))