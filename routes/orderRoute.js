const express=require('express');
const Order=require("../controllers/orderController")
const router=express.Router();

router.post("/",Order.createorder);
router.get("/",Order.getorder);
module.exports=router
