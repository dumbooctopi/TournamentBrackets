// imports express module onto the page
const express = require('express');
// imports router onto the page
const loginRouter = express.Router();
// import user model from db: need to check if connection is correct
// const user = require('../dbConnection/models/User.js');
const user = require('../../dbConnection/models/User')

// route to oauth passport
loginRouter.get('/',
// controller to authenticate passport
  (req, res, next) => {
    if (err) {
      res
        .status(400)
        .send('User authentication failed, send to sign up  ==> ', err);
    }
    // incoming request will have authentication on req.body
    // controller will have data on res.locals.authenticated?
    res.status(200);
    // send response back from controller res.locals.authenticated user?
    res.sendFile('user authenticated');
  });


// IS THIS NEEDED: route to database to create user, use createUser controller, takes in request (controller saves on res.locals.createuser), will send back a response to front-end that the user was created

loginRouter.post('/',
// user.createPlayer,
  (req, res) => {
    res
      .status(200)
      .send('created user');
  });

// router.post('/',
// // user.createAdmin,
//  function(req,res){
//     res
//     .status(200)
//     .send('created Admin')
// })


module.exports = loginRouter;
