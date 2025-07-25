import mongoose from "mongoose";
import { catchAsyncErrors } from "../Middleware/catchAsyncError.js";
import errorHandler from "../Middleware/errorHandler.js";
import { Auction } from "../Models/auctionSchema.js";
import {v2 as cloudinary} from 'cloudinary'
import userModel from "../Models/user_Model.js";
import { Bid } from "../Models/bidSchema.js";

export const addAuctionItem = catchAsyncErrors(async(req , res , next)=>{
    if(!req.files || Object.keys(req.files).length===0){
        return next(new errorHandler("Auction Image are required.",400))
    }

     const {image} = req.files;

        const allowFormates = ['image/jpg','image/png','image/webp','image/jpeg']
        if(!allowFormates.includes(image.mimetype)){
        return next(new errorHandler("This Auction Image formate are not supported.",400))
        }

        const {
            title,
            description,
            startingBid,
            startTime,
            endTime,
            category,
            condition
        } = req.body;
        if( !title||
            !description||
            !startingBid||
            !startTime||
            !endTime||
            !category||
            !condition
        ){
            return next(new errorHandler("Please Provide All Fields.",400))
        }
        if(new Date(startTime) < Date.now()){
            return next(new errorHandler("Auction starting time must be greater then present time.",400))
        }
        if(new Date(startTime) >= new Date(endTime)){
            return next(new errorHandler("Auction starting time must be less then ending time.",400))
        }

        const alreadyOneAuctionActive = await Auction.find({
            createdBy:req.user._id,
            endTime:{$gt:Date.now()},
        })

        if(alreadyOneAuctionActive.length>0){
            return next(new errorHandler(`Already One Auction are Active.`,400))
        }

        try {
             console.log("Uploading to cloudinary...");
         const cloudinaryResponse = await cloudinary.uploader.upload(image.tempFilePath,{
            folder:"MERN_AUCTION_PLATEFORM_AUCTION"
         })
         
         if(!cloudinaryResponse || cloudinaryResponse.error){
            console.error("Cloudinary error:",cloudinaryResponse.error||'unknown cloudinary error.')
            return next(new errorHandler("failed to auction image to cloudinary."))
         }
  console.log("Creating auction item...");

          const auctionItem = await Auction.create({
            title,
            description,
            // startingBid,
            startingBid: Number(startingBid.replace(/,/g, '')),
            startTime,
            endTime,
            category,
            condition,
            image:{
                public_id:cloudinaryResponse.public_id,
                url:cloudinaryResponse.secure_url,
            },
             createdBy:req.user._id
        })
        return res.status(200).json({
            message:`Auction item created and will be listed on auction page at${startTime}`,
            success:true,
            auctionItem
        })
        } catch (error) {
            console.error("Auction creation error:", error);
            return res.status(500).json({
            message:" failed to create Auction.",
            success:false,
            
        })
        }
       
})

export const getAllItems = catchAsyncErrors(async(req,res,next)=>{
    const items =await Auction.find();
    return res.status(200).json({
        success:true,
        items
    })
});
export const getMyAuction = catchAsyncErrors(async(req,res,next)=>{
    const items = await Auction.find({createdBy:req.user._id})
    res.status(200).json({
        success:true,
        items,
    })
});
export const getItemDetail = catchAsyncErrors(async(req,res,next)=>{
    const {id}= req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return next(new errorHandler("Invalid Id Format.",400))
    }
    const auctionItem =await Auction.findById(id);
    if(!auctionItem){
        return next(new errorHandler("Auction Item not found.",400))
    }

    const bidders = auctionItem.bids.sort((a,b)=>b.amount - a.amount)
    res.status(200).json({
        success:true,
        auctionItem,
        bidders,
    })
});
export const removeAuctionItem = catchAsyncErrors(async(req,res,next)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return next (new errorHandler("Invalid Id Format.",400))
    }

    const auctionItem = await Auction.findById(id);
    if(!auctionItem){
     return next (new errorHandler("Auction not found.",400))
    }

    await Auction.deleteOne()
    res.status(200).json({
        success:true,
        message:"Auction removed."
    })
});
export const republishAuctionItem = catchAsyncErrors(async(req,res,next)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return next(new errorHandler("Invalid id formate",400))
    }
    
    let auctionItem = await Auction.findById(id);
    if(!auctionItem){
        return next(new errorHandler("Auction not found",400))
    }

     if(!req.body.startTime||!req.body.endTime){
        return next(new errorHandler("Start-time and End-time for republish is mandatory.",400))
        }

    if(new Date(auctionItem.endTime)  > Date.now()){
        return next(new errorHandler("Auction is already active, cannot republish.",400))
    }

    let data={
        startTime:new Date(req.body.startTime),
        endTime:new Date(req.body.endTime),
    }

    if(data.startTime < Date.now()){
        return next(new errorHandler("Auction starting time must be greater then present time.",400))
    }
    if(data.startTime >= data.endTime){
        return next(new errorHandler("Auction starting time must be less then ending time.",400))
    }

    if(auctionItem.highestBidder){
        const highestBidder = await userModel.findById(auctionItem.highestBidder);
        highestBidder.moneySpent -= auctionItem.currentBid;
        highestBidder.auctionWon -= -1;
        highestBidder.save();
    }
    data.bids= [],
    data.commissionCalculated=false;
    data.currentBid = 0;
    data.highestBidder = null;
    auctionItem = await Auction.findByIdAndUpdate(id,data,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })
    await Bid.deleteMany({auctionItem:auctionItem._id})
    
    const createdBy = await userModel.findByIdAndUpdate(
        req.user._id,
        {unpaidCommission :0},
        { 
        new:true,
        runValidators:false,
        useFindAndModify:false,}
    );
    res.status(200).json({
        success:true,
        auctionItem,
        message:`Auction rupblish and will be active on : ${req.body.startTime}`,
        createdBy
    })
});
