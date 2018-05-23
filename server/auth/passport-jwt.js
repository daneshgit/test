
const passport=require('passport');
var JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const {User} =require('../models/usermodel');


const passportjwt=()=>{

    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = 'restfullapi';
    
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        console.log(jwt_payload);
    User.findOne({_id: jwt_payload.id}, function(err, user) {
        if (err) {
            return done(err, false,{message: 'Incorrect email or passwo.'}  );
        }
        if (user) {
            return done(null,user);
        } else {
            return done(null, false,{message: 'Incorrect email or password.'});
            // or you could create a new account
        }
    });
    }));

}


const auth= async (req, res, next)=> {
    passport.authenticate('jwt',{session:false},function(err,user,info){
        if(err){
            res.status(401).json({auth:false,message:"unauthorized user"})
        }else if(user){
            next();
        }else{
            res.status(401).json({auth:false,message:info.message})
        }
     
        
        })(req, res, next);
    
        
      }


module.exports={auth,passportjwt};

