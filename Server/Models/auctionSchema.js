import mongoose from "mongoose";

 const  auctionSchema = new mongoose.Schema({
    title:String,
    description:String,
    startingBid:{type:Number},
    currentBid:{type:String,default:0},
    // startTime:{type:String},
    // endTime:{type:String},
    endTime: {
  type: Date,
  required: true,
},
startTime: {
  type: Date,
  required: true,
},
    category :String,
    candition:{
        type:String,
        enum:["New","Used"]
    },
    image:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    createdBy:{
         type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true,
    },
    bids:[
        {
            userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Bid',
        },
        userName:String,
        profileImage:String, 
        amount:Number
        }     
    ],

    highestBidder:{
         type:mongoose.Schema.Types.ObjectId,
         ref:'User',
    },
    commissionCalculated:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
    
});

 export const Auction = mongoose.model("Auction",auctionSchema);

 