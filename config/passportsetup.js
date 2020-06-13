const passport= require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose');
const User = require('../models/usermodel')
require('dotenv').config()

// console.log(google.clientId)

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENTID,
    clientSecret: process.env.GOOGLE_CLIENTSECRET,
    callbackURL: "http://localhost:5000/auth/google/callback"
  },
  async  function(accessToken, refreshToken, profile, done) {

    console.log(profile)
    const user = await User.findOne({googleId:profile.id})

    if (user)
    {
        console.log(user);
        done(null ,user)
    }
    else{
        const nuser = await new User ({
            name:profile.displayName,
            googleId:profile.id,
            email:profile.emails[0].value
        }).save()
        console.log(profile)
        done(null ,nuser)
    }

  }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});