// postgres://chybszjv:PvlzLd7rzW50D56qb4tjHpJ5rZ9tt8kd@salt.db.elephantsql.com:5432/chybszjv
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'chybszjv',
  'chybszjv',
  'PvlzLd7rzW50D56qb4tjHpJ5rZ9tt8kd',
  {
    host: 'salt.db.elephantsql.com',
    dialect: 'postgres'
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
