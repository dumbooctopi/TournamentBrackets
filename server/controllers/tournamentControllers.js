/* eslint-disable camelcase */
const Tournament = require('../../dbConnection/models/Tournament');

const tournamentController = {};

tournamentController.addToTournamentTable = (req, res, next) => {
  // console.log(req.body);
  // create the tournament row based on the req.body
  const { name, rounds, winner_id } = req.body;
  Tournament.create({ name, rounds, winner_id })
    .then((row) => {
      // console.log(row);
      res.locals.newTournament = row.dataValues;
      return next();
    });
};

module.exports = tournamentController;

/*
whoops, I made a tournament controller that we don't actually need.
This is grabbing the details of a tournament from the database,
but this endpoint was intended to access all matches of a tournament

*/

/*
tournamentController.getById = (req, res, next) => {
  Tournament.findOne({
    where: { id: req.params.id },
  })
    .then((found) => {
      // console.log(found);
      // destructure the found tournament details
      const {
        id, name, rounds, winner_id,
      } = found;

      // add all of those properties to res.locals.tournament in an object
      res.locals.tournament = {
        id, name, rounds, winner_id,
      };
      return next();
    });
};

*/
