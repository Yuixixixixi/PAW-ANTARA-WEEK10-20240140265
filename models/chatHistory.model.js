const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ChatHistory = sequelize.define(
  'ChatHistory',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userMessage: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    botReply: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    sessionId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'chat_histories',
    timestamps: true,
  }
);

module.exports = ChatHistory;