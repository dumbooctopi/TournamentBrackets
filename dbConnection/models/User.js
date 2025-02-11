const Sequelize = require('sequelize');
const sequelize = require('../connectToDb');

const User = sequelize.define('user', {
  // commented out to get this to just be the default sql primary id
  // _id: {
  //   type: Sequelize.UUID,
  //   defaultValue: Sequelize.UUIDV1,
  //   primaryKey: true
  // },
  username: Sequelize.STRING,
  avatar: Sequelize.STRING,
  points: Sequelize.INTEGER,
  role: {
    type: Sequelize.STRING,
    defaultValue: 'user',
    allowNull: false,
  },
});

module.exports = User;
