import jwt from "jsonwebtoken"

export const isAuthenicated=async (req,res,next)=>{
    try {
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"User not authenicated",
                success:false
            })
        }
        const decode =await jwt.verify(token,process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message:"Token not authorized",
                success:false
            })
        }
        req.id=decode.userId;
        next();
    } catch (error) {
        console.log(error);
    }
    
}
export default isAuthenicated;


