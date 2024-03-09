const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/users');

passport.use(new LocalStrategy(async (username, pwd, done) => {
  try {
    // authentication logic here
    // console.log('Credentials recieved: ', username, pwd);
    const user = await User.findOne({userName: username});
    if(!user) {
      return done(null, false, {message: 'Incorrect username'});
    }

    const isPasswordValid = await user.comparePassword(pwd);
    if(isPasswordValid) {
      return done(null, user);
    }
    else {
      return done(null, false, {message: 'Incorrect password'});
    }
  } 
  catch (error) {
    return done(error);
  }
}));

module.exports = passport;