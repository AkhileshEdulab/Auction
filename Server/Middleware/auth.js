import jwt  from "jsonwebtoken";
import { catchAsyncErrors } from "./catchAsyncError.js";
import errorHandler from "./errorHandler.js";
import userModel from "../Models/user_Model.js";


export const isAuthenticated = catchAsyncErrors(async(req,res,next)=>{

    const token = req.cookies.token;

    if(!token){
        return next(new errorHandler("User Not Authenticated.",400))
    }

    const decode = jwt.verify(token,process.env.JWT_SECRETE_KEY);
    req.user = await userModel.findById(decode.id)

    next();

});

export const isAuthorized =(...roles)=>{
return (req,res,next)=>{
    if(!roles.includes(req.user.role)){
        return next(new errorHandler(
       `${req.user.role} not allowed to access this resource.`,403))
    }
    next();
}
}