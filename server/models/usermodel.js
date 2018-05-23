var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    method:{type:String,enum:['local','google','facebook'],required:true},
    local:{
        name:String,
        age:{type:Number,max:60},
        email:{type:String},
        hashpassword:{type:String}
    },
    google:{
     id:{type:String},
     email:{type:String,lowercase:true}
    },
    facebook:{
        id:{type:String},
        email:{type:String,lowercase:true}
    }
    
});


UserSchema.methods.comparepassword=async function(password,hashpassword){
return await bcrypt.compare(password,hashpassword);
};

var User=mongoose.model('User',UserSchema);

module.exports={User};