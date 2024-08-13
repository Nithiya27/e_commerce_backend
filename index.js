const express=require("express");
const app=express();
const productsRotues=require("./routes/productRoutes")
const userRoutes=require("./routes/userRoutes")
const cartRoutes=require("./routes/cartRotue")
const OrderRotue=require("./routes/orderRoute")
const mongoose=require("mongoose");
const cors = require("cors");
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb+srv://Nithiya:Nithiya@cluster0.sqsmwtu.mongodb.net/e_commerce").then(()=>{
    console.log("connected to database");
})
app.use("/products",productsRotues);
app.use("/user",userRoutes);
app.use("/cart",cartRoutes);
app.use("/order",OrderRotue);
// app.use("/login",userRoutes)
app.listen(3000,()=>{
    console.log("server is running on port 3000");
})