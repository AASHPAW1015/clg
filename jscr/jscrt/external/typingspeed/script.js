class ApiHandler {
    constructor() {
        this.apiUrl = 'https://api.quotable.io/random?minLength=100&maxLength=200';
    }

    async getQuote() {
        try {
            const response = await fetch(this.apiUrl);
            const data = await response.json();
            return data.content;
        } catch (error) {
            console.error('Error fetching quote:', error);
            return 'The quick brown fox jumps over the lazy dog. Programming is thinking, not typing.';
        }
    }
}

class Leaderboard {
    constructor() {
        this.storageKey = 'typingTestScores';
        this.scores = this.loadScores();
        this.renderLeaderboard();
        this.setupModal();
    }

    loadScores() {
        const scores = localStorage.getItem(this.storageKey);
        return scores ? JSON.parse(scores) : [];
    }

    saveScore(name, wpm, accuracy) {
        const newScore = {
            name: name,
            wpm: wpm,
            accuracy: accuracy,
            date: new Date().toLocaleDateString()
        };
        
        this.scores.push(newScore);
        this.scores.sort((a, b) => b.wpm - a.wpm); // Sort descending by WPM
        this.scores = this.scores.slice(0, 5); // Keep top 5
        
        localStorage.setItem(this.storageKey, JSON.stringify(this.scores));
        this.renderLeaderboard();
    }

    renderLeaderboard() {
        const list = document.getElementById('leaderboard-list');
        list.innerHTML = '';
        
        if (this.scores.length === 0) {
            list.innerHTML = '<li class="empty-state">No scores yet. Complete your first test!</li>';
            return;
        }

        this.scores.forEach((score, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div>
                    <span class="score-rank">#${index + 1}</span>
                    <span class="score-name">${score.name}</span>
                </div>
                <div>
                    <span class="score-wpm">${score.wpm} WPM</span>
                    <span style="font-size: 0.8em; color: #94a3b8; margin-left:10px;">(${score.accuracy}%)</span>
                </div>
            `;
            list.appendChild(li);
        });
    }

    setupModal() {
        this.modal = document.getElementById('save-score-modal');
        this.usernameInput = document.getElementById('username');
        this.saveBtn = document.getElementById('save-btn');
        
        this.saveBtn.addEventListener('click', () => {
            const name = this.usernameInput.value.trim() || 'Anonymous';
            if (this.pendingScore) {
                this.saveScore(name, this.pendingScore.wpm, this.pendingScore.accuracy);
                this.pendingScore = null;
                this.closeModal();
            }
        });
    }

    openModal(wpm, accuracy) {
        this.pendingScore = { wpm, accuracy };
        this.usernameInput.value = '';
        this.modal.classList.remove('hidden');
        this.usernameInput.focus();
    }

    closeModal() {
        this.modal.classList.add('hidden');
    }
}

class TypingGame extends ApiHandler {
    constructor() {
        super();
        this.quoteDisplay = document.getElementById('quote-display');
        this.quoteInput = document.getElementById('quote-input');
        this.wpmElement = document.getElementById('wpm');
        this.timeElement = document.getElementById('time');
        this.accuracyElement = document.getElementById('accuracy');
        this.restartBtn = document.getElementById('restart-btn');
        
        this.timer = null;
        this.time = 0;
        this.isTyping = false;
        this.currentQuote = '';
        this.leaderboard = new Leaderboard(); // Instantiate separate Leaderboard class

        this.init();
    }

    init() {
        this.start();
        
        this.quoteInput.addEventListener('input', () => this.checkInput());
        
        // Focus input when clicking anywhere on the typing area
        this.quoteDisplay.addEventListener('click', () => this.quoteInput.focus()); 
        
        this.restartBtn.addEventListener('click', () => this.start());
    }

    async start() {
        this.currentQuote = await this.getQuote();
        this.renderQuote();
        this.quoteInput.value = '';
        this.quoteInput.disabled = false;
        this.quoteInput.focus();
        
        this.resetStats();
        clearInterval(this.timer);
        this.isTyping = false;
        this.restartBtn.classList.add('hidden');
    }

    renderQuote() {
        this.quoteDisplay.innerHTML = '';
        this.currentQuote.split('').forEach(char => {
            const charSpan = document.createElement('span');
            charSpan.innerText = char;
            this.quoteDisplay.appendChild(charSpan);
        });
    }

    resetStats() {
        this.time = 0;
        this.timeElement.innerText = '0s';
        this.wpmElement.innerText = '0';
        this.accuracyElement.innerText = '100%';
    }

    startTimer() {
        this.isTyping = true;
        this.timer = setInterval(() => {
            this.time++;
            this.timeElement.innerText = `${this.time}s`;
            this.updateStats(); // Update live stats
        }, 1000);
    }

    checkInput() {
        if (!this.isTyping && this.quoteInput.value.length > 0) {
            this.startTimer();
        }

        const arrayQuote = this.quoteDisplay.querySelectorAll('span');
        const arrayValue = this.quoteInput.value.split('');

        let correctChars = 0;
        let completed = true;

        arrayQuote.forEach((characterSpan, index) => {
            const character = arrayValue[index];

            if (character == null) {
                characterSpan.classList.remove('correct');
                characterSpan.classList.remove('incorrect');
                characterSpan.classList.remove('cursor');
                completed = false;
            } else if (character === characterSpan.innerText) {
                characterSpan.classList.add('correct');
                characterSpan.classList.remove('incorrect');
                characterSpan.classList.remove('cursor');
                correctChars++;
            } else {
                characterSpan.classList.remove('correct');
                characterSpan.classList.add('incorrect');
                characterSpan.classList.remove('cursor');
                completed = false; // Even if length matches, incorrect chars mean not "successfully" complete? Usually typing tests let you finish with errors, but lets block completion until errors fixed? 
                // Or maybe just let them finish and penalize accuracy. 
                // Let's allow errors but only trigger finish if length matches.
            }

            // Simple cursor implementation
            if (index === arrayValue.length) {
                characterSpan.classList.add('cursor');
            } else {
                characterSpan.classList.remove('cursor');
            }
        });

        // Live stats update
        // We only update WPM if time > 0 to avoid division by zero
        if (this.time > 0) {
           this.updateStats();
        }

        // Check for completion (length matches)
        if (arrayValue.length === arrayQuote.length) {
            this.endGame();
        }
    }
    
    updateStats() {
        const arrayQuote = this.quoteDisplay.querySelectorAll('span');
        const arrayValue = this.quoteInput.value.split('');
        let correctChars = 0;
        
        arrayQuote.forEach((span, index) => {
             if (arrayValue[index] === span.innerText) {
                 correctChars++;
             }
        });

        // Accuracy
        const accuracy = Math.round((correctChars / arrayValue.length) * 100) || 100;
        this.accuracyElement.innerText = `${accuracy}%`;

        // WPM = (All typed entries / 5) / Time (min)
        // Standard WPM calculation uses 5 characters as a "word"
        // We use the current length of input, not just correct chars, or maybe just correct?
        // Usually it's (Gross WPM - Errors) or just (Correct Entries / 5) / Time
        // Let's use: (Correct Chars / 5) / (Time / 60)
        
        const wpm = Math.round((correctChars / 5) / (this.time / 60)) || 0;
        this.wpmElement.innerText = wpm;
        
        return { wpm, accuracy };
    }

    endGame() {
        clearInterval(this.timer);
        this.isTyping = false;
        this.quoteInput.disabled = true;
        this.restartBtn.classList.remove('hidden');

        const { wpm, accuracy } = this.updateStats();
        
        // Trigger Leaderboard save logic
        // We open the modal to ask for name
        this.leaderboard.openModal(wpm, accuracy);
    }
}

// Initialize the game
window.addEventListener('DOMContentLoaded', () => {
    const game = new TypingGame();
});
