const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  playerX: {
    type: String,
    required: true
  },
  playerO: {
    type: String,
    required: true
  },
  winner: {
    type: String,
    default: null
  },
  winnerSymbol: {
    type: String,
    enum: ['X', 'O', null],
    default: null
  },
  result: {
    type: String,
    enum: ['X_WON', 'O_WON', 'DRAW'],
    required: true
  },
  totalMoves: {
    type: Number,
    required: true
  },
  playedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Game', gameSchema, 'tictactoe');
