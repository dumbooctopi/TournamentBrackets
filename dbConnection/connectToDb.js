// postgres://chybszjv:PvlzLd7rzW50D56qb4tjHpJ5rZ9tt8kd@salt.db.elephantsql.com:5432/chybszjv
//imports moduel onto page
const Sequelize = require('sequelize');
//opens connection to ElephantSQL url
const sequelize = new Sequelize(
  //username
  'chybszjv',
  //passworkd
  'chybszjv',
  //url
  'PvlzLd7rzW50D56qb4tjHpJ5rZ9tt8kd',
  {
    //hostname
    host: 'salt.db.elephantsql.com',
    //speaking in postgres
    dialect: 'postgres'
  }
);

//authenticates acccess to database
sequelize
  .authenticate()
  //promise: after authentication, let it be known that the connection was established
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  //else: show what the error in connect is
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
