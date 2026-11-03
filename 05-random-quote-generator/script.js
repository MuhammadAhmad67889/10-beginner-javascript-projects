const quoteEl = document.getElementById('quote');
const authorEl = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const copyBtn = document.getElementById('copy-quote');
const copiedEl = document.getElementById('copied');

const quotes = [
  { text: 'Simplicity is the soul of efficiency.', author: 'Austin Freeman' },
  { text: 'First, solve the problem. Then, write the code.', author: 'John Johnson' },
  { text: 'It is not the language that makes a program good, it is the thinking behind it.', author: 'Unknown' },
  { text: 'The best error message is the one that never shows up.', author: 'Thomas Fuchs' },
  { text: 'Code is read more often than it is written. Write for the reader.', author: 'Unknown' },
  { text: 'Make it work, make it right, make it fast.', author: 'Kent Beck' },
  { text: 'A bug is just a feature you have not understood yet.', author: 'Unknown' },
  { text: 'The only way to go fast is to go well.', author: 'Robert C. Martin' },
];

let lastIndex = -1;

function showQuote() {
  // Never show the same quote twice in a row.
  let index;
  do {
    index = Math.floor(Math.random() * quotes.length);
  } while (index === lastIndex);
  lastIndex = index;

  quoteEl.textContent = `"${quotes[index].text}"`;
  authorEl.textContent = `— ${quotes[index].author}`;
  copiedEl.hidden = true;
}

newQuoteBtn.addEventListener('click', showQuote);

copyBtn.addEventListener('click', async () => {
  await navigator.clipboard.writeText(`${quoteEl.textContent} ${authorEl.textContent}`);
  copiedEl.hidden = false;
});

showQuote();
