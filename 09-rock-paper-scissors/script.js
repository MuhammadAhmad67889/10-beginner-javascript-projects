const scoreEl = document.getElementById('score');
const resultEl = document.getElementById('result');
const choicesEl = document.querySelector('.choices');
const resetBtn = document.getElementById('reset');

const choices = ['rock', 'paper', 'scissors'];
// Each key beats the value next to it: rock beats scissors, and so on.
const beats = { rock: 'scissors', paper: 'rock', scissors: 'paper' };

let playerScore = 0;
let computerScore = 0;

function render() {
  scoreEl.textContent = `You ${playerScore} — ${computerScore} Computer`;
}

choicesEl.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;

  const player = button.dataset.choice;
  const computer = choices[Math.floor(Math.random() * choices.length)];

  if (player === computer) {
    resultEl.textContent = `Both picked ${player}. It's a draw.`;
  } else if (beats[player] === computer) {
    playerScore++;
    resultEl.textContent = `${player} beats ${computer}. You win this round!`;
  } else {
    computerScore++;
    resultEl.textContent = `${computer} beats ${player}. Computer wins this round.`;
  }
  render();
});

resetBtn.addEventListener('click', () => {
  playerScore = 0;
  computerScore = 0;
  resultEl.textContent = 'Pick one to start.';
  render();
});

render();
