const Sequelize = require('sequelize');
const sequelize = require('../connectToDb');

const User = sequelize.define('user', {
  _id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  username: Sequelize.STRING,
  avatar: Sequelize.STRING,
  points: Sequelize.INTEGER,
  created_at: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  updated_at: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
});

// sequelize.sync({ logging: console.log }).then(() => {});

module.exports = User;
