// ===== Quotes Pool =====
const quotes = [
  "The quick brown fox jumps over the lazy dog near the riverbank.",
  "Programming is the art of telling a computer what to do step by step.",
  "Every great developer you know got there by solving problems they were unqualified to solve until they actually did it.",
  "In the middle of difficulty lies opportunity, so keep pushing forward.",
  "Success is not final, failure is not fatal. It is the courage to continue that counts.",
  "Practice makes perfect, and typing faster helps you communicate your ideas more efficiently.",
  "JavaScript is the most popular programming language in the world today.",
  "The best way to predict the future is to create it with your own hands.",
  "Code is like humor. When you have to explain it, it is bad.",
  "Simplicity is the soul of efficiency, and clarity is the heart of great design.",
  "A good programmer looks both ways before crossing a one way street.",
  "Learning to code is useful no matter what your career ambitions are.",
  "The only way to learn a new programming language is by writing programs in it.",
  "Talk is cheap. Show me the code and let the results speak for themselves.",
  "First solve the problem, then write the code to make it work properly."
];

// ===== DOM Elements =====
const textDisplay  = document.getElementById("textDisplay");
const inputArea    = document.getElementById("inputArea");
const timerEl      = document.getElementById("timer");
const wpmEl        = document.getElementById("wpm");
const accuracyEl   = document.getElementById("accuracy");
const errorsEl     = document.getElementById("errors");
const restartBtn   = document.getElementById("restartBtn");
const resultsPanel = document.getElementById("resultsPanel");
const finalWpm     = document.getElementById("finalWpm");
const finalAccuracy = document.getElementById("finalAccuracy");
const finalTime    = document.getElementById("finalTime");
const finalErrors  = document.getElementById("finalErrors");
const tryAgainBtn  = document.getElementById("tryAgainBtn");

// ===== State =====
let currentQuote = "";
let startTime    = null;
let timerInterval = null;
let totalErrors  = 0;
let isFinished   = false;

// ===== Functions =====

// Pick a random quote from the pool
function getRandomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

// Render the quote as individual character spans
function renderQuote(quote) {
  textDisplay.innerHTML = "";
  for (let i = 0; i < quote.length; i++) {
    const span = document.createElement("span");
    span.classList.add("char", "pending");
    span.textContent = quote[i];
    textDisplay.appendChild(span);
  }
  // Highlight the first character
  const chars = textDisplay.querySelectorAll(".char");
  if (chars.length > 0) {
    chars[0].classList.add("current");
    chars[0].classList.remove("pending");
  }
}

// Start the timer
function startTimer() {
  startTime = new Date();
  timerInterval = setInterval(updateTimer, 200);
}

// Update the displayed timer value
function updateTimer() {
  if (!startTime) return;
  const elapsed = getElapsedSeconds();
  timerEl.textContent = elapsed + "s";
}

// Get elapsed time in whole seconds
function getElapsedSeconds() {
  if (!startTime) return 0;
  return Math.floor((new Date() - startTime) / 1000);
}

// Calculate words per minute
function calculateWPM(charsTyped, seconds) {
  if (seconds === 0) return 0;
  const words = charsTyped / 5; // standard: 1 word = 5 chars
  const minutes = seconds / 60;
  return Math.round(words / minutes);
}

// Calculate accuracy percentage
function calculateAccuracy(totalChars, errorCount) {
  if (totalChars === 0) return 100;
  const acc = ((totalChars - errorCount) / totalChars) * 100;
  return Math.max(0, Math.round(acc));
}

// Handle user input and compare with quote
function handleInput() {
  if (isFinished) return;

  const typed = inputArea.value;
  const chars = textDisplay.querySelectorAll(".char");

  // Start timer on first keystroke
  if (!startTime && typed.length > 0) {
    startTimer();
  }

  let errorsInCurrent = 0;

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    char.classList.remove("correct", "incorrect", "current", "pending");

    if (i < typed.length) {
      if (typed[i] === currentQuote[i]) {
        char.classList.add("correct");
      } else {
        char.classList.add("incorrect");
        errorsInCurrent++;
      }
    } else if (i === typed.length) {
      char.classList.add("current");
    } else {
      char.classList.add("pending");
    }
  }

  totalErrors = errorsInCurrent;
  errorsEl.textContent = totalErrors;

  // Update live stats
  const elapsed = getElapsedSeconds();
  const wpm = calculateWPM(typed.length, elapsed);
  const accuracy = calculateAccuracy(typed.length, totalErrors);
  wpmEl.textContent = wpm;
  accuracyEl.textContent = accuracy + "%";

  // Check if finished
  if (typed.length === currentQuote.length) {
    finishTest();
  }
}

// End the test and show results
function finishTest() {
  isFinished = true;
  clearInterval(timerInterval);

  const elapsed = getElapsedSeconds();
  const typed = inputArea.value;
  const wpm = calculateWPM(typed.length, elapsed);
  const accuracy = calculateAccuracy(typed.length, totalErrors);

  inputArea.disabled = true;

  // Populate results
  finalWpm.textContent      = wpm;
  finalAccuracy.textContent = accuracy + "%";
  finalTime.textContent     = elapsed + "s";
  finalErrors.textContent   = totalErrors;

  resultsPanel.classList.remove("hidden");
}

// Reset everything for a new test
function resetTest() {
  isFinished = false;
  startTime = null;
  totalErrors = 0;
  clearInterval(timerInterval);

  inputArea.value = "";
  inputArea.disabled = false;
  timerEl.textContent = "0s";
  wpmEl.textContent = "0";
  accuracyEl.textContent = "100%";
  errorsEl.textContent = "0";

  resultsPanel.classList.add("hidden");

  currentQuote = getRandomQuote();
  renderQuote(currentQuote);

  inputArea.focus();
}

// ===== Event Listeners =====
inputArea.addEventListener("input", handleInput);
restartBtn.addEventListener("click", resetTest);
tryAgainBtn.addEventListener("click", resetTest);

// ===== Initialize =====
resetTest();
