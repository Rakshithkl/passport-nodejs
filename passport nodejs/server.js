var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var middleware = require('connect-ensure-login').ensureLoggedIn();
var user = require('./models/user')
var users = require('./routes/users');
var app = express();
mongoose.connect('mongodb://localhost/interior') 
passport.use(new Strategy(
    function(username, password, cb) {
      user.findOne({username}, function(err, User) {
        if (err) { return cb(err); }
        if (!User) { return cb(null, false); }
        if (User.password != password) { return cb(null, false); }
        return cb(null, User);
       });
      }));
     passport.serializeUser(function(user, cb) {
        cb(null, user.id);
      });
      passport.deserializeUser(function(id, cb) {
        user.findOne({id}, function (err, user) {
          if (err) { return cb(err); }
          cb(null, user);
        });
      })
// app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());
app.use('/users',users)

app.post('/login', 
  passport.authenticate('local'),
  function(req, res) {
    res.send({success:true});
  });
app.post('/some',middleware,(req,res)=>{
    res.send("any request")
})

app.post('/logout',(req, res)=>{
  req.logout();
  res.send({success:true});
});
app.listen(100,()=>console.log('succes'));

