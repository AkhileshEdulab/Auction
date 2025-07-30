// import { catchAsyncErrors } from "../Middleware/catchAsyncError.js";
// import errorHandler from "../Middleware/errorHandler.js";
// import { Auction } from "../Models/auctionSchema.js";
// import { Bid } from "../Models/bidSchema.js";
// import userModel from "../Models/user_Model.js";


// export const placeBid = catchAsyncErrors(async(req ,res , next)=>{
// const {id}= req.params;
// const auctionItem = await Auction.findById(id);
// if(!auctionItem){
//     return next(new errorHandler('Auction items not found.',404))
// }
 
// const {amount} = req.body;

// if(!amount){
//     return next(new errorHandler('Please place your bid',404))
// }
// if(amount  <= auctionItem.currentBid){
//     return next(new errorHandler(' Bid amount must be grater then current bids..',404))
// }

// if(amount < auctionItem.startingBid){
//     return next(new errorHandler('Bid amount must be grater then starting bids..',404))
// }

// try {
//     const existingBid = await Bid.findOne({
//         "bidder.id":req.user._id,
//         auctionItem:auctionItem._id
//     }
// )
//     const existingBidInAuction = auctionItem.bids.find(
//     (bid)=>bid.userId.toString()==req.user._id.toString()
// )
// if(existingBid&&existingBidInAuction){
//     existingBid.amount = amount,
//     existingBidInAuction.amount = amount,
//     await existingBidInAuction.save();
//     await existingBid.save();
//     auctionItem.currentBid = amount 

// }else{
//     const bidderDetail = await userModel.findById(req.user._id)
//     const bid = await Bid.create({
//         amount,
//         bidder:{
//             id:bidderDetail._id,
//             userName:bidderDetail.userName,
//             profileImage:bidderDetail.profileImage?.url
//         },
//         auctionItem:auctionItem._id
//     });
//     auctionItem.bids.push({
//             userId:req.user._id,
//             userName:bidderDetail.userName,
//             profileImage:bidderDetail.profileImage?.url,
//             amount,
//     })
//     auctionItem.currentBid = amount ;

// }
// await auctionItem.save();
// res.status(201).json({
//     success:true,
//     message:'Bid placed successfully.',
//     currentBid:auctionItem.currentBid
// })
// } catch (error) {
//      return next(new errorHandler(error.message||'failed to placed bid.',500))
// }

// })



import { catchAsyncErrors } from "../Middleware/catchAsyncError.js";
import errorHandler from "../Middleware/errorHandler.js";
import { Auction } from "../Models/auctionSchema.js";
import { Bid } from "../Models/bidSchema.js";
import userModel from "../Models/user_Model.js";

export const placeBid = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  // Find the auction item
  const auctionItem = await Auction.findById(id);
  if (!auctionItem) {
    return next(new errorHandler("Auction item not found.", 404));
  }

  let { amount } = req.body;

  // Convert to number and validate
  const parsedAmount = Number(amount);
  if (!parsedAmount || isNaN(parsedAmount)) {
    return next(new errorHandler("Please enter a valid numeric bid amount.", 400));
  }

  // Check bid validity
  if (parsedAmount <= auctionItem.currentBid) {
    return next(new errorHandler("Bid amount must be greater than current bid.", 400));
  }

  if (parsedAmount < auctionItem.startingBid) {
    return next(new errorHandler("Bid amount must be greater than starting bid.", 400));
  }

  try {
    // Check if user has already placed a bid on this auction
    const existingBid = await Bid.findOne({
      "bidder.id": req.user._id,
      auctionItem: auctionItem._id
    });

    const existingBidInAuction = auctionItem.bids.find(
      (bid) => bid.userId.toString() === req.user._id.toString()
    );

    if (existingBid && existingBidInAuction) {
      // Update existing bid
      existingBid.amount = parsedAmount;
      existingBidInAuction.amount = parsedAmount;
      auctionItem.currentBid = parsedAmount;

      await existingBid.save();
    } else {
      // Create new bid
      const bidderDetail = await userModel.findById(req.user._id);

      const newBid = await Bid.create({
        amount: parsedAmount,
        bidder: {
          id: bidderDetail._id,
          userName: bidderDetail.userName,
          profileImage: bidderDetail.profileImage?.url,
        },
        auctionItem: auctionItem._id,
      });

      // Add bid to auction
      auctionItem.bids.push({
        userId: bidderDetail._id,
        userName: bidderDetail.userName,
        profileImage: bidderDetail.profileImage?.url,
        amount: parsedAmount,
      });

      auctionItem.currentBid = parsedAmount;
    }

    await auctionItem.save();

    res.status(201).json({
      success: true,
      message: "Bid placed successfully.",
      currentBid: auctionItem.currentBid,
    });
  } catch (error) {
    return next(new errorHandler(error.message || "Failed to place bid.", 500));
  }
});
