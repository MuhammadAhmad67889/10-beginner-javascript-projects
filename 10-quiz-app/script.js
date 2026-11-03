const quizEl = document.getElementById('quiz');
const progressEl = document.getElementById('progress');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const resultsEl = document.getElementById('results');
const finalScoreEl = document.getElementById('final-score');
const finalMessageEl = document.getElementById('final-message');
const restartBtn = document.getElementById('restart');

const questions = [
  {
    question: 'Which keyword declares a variable that cannot be reassigned?',
    answers: ['let', 'var', 'const', 'static'],
    correct: 2,
  },
  {
    question: 'What does JSON stand for?',
    answers: ['JavaScript Object Notation', 'Java Standard Output Network', 'JavaScript Oriented Nodes', 'Joined Script Object Names'],
    correct: 0,
  },
  {
    question: 'Which method adds an item to the end of an array?',
    answers: ['shift()', 'push()', 'pop()', 'slice()'],
    correct: 1,
  },
  {
    question: 'What is the result of typeof [] in JavaScript?',
    answers: ['array', 'list', 'object', 'undefined'],
    correct: 2,
  },
  {
    question: 'Which of these is NOT a JavaScript data type?',
    answers: ['string', 'boolean', 'float', 'symbol'],
    correct: 2,
  },
];

let current = 0;
let score = 0;

function showQuestion() {
  const q = questions[current];
  progressEl.textContent = `Question ${current + 1} of ${questions.length}`;
  questionEl.textContent = q.question;

  // Buttons are rebuilt each round, so no stale state carries over.
  answersEl.innerHTML = '';
  q.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.textContent = answer;
    button.addEventListener('click', () => answerQuestion(index, button));
    answersEl.appendChild(button);
  });
}

function answerQuestion(index, button) {
  const q = questions[current];
  if (index === q.correct) {
    score++;
    button.classList.add('correct');
  } else {
    button.classList.add('wrong');
    answersEl.children[q.correct].classList.add('correct');
  }

  answersEl.querySelectorAll('button').forEach((b) => { b.disabled = true; });

  setTimeout(() => {
    current++;
    if (current < questions.length) showQuestion();
    else showResults();
  }, 900);
}

function showResults() {
  quizEl.hidden = true;
  resultsEl.hidden = false;
  finalScoreEl.textContent = `You scored ${score} out of ${questions.length}`;
  finalMessageEl.textContent = score === questions.length
    ? 'Perfect score — nice work!'
    : score >= 3
      ? 'Solid. Review the ones you missed and try again.'
      : 'A good start. Run through it once more.';
}

restartBtn.addEventListener('click', () => {
  current = 0;
  score = 0;
  resultsEl.hidden = true;
  quizEl.hidden = false;
  showQuestion();
});

showQuestion();
