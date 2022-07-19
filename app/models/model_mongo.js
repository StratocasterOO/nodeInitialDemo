const mongoose = require('mongoose')

const { Schema } = mongoose

const UserSchema = new Schema({
  name: { type: String, default: 'anonymous' },
  registration_date: { type: Date, default: Date.now },
  successRate: { type: Number, default: null },
  gamesPlayed: []
})

const User = mongoose.Model('users', UserSchema)

module.exports = User