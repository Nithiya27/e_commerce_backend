const jwt=require('jsonwebtoken');
const auth=(req,res,next)=>{
    const token=req.header("Authorization").split(" ")[1];
    if(!token){
        return res.status(401).json({erro:"No token,authorization denied"});
    }
    try{
        const decoded=jwt.verify(token,"secret_token");
        req.user=decoded;
        next();
    }catch(err){
        res.status(401).json({error:"token is not valid"});
    }
};
module.exports=auth;
