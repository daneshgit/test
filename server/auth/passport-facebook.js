var passport = require('passport')
, FacebookStrategy = require('passport-facebook-token');
var {User} = require('../models/usermodel');



const passportfacebook=()=>{
    passport.use('facebooktoken',new FacebookStrategy({
        clientID: "189685131652742",
        clientSecret: "bc6ecac15cb34cf748f4b16dde38c176",
        callbackURL: "http://127.0.0.1:4000/api/users/oauth/facebook/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        console.log("hitting facebook auth");
        console.log(accessToken);
       console.log(profile);

       return done(null,{name:'danesh'})
      }
      ));
}


const facebookauth= async (req, res, next)=> {
  passport.authenticate('facebooktoken',{session:false},function(err,user,info){
      if(err){
          res.status(401).json({auth:false,message:"unauthorized user"})
      }else if(user){
          next();
      }else{
          res.status(401).json({auth:false,message:info.message})
      }
   
      
      })(req, res, next);
  
      
    }


module.exports = {passportfacebook,facebookauth};