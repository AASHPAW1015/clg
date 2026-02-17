// --- DOM elements ---
var quoteDisplay = document.getElementById("quote-display");
var typingArea = document.getElementById("typing-area");
var timeResult = document.getElementById("time-result");
var wpmResult = document.getElementById("wpm-result");
var accuracyResult = document.getElementById("accuracy-result");
var resultsDiv = document.getElementById("results");
var scoresList = document.getElementById("scores-list");

// --- state ---
var currentQuote = "";
var startTime = null;
var finished = false;

// --- fetch a random quote from ZenQuotes ---
function fetchQuote() {
    // ZenQuotes blocks direct browser fetch (CORS), so we use a CORS proxy
    var url = "https://api.allorigins.win/raw?url=" + encodeURIComponent("https://zenquotes.io/api/random");

    return fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // ZenQuotes returns an array, quote text is in data[0].q
            return data[0].q;
        });
}

// --- start a new test ---
function startTest() {
    finished = false;
    startTime = null;
    typingArea.value = "";
    typingArea.disabled = true;
    resultsDiv.style.display = "none";
    quoteDisplay.textContent = "Loading quote...";

    fetchQuote().then(function (quote) {
        currentQuote = quote;
        renderQuote(""); // show all chars as untyped
        typingArea.disabled = false;
        typingArea.focus();
    }).catch(function () {
        quoteDisplay.textContent = "Failed to load quote. Try again.";
    });
}

// --- render quote with character highlighting ---
function renderQuote(typed) {
    quoteDisplay.innerHTML = "";

    for (var i = 0; i < currentQuote.length; i++) {
        var span = document.createElement("span");
        span.textContent = currentQuote[i];

        if (i < typed.length) {
            if (typed[i] === currentQuote[i]) {
                span.className = "correct";
            } else {
                span.className = "incorrect";
            }
        } else {
            span.className = "untyped";
        }

        quoteDisplay.appendChild(span);
    }
}

// --- handle typing input ---
typingArea.addEventListener("input", function () {
    if (finished) return;

    var typed = typingArea.value;

    // start timer on first keystroke
    if (startTime === null) {
        startTime = new Date();
    }

    renderQuote(typed);

    // check if done
    if (typed.length >= currentQuote.length) {
        endTest(typed);
    }
});

// --- end test and calculate results ---
function endTest(typed) {
    finished = true;
    typingArea.disabled = true;

    var endTime = new Date();
    var timeSeconds = (endTime - startTime) / 1000;
    var timeMinutes = timeSeconds / 60;

    // WPM: (characters / 5) / minutes
    var wpm = Math.round((currentQuote.length / 5) / timeMinutes);

    // accuracy: correct characters / total characters
    var correctCount = 0;
    for (var i = 0; i < currentQuote.length; i++) {
        if (typed[i] === currentQuote[i]) {
            correctCount++;
        }
    }
    var accuracy = Math.round((correctCount / currentQuote.length) * 100);

    // show results
    timeResult.textContent = timeSeconds.toFixed(1);
    wpmResult.textContent = wpm;
    accuracyResult.textContent = accuracy;
    resultsDiv.style.display = "block";

    // save score
    var score = {
        date: new Date().toLocaleString(),
        quote: currentQuote,
        wpm: wpm,
        accuracy: accuracy,
        time: timeSeconds.toFixed(1) + "s"
    };
    saveScore(score);
    loadScores();
}

// --- save score to localStorage ---
function saveScore(score) {
    var scores = JSON.parse(localStorage.getItem("typingScores") || "[]");
    scores.push(score);
    localStorage.setItem("typingScores", JSON.stringify(scores));
}

// --- load and display past scores ---
function loadScores() {
    var scores = JSON.parse(localStorage.getItem("typingScores") || "[]");
    scoresList.innerHTML = "";

    for (var i = scores.length - 1; i >= 0; i--) {
        var li = document.createElement("li");
        li.textContent = scores[i].date + "  |  " + scores[i].wpm + " WPM  |  " + scores[i].accuracy + "% accuracy  |  " + scores[i].time;
        scoresList.appendChild(li);
    }

    if (scores.length === 0) {
        scoresList.innerHTML = "<li>No scores yet.</li>";
    }
}

// --- download scores as JSON file ---
function downloadScores() {
    var scores = JSON.parse(localStorage.getItem("typingScores") || "[]");
    var blob = new Blob([JSON.stringify(scores, null, 2)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "scores.json";
    a.click();
}

// --- load scores on page load ---
loadScores();
