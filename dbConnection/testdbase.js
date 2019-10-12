// this file is just to test the connection and creation in the database

const User = require('./models/User');
const Match = require('./models/Match');
const Tournament = require('./models/Tournament');

// User.sync({ force: false })
//   .then(() => {
//     User.create({
//       username: 'alex',
//       avatar: 'ajlsdfjlasdjf',
//       points: 999999,
//     });
//   });

Match.sync({ force: false })
  .then(() => {
    Match.create({
      tournament_id: 1,
      player1_id: 'alex',
      player2_id: 'pras',
      winner_id: 0,
      columnNumber: 1,
      roundNumber: 3,
    });
  });


Tournament.sync({ force: false })
  .then(() => {
    Tournament.create({
      name: 'badasspingponggame.ninja',
      winner_id: '',
      rounds: 3,
    });
  });
