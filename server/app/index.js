'use strict';

var app = require('express')();
var path = require('path');
var session = require('express-session');
var User = require('../api/users/user.model');

// "Enhancing" middleware (does not send response, server-side effects only)

app.use(require('./logging.middleware'));

app.use(require('./body-parsing.middleware'));

// session
app.use(session({
    // this mandatory configuration ensures that session IDs are not predictable
    secret: 'tongiscool', // or whatever you like
    // these options are recommended and reduce session concurrency issues
    resave: false,
    saveUninitialized: false
}));

//session logging middleware
app.use(function (req, res, next) {
    console.log('session', req.session);
    next();
});


app.post('/login', function(req, res, next){
    var email = req.body.email;
    var pswd = req.body.password;
    User.findOne({
        where: {
            email: email,
            password: pswd
        }
    })
        .then(foundUser => {
          if(!foundUser){
            res.sendStatus(401);
          }else{
            req.session.userId = foundUser.id;
            req.session.login = true;
            req.session.save();
            res.json(foundUser);
          }
        })
        .catch(next);
});

app.post('/signup', function(req, res, next){
    var email = req.body.email;
    var pswd = req.body.password;

    User.findOrCreate({
        where: {
            email: email
        }, defaults :{
            password: pswd
        }
    })
        .then(results => {
            // find way to log in user after signing up
            var user = results[0];
            var created = results[1];

            if(!created){
                var err = new Error('email already existed');
                err.status = 500;
                next(err);
            }else{
                req.session.userId = user.id;
                req.session.login = true;
                res.json(user);
            }
        })
        .catch(next);
});






// "Responding" middleware (may send a response back to client)

app.use('/api', require('../api/api.router'));

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'browser', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
  app.get(stateRoute, function (req, res) {
    res.sendFile(indexPath);
  });
});




app.use(require('./statics.middleware'));

// "Error" middleware

app.use(require('../utils/HttpError')(404).middleware());

app.use(require('./error.middleware'));

module.exports = app;
