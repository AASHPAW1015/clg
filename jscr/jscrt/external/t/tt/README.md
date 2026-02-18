# Simple Typing Speed Test

**Author:** Aashpaw

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

## Variable List

| Variable | Type | Purpose |
|----------|------|---------|
| `wordsData` | Object | Stores parsed JSON data (`{ short: [...], medium: [...], long: [...] }`) |
| `targetWords` | Array | The randomly generated list of words for the current game |
| `startTime` | Date / null | Timestamp of the user's first keystroke, `null` until typing begins |
| `isRunning` | Boolean | Whether a game is currently active |
| `gameContainer` | DOM Element | Reference to the `#game-container` div |
| `inputField` | DOM Element | Reference to the hidden `<input>` that captures keystrokes |
| `wpmDisplay` | DOM Element | Reference to the `#wpm-display` div |
| `flatTarget` | String | All target words joined with spaces into one string for index-based comparison |
| `inputChars` | Array | The user's typed text split into individual characters |
| `allSpans` | NodeList | All letter and space `<span>` elements in the DOM |

## Code Flow

```
Page loads
  │
  ├──► loadWords() [ASYNC]
  │      Fetches words.json
  │      Parses JSON into wordsData
  │
  ▼
User clicks "10 Words" or "15 Words"
  │
  ├──► startGame(wordCount)
  │      Resets state (input, timer, isRunning)
  │      │
  │      ├──► generateWordList(count) [SYNC]
  │      │      Loops 'count' times:
  │      │        getRandomInt(3) → picks category (short/medium/long)
  │      │        getRandomInt(list.length) → picks word from that category
  │      │      Returns array of random words
  │      │
  │      └──► renderWords()
  │             Creates <span> per character
  │             Inserts <span class="space"> between words
  │
  ▼
User starts typing
  │
  ├──► input event listener (fires every keystroke)
  │      First keystroke → sets startTime
  │      Splits input into characters
  │      Builds flatTarget = targetWords.join(' ')
  │      │
  │      └──► forEach span:
  │             Compare typedChar vs flatTarget[index]
  │               Match    → add 'correct' class (green)
  │               Mismatch → add 'incorrect' class (red + underline)
  │               Not typed yet → add 'current' class (cursor highlight)
  │      │
  │      └──► If all characters typed:
  │
  ▼
  finishGame(totalChars)
      Calculates time taken
      WPM = (totalChars / 5) / time in minutes
      Displays "Final WPM: X"
```

## Key Concepts Used

- **Async/Await** — `loadWords()` fetches the JSON asynchronously so the page stays responsive
- **Sync functions** — `generateWordList()` runs synchronously to build the word array
- **DOM manipulation** — each character is a `<span>` for individual styling
- **Event listeners** — `input` event fires on every keystroke for real-time checking
- **Random selection** — picks a random category (0-2), then a random word from that category
