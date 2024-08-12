const mongoose=require("mongoose");
const orderSchema=new mongoose.Schema({
    user_id:String,
    customerName:String,
    email:String,
    customerAddress:String,
    PhoneNo:Number,
    products:[
        {
            product_id:String,
            quantity:Number,
        }
    ],
    OrderDate: {
        type: Date,
        default: Date.now,
    },
    DeliveryDate: {
        type: Date,
        default: function() {
            return new Date(this.OrderDate.getTime() + 10 * 24 * 60 * 60 * 1000);
        }
    }
})
const order=mongoose.model("order",orderSchema);
module.exports=order;