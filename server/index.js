let express = require('express');
let app = express();
let passport = require('passport');
let GitHubStrategy = require('passport-github2').Strategy;
let mongoose = require('mongoose');

let User = require('./models/users.js');
let config = require('./config.js');

mongoose.connect(config.mongodb)

passport.use(new GitHubStrategy({
    clientID: config.github.client_id,
    clientSecret: config.github.client_secret,
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(arguments);
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});