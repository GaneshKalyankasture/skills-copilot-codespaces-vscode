//generate a web server
var express = require('express');
var router = express.Router();

//get the comments model
var Comments = require('../models/comments');

// GET handler for /comments
router.get('/', function(req, res, next) {
  //use the comments model to query the db for comment data
  Comments.find(function(err, comments){
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      //load the comments view
      res.render('comments', {
        title: 'Comments',
        comments: comments
      });
    }
  });
});

// GET handler for /comments/add
router.get('/add', function(req, res, next) {
  //load the blank comment form
  res.render('add-comment', {
    title: 'Add a New Comment'
  });
});

// POST handler for /comments/add
router.post('/add', function(req, res, next) {
  //use the comments model to add a new comment to mongodb
  Comments.create( {
    name: req.body.name,
    comment: req.body.comment
  }, function(err, Comments) {
    if (err) {
      console.log(err);
      res.render('error');
    }
    else {
      //redirect to the updated comments page
      res.redirect('/comments');
    }
  });
});

//make this public
module.exports = router;