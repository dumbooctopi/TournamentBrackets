// loads module onto page
const Sequelize = require('sequelize');
// loads page connectToDb onto the page
const sequelize = require('../connectToDb');

// creates a model/framework for user
const Tournament = sequelize.define('tournament', {
  // creates a specific ID for user
  _id: {
    // generates UUID value
    type: Sequelize.UUID,
    // value is an actual UUID value
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
  },
  // id from users table of player1
  name: Sequelize.STRING,
  // id from users table of player2
  rounds: Sequelize.INTEGER,
  // id of player who won the tournament (stretch goal, ignore this for now)
  winner_id: Sequelize.INTEGER,
  created_at: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false,
  },
  updated_at: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false,
  },
});

// sequelize.sync({ logging: console.log }).then(() => {});
// allows exporting of model --> User
module.exports = Tournament;
