const display = document.getElementById('display');
const keys = document.querySelector('.keys');

// The calculator only ever holds two numbers and one operator,
// so there is no eval and no string parsing to go wrong.
let current = '0';
let previous = null;
let operator = null;
let freshEntry = true;

function calculate(a, b, op) {
  if (op === '+') return a + b;
  if (op === '-') return a - b;
  if (op === '*') return a * b;
  if (op === '/') return b === 0 ? NaN : a / b;
  return b;
}

function render() {
  display.textContent = current;
}

function enterDigit(digit) {
  if (freshEntry) {
    current = digit;
    freshEntry = false;
  } else if (current.replace('-', '').length < 12) {
    current = current === '0' ? digit : current + digit;
  }
  render();
}

function enterDot() {
  if (freshEntry) {
    current = '0.';
    freshEntry = false;
  } else if (!current.includes('.')) {
    current += '.';
  }
  render();
}

function applyOperator(op) {
  if (operator !== null && !freshEntry) {
    current = String(calculate(previous, Number(current), operator));
  }
  previous = Number(current);
  operator = op;
  freshEntry = true;
  render();
}

function press(key) {
  if (key >= '0' && key <= '9') return enterDigit(key);
  if (key === '.') return enterDot();
  if (key === 'clear') {
    current = '0';
    previous = null;
    operator = null;
    freshEntry = true;
  } else if (key === 'backspace') {
    current = current.length > 1 ? current.slice(0, -1) : '0';
  } else if (key === 'negate') {
    current = current.startsWith('-') ? current.slice(1) : '-' + current;
  } else if (key === '%') {
    current = String(Number(current) / 100);
  } else if (key === '=') {
    if (operator !== null) {
      current = String(calculate(previous, Number(current), operator));
      operator = null;
      previous = null;
      freshEntry = true;
    }
  } else {
    applyOperator(key);
  }
  render();
}

keys.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (button) press(button.dataset.key);
});

// Keyboard support mirrors the buttons, including Enter for equals.
document.addEventListener('keydown', (event) => {
  if (event.key >= '0' && event.key <= '9') press(event.key);
  else if (event.key === '.') press('.');
  else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') press(event.key);
  else if (event.key === 'Enter' || event.key === '=') press('=');
  else if (event.key === 'Backspace') press('backspace');
  else if (event.key === 'Escape') press('clear');
});

render();
