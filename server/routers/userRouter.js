// imports express moduel onto the page
const express = require('express');
// imports router onto the page
const userRouter = express.Router();
const userController = require('../controllers/user')
// TODO: setup route to '/getAll' that calls on a controller to getAllUsers from the database
// the response will be an array of objects contianing username, avatar & id
//note get all users from a specific tournament
userRouter.get('/getAll', userController.getAll,(req,res)=>{
  res
  .status(200)
  .json(res.locals.userData);
})
/*
// user can grab full tournament details from database
userRouter.get('/',
// controller to grab tournament details from database
// controller to grab game details from database
// controller to grab player info:points/ranking from database
  (req, res) => {
    if (err) {
      res
        .status(400)
        // what message to send?
        .send(err);
    }
    // check if the data is sent res.locals.user
    res
      .status(200)
      .send('retrieved tournament for user');
  });
// user can look up game/scores

// user can login
*/

module.exports = userRouter;
