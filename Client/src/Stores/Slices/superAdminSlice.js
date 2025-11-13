import { createSlice } from "@reduxjs/toolkit";
import {getAllAuction } from "./auctionSlice";
import axios from "axios";
import { toast } from "react-toastify";



const superAdminSlice = createSlice({
    name:"superAdmin",
    initialState:{
        loading : false,
        monthlyRevenue : [],
        totalAuctioneers:[],
        totalBidders:[],
        paymentProofs:[],
        singlePaymentProof:{}
    },
    reducers:{
        getMonthlyRevenueRequest(state,action){
            state.loading = true;
            state.monthlyRevenue =[]
        },
        getMonthlyRevenueSuccess(state,action){
            state.loading = false;
            state.monthlyRevenue =action.payload
        },
        getMonthlyRevenueFailed(state,action){
            state.loading = false;
            state.monthlyRevenue =[]
        },
        allUserRequest(state,action){
            state.loading = true;
            state.totalAuctioneers =[]
            state.totalBidders =[]
        },
        allUserSuccess(state,action){
            state.loading = false;
            state.totalAuctioneers =action.payload.auctioneerArray;
            state.totalBidders =action.payload.bidderArray

        },
        allUserFailed(state,action){
            state.loading = false;
            state.totalAuctioneers =[]
            state.totalBidders =[]
        },
        deletePaymentProofRequest(state,action){
            state.loading =true
        },
        deletePaymentProofSuccess(state,action){
            state.loading = false
        },
        deletePaymentProofFailed(state,action){
            state.loading = false
        },
        
        updatePaymentProofRequest(state,action){
            state.loading = true;
        },
        updatePaymentProofSuccess(state,action){
            state.loading =false
        },
        updatePaymentProofFailed(state,action){
            state.loading = false
        },

        singlePaymentProofRequest(state,action){
            state.loading = true;
            state.singlePaymentProof = {}
        },
        singlePaymentProofSuccess(state,action){
             state.loading = false;
            state.singlePaymentProof = action.payload
        },
        singlePaymentProofFailed(state,action){
            state.loading = false;
            state.singlePaymentProof = {}
        },

        paymentProofRequest(state,action){
            state.loading = true;
             state.paymentProofs =[]
        },
        paymentProofSuccess(state,action){
            state.loading = false;
            state.paymentProofs =action.payload
        },
        paymentProofFailed(state,action){
            state.loading = false;
             state.paymentProofs =[]
        },

        deleteAuctionRequest(state,action){
            state.loading = true
        },
        deleteAuctionSuccess(state,action){
            state.loading = false
        },
        deleteAuctionFailed(state,action){
            state.loadingfalse
        },

        clearAllError(state,action){
            state.loading = false;
            state.totalAuctioneers =state.totalAuctioneers;
            state.totalBidders =  state.totalBidders;
            state.paymentProofs =state.paymentProofs;
            state.monthlyRevenue = state.monthlyRevenue;
            state.singlePaymentProof ={};
        },
       
    }
});

export const monthlyRevenue = ()=>async(dispatch)=>{
    dispatch(superAdminSlice.actions.getMonthlyRevenueRequest());
    try {
        const response =await axios.get('https://online-auction-plateform.onrender.com/api/v1/superAdmin/monthlyincome',
            {withCredentials:true});
            dispatch(superAdminSlice.actions.getMonthlyRevenueSuccess( response.data.totalMonthlyRevenue))
    } catch (error) {
        dispatch(superAdminSlice.actions.getMonthlyRevenueFailed());
        console.error(error.response.data.message)
    }
}

export const fetchAllUser = (id)=>async(dispatch)=>{
    dispatch(superAdminSlice.actions.allUserRequest());
    try {
        const response = await axios.get('https://online-auction-plateform.onrender.com/api/v1/superAdmin/user/getAll',
            {withCredentials:true})
            dispatch(superAdminSlice.actions.allUserSuccess(response.data))
    } catch (error) {
        dispatch(superAdminSlice.actions.allUserFailed())
        console.error(error.response.data.message)
    }
}

export const deletePaymentProof = (id)=>async(dispatch)=>{
    dispatch(superAdminSlice.actions.deleteAuctionRequest())
    try {
        const response = await axios.delete(`https://online-auction-plateform.onrender.com/api/v1/superAdmin/paymentProof/delete/${id}`)
        dispatch(superAdminSlice.actions.deletePaymentProofSuccess());
        dispatch(getAllPaymentProof())
        toast.success(response.data.message)
    } catch (error) {
        dispatch(superAdminSlice.actions.deletePaymentProofFailed())
        console.error(error.response.data.message)
        toast.error(error.response.data.message)
    }
}

export const getSinglePaymentProof = (id)=>async(dispatch)=>{
    dispatch(superAdminSlice.actions.singlePaymentProofRequest())
    
    try {
        const response = await axios.get(`https://online-auction-plateform.onrender.com/api/v1/superAdmin/paymentProof/${id}`,
        )
        dispatch(superAdminSlice.actions.singlePaymentProofSuccess(response.data.paymentProofDetail));
    } catch (error) {
        dispatch(superAdminSlice.actions.singlePaymentProofFailed())
        console.error(error.response.data.message)
        toast.error(error.response.data.message)
    }
}


export const getAllPaymentProof = () => async (dispatch) => {
    dispatch(superAdminSlice.actions.paymentProofRequest());
    try {
        const response = await axios.get("https://online-auction-plateform.onrender.com/api/v1/superAdmin/paymentProof/getAll", {
            withCredentials: true
        });
        dispatch(superAdminSlice.actions.paymentProofSuccess(response.data.paymentProof));
    } catch (error) {
        dispatch(superAdminSlice.actions.paymentProofFailed());
        console.error(error?.response?.data?.message);
        toast.error(error?.response?.data?.message || "Failed to fetch payment proofs.");
    }
};

export const updatePaymentProof = (id, status , amount) => async (dispatch) => {
    dispatch(superAdminSlice.actions.updatePaymentProofRequest());
    try {
        const response = await axios.put(
            `https://online-auction-plateform.onrender.com/api/v1/superAdmin/paymentProof/status/update/${id}`,
            {status , amount},
            {
                withCredentials: true,headers:{"Content-Type":"application/json"}
            }
        );
        dispatch(superAdminSlice.actions.updatePaymentProofSuccess());
        toast.success(response.data.message );
        dispatch(getAllPaymentProof());
        dispatch(superAdminSlice.actions.clearAllError())
    } catch (error) {
        dispatch(superAdminSlice.actions.updatePaymentProofFailed());
        console.error(error?.response?.data?.message);
        toast.error(error?.response?.data?.message );
    }
};

export const deleteAuction = (id) => async (dispatch) => {
    dispatch(superAdminSlice.actions.deleteAuctionRequest());
    try {
        const response = await axios.delete(
            `https://online-auction-plateform.onrender.com/api/v1/superAdmin/auctionItem/delete/${id}`,
            { withCredentials: true }
        );
        dispatch(superAdminSlice.actions.deleteAuctionSuccess());
        dispatch(getAllAuction());
        toast.success(response.data.message || "Auction deleted successfully.");
    } catch (error) {
        dispatch(superAdminSlice.actions.deleteAuctionFailed());
        console.error(error?.response?.data?.message);
        toast.error(error?.response?.data?.message || "Failed to delete auction.");
    }
};

export const clearAllSuperAdminErrors =()=>(dispatch)=>{
dispatch(superAdminSlice.actions.clearAllError())
}

export default superAdminSlice.reducer;