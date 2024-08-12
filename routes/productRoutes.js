const Productcontroller =require('../controllers/productController');
const express=require('express');
const auth=require("../middlewares/auth");
const router=express.Router();
router.get("/",auth,Productcontroller.getProducts);
router.post("/",auth,Productcontroller.createProduct);
module.exports=router