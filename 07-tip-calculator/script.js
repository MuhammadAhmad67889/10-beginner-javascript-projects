const billInput = document.getElementById('bill');
const tipSelect = document.getElementById('tip-percent');
const peopleInput = document.getElementById('people');
const tipAmountEl = document.getElementById('tip-amount');
const totalEl = document.getElementById('total');
const perPersonEl = document.getElementById('per-person');

function money(value) {
  return '$' + value.toFixed(2);
}

function update() {
  // Empty or invalid input counts as zero, never NaN on screen.
  const bill = Math.max(0, Number(billInput.value) || 0);
  const people = Math.max(1, Math.floor(Number(peopleInput.value)) || 1);
  const tip = bill * Number(tipSelect.value);
  const total = bill + tip;

  tipAmountEl.textContent = money(tip);
  totalEl.textContent = money(total);
  perPersonEl.textContent = money(total / people);
}

// One handler for all three controls: the result is always live.
[billInput, tipSelect, peopleInput].forEach((el) => {
  el.addEventListener('input', update);
});

update();
