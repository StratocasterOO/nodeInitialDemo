const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, default: 'anonymous' },
  registration_date: { type: Date, default: Date.now },
  successRate: { type: Number, default: 0 },
  gamesPlayed: [{
    dice1: Number,
    dice2: Number,
    gameWon: Boolean
  }]
});

function successRateResult() {
  const wonGames = this.gamesPlayed.filter( obj => obj.gameWon === true );
  const totalGames = this.gamesPlayed.length;

  const success = Math.floor( ((wonGames.length / totalGames) * 100) * 100) / 100;
  
  return success;
}

UserSchema.methods.successRateResult = successRateResult;

const Users = mongoose.model( 'users', UserSchema );

module.exports = Users;