const Cart=require("../models/cartModels");
const Product=require("../models/productModel")
exports.createcart= async(req,res)=>{
    const {user_id}=req.user;
    const {product_id,quantity}=req.body;
    let cart=await Cart.findOne({user_id});
    if(!cart){
        cart = new Cart({
            user_id,
            products:[
                {
                product_id,
                quantity,
            },]
        });
    }else{
    const productindex = cart.products.findIndex((pro=>pro.product_id === product_id));
    if(productindex ===-1){
        cart.products.push({product_id,quantity});
        }else{
            cart.products[productindex].quantity = quantity;
        }
    }
    await cart.save();
    res.status(201).json({message:"cart added",cart});
}
exports.getcart=async(req,res)=>{
    const {user_id} = req.user;
    
        const cart=await Cart.findOne({user_id});
        if(!cart){
            res.status(404).json({message:"Cart is Empty"})
        }
        try {
            let subTotal =0;
            const cartItem = await Promise.all(
                cart.products.map(async(product)=>{
                    const productDetails = await Product.findOne({id:product.product_id});
                    subTotal +=productDetails.
                    price * product.quantity;
                    return{
                        product_id:productDetails.id,
                        title:productDetails.title,
                        description:productDetails.description,
                        price:productDetails.price,
                        image:productDetails.image,
                        quantity:product.quantity
                    }
                })
            )
            res.status(200).json({cartItems: cartItem,subTotal})
        }catch(err){
            res.status(200).json({message: "server error",err})
        }
    }
    // exports.deletecart = async (req, res) => {
    //     const { user_id } = req.user;
    //      const { product_id } = req.params.product_id;
                 
    //     try {
    //         const cart = await Cart.findOne({ user_id });
    //         if (!cart) {
    //             return res.status(404).json({ message: "Cart is empty" });
    //         }
    //         const updatedProducts = cart.products.filter((pro) => pro.product_id !== product_id);
    //         if (updatedProducts.length === 0) {
    //             await Cart.deleteOne({ user_id });
    //             return res.status(200).json({ message: "Cart is now empty" });
    //         }
    //         cart.products = updatedProducts;
    //         await cart.save();
    //         res.status(200).json({ message: "Product deleted successfully" });
    
    //     } catch (err) {
    //         res.status(500).json({ message: "Error", err });
    //     }
    // };

    exports.deletecart = async (req, res) => {
        const { user_id } = req.user;
         const  product_id = req.params.product_id;
         const cart = await Cart.findOne({ user_id });
         if (!cart) {
             return res.status(404).json({ message: "Cart not  found" });
         }
         try{
         const isProductvalid=cart.products.find(
            (product)=>product_id===product.product_id
         );
         if(!isProductvalid){
            return res.status(200).json({ message: "product not found in cart" });
         }
         if(cart.products.length<=1){
            await Cart.deleteOne({ user_id });
                return res.status(200).json({ message: "Cart is deleted" });
         }else{
            cart.products=cart.products.filter((pro)=>pro.product_id!==product_id)
            cart.save();
            res.status(200).json({message:"product deleted successfully"})
         }
        }catch(err){
            res.status(500).json({ message: "Error", err });
        }
    }