const Joi = require('joi');


const validatebody=(schema)=>{
    return(req,res,next)=>{
        const result=Joi.validate(req.body,schema);
        if(result.error){
            return res.status(400).json(result.error)
        }

        if(!req.value){ req.value={}; }
        req.value['body']=result.value;
        next();
    }
}

const authschema = Joi.object().keys({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    age: Joi.number(),
    hashpassword:Joi.string(),
    password:Joi.string()
})



module.exports={validatebody,authschema};