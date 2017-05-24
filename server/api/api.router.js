'use strict';

var router = require('express').Router();

router.use('/users', require('./users/user.router'));

router.use('/stories', require('./stories/story.router'));

// track total api request count
router.use('/', function (req, res, next) {
    console.log('hi');
    if (!req.session.counter) req.session.counter = 0;
    console.log('counter', ++req.session.counter);
    next();
});

module.exports = router;
