import mongoose from "mongoose";
import { catchAsyncErrors } from "../Middleware/catchAsyncError.js";
import errorHandler from "../Middleware/errorHandler.js";
import { Auction } from "../Models/auctionSchema.js";
import { PaymentProof } from "../Models/commissionProofSchema.js";
import userModel from "../Models/user_Model.js";
import { Commission } from "../Models/commissionSchema.js";


export const deleteAuctionItem = catchAsyncErrors(async(req,res,next)=>{
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

export const getAllPaymentProof = catchAsyncErrors(async(req,res,next)=>{
    let paymentProof = await PaymentProof.find();
    res.status(200).json({
        success:true,
        paymentProof,
    })
})

export const getPaymentProofDetail = catchAsyncErrors(async(req,res,next)=>{
    const {id}=req.params;
    const paymentProofDetail = await PaymentProof.findById(id);

    res.status(200).json({
        success:true,
       paymentProofDetail
    })
    

})

export const updateProofStatus = catchAsyncErrors(async(req,res,next)=>{
    const {id}=req.params;
    const {amount,status}= req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return next (new errorHandler("Invalid ID formate.",400))
    }
    let proof = await PaymentProof.findById(id)
    if(!proof){
        return next (new errorHandler("Payment proof not found.",400))
    }
     proof = await PaymentProof.findByIdAndUpdate(
        id,
        {status,amount},
        {
        new:true,
        runValidators:true,
        useFindAndModify:false,
        }
    );

    res.status(200).json({
        success:true,
        message:"Pamyent proof amount and status has been updated.",
        proof,
    })
})

export const deletePaymentProof = catchAsyncErrors(async(req,res,next)=>{
    const {id} = req.params;
    let proof = await PaymentProof.findById(id);

    if(!proof){
     return next (new errorHandler("Payment Proof not found.",400))
    }
    
    await proof.deleteOne()
    res.status(200).json({
        success:true,
        message:"Payment proof deleted."
    })
});

export const fetchAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await userModel.aggregate([
    
    {
      $group: {
        _id: {
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },  
          role: "$role"
        },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        month: "$_id.month",
        year: "$_id.year",
        role: "$_id.role",
        count: 1,
        _id: 0,
      }
    },
    {
      $sort: { year: 1, month: 1 }
    }
  ]);


  const bidders = users.filter((user) => user.role === "Bidder");
  const auctioneers = users.filter((user) => user.role === "Auctioneer");

  const transformDataToMonthlyArray = (data, totalMonths = 12) => {
    const result = Array(totalMonths).fill(0);
    data.forEach((item) => {
      result[item.month - 1] = item.count;
    });
    return result;
  };

  const bidderArray = transformDataToMonthlyArray(bidders);
  const auctioneerArray = transformDataToMonthlyArray(auctioneers);

  res.status(200).json({
    success: true,
    bidderArray,
    auctioneerArray,
  });
});

export const monthlyRevenue = catchAsyncErrors(async(req,res,next)=>{
  const payments = await Commission.aggregate([
    {
    $group:{
      _id:{
        month:{$month:"$createdAt"},
        year:{$year:"$createdAt"},
      },
     totalAmounts: { $sum: "$amount" },
    },

  },{
    $sort:{"_id.year":1, "_id.month":1}
  }
]);

  const transformDataToMonthlyArray = (payments, totalMonths = 12) => {
    const result = Array(totalMonths).fill(0);
    payments.forEach((payment) => {
      result[payment._id.month - 1] = payment.totalAmounts;
    });
    return result;
  };
  const totalMonthlyRevenue = transformDataToMonthlyArray(payments);
  res.status(200).json({
    success:true,
    totalMonthlyRevenue,
  })
})
