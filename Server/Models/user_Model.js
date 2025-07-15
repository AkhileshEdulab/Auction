import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";


export const userSchema =new mongoose.Schema({
    userName:{
        type:String,
        minLength:[3,"Name character must be at least 3 character."],
        maxLength:[40,"Name character accessed only 40 character."],
    },
    email:String,
    address:String,
    password:{
        type:String,
        minLength:[8,"Password content must be at least 8 character."],
        selected:false
    },
    phone:{
        type:String,
        minLength:[10,"Password content accept only 10 digit."],
        maxLength:[10,"Password content accept only 10 digit."],
        match: [/^\d{10}$/, "Phone number must contain exactly 10 digits."]
    },
    profileImage:{
        publicId:{type:String,required:true},
        url:{type:String,required:true}
    },
    paymentMethods:{
        bankTransfer:{
            bankAccountName:{type:String},
            bankAccountNumber:{type:String},
            bankName:{type:String},
        },
        payPal:{
            paypalEmail:String,
        },
        easyPaisa:{
            easyPaisaAccountNumber:Number,
        }
    },

   role:{
        type:String,
        enum:["Auctioneer","Bidder","Super Admin"]
    },
    unpaidCommission:{
        type:String,
        default:0
    },

    auctionWon:{
        type:String,
        default:0
    },

    
   moneySpent:{
        type:String,
        default:0
    },

    createdAt: {
        type: Date,
       default: Date.now
     }

});

userSchema.pre("save", async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (currentPassword) {
  return await bcrypt.compare(currentPassword, this.password);
};


userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_SECRETE_KEY, // corrected typo: SECRETE -> SECRET
    { expiresIn: process.env.JWT_EXPIRES_IN } // corrected: JWT_EXPIRED -> JWT_EXPIRES_IN
  );
};
const userModel  = mongoose.model("User",userSchema);

export default userModel;

