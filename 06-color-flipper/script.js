const colorCodeEl = document.getElementById('color-code');
const flipBtn = document.getElementById('flip');
const copyBtn = document.getElementById('copy');
const copiedEl = document.getElementById('copied');

const hexDigits = '0123456789ABCDEF';

function randomHex() {
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += hexDigits[Math.floor(Math.random() * 16)];
  }
  return color;
}

flipBtn.addEventListener('click', () => {
  const color = randomHex();
  document.body.style.background = color;
  colorCodeEl.textContent = color;
  copiedEl.hidden = true;
});

copyBtn.addEventListener('click', async () => {
  await navigator.clipboard.writeText(colorCodeEl.textContent);
  copiedEl.hidden = false;
});
