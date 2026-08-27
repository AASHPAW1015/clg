require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const Game = require('./models/Game');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: '*' }
});

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

let players = [];
let board = Array(9).fill(null);
let currentTurn = 'X';
let totalMoves = 0;

const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const checkWinner = () => {
    for (const combo of winCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    if (!board.includes(null)) {
        return 'Draw';
    }
    return null;
};

const resetGame = () => {
    players = [];
    board = Array(9).fill(null);
    currentTurn = 'X';
    totalMoves = 0;
};

app.get('/api/history', async (req, res) => {
    try {
        const games = await Game.find().sort({ playedAt: -1 }).limit(10);
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

io.on('connection', (socket) => {
    console.log('user connected', socket.id);

    socket.on('user-login', (data) => {
        if (players.length >= 2) {
            socket.emit('login-error', { message: 'Game is full' });
            return;
        }

        const symbol = players.length === 0 ? 'X' : 'O';
        players.push({ id: socket.id, username: data.username, symbol });

        socket.emit('login-success', { username: data.username, symbol });
        io.emit('players-update', players);

        if (players.length === 2) {
            io.emit('game-start', { players });
        }
    });

    socket.on('make-move', (data) => {
        const player = players.find((p) => p.id === socket.id);
        if (!player || player.symbol !== currentTurn) {
            return;
        }
        if (board[data.index] !== null) {
            return;
        }

        board[data.index] = data.symbol;
        totalMoves++;

        io.emit('move-made', { index: data.index, symbol: data.symbol });

        const winner = checkWinner();

        if (winner) {
            const playerX = players.find((p) => p.symbol === 'X');
            const playerO = players.find((p) => p.symbol === 'O');

            const isDraw = winner === 'Draw';
            const winnerSymbol = isDraw ? null : winner;
            const winnerName = isDraw ? null : (winner === 'X' ? playerX.username : playerO.username);
            const result = isDraw ? 'DRAW' : (winner === 'X' ? 'X_WON' : 'O_WON');

            io.emit('game-over', { winner: winnerName, winnerSymbol, result, board });

            const newGame = new Game({
                playerX: playerX.username,
                playerO: playerO.username,
                winner: winnerName,
                winnerSymbol,
                result,
                totalMoves
            });
            newGame.save().catch((err) => console.log(err));

            resetGame();
        } else {
            currentTurn = currentTurn === 'X' ? 'O' : 'X';
        }
    });

    socket.on('reset-game', () => {
        resetGame();
        io.emit('game-reset');
    });

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
        const wasPlaying = players.some((p) => p.id === socket.id);
        if (wasPlaying) {
            resetGame();
            io.emit('game-reset');
        }
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
