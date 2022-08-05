const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, default: 'anonymous' },
  registration_date: { type: Date, default: Date.now },
  successRate: { type: Number, default: null },
  gamesPlayed: [{
    dice1: Number,
    dice2: Number,
    gameWon: Boolean
  }]
});

const Users = mongoose.model( 'users', UserSchema );

module.exports = Users;