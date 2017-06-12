var express = require('express');
var router = express.Router();


// Bring in Models
let Post = require('../models/post')
let Comment = require('../models/comment')

/* GET Posts . */
router.get('/', function(req, res, next) {
  Post.find({}, function(err, posts){
    if (err) {
      console.log(err)
    } else {
      res.render('posts/index', { posts: [...posts] });
    }
  })
});

// GET Add Post Route
router.get('/add', function(req, res){
  res.render('posts/addPost')
})

// POST Add Post Route
router.post('/add', function(req, res){
  var post = new Post({
    title: req.body.title,
    body: req.body.body
  });
  post.save(function(err, resp) {
    if (err) {
      console.log(err);
      res.send({
        message: 'something went wrong'
      });
    } else {
      res.redirect('/posts')
    }
  });
})

// Get Show Post"/posts/<%= post._id%>"
router.get('/:id', function(req,res){
  Post.findById(req.params.id, function(err, post){
    Comment.find({_post: post._id}, function(err, comments){
      res.render('posts/showPost',{
        post: post,
        comments: comments
      })
    })
  })
})

// Get Edit Form
router.get('/edit/:id', function(req,res){
  Post.findById(req.params.id, function(err, post){
    res.render('posts/editPost',{
      post: post
    })
  })
})

//Post Edit Route
router.post('/edit/:id', function(req, res){
  let post = {}
  post.title = req.body.title
  post.body = req.body.body

  let query = { _id: req.params.id }
  Post.update(query, post, function(err){
    if(err){
      console.log(err)
      return
    } else {
      res.redirect('/posts')
    }
  })
})

// DELETE Route
router.delete('/delete/:id', function(req, res){
  let query = { _id: req.params.id}
  Post.remove(query, function(err){
    if(err){
      console.log()
    }
    res.send('Success')
  })
})



// Post Comment
router.post('/:id', function(req,res){
  var comment = new Comment({
    _post: req.params.id,
    username: req.body.username,
    comment: req.body.comment
  });
  comment.save(function(err, resp) {
    if (err) {
      console.log(err);
      res.send({
        message: 'something went wrong'
      });
    } else {
      res.redirect('/posts/'+req.params.id)
    }
  });
})



module.exports = router;
