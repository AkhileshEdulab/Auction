import { configureStore } from "@reduxjs/toolkit";
import  useReducer  from "./Slices/userSlices.js";
import  commissionReducer  from "./Slices/commissionSlice.js";
import  auctionReducer  from "./Slices/auctionSlice.js";
import  bidReducer from './Slices/bidSlice.js';
import  superAdminReducer  from "./Slices/superAdminSlice.js";

export const store = configureStore({
    reducer:{
        user:useReducer,
        commission:commissionReducer,
        auction:auctionReducer,
        bid:bidReducer,
        superAdmin:superAdminReducer
    }
})