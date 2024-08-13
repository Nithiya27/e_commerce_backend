const Productcontroller =require('../controllers/productController');
const express=require('express');
const router=express.Router();
router.get("/",Productcontroller.getProducts);
router.post("/",Productcontroller.createProduct);
module.exports=router