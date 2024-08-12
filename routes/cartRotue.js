const express=require('express');
const router=express.Router();
const Cartcontroller=require("../controllers/cartController");
const auth=require("../middlewares/auth");
router.post("/",auth,Cartcontroller.createcart);
router.get("/",auth,Cartcontroller.getcart);
router.delete('/:product_id',auth,Cartcontroller.deletecart);
module.exports=router;
