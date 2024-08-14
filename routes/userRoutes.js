const Usercontroller=require("../controllers/userController")
const express=require('express');
const router=express.Router();
router.post("/login",Usercontroller.login)
router.post("/",Usercontroller.createuser)
module.exports=router