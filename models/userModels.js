const mongoose=require('mongoose')
const bcrypt=require("bcrypt")
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"]
    },
    password:{
        type:String,
        required:[true,"password is required"],
    }
})
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
     return next()
    } 
    const salt=await bcrypt.genSalt(10);//random number generated  10 is complexity
    this.password=await bcrypt.hash(this.password,salt);
    next()
})
const User=new mongoose.model('User',userSchema);
module.exports=User;