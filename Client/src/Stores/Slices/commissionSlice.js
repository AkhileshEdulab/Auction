import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const commissionSlice = createSlice({
  name: "CommissionProof",
  initialState: {
    isAuthenticated: false,
    loading: false,
    user: {},
    error: null,
  },
  reducers: {
    commissionProofRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    commissionProofSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    commissionProofFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload || "Something went wrong";
    },
    clearErrors(state) {
      state.error = null;
    },
  },
});

export const commissionProof = (data) => async (dispatch) => {
  dispatch(commissionSlice.actions.commissionProofRequest());
  try {
    const response = await axios.post(
      "https://auction-gee2.onrender.com/api/v1/commission/proof",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    dispatch(
      commissionSlice.actions.commissionProofSuccess(response.data.user)
    );
    toast.success(response.data.message || "Proof submitted successfully!");
  } catch (error) {
    dispatch(
      commissionSlice.actions.commissionProofFailed(
        error?.response?.data?.message || "Submission failed"
      )
    );
    toast.error(error?.response?.data?.message || "Error occurred");
  }
};

export const { clearErrors } = commissionSlice.actions;
export default commissionSlice.reducer;
