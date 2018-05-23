var express = require('express');
var router = express.Router();
const {User}=require('../models/usermodel.js');
const {getuser,postuser,login,loginrequired}=require('../controllers/users');
const passport=require('passport');
const {auth}=require('../auth/passport-jwt');
const {facebookauth}=require('../auth/passport-facebook');
const {validatebody,authschema}=require('../helpers/validation');

/* GET users listing. */


router.route('/test')
  .get((req, res) => {
    res.send('testing node.js backends');
  });

router.route('/oauth/google')
      .post(passport.authenticate('googletoken',{session:false}))




router.route('/oauth/facebook')
      .get(facebookauth)
     



 
router.route('/oauth/facebook/callback')
     .get(facebookauth,function(req,res,next){
       res.send("hitting callback");
     })     

      
router.get('/error', function(req, res,info) {
 
  res.json({ messages: req.flash('error') });
});


router.get('/',auth,getuser);




router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


router.post('/',validatebody(authschema), postuser);

router.post('/login',login);


router.put('/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


router.delete('/:id', function(req, res, next) {
  User.findByIdAndRemove(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
