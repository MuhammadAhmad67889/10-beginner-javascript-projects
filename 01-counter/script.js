const countEl = document.getElementById('count');
const buttons = document.querySelector('.buttons');

let count = 0;

function render() {
  countEl.textContent = count;
  countEl.className = count > 0 ? 'positive' : count < 0 ? 'negative' : '';
}

// One listener on the container instead of three on the buttons.
buttons.addEventListener('click', (event) => {
  const action = event.target.dataset.action;
  if (!action) return;

  if (action === 'increase') count++;
  else if (action === 'decrease') count--;
  else count = 0;

  render();
});

render();
