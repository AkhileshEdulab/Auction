import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


const auctionSlice = createSlice({
    name:"auction",
    initialState:{
        loading:false,
        itemDetails:{},
        auctionDetails:{},
        auctionBidder:{},
        allAuction:[],
        myAuction:[],
    },
    reducers:{
        createAuctionRequest(state,action){
            state.loading = true
        },
        createAuctionSuccess(state,action){
            state.loading = false
        },
        createAuctionFailed(state,action){
            state.loading = false
        },

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
         getAuctionDetailsRequest(state,action){
            state.loading=true
        },
       getAuctionDetailsSuccess(state, action) {
        state.loading = false;
        state.auctionDetails = action.payload.auctionItem; 
        state.auctionBidder = action.payload.bidders;
       },
       getAuctionDetailsFailed(state,action){
            state.loading = false
            state.allAuction = state.allAuction,
            state.auctionBidder = state.auctionBidder 
        },
        MyAuctionRequest(state,action){
          state.loading = true;
          state.myAuction = []
        },
        MyAuctionSuccess(state,action){
          state.loading = false;
          state.myAuction = action.payload
        },
        myAuctionFailed(state,action){
          state.loading = false;
          state.myAuction = []
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

// export const getAuctionDetails = (id) =>async (dispatch) =>{
//     dispatch(auctionSlice.actions.getAuctionDetailsRequest())
//     console.log("getAuctionDetails called with ID:", id);
//     try {
//         const response = await axios.get(`http://localhost:5000/api/v1/auction/item/${id}`,{withCredentials:true})
//         console.log("API Response:", response.data);

//         dispatch(auctionSlice.actions.getAuctionDetailsSuccess(response.data))
//         dispatch(auctionSlice.actions.resetAuction())
//     } catch (error) {
//         dispatch(auctionSlice.actions.getAuctionDetailsFailed())
//         dispatch(auctionSlice.actions.resetAuction())
//     }
// }

export const getAuctionDetails = (id) => async (dispatch) => {
  if (!id) {
    console.warn("getAuctionDetails called without an id");
    return; // ⛔ early exit if id is missing
  }

  dispatch(auctionSlice.actions.getAuctionDetailsRequest());
  try {
    const response = await axios.get(`http://localhost:5000/api/v1/auction/item/${id}`, {
      withCredentials: true
    });
    dispatch(auctionSlice.actions.getAuctionDetailsSuccess(response.data));
  } catch (error) {
    dispatch(auctionSlice.actions.getAuctionDetailsFailed());
  }
};

export const createAuction = (data) => async (dispatch) => {
  dispatch(auctionSlice.actions.createAuctionRequest());

  try {
    const response = await axios.post(
      'http://localhost:5000/api/v1/auction/create',
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data", // ✅ fixed typo
        },
      }
    );

    const message = response?.data?.message || 'Auction created successfully';

    dispatch(auctionSlice.actions.createAuctionSuccess(message));
    toast.success(message);

    dispatch(auctionSlice.actions.resetAuction());
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || error.message || 'Failed to create auction';

    dispatch(auctionSlice.actions.createAuctionFailed(errorMessage));
    toast.error(errorMessage);

    dispatch(auctionSlice.actions.resetAuction());
  }
};

export const getMyAuction = () => async (dispatch) => {
 
  dispatch(auctionSlice.actions.MyAuctionRequest());
  try {
    const response = await axios.get(`http://localhost:5000/api/v1/auction/myitems`, {
      withCredentials: true
    });
    dispatch(auctionSlice.actions.MyAuctionSuccess(response.data.items));
  } catch (error) {
    console.error(error)
    dispatch(auctionSlice.actions.myAuctionFailed());
  }
};
export default auctionSlice.reducer;