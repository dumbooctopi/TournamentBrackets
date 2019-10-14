const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const session = require('express-session');
const userController = require('../server/controllers/user');
require('dotenv').config();

// require in router
const loginRouter = require('./routers/loginRouter.js');
const adminRouter = require('./routers/adminRouter.js');
const userRouter = require('./routers/userRouter.js');
const tournamentRouter = require('./routers/tournamentRouter.js');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

// check if the root directory will be in public or client
// serve up static files
// TODO: this might need to be the build folder
app.use(express.static(path.join(__dirname, 'client')));

// flow message
app.use((req, res, next) => {
  console.log(
    `FLOW TEST:: METHOD: ${req.method}, PATH: ${req.url}, BODY: ${JSON.stringify(req.body)}`,
  );
  return next();
});

/**
 * passport oauth
 */
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:8080/oauth/github/callback',
    },
    ((accessToken, refreshToken, profile, cb) => {
      const gitUser = {};
      gitUser.username = profile.username;
      gitUser.avatar = profile.photos[0].value;
      userController.createUser(gitUser, cb);
    }),
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  done(null, user);
});

app.get('/oauth/github', passport.authenticate('github'));

app.get(
  '/oauth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    // TODO: redirect based on user role
    res.redirect('/admin');
  },
);

// TODO: add '/admin' landing page?
// TODO: discuss with edwin for how the endpoint loads

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// add routers here:
// routes to create user//app.use will respond to any path that starts with '/signup',
// regardless of HTTP verb used
// app.use('/signup', signUpRouter)
// if you're at the login page and you aren't a user yet
// ! obsolete endpoint
app.use('/login', loginRouter);
// app.post('signup', router)
// admin create tournament page
app.use('/admin', adminRouter);
// admin lookup
// user view tournament
app.use('/users', userRouter);

// tournament router
app.use('/tournaments', tournamentRouter);

// renders main page:need to add actual main page, probaby will be the login page
// ask if there is an error, send to signup page, send request to router
app.use('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, './../index.html'));
});

// standard bad endpoint, send 404
app.use('*', (req, res) => {
  console.log('undefined endpoint, 404 error sent to use');
  res.status(404).send('This endpoint has not been built, try again punk');
});

// global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const defaultError = {
    status: 500,
    message: 'Default Error from the Global Error Handler',
  };

  console.log('global error handler triggered');
  const assignError = { ...defaultError, ...err };

  // send the response
  res.status(assignError.status).send(assignError.message);
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
