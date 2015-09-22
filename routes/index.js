var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'), 
    methodOverride = require('method-override'),
    ejs = require('ejs');

var models = require('../model/models.js');
var url = 'mongodb://localhost/pomodoro-dev';

/* GET home page */
router.get('/', function(req, res, next) {
	mongoose.model('work').find({}, function (err, works) {
       if (err) {
           return console.error(err);
       } else {
       	   console.log(works);
           res.render('index', {'works': works});
       }
   })
});

/* GET statistics page */
router.get('/statistics', function(req, res, next) {
 	res.render('statistics');
});

module.exports = router;