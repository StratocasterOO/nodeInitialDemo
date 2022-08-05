const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../database/db-mysql');
const Users = require('./model-users-mysql');


class Games extends Model {}
Games.init({
  dice1: { type: DataTypes.INTEGER },
  dice2: { type: DataTypes.INTEGER },
  gameWon: { type: DataTypes.BOOLEAN },
}, { sequelize, modelName: 'games' });

Users.hasMany( Games, { foreignKey: { allowNull: false } });
Games.belongsTo( Users );

module.exports = Games;