//imports express moduel onto the page
const express = require('express');
//imports router onto the page
const adminRouter = express.Router();
const userController = require('./../controllers/user')


//creates admin user
adminRouter.post('/signup',
userController.createUser,
function(req,res){
    if(err){
        res
        .status(400)
        .send('user already has an account')
    }
    res
    .status(200)
    .send({'status':'admin user authenticated'})
}
)
// //rout to grab users
// router.get('/createtournament', 
// //get player controller,
// function(req,res){
//     if(err){
//         res
//         .status(400)
//         //error would be either that there are no 
//         .send(err)
//     }
//     res
//     .status(200)
//     .send('grabbed all players by id')
// }
// )
//create user: send request to database, adds createUser controller, sends res.locals.user

adminRouter.post('/createtournament',
//grabplayers controller    
//createtournament controller
 function(req,res){
    // console.log(req.body)
    //check if the data is sent res.locals.user
    res
    .status(200)
    .send('created tournament')
})

//get tournament details
//patch/put tournament
//patch/put games
//patch/put scores
//patch/put player seeding/ranking
//delete player

module.exports = adminRouter;