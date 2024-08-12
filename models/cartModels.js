const mongoose=require("mongoose");
const cartSchema=new mongoose.Schema({
    user_id:String,
    products:[
        {
            product_id:String,
            quantity:Number,
},
    ],
});
const cart=mongoose.model("cart",cartSchema);
module.exports=cart;
