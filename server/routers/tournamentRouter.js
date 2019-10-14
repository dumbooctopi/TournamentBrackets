// imports express moduel onto the page
const express = require('express');
// imports router onto the page
const tournamentRouter = express.Router();
// const tournamentController = require('./../controllers/tournamentControllers.js');
const matchController = require('./../controllers/matchControllers.js');
const userController = require('./../controllers/user');

// endpoint to '/:id' get request
// this will send a response with ALL MATCHES of a tournament at the given id
tournamentRouter.get('/:id',
  // middleware to add all matches with matching req.params.id (tournament id)
  matchController.getAllMatchesByTournamentId,
  userController.getUsernames,
  (req, res) => {
  // response sends back all matches that are found as an array of objects
    res.status(200).json(res.locals.matches);
  });


// endpoint to '/match/:matchid' patch request
// body contains winner id?
// controller to update winner of req.p.matidid in db (table of matches)
// controller to make a new match or update p2 in an existing match
// res is new/updated match


module.exports = tournamentRouter;
