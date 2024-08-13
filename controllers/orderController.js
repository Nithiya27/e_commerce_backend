const Order=require("../models/orderModel")
const User=require("../models/userModels");
const Cart=require("../models/cartModels");
const Product=require("../models/productModel")
exports.createorder = async (req, res) => {
    const { customerName, customerAddress, PhoneNo, OrderDate, DeliveryDate } = req.body;
    const { user_id } = req.user;

    try {
        // Fetch user details
        let user = await User.findOne({ _id: user_id });
        const email = user.email;
        // Fetch cart items for the user
        let cart = await Cart.findOne({ user_id: user_id });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const products = await Promise.all(
            cart.products.map(async (product) => {
                const productDetails = await Product.findOne({ id: product.product_id });  
                if (productDetails) {
                    return {
                        product_id: productDetails.id, 
                        quantity: product.quantity,
                    };
                }
                return null;
            })
        );
        // Prepare order details with products from cart
        const order = new Order({
            user_id,
            customerName,
            email,
            customerAddress,
            PhoneNo,
            OrderDate,
            DeliveryDate,
            products: cart.products // Assigning products from the cart to the order
        });

        // Save the order
        await order.save();
        // Optionally, you can clear the cart after the order is placed
        // await Cart.deleteOne({ user_id: user_id });

        res.status(200).json("Order created successfully");
    } catch (err) {
        res.status(500).json({ message: "Failed to create order", error: err });
    }
};
exports.getorder=async(req,res)=>{
    const {user_id}=req.user;
    try{
        const orders=await Order.find({user_id});
        res.status(200).json(orders);
        }
        catch(err){
            console.log(err);
            res.status(400).json({message:"Error fetching orders"});
            }

}