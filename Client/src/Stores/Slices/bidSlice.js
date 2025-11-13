import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


const bidSlice = createSlice({
    name:"bid",
    initialState:{
        loading:false
    },
    reducers:{
        bidRequest(state,action){
           state.loading=true;
        },
        bidSuccess(state,action){
            state.loading = false
        },
        bidFailed(state,action){
            state.loading = false
        },
        clearBid(state,action){
            state.loading=false
        }

    }
});

export default bidSlice.reducer;

export const postBid =(id,data)=> async(dispatch)=>{
 dispatch(bidSlice.actions.bidRequest());
 try {
    const response = await axios.post(`https://auction-gee2.onrender.com/api/v1/bid/place/${id}`,data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json', 
        },
      });
      dispatch(bidSlice.actions.bidSuccess(response.data))
      toast.success(response.data?.message || 'Bid placed.');
      dispatch(bidSlice.actions.clearBid());
 } catch (error) {
    dispatch(bidSlice.actions.bidFailed());
    toast.error(error.response.data.message || "failed to place bid.")
    dispatch(bidSlice.actions.clearBid())
 }
}