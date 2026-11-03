const timeEl = document.getElementById('time');
const startStopBtn = document.getElementById('start-stop');
const lapBtn = document.getElementById('lap');
const resetBtn = document.getElementById('reset');
const lapsEl = document.getElementById('laps');

let startTime = 0;
let elapsed = 0;
let timerId = null;

function format(ms) {
  const hundredths = Math.floor(ms / 10) % 100;
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / 60000);
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(minutes)}:${pad(seconds)}.${pad(hundredths)}`;
}

function render() {
  timeEl.textContent = format(elapsed);
}

// Elapsed time is always computed from the clock, never by counting
// ticks, so pausing and tab switches don't drift the result.
function tick() {
  elapsed = Date.now() - startTime;
  render();
}

startStopBtn.addEventListener('click', () => {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
    startStopBtn.textContent = 'Start';
  } else {
    startTime = Date.now() - elapsed;
    timerId = setInterval(tick, 10);
    startStopBtn.textContent = 'Stop';
  }
});

lapBtn.addEventListener('click', () => {
  if (!timerId) return;
  const lap = document.createElement('li');
  lap.textContent = `Lap ${lapsEl.children.length + 1} — ${format(elapsed)}`;
  lapsEl.appendChild(lap);
});

resetBtn.addEventListener('click', () => {
  clearInterval(timerId);
  timerId = null;
  elapsed = 0;
  lapsEl.innerHTML = '';
  startStopBtn.textContent = 'Start';
  render();
});

render();
