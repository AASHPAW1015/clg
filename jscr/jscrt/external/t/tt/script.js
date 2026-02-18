// ========== Global Variables ==========
let wordsData = {};      // Stores the parsed JSON word data (short, medium, long)
let targetWords = [];    // Array of words the user needs to type in the current game
let startTime = null;    // Timestamp of the user's first keystroke
let isRunning = false;   // Whether a game is currently active

// ========== DOM References ==========
const gameContainer = document.getElementById('game-container');
const inputField = document.getElementById('hidden-input');
const wpmDisplay = document.getElementById('wpm-display');

// ========== Word Loading (Async) ==========
// Uses async/await so the rest of the page remains responsive while fetching
async function loadWords() {
    try {
        const response = await fetch('words.json');
        wordsData = await response.json();
        console.log("Words loaded asynchronously!");
    } catch (error) {
        gameContainer.innerText = "Error loading words.";
        console.error(error);
    }
}

// Called immediately on page load so words are ready before the user clicks start
loadWords();

// ========== Utility ==========
// Returns a random integer from 0 to max-1 (inclusive)
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// ========== Word Generation (Sync) ==========
// Builds an array of random words by picking a random category (0-2)
// and then a random word within that category, repeated 'count' times
function generateWordList(count) {
    const categories = ['short', 'medium', 'long'];
    let selectedWords = [];

    for (let i = 0; i < count; i++) {
        const catIndex = getRandomInt(3);           // 0 = short, 1 = medium, 2 = long
        const category = categories[catIndex];
        const list = wordsData[category];
        const wordIndex = getRandomInt(list.length); // Random word from the chosen category
        selectedWords.push(list[wordIndex]);
    }
    return selectedWords;
}

// ========== Game Start ==========
// Resets all state and generates a new set of target words
function startGame(wordCount) {
    inputField.value = '';
    inputField.focus();
    targetWords = generateWordList(wordCount);
    startTime = null;
    isRunning = true;
    wpmDisplay.innerText = 'WPM: 0';

    renderWords();
}

// ========== Rendering Words to the DOM ==========
// Creates a <span> for every character so each one can be individually styled.
// Also inserts a space <span> between words — this keeps the DOM span count
// aligned with the flat target string ("word1 word2 word3...") used for comparison.
function renderWords() {
    gameContainer.innerHTML = '';

    targetWords.forEach((word, wordIdx) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'word';

        // Each letter gets its own span for per-character styling
        word.split('').forEach(char => {
            const charSpan = document.createElement('span');
            charSpan.innerText = char;
            wordSpan.appendChild(charSpan);
        });

        gameContainer.appendChild(wordSpan);

        // Insert a visible space span between words (not after the last one)
        if (wordIdx < targetWords.length - 1) {
            const spaceSpan = document.createElement('span');
            spaceSpan.className = 'space';
            spaceSpan.innerText = ' ';
            gameContainer.appendChild(spaceSpan);
        }
    });
}

// ========== Per-Character Checking ==========
// Fires on every keystroke inside the hidden input field.
// Compares each typed character against the flat target string
// and applies correct/incorrect/current CSS classes to the matching span.
inputField.addEventListener('input', () => {
    if (!isRunning) return;

    // Start the timer on the very first keystroke
    if (!startTime) startTime = new Date();

    const inputChars = inputField.value.split('');

    // Select all letter spans AND space spans so indexes align with flatTarget
    const allSpans = gameContainer.querySelectorAll('span.word > span, span.space');

    // Join words with spaces to create one continuous string for index-based comparison
    const flatTarget = targetWords.join(' ');

    // Compare each span against the corresponding typed character
    allSpans.forEach((charSpan, index) => {
        const typedChar = inputChars[index];

        // Clear previous styling before re-evaluating
        charSpan.classList.remove('correct', 'incorrect', 'current');

        if (typedChar == null) {
            // Not yet typed — highlight the next character to type (cursor)
            if (index === inputChars.length) charSpan.classList.add('current');
        } else if (typedChar === flatTarget[index]) {
            // Correct character — green
            charSpan.classList.add('correct');
        } else {
            // Wrong character — red + underline
            charSpan.classList.add('incorrect');
        }
    });

    // When the user has typed enough characters, end the game
    if (inputField.value.length >= flatTarget.length) {
        finishGame(flatTarget.length);
    }
});

// ========== Game End & WPM Calculation ==========
// WPM formula: (total characters / 5) / time in minutes
// Dividing by 5 converts character count to "standard words"
function finishGame(totalChars) {
    isRunning = false;
    const endTime = new Date();
    const timeTakenSec = (endTime - startTime) / 1000;  // Milliseconds to seconds
    const timeTakenMin = timeTakenSec / 60;              // Seconds to minutes

    const wpm = Math.round((totalChars / 5) / timeTakenMin);

    wpmDisplay.innerText = `Final WPM: ${wpm}`;
}

// ========== Focus Helper ==========
// Clicking the game container redirects focus to the hidden input
function focusInput() {
    inputField.focus();
}
