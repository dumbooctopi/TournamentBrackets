// imports express moduel onto the page
const express = require('express');
// imports router onto the page
const adminRouter = express.Router();
const userController = require('./../controllers/user');
const tournamentController = require('./../controllers/tournamentControllers');
const matchController = require('./../controllers/matchControllers');

adminRouter.get('/', (req, res, next)=>{
  console.log(req.user.username)
  userController.createUser(req.user, console.log)
  res.redirect('/main')
})

// creates admin user
adminRouter.post('/signup',
  userController.createUser,
  (req, res) => {
    if (err) {
      res
        .status(400)
        .send('user already has an account');
    }
    res
      .status(200)
      .send({ status: 'admin user authenticated' });
  });

// route to make a tournament
// req body will be an object with an array of userIds, and a name of the tournament (string)
adminRouter.post('/makeTournament',
  // add tournament to tournements table
  tournamentController.addToTournamentTable,
  // add all round 1 matches to matches table & return all created matches as the response
  matchController.addRoundOneMatches,
  userController.getUsernames,
  (req, res) => {
    res.status(200).json(res.locals.matchesWithUsernames);
  });
// create user: send request to database, adds createUser controller, sends res.locals.user


// get tournament details
// patch/put tournament
// patch/put games
// patch/put scores
// patch/put player seeding/ranking
// delete player

module.exports = adminRouter;
