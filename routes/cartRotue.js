const express=require('express');
const router=express.Router();
const Cartcontroller=require("../controllers/cartController");

router.post("/",Cartcontroller.createcart);
router.get("/",Cartcontroller.getcart);
router.delete('/:product_id',Cartcontroller.deletecart);
module.exports=router;
