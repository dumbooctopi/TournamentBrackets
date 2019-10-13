// loads module onto page
const Sequelize = require('sequelize');
// loads page connectToDb onto the page
const sequelize = require('../connectToDb');

// creates a model/framework for user
const Tournament = sequelize.define('tournament', {
  // id from users table of player1
  name: Sequelize.STRING,
  // id from users table of player2
  rounds: Sequelize.INTEGER,
  // id of player who won the tournament (stretch goal, ignore this for now)
  winner_id: Sequelize.INTEGER
});

module.exports = Tournament;
