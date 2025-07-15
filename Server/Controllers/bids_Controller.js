import { catchAsyncErrors } from "../Middleware/catchAsyncError.js";
import errorHandler from "../Middleware/errorHandler.js";
import { Auction } from "../Models/auctionSchema.js";
import { Bid } from "../Models/bidSchema.js";
import userModel from "../Models/user_Model.js";


export const placeBid = catchAsyncErrors(async(req ,res , next)=>{
const {id}= req.params;
const auctionItem = await Auction.findById(id);
if(!auctionItem){
    return next(new errorHandler('Auction items not found.',404))
}
 
const {amount} = req.body;

if(!amount){
    return next(new errorHandler('Please place your bid',404))
}
if(amount  <= auctionItem.currentBid){
    return next(new errorHandler(' Bid amount must be grater then current bids..',404))
}

if(amount < auctionItem.startingBid){
    return next(new errorHandler('Bid amount must be grater then starting bids..',404))
}

try {
    const existingBid = await Bid.findOne({
        "bidder.id":req.user._id,
        auctionItem:auctionItem._id
    }
)
    const existingBidInAuction = auctionItem.bids.find(
    (bid)=>bid.userId.toString()==req.user._id.toString()
)
if(existingBid&&existingBidInAuction){
    existingBid.amount = amount,
    existingBidInAuction.amount = amount,
    await existingBidInAuction.save();
    await existingBid.save();
    auctionItem.currentBid = amount 

}else{
    const bidderDetail = await userModel.findById(req.user._id)
    const bid = await Bid.create({
        amount,
        bidder:{
            id:bidderDetail._id,
            userName:bidderDetail.userName,
            profileImage:bidderDetail.profileImage?.url
        },
        auctionItem:auctionItem._id
    });
    auctionItem.bids.push({
            userId:req.user._id,
            userName:bidderDetail.userName,
            profileImage:bidderDetail.profileImage?.url,
            amount,
    })
    auctionItem.currentBid = amount ;

}
await auctionItem.save();
res.status(201).json({
    success:true,
    message:'Bid placed successfully.',
    currentBid:auctionItem.currentBid
})
} catch (error) {
     return next(new errorHandler(error.message||'failed to placed bid.',500))
}

})

