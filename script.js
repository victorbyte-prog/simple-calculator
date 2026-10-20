const display = document.getElementById('display');

let currentValue = '0';
let storedValue = null;
let operator = null;
let waitingForSecondValue = false;

function updateDisplay() {
  display.value = currentValue;
}

function clearDisplay() {
  currentValue = '0';
  storedValue = null;
  operator = null;
  waitingForSecondValue = false;
  updateDisplay();
}

function deleteLast() {
  if (waitingForSecondValue) return;

  if (currentValue.length <= 1 || currentValue === '0') {
    currentValue = '0';
  } else {
    currentValue = currentValue.slice(0, -1);
  }

  updateDisplay();
}

function appendNumber(value) {
  if (value === '.' && currentValue.includes('.')) {
    return;
  }

  if (waitingForSecondValue) {
    currentValue = value === '.' ? '0.' : value;
    waitingForSecondValue = false;
  } else if (currentValue === '0' && value !== '.') {
    currentValue = value;
  } else {
    currentValue += value;
  }

  updateDisplay();
}

function handleOperator(nextOperator) {
  const inputValue = Number(currentValue);

  if (storedValue === null) {
    storedValue = inputValue;
  } else if (operator) {
    const result = performCalculation(storedValue, inputValue, operator);
    currentValue = String(result);
    storedValue = result;
  }

  waitingForSecondValue = true;
  operator = nextOperator;
  updateDisplay();
}

function performCalculation(first, second, op) {
  switch (op) {
    case '+':
      return first + second;
    case '-':
      return first - second;
    case '*':
      return first * second;
    case '/':
      return second === 0 ? 'Error' : first / second;
    default:
      return second;
  }
}

function calculateResult() {
  if (storedValue === null || operator === null || waitingForSecondValue) {
    return;
  }

  const result = performCalculation(storedValue, Number(currentValue), operator);

  currentValue = String(result);
  storedValue = null;
  operator = null;
  waitingForSecondValue = false;

  if (currentValue === 'Error') {
    currentValue = '0';
  }

  updateDisplay();
}

updateDisplay();
