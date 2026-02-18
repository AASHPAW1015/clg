# Simple Typing Speed Test

A minimal typing speed test built with vanilla HTML, CSS, and JavaScript.

## How It Works

1. Click **10 Words** or **15 Words** to start
2. Type the displayed words exactly as shown (including spaces)
3. Characters turn **green** if correct, **red + underlined** if wrong
4. WPM is calculated when you finish: `(typed characters / 5) / time in minutes`

## Files

| File | Purpose |
|------|---------|
| `index.html` | Page structure and hidden input for capturing keystrokes |
| `style.css` | Styling for correct/incorrect/current character states |
| `script.js` | Game logic — word generation, per-character checking, WPM calculation |
| `words.json` | Word bank with 3 categories: short (1-3 chars), medium (4-6 chars), long (7+ chars) |

## Key Concepts Used

- **Async/Await** — `loadWords()` fetches the JSON asynchronously so the page stays responsive
- **Sync functions** — `generateWordList()` runs synchronously to build the word array
- **DOM manipulation** — each character is a `<span>` for individual styling
- **Event listeners** — `input` event fires on every keystroke for real-time checking
- **Random selection** — picks a random category (0-2), then a random word from that category
