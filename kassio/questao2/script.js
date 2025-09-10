// Seleciona os elementos
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let operator = '';
let firstOperand = null;
let waitForSecondOperand = false;

// Função para resetar a calculadora
function resetCalculator() {
    currentInput = '';
    operator = '';
    firstOperand = null;
    waitForSecondOperand = false;
    display.value = '';
}

// Função para lidar com a entrada de números
function handleNumber(number) {
    if (waitForSecondOperand) {
        currentInput = number;
        waitForSecondOperand = false;
    } else {
        currentInput += number;
    }
    display.value = currentInput;
}

// Função para lidar com a entrada de operadores
function handleOperator(nextOperator) {
    const inputValue = parseFloat(currentInput);

    if (operator && waitForSecondOperand) {
        operator = nextOperator;
        return;
    }

    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = operate(firstOperand, inputValue, operator);
        display.value = result;
        firstOperand = result;
    }

    waitForSecondOperand = true;
    operator = nextOperator;
}

// Função para lidar com o botão de igual
function handleEquals() {
    const inputValue = parseFloat(currentInput);
    if (firstOperand !== null && operator) {
        const result = operate(firstOperand, inputValue, operator);
        display.value = result;
        currentInput = String(result);
        firstOperand = null;
        operator = '';
        waitForSecondOperand = true;
    }
}

// Função para realizar a operação matemática
function operate(first, second, op) {
    if (op === '+') return first + second;
    if (op === '-') return first - second;
    if (op === '*') return first * second;
    if (op === '/') {
        if (second === 0) {
            return 'Erro';
        }
        return first / second;
    }
}

// Adiciona "ouvintes" de evento aos botões
buttons.forEach(button => {
    button.addEventListener('click', event => {
        const value = event.target.textContent;

        if (event.target.classList.contains('number')) {
            handleNumber(value);
        } else if (event.target.classList.contains('operator')) {
            handleOperator(value);
        } else if (event.target.classList.contains('equals')) {
            handleEquals();
        } else if (event.target.classList.contains('clear')) {
            resetCalculator();
        }
    });
});