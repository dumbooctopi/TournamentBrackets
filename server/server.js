const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const session = require('express-session');
const userController = require('../server/controllers/user');
require('dotenv').config();

// require in router

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

// flow message
app.use((req, res, next) => {
  console.log(
    `METHOD: ${req.method}, PATH: ${req.url}, BODY: ${JSON.stringify(req.body)}`
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
      callbackURL: 'http://localhost:8080/oauth/github/callback'
    },
    function(accessToken, refreshToken, profile, cb) {
      const gitUser = {};
      gitUser.username = profile.username;
      gitUser.avatar = profile.photos[0].value;
      userController.createUser(gitUser, cb);
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  done(null, user);
});

app.get('/oauth/github', passport.authenticate('github'));

app.get(
  '/oauth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    // TODO: redirect based on user role
    res.redirect('/admin');
  }
);

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// add routers here:

// test
app.use('/', (req, res, next) => {
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
    message: 'Default Error from the Global Error Handler'
  };

  console.log('global error handler triggered');
  const assignError = { ...defaultError, ...err };

  // send the response
  res.status(assignError.status).send(assignError.message);
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
