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
  mongoose.model('work').find({deleted: false}, function (err, works) {
    if (err) return console.error(err);

    mongoose.model('todo').find({completed: false}, function (err, todos) {
      if (err) return console.error(err);

      console.log('works: '+ works);
      console.log('todos: '+ todos);
      res.render('index', {'works': works, 'todos': todos});
    }) 
  })
});

/*work add*/
router.post('/work', function(req, res) {
    mongoose.model('user').find({
      email: 'test@test.com'
    }, function (error, user) {
      if (error) console.log(error);
      console.log(user);
      mongoose.model('work').create({
        user: mongoose.Types.ObjectId(user._id),
        content: req.body.content,
        deleted: false
      }, function(error, work) {
          if (error) {
            console.log(error);
            res.json({updatedID: "-1", NumOfUpdatedRows: "0", ErrorMessage: "오류!"});
          } else {
            // res.json({updatedID: work._id, NumOfUpdatedRows: "1", ErrorMessage: ""});
            res.redirect('/'); // 싱글 페이지로 front구현하면 없어질 부분
          }
      });
    });
});

/*work update - 현재 안 쓰임*/
router.put('/work/:wid', function(req, res) {
    mongoose.model('work').update(
    	{ _id: wid }, 
    	{ $set: { content: req.param('content') }}, 
     function(error, work) {
        if (error) {
          res.json({updatedID: "-1", NumOfUpdatedRows: "0", ErrorMessage: "오류!"});
        } else {
          res.json({updatedID: work._id, NumOfUpdatedRows: "1", ErrorMessage: ""});
        }
    })
});

/*work delete*/
router.delete('/work/:wid', function(req, res) {
  var wid = req.params.wid;
  console.log(wid);
  mongoose.model('work').update(
  	{ _id: wid }, 
  	{ $set: { deleted: true}}, 
    function(error, work) {
      if (error) {
        res.json({updatedID: "-1", NumOfUpdatedRows: "0", ErrorMessage: "오류!"});
      } else {
        console.log('work._id:' + work._id);
        // res.json({updatedID: work._id, NumOfUpdatedRows: "1", ErrorMessage: ""});
        res.redirect('/'); // 싱글 페이지로 front구현하면 없어질 부분
      }
    })
})

/*todo add*/
router.post('/todo', function(req, res) {
    mongoose.model('user').find({
      email: 'test@test.com'
    }, function (error, user) {
      if (error) console.log(error);
      console.log(user);
      mongoose.model('todo').create({
        user: mongoose.Types.ObjectId(user._id),
        content: req.body.content,
        completed: false
      }, function(error, todo) {
          if (error) {
            console.log(error);
            res.json({updatedID: "-1", NumOfUpdatedRows: "0", ErrorMessage: "오류!"});
          } else {
            res.json({updatedID: todo._id, NumOfUpdatedRows: "1", ErrorMessage: ""});
            // res.redirect('/'); // 싱글 페이지로 front구현하면 없어질 부분
          }
      });
    });
});

/*todo complete*/
router.put('/todo/:tid', function(req, res) {
  var tid = req.params.tid;
  var completed = (req.body.completed === '1');
  console.log(completed);
  mongoose.model('todo').update(
    { _id: tid }, 
    { $set: { 'completed': completed}}, 
   function(error, todo) {
      if (error) {
        res.json({updatedID: "-1", NumOfUpdatedRows: "0", ErrorMessage: "오류!"});
      } else {
        res.json({updatedID: tid, NumOfUpdatedRows: "1", ErrorMessage: ""});
      }
  })
});

/*todo update - 현재 안 쓰임*/
/*todo delete - 현재 안 쓰임*/

/*pomodoro*/

/* GET statistics page */
router.get('/statistics', function(req, res, next) {
    mongoose.model('work').find({}, function (err, works) {
          if (err) {
              return console.error(err);
          } else {
              console.log(works);
              res.render('statistics', {'works': works});
          }
      })
});

module.exports = router;