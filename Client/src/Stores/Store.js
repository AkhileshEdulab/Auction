import { configureStore } from "@reduxjs/toolkit";
import  useReducer  from "./Slices/userSlices.js";
import  commissionReducer  from "./Slices/commissionSlice.js";
import  auctionReducer  from "./Slices/auctionSlice.js";


export const store = configureStore({
    reducer:{
        user:useReducer,
        commission:commissionReducer,
        auction:auctionReducer
    }
})