var express = require('express');
var router = express.Router();
const userModel = require("./users");
const postModel = require("./post");
const passport = require('passport');
const localStrategy = require("passport-local");
const upload = require('./multer')
passport.use(new localStrategy(userModel.authenticate()));

router.get('/', function(req, res, next) {
  res.render('index', {error: req.flash('error')});
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.get('/profile', isLoggedIn, async function(req, res, next) {
  try {
    const user = await userModel
      .findOne({username: req.session.passport.user})
      .populate("posts")
      .maxTimeMS(10000); // 10 second timeout
    
    if (!user) {
      return res.redirect('/logout');
    }
    
    res.render('profile', {user});
  } catch (error) {
    console.error('Profile route error:', error);
    req.flash('error', 'Database connection error. Please try again.');
    res.redirect('/');
  }
});

router.get('/show/posts', isLoggedIn, async function(req, res, next) {
  try {
    const user = await userModel
      .findOne({username: req.session.passport.user})
      .populate("posts")
      .maxTimeMS(10000);
    
    if (!user) {
      return res.redirect('/logout');
    }
    
    res.render('show', {user});
  } catch (error) {
    console.error('Show posts route error:', error);
    req.flash('error', 'Database connection error. Please try again.');
    res.redirect('/');
  }
});

router.get('/feed', isLoggedIn, async function(req, res, next) {
  try {
    const user = await userModel.findOne({username: req.session.passport.user}).maxTimeMS(10000);
    const posts = await postModel.find().populate("user").maxTimeMS(10000);
    res.render('feed', {user, posts});
  } catch (error) {
    console.error('Feed route error:', error);
    req.flash('error', 'Database connection error. Please try again.');
    res.redirect('/');
  }
});

router.get('/add', isLoggedIn, async function(req, res, next) {
  try {
    const user = await userModel.findOne({username: req.session.passport.user}).maxTimeMS(10000);
    res.render('add', {user});
  } catch (error) {
    console.error('Add route error:', error);
    req.flash('error', 'Database connection error. Please try again.');
    res.redirect('/');
  }
});

router.post('/createpost', isLoggedIn, upload.single("postimage"), async function(req, res, next) {
  try {
    const user = await userModel.findOne({username: req.session.passport.user}).maxTimeMS(10000);
    const post = await postModel.create({
      user: user._id,
      title: req.body.title,
      description: req.body.description,
      image: req.file.path  
    });
    user.posts.push(post._id);
    await user.save();
    res.redirect("/profile");
  } catch (error) {
    console.error('Create post error:', error);
    req.flash('error', 'Failed to create post. Please try again.');
    res.redirect('/add');
  }
});

router.post('/register', function(req, res, next) {
  const data = new userModel({
    username: req.body.username,
    email: req.body.email,
    fullname: req.body.fullname
  });
  
  userModel.register(data, req.body.password)
    .then(function(){
      passport.authenticate("local")(req, res, function(){
        res.redirect("/profile");
      });
    })
    .catch(function(error) {
      console.error('Registration error:', error);
      req.flash('error', 'Registration failed. Please try again.');
      res.redirect('/register');
    });
});

router.post('/fileupload', isLoggedIn, upload.single("image"), async function(req, res, next) {
  try {
    const user = await userModel.findOne({username: req.session.passport.user}).maxTimeMS(10000);
   user.profileimg = req.file.path;
    await user.save(); 
    res.redirect("/profile");
  } catch (error) {
    console.error('File upload error:', error);
    req.flash('error', 'File upload failed. Please try again.');
    res.redirect('/profile');
  }
});

router.post('/login', passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/",
  failureFlash: true
}), function(req, res){
});
 
router.get("/logout", function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()) return next();
  res.redirect("/");
}

module.exports = router;
