// this file is just to test the connection and creation in the database

const User = require('./models/User');
const Match = require('./models/Match');
const Tournament = require('./models/Tournament');

User.create({
  username: 'alex',
  avatar: 'ajlsdfjlasdjf',
  points: 999999
});

Match.create({
  tournament_id: 1,
  player1_id: 1,
  player2_id: 2,
  winner_id: 0,
  columnNumber: 1,
  roundNumber: 3
});

Tournament.create({
  name: 'badasspingponggame.ninja2',
  winner_id: 6,
  rounds: 3
});
