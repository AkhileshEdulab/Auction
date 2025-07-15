import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const auctionSlice = createSlice({
    name:"auction",
    initialState:{
        loading:false,
        itemDetails:{},
        auctionDetails:{},
        auctionBid:{},
        allAuction:[],
        myAuction:[],
    },
    reducers:{
        getAllAuctionRequest(state,action){
            state.loading=true
        },
        getAllAuctionSuccess(state,action){
            state.loading =false,
            state.allAuction = action.payload
        },
        getAllAuctionFailed(state,action){
            state.loading = false
        },
        resetAuction(state,action){
            state.loading = false,
            state.allAuction = state.allAuction,
            state.auctionDetails = state.allDetails,
            state.itemDetails = state.itemDetails,
            state.myAuction = state.myAuction
        }
    }
})

export const getAllAuction = () =>async (dispatch) =>{
    dispatch(auctionSlice.actions.getAllAuctionRequest())
    try {
        const response = await axios.get("http://localhost:5000/api/v1/auction/getAll",{withCredentials:true})
        dispatch(auctionSlice.actions.getAllAuctionSuccess(response.data.items))
        dispatch(auctionSlice.actions.resetAuction())
    } catch (error) {
        dispatch(auctionSlice.actions.getAllAuctionFailed())
        dispatch(auctionSlice.actions.resetAuction())
    }
}

export default auctionSlice.reducer;