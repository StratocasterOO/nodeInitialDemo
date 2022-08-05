const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../database/db-mysql');

class Users extends Model {}
Users.init({
  name: { type: DataTypes.STRING, defaultValue: 'anonymous' },
  registration_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  successRate: { type: DataTypes.FLOAT, defaultValue: null },
}, { sequelize, modelName: 'users' });

module.exports = Users;