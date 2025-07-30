import mongoose from "mongoose";
import { catchAsyncErrors } from "../Middleware/catchAsyncError.js";
import errorHandler from "../Middleware/errorHandler.js";
import { PaymentProof } from "../Models/commissionProofSchema.js";
import userModel from "../Models/user_Model.js";
import {v2 as cloudinary} from 'cloudinary';
import { Auction } from "../Models/auctionSchema.js";


// export  const calculateCommission = async(auctionId)=>{
        
// const auction = await Auction.findById({auctionId});
// if(!mongoose.Types.ObjectId.isValid(auctionId)){
//     return next(new errorHandler("Invalid Auction ID formate.",400))
// }

//     const commissionRate = 0.05;
//     const commission = auction.currentBid * commissionRate;
//     return commission;
// } ;


export const calculateCommission = async (auctionId, next) => {
  try {
    // Validate ObjectId before querying
    if (!mongoose.Types.ObjectId.isValid(auctionId)) {
      return next(new errorHandler("Invalid Auction ID format.", 400));
    }

    // Correct usage of findById
    const auction = await Auction.findById(auctionId);

    if (!auction) {
      return next(new errorHandler("Auction not found.", 404));
    }

    const commissionRate = 0.05;
    const commission = auction.currentBid * commissionRate;
    return commission;
  } catch (error) {
    console.error("Error in calculateCommission:", error);
    return next(new errorHandler("Server error during commission calculation", 500));
  }
};

export const proofOfCommission = catchAsyncErrors(async(req , res , next )=>{
    if(!req.files||Object.keys(req.files).length===0){
        return next (new errorHandler("Payment Proof ScreenShot are required."))
    }
     const {proof} =req.files;

     const allowFormate = ["image/jpg","image/jpeg","image/webp","image/png",];
     if(!allowFormate.includes(proof.mimetype)){
        return next(new errorHandler("ScreenShot formate not support.",400))
    }

    const {comment,amount}=req.body
    
    const user = await userModel.findById(req.user._id);
    if(!user){
         return next(new errorHandler("user not found.",400))
    };
    
   if(!comment || !amount){
      return next(new errorHandler("Amount and comment field are required.",400))
   }

    if(user.unpaidCommission === 0 ){
        return res.status(200).json({
            success:true,
            message:"You don't have any unpaid commission."
        })
    }
    if(user.unpaidCommission < amount){
        return next (new errorHandler(`The amount exceeds your commission balance. Please enter an amount up to: ${user.unpaidCommission}`,403))
    };
 
      const cloudinaryResponse = await cloudinary.uploader.upload( proof.tempFilePath,{
            folder:"MERN_AUCTION_PAYMENT_PROOFS,"
         })
         if(!cloudinaryResponse || cloudinaryResponse.error){
            console.error("Cloudinary error:",cloudinaryResponse.error||'unknown cloudinary error.')
            return next(new errorHandler("failed to upload payment proof to cloudinary.",500))
         }

         const commissionProof = await PaymentProof.create({
            userId:req.user._id,
            proof:{
                public_id:cloudinaryResponse.public_id,
                url:cloudinaryResponse.secure_url
            },
            comment,
            amount,
            
         })

         res.status(200).json({
            success:true,
            message:"Your payment proof has been sumbitted successfully.We will review it and responed to you withn in 24 hours.",
            commissionProof
         })
})