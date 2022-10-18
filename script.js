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
const pointBtn = document.querySelector('.point');
const operators = ['/', '*', '-', '+'];

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
    if (checkIntZero() && e.target.textContent == 0) return;
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
    if (!e.target.classList.contains('operator') &&
        e.type === 'click') {
        return;
    }
    if (calculation.evaluate) return;
    if (calculation.operator) {
        calculation.continue = true;
        evaluate();
        calculation.operator = e.type === 'click' ? e.target.textContent :
            e.key;
        return
    }

    calculation.operator = e.type === 'click' ? e.target.textContent :
        e.key;
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
    if (e.target == clearBtn || e.key === 'Delete') {
        calculation.operator = '';
        calculation.firstNumber = 0;
        calculation.secondNumber = 0;
        calculation.result = 0;
        calculation.evaluate = false;
        calculation.point = false;
        ShowPreviousInput();
        ShowCurrentInput();
        inputedValue = '';
    } else if ((e.type === 'click' && e.target.classList.contains('digit') ||
        e.type === 'keypress' && e.key >= 0 && e.key <= 9)
        && calculation.evaluate && !calculation.continue) {
        inputedValue = e.type === 'click' ? e.target.textContent :
            e.key;
        calculation.operator = '';
        calculation.firstNumber = Number.parseFloat(inputedValue);
        calculation.secondNumber = 0;
        calculation.result = 0;
        calculation.evaluate = false;
        calculation.point = false;
        ShowPreviousInput();
        ShowCurrentInput();
    } else if ((e.type === 'click' && e.target.classList.contains('operator') ||
        e.type === 'keypress' && operators.includes(e.key)) &&
        calculation.evaluate && !calculation.continue) {
        calculation.operator = e.type === 'click' ? e.target.textContent :
            e.key;
        calculation.firstNumber = calculation.result;
        calculation.secondNumber = 0;
        calculation.result = 0;
        calculation.evaluate = false;
        calculation.point = false;
        ShowPreviousInput();
        ShowCurrentInput();
        inputedValue = '';
    } else if ((e.type === 'click' && e.target.classList.contains('digit') ||
        e.type === 'keypress' && e.key >= 0 && e.key <= 9) &&
        calculation.evaluate && calculation.continue) {
        inputedValue = e.type === 'click' ? e.target.textContent :
            e.key;
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

function keyboardHandle(e) {
    if (e.key >= 0 && e.key <= 9 && !calculation.evaluate) {
        if (checkIntZero() && e.key == 0) return;
        if (checkMaxNumLegth(inputedValue)) return;
        inputedValue += e.key;
        if (calculation.operator === '') {
            calculation.firstNumber = inputedValue;
        } else {
            calculation.secondNumber = inputedValue;
        }
        ShowCurrentInput();
    } else if (e.key >= 0 && e.key <= 9 && calculation.evaluate) {
        clear(e);
    } else if (e.key === '=' || e.key === "Enter") {
        evaluate();
    } else if (e.key === '.' || e.key === ',') {
        addPoint();
    } else if (operators.includes(e.key)) {
        setOperator(e);
        clear(e);
    } else if (e.key === 'Delete') {
        clear(e);
    }

}

document.addEventListener('keypress', keyboardHandle)

function checkIntZero() {
    return inputedValue == 0 && !inputedValue.includes('.');
}