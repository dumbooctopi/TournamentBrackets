/* eslint-disable camelcase */
const Match = require('./../../dbConnection/models/Match');
const Tournament = require('../../dbConnection/models/Tournament');

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

matchController.updateWinner = (req, res, next) => {
  // console.log(req.body);
  Match.update({ winner_id: req.body.winnerId }, {
    where: { id: req.body.matchId },
    returning: true,
  }).then(([changedCount, changedRowObj]) => {
    // console.log('rows changed', changedCount);
    // console.log('changed Row itself:', changedRowObj);
    res.locals.updatedMatch = changedRowObj[0].dataValues;
    return next();
  });
};

matchController.updateOrCreateNextMatch = async (req, res, next) => {
  // this is looking very not modular

  // destructure the updatedMatch on res locals
  const {
    roundNumber, columnNumber, tournament_id, winner_id,
  } = res.locals.updatedMatch;

  // calculte the next round and next column
  const nextRound = roundNumber + 1;
  const nextColumn = Math.ceil(columnNumber / 2);


  // if nextRound === 4 then the res.locals.updatedMatch was the finals
  if (nextRound === 4) {
    // update tournament winnerId with winner_id (destructed above)
    await Tournament.update({ winner_id },
      { where: { id: tournament_id } })
      .then((data) => {
        console.log(data);
        return next();
      });
  } else {
    // otherwise we need to update player 2 in the next match or create the next match with player 1
    // console.log('next round', res.locals.updatedMatch.roundNumber + 1);
    // console.log('next column', Math.ceil(res.locals.updatedMatch.columnNumber / 2));
    Match.findOne({ where: { tournament_id, roundNumber: nextRound, columnNumber: nextColumn } })
      .then((data) => {
        if (!data) {
        // nothing was found, data === null
        // create new match with nextRound and nextColumn
        // and player1_id as the winner of the updatedMatch
          Match.create({
            tournament_id,
            player1_id: winner_id,
            player2_id: 0,
            winner_id: 0,
            columnNumber: nextColumn,
            roundNumber: nextRound,
          })
            .then((nextMatch) => {
              // put data on res.locals.nextMatch
              console.log('created next Match: ', nextMatch);
              res.locals.nextMatch = nextMatch.dataValues;
              return next();
            });
        } else {
        // match was found, update its player 2
          Match.update({ player2_id: winner_id }, {
            where: { tournament_id, roundNumber: nextRound, columnNumber: nextColumn },
            returning: true,
          }).then(([changedCount, changedRowObj]) => {
            console.log('changed match: ', changedRowObj);
            res.locals.nextMatch = changedRowObj;
            return next();
          });
        }
      });
  }
  // return next();
};

module.exports = matchController;
