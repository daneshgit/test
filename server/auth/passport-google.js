var passport = require('passport')
, Googleplustokenstrategy = require('passport-google-plus-token');
var {User} = require('../models/usermodel');



const passportgoogle=()=>{
    passport.use('googletoken',new Googleplustokenstrategy({
        clientID: "321910495953-bhmid84r96l0d38hqm8o9kjshfa7aqsh.apps.googleusercontent.com",
        clientSecret: "jXZJ2Z9nmqkoGBflflLHl5d1"
        },
      async (accessToken, refreshToken, profile, done)=> {
          try{
           
      //check existing user
      const existinguser=await User.findOne({"google.id":profile.id});
      if(existinguser){
          return done(null,existinguser);
      }
      
      const newuser=new User({
          method:'googlee',
          google:{
              id:profile.id,
              email:profile.emails[0].value
          }
      })
      
      await newuser.save();
      done(null,newuser);
          }catch(error){
              console.log(error.message);
              done(error,false)
          }
     


      }
      ));
}


module.exports = {passportgoogle};