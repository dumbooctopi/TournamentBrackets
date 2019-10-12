//loads module onto page
const Sequelize = require('sequelize');
//loads page connectToDb onto the page
const sequelize = require('../connectToDb');

//creates a model/framework for user
const User = sequelize.define('user', {
  //creates a specific ID for user
  _id: {
    //generates UUID value
    type: Sequelize.UUID,
    //value is an actual UUID value
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  //username from github
  username: Sequelize.STRING,
  //avatar URL from github
  avatar: Sequelize.STRING,
  //ranking/seeding in tournament
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
//allows exporting of model --> User
module.exports = User;
