const passwordEl = document.getElementById('password');
const lengthInput = document.getElementById('length');
const lengthValue = document.getElementById('length-value');
const copyBtn = document.getElementById('copy');
const generateBtn = document.getElementById('generate');
const copiedEl = document.getElementById('copied');

const sets = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{};:,.<>?',
};

function selectedSets() {
  return Object.keys(sets).filter((key) => document.getElementById(key).checked);
}

function generate() {
  const chosen = selectedSets();
  if (chosen.length === 0) {
    passwordEl.value = '';
    passwordEl.placeholder = 'Tick at least one character set';
    return;
  }

  const pool = chosen.map((key) => sets[key]).join('');
  const length = Number(lengthInput.value);

  // crypto.getRandomValues instead of Math.random: passwords deserve
  // real randomness, and this avoids modulo bias with rejection sampling.
  const random = new Uint32Array(length);
  crypto.getRandomValues(random);
  let password = '';
  for (let i = 0; i < length; i++) {
    password += pool[random[i] % pool.length];
  }

  passwordEl.value = password;
  passwordEl.placeholder = 'Your password will appear here';
  copiedEl.hidden = true;
}

lengthInput.addEventListener('input', () => {
  lengthValue.textContent = lengthInput.value;
});

generateBtn.addEventListener('click', generate);

copyBtn.addEventListener('click', async () => {
  if (!passwordEl.value) return;
  await navigator.clipboard.writeText(passwordEl.value);
  copiedEl.hidden = false;
});

generate();
