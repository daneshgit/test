const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const {User}=require('../models/usermodel.js');




const getuser=async (req,res,next)=>{
   
   const data= await User.find();
   res.json(data);
}

const postuser= async (req, res, next)=> {

try{console.log(req.value.body);
    const data=new User(req.body);
    data.hashpassword=await bcrypt.hash(req.body.password,10);
    data.save((err,user)=>{
        if(err){
            return next(err);
        }else{
            user.hashpassword=undefined;
            res.json(user)
        }
    })
    
}catch(e){
    next(e)
}

    
  }



  const login= async (req, res)=> {
    
   User.findOne({email:req.body.email},(err,user)=>{
       if(err) throw err;
       if(!user){
           res.status(401).json({message:"auth failed.no user found"});
       }else if (user){
if(!user.comparepassword(req.body.password,user.hashpassword)){
    res.status(401).json({message:"auth failed."});
}else{
    return res.json({token: jwt.sign({id:user._id,username:user.name},'restfullapi')})
}

       }
   })
    
        
      }



      const loginrequired= async (req, res, next)=> {
        if(req.user){
            next();
          
        }else{
            return    res.status(401).json({message:"unauthorised user"});
        }
      
        
            
          }

module.exports={getuser,postuser,login,loginrequired}