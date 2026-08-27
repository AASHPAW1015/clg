const socket = io();

const loginDiv = document.getElementById('username').parentElement;
const gameDiv = document.getElementById('game');
const usernameInput = document.getElementById('username');
const joinBtn = document.getElementById('joinBtn');
const loginError = document.getElementById('loginError');
const youText = document.getElementById('you');
const playerList = document.getElementById('playerList');
const status = document.getElementById('status');
const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('resetBtn');
const historyBtn = document.getElementById('historyBtn');
const historyBody = document.querySelector('#history tbody');

let mySymbol = null;
let currentTurn = 'X';
let gameActive = false;

joinBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if (!username) {
        loginError.textContent = 'Enter a username';
        return;
    }
    socket.emit('user-login', { username });
});

usernameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        joinBtn.click();
    }
});

socket.on('login-success', (data) => {
    mySymbol = data.symbol;
    loginDiv.classList.add('hidden');
    gameDiv.classList.remove('hidden');
    youText.textContent = `You are ${data.username} (${data.symbol})`;
});

socket.on('login-error', (data) => {
    loginError.textContent = data.message;
});

socket.on('players-update', (players) => {
    playerList.textContent = 'Players: ' + players.map((p) => `${p.username} (${p.symbol})`).join(', ');
});

socket.on('game-start', () => {
    gameActive = true;
    currentTurn = 'X';
    updateStatus();
});

socket.on('move-made', (data) => {
    cells[data.index].textContent = data.symbol;
    currentTurn = data.symbol === 'X' ? 'O' : 'X';
    updateStatus();
});

socket.on('game-over', (data) => {
    gameActive = false;
    status.textContent = data.result === 'DRAW' ? 'Draw!' : `${data.winner} (${data.winnerSymbol}) wins!`;
    loadHistory();
});

socket.on('game-reset', () => {
    cells.forEach((cell) => { cell.textContent = ''; });
    mySymbol = null;
    gameActive = false;
    currentTurn = 'X';
    gameDiv.classList.add('hidden');
    loginDiv.classList.remove('hidden');
    loginError.textContent = 'Game was reset. Join again.';
    playerList.textContent = '';
    status.textContent = 'Waiting for another player...';
});

cells.forEach((cell) => {
    cell.addEventListener('click', () => {
        if (!gameActive || mySymbol !== currentTurn || cell.textContent !== '') {
            return;
        }
        socket.emit('make-move', { index: Number(cell.dataset.index), symbol: mySymbol });
    });
});

resetBtn.addEventListener('click', () => {
    socket.emit('reset-game');
});

historyBtn.addEventListener('click', loadHistory);

const updateStatus = () => {
    if (!gameActive) {
        return;
    }
    status.textContent = currentTurn === mySymbol ? 'Your turn' : `${currentTurn}'s turn`;
};

async function loadHistory() {
    const res = await fetch('/api/history');
    const games = await res.json();
    historyBody.innerHTML = '';
    games.forEach((g) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${g.playerX}</td><td>${g.playerO}</td><td>${g.result}</td><td>${g.winner || '-'}</td><td>${g.totalMoves}</td><td>${new Date(g.playedAt).toLocaleString()}</td>`;
        historyBody.appendChild(row);
    });
}

loadHistory();
