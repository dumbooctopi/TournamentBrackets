// loads module onto page
const Sequelize = require('sequelize');
// loads page connectToDb onto the page
const sequelize = require('../connectToDb');

// creates a model/framework for user
const Match = sequelize.define('match', {
  // creates a specific ID for user
  _id: {
    // generates UUID value
    type: Sequelize.UUID,
    // value is an actual UUID value
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
  },
  // id from tournament table
  tournament_id: Sequelize.INTEGER,
  // id from users table of player1
  player1_id: Sequelize.INTEGER,
  // id from users table of player2
  player2_id: Sequelize.INTEGER,
  // id of player who won in tournament
  winner_id: { type: Sequelize.INTEGER, allowNull: true },
  // column and round are attempts to index all the games in a bracket
  columnNumber: Sequelize.INTEGER,
  roundNumber: Sequelize.INTEGER,
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
module.exports = Match;
