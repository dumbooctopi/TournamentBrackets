const User = require('../../dbConnection/models/User');

const userController = {};
// Note: will need to connect to database somehow to query

/**
 * createUser - create and save a new User into the database.
 */
userController.createUser = (gitUser, cb) => {
  User.findOrCreate({
    where: { username: gitUser.username },
    defaults: { avatar: gitUser.avatar },
  }).then(([user, created]) => cb(
    null,
    user.get({
      plain: true,
    }),
  ));
};

userController.getAll = async (req, res, next) => {
  const query = User.findAll({ attributes: ['id', 'username', 'avatar'] });
  const users = await query;
  const userData = users.map((a) => a.dataValues);
  res.locals.userData = userData
 return next();
};

// middleware to get usernames for all matches on res.locals.matches
// will put info on res.locals.matchesWithUsernames
userController.getUsernames = async (req, res, next) => {
  // console.log(res.locals.matches);

  // ? This code could be REALLY cleaned up with a Promise.all and async await...
  const withUsernames = [...res.locals.matches];
  for (let i = 0; i < res.locals.matches.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await User.findOne({ where: { id: withUsernames[i].player1_id } })
      .then((row) => {
        // default name if player not found in users table (row is null)
        if (!row) withUsernames[i].player1Username = 'king pong';
        // or if user is found
        else withUsernames[i].player1Username = row.username;
      });

    // eslint-disable-next-line no-await-in-loop
    await User.findOne({ where: { id: withUsernames[i].player2_id } })
      .then((row) => {
        // default name if player not found in users table (row is null)
        if (!row) withUsernames[i].player2Username = 'ping kong';
        // or if user is found
        else withUsernames[i].player2Username = row.username;
      });
  }

  res.locals.matchesWithUsernames = withUsernames;

  return next();
};

module.exports = userController;
