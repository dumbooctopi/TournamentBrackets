//imports express moduel onto the page
const express = require('express');
//imports router onto the page
const router = express.Router();

//user can grab full tournament details from database
router.get('/', 
//controller to grab tournament details from database
//controller to grab game details from database
//controller to grab player info:points/ranking from database
function(req,res,next){
    if(err){
        res
        .status(400)
        //what message to send?
        .send(err)
    }
    //check if the data is sent res.locals.user
    res
    .status(200)
    .send('retrieved tournament for user')
})
//user can look up game/scores

//user can login

module.exports = userRouter;
