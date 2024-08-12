// const User=require("../models/userModels")
// const { v4: uuidv4 } = require('uuid');

// exports.createuser=async(req,res)=>{
//     const {name,email,password}=req.body;
//     const user=new User({
//     id:uuidv4(),
//      name,
//      email,
//      password
//     })
//     await user.save();
//     res.status(200).json("user created successfully");
//  };


const User=require("../models/userModels")
const { v4: uuidv4 } = require('uuid');             
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
// exports.getLogin=async(req,res)=>{
//     try{
//         const login=await Product.find();
//         res.send(login);

//     }catch(err){
//         console.error(err);
//     }
// };
exports.createuser=async(req,res)=>{
    const {name,email,password}=req.body;
    const user=new User({
    id:uuidv4(),
     name,
     email,
     password
    })
    await user.save();
    res.status(200).json("user created successfully");
 };
exports.login=async(req,res)=>{
    const{email,password}=req.body;
    try{
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json("invalid email or password");
        }
        const isMatch= await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json("invalid email or password");
        }
        const token =jwt.sign({user_id:user._id},"secret_token",{
            expiresIn:"9h",
        });
        return res.status(200).json(token);
    }catch(err){
        console.error(err);
    }
};
