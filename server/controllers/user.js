const User = require('../../dbConnection/models/User');
const userController = {};
//Note: will need to connect to database somehow to query

/**
 * createUser - create and save a new User into the database.
 */
userController.createUser = (gitUser, cb) => {
  User.findOrCreate({
    where: { username: gitUser.username },
    defaults: { avatar: gitUser.avatar }
  }).then(([user, created]) => {
    return cb(
      null,
      user.get({
        plain: true
      })
    );
  });
};

userController.getAll = async (req,res, next) => {
  const query = User.findAll({attributes:['_id', 'username', 'avatar']});
  const users = await query;
  const userData = users.map(function(a){
    return a.dataValues
  })
  res.status(200).send(userData);
} 

module.exports = userController;
