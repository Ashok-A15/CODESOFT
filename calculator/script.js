const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let expression = ''; // Stores everything the user enters
let firstNumber = null;
let secondNumber = null;
let operator = null;

// Function to calculate two numbers
function calculate(a, b, op) {
  a = parseFloat(a);
  b = parseFloat(b);
  if (op === '+') return a + b;
  if (op === '-') return a - b;
  if (op === '*') return a * b;
  if (op === '/') return b !== 0 ? a / b : 'Error';
  return b;
}

// Update the display
function updateDisplay() {
  display.value = expression;
}

// Handle button clicks
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');

    if (button.id === 'clear') {
      expression = '';
      firstNumber = null;
      secondNumber = null;
      operator = null;
      updateDisplay();
    } else if (button.id === 'equals') {
      if (firstNumber !== null && operator && expression) {
        secondNumber = expression.split(operator).pop();
        const result = calculate(firstNumber, secondNumber, operator);
        expression = result.toString();
        firstNumber = result;
        operator = null;
        updateDisplay();
      }
    } else if (button.classList.contains('operator')) {
      if (firstNumber === null && expression) {
        firstNumber = expression;
      } else if (operator && expression) {
        secondNumber = expression.split(operator).pop();
        firstNumber = calculate(firstNumber, secondNumber, operator);
        expression = firstNumber.toString();
      }
      operator = value;
      expression += value;
      updateDisplay();
    } else {
      expression += value;
      updateDisplay();
    }
  });
});

// Keyboard support
document.addEventListener('keydown', (e) => {
  const keys = '0123456789+-*/.';
  if (keys.includes(e.key)) {
    expression += e.key;
    updateDisplay();
  } else if (e.key === 'Enter') {
    const parts = expression.split(/([+\-*/])/);
    if (parts.length >= 3) {
      let a = parts[0];
      let op = parts[1];
      let b = parts[2];
      const result = calculate(a, b, op);
      expression = result.toString();
      updateDisplay();
    }
  } else if (e.key === 'Backspace') {
    expression = expression.slice(0, -1);
    updateDisplay();
  } else if (e.key.toLowerCase() === 'c') {
    expression = '';
    firstNumber = null;
    secondNumber = null;
    operator = null;
    updateDisplay();
  }
});
