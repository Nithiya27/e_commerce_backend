const express=require('express');
const Order=require("../controllers/orderController")
const router=express.Router();
const auth=require("../middlewares/auth");
router.post("/",auth,Order.createorder);
// router.get("/",auth,Order.getorder);
module.exports=router
