const User = require('../../dbConnection/models/User');
const userController = {};

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

module.exports = userController;
