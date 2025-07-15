import mongoose from "mongoose";
import { catchAsyncErrors } from "./catchAsyncError.js";
import errorHandler from "./errorHandler.js";
import { Auction } from "../Models/auctionSchema.js";


export const checkAuctionEndTime = catchAsyncErrors(async(req , res , next)=>{
    const {id} =req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return next(new errorHandler("Invalid id formate.",404))
    };

    const auction = await Auction.findById(id);
    if(!auction){
        return next(new errorHandler("Auction not found.",404))
    }

    const now = new Date();

    if(new Date(auction.startTime) > now){
        return next(new errorHandler("Auction has not started yet.",404))
    }

    if(new Date(auction.end) < now){
        return next(new errorHandler("Auction is ended.",404))
    };

    next();
})