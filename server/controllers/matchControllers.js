/* eslint-disable camelcase */
const Match = require('./../../dbConnection/models/Match');

const matchController = {};

// middleware that gets all Matches by Tournament Id
matchController.getAllMatchesByTournamentId = (req, res, next) => {
  Match.findAll({
    where: { tournament_id: req.params.id },
  })
    .then((found) => {
      // console.log(found);
      const matches = [];
      found.forEach((m, i) => {
        // destructure the individual found match details
        const {
          id, player1_id, player2_id, winner_id, columnNumber, roundNumber,
        } = m;

        // place on matches array
        matches[i] = {
          id, player1_id, player2_id, winner_id, columnNumber, roundNumber,
        };
      });

      // add all of those properties to res.locals.match in an object
      res.locals.matches = matches;
      return next();
    });
};

// middleware to create all round one matches (four)
matchController.addRoundOneMatches = (req, res, next) => {
  // need to create four matches with the tournament id
  const { playerIds } = req.body;
  const { id } = res.locals.newTournament;

  // prep matchesToAdd array (for bulk create)
  const matchesToAdd = [];
  for (let i = 0; i < 4; i += 1) {
    const matchObj = {
      tournament_id: id,
      player1_id: playerIds[2 * i] || 0,
      player2_id: playerIds[2 * i + 1] || 0,
      winner_id: 0,
      columnNumber: i + 1,
      roundNumber: 1,
    };
    matchesToAdd.push(matchObj);
  }

  // create matches in database
  Match.bulkCreate(matchesToAdd)
    .then((arr) => {
      const newMatches = arr.map((e) => {
        const {
          player1_id, player2_id, winner_id, columnNumber, roundNumber,
        } = e;
        return {
          player1_id, player2_id, winner_id, columnNumber, roundNumber,
        };
      });
      res.locals.matches = newMatches;
      return next();
    });
};

module.exports = matchController;
