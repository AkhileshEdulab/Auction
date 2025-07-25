import mongoose from "mongoose";

const paymentProofSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    proof:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true
        },
    },
    uploadedAt:{
        type:Date,
        default:Date.now
    },
    status:{
        type:String,
        enum:["Panding","Approved","Rejected","Sattled"],
        default:"Panding",
    },
    amount:Number,
    comment:String,

})

export const PaymentProof = mongoose.model("Proof",paymentProofSchema)