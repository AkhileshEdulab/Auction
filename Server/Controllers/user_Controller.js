import { catchAsyncErrors } from "../Middleware/catchAsyncError.js";
import errorHandler from "../Middleware/errorHandler.js"
import userModel from "../Models/user_Model.js";
import {v2 as cloudinary} from 'cloudinary';
import { generateToken } from "../Utils/generateToken.js";


export const register =catchAsyncErrors( async (req,res,next)=>{
     if(!req.files ||Object.keys(req.files).length===0){
            return next (new errorHandler("Profile image are required.",400))
        };

        const {profileImage} = req.files;
        const allowFormates = ['image/jpg', 'image/jpeg', 'image/webp', 'image/png', 'image/avif'];
        if(!allowFormates.includes(profileImage.mimetype)){
            return next (new errorHandler("image formate not support.",400))
        }
            console.log("Uploaded mimetype:", req.file?.mimetype);

        const {
            userName,
            email,
            address,
            password,
            phone,
            role, 
            bankAccountName, 
            bankAccountNumber,
            bankName,
            paypalEmail,
            razorPayAccountNumber

        }=req.body;

        if(!userName|| !email || !address || !password || !phone || !role ){
            return next(new errorHandler("Please provide full fill detail.",400))
        }
        if(role ==="Auctioneer"){
            
        if(!bankAccountName || !bankAccountNumber || !bankName){
         return next(new errorHandler("Provide your bank details.",400))
        }

         if(!paypalEmail){
         return next(new errorHandler("please provide your paypal email .",400))
        }
         if(!razorPayAccountNumber){
         return next(new errorHandler("please provide your easyPaisa .",400))
        }

        }
        const isRegistered = await userModel.findOne({email:email});
        if(isRegistered){
            return next(new errorHandler("This email is already register.",400))
        }

         const cloudinaryResponse = await cloudinary.uploader.upload(profileImage.tempFilePath,{
            folder:"MERN_AUCTION_PLATEFORM"
         })
         if(!cloudinaryResponse || cloudinaryResponse.error){
            console.error("Cloudinary error:",cloudinaryResponse.error||'unknown cloudinary error.')
            return next(new errorHandler("failed to upload profile image to cloudinary."))
         }

         const user = await userModel.create({
            userName,
            email,
            address,
            password,
            phone,
            role, 
            profileImage:{
            publicId:cloudinaryResponse.public_id,
            url:cloudinaryResponse.secure_url
           },
           paymentMethods:{
            bankTransfer:{
            bankAccountName,
            bankAccountNumber,
            bankName,
            },
            payPal:{
                paypalEmail,
            },
            razorPay:{
                razorPayAccountNumber,
            }
          },
         })

         generateToken(user,'User Register Successfully.',201,res)
})

export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new errorHandler("Please provide all fields", 400));
    }

   
    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
        return next(new errorHandler("Invalid email or password", 400));
    }
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
        return next(new errorHandler("Give Me Correct Password.", 400));
    }

    generateToken(user, "Login successful", 200, res);

    

});

export const getProfile = catchAsyncErrors(async(req,res,next)=>{
    const user = req.user;
    res.status(200).json({
        success:true,
        user
    })
});
export const logout = catchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("token",'',{
        expires:new Date(Date.now()),
        httpOnly: true,
    }).json({
        success:true,
        message:"User Logout Successfully."
    })
});
export const fetchLeaderboard = catchAsyncErrors(async(req,res,next)=>{
    const users = await userModel.find({moneySpent:{$gt:0}});
    const leaderboard = users.sort((a,b)=> b.moneySpent - a.moneySpent);
    res.status(200).json({
        success:true,
        leaderboard,
    })
});


