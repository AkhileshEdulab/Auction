import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    loading: false,
    user: {},
    leaderboard: [],
    error: null,
  },
  reducers: {
    registerRequest(state,action){
      state.loading = true,
      state.isAuthenticated=false,
      state.user={}
    },
    registerSuccess(state,action){
      state.loading=false,
      state.isAuthenticated=true,
      state.user=action.payload.user
    },
    registerFailed(state,action){
      state.loading=false,
      state.isAuthenticated=false,
      state.user={}
    },

     loginRequest(state,action){
      state.loading = true,
      state.isAuthenticated=false,
      state.user={}
    },
    loginSuccess(state,action){
      state.loading=false,
      state.isAuthenticated=true,
      state.user=action.payload.user
    },
    loginFailed(state,action){
      state.loading=false,
      state.isAuthenticated=false,
      state.user={}
    },

    featchRequest(state,action){
      state.loading=true,
      state.isAuthenticated=false,
      state.user={}
    },
    featchSuccess(state,action){
      state.loading=false,
      state.isAuthenticated=true,
      state.user=action.payload
    },
    featchFailled(state,action){
      state.loading=false,
      state.isAuthenticated=false,
      state.user={}
    },
    logoutSuccess(state,action) {
      state.isAuthenticated = false;
      state.user = {};
    },
    logoutFailed(state, action) {
      state.loading = false;
      state.isAuthenticated=state.isAuthenticated ,
      state.user = state.user
       },
       featchLeaderboardRequest(state,action){
        state.loading = true,
        state.leaderboard = []
       },
       featchLeaderboardSuccess(state,action){
        state.loading = false,
        state.leaderboard = action.payload
       },
       featchLeaderboardFailed(state,action){
        state.loading = false,
        state.leaderboard = []
       },

    clearAllErrors(state) {
      state.loading = false;
      state.leaderboard=state.leaderboard
      state.isAuthenticated=state.isAuthenticated ,
      state.user = state.user
     
    },
  },
});
export const register = (data) => async (dispatch) => {
  dispatch(userSlice.actions.registerRequest());

  try {
    const response = await axios.post(
      'http://localhost:5000/api/v1/user/register',
      data,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      }
    );

    dispatch(userSlice.actions.registerSuccess(response.data));
    toast.success(response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.registerFailed());
    toast.error(error?.response?.data?.message || 'Registration failed');
    dispatch(userSlice.actions.clearAllErrors());
  }
};


export const login = (data) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());

  try {
    const response = await axios.post(
      'http://localhost:5000/api/v1/user/login',
      data,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json', 
        },
      }
    );

    dispatch(userSlice.actions.loginSuccess(response.data));
    toast.success(response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.loginFailed());
    toast.error(error?.response?.data?.message || 'login failed');
    dispatch(userSlice.actions.clearAllErrors());
  }
};
export const logout = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/user/logout",
      {
        withCredentials: true, 
      }
    );

    dispatch(userSlice.actions.logoutSuccess());
    toast.success(response.data.message || "Logged out successfully.");
  } catch (error) {
    dispatch(
      userSlice.actions.logoutFailed(
        error.response?.data?.message || "Logout failed"
      )
    );
    toast.error(error.response?.data?.message || "Logout failed");
  } finally {
    dispatch(userSlice.actions.clearAllErrors());
  }
};

export const fetchUser = () => async (dispatch) => {
  dispatch(userSlice.actions.featchRequest());
  try {
    const response = await axios.get('http://localhost:5000/api/v1/user/me', {
      withCredentials: true,
    });

    dispatch(userSlice.actions.featchSuccess(response.data.user));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.featchFailled());
    dispatch(userSlice.actions.clearAllErrors());
    console.error("Fetch user error:", error);
  }
};

export const featchLeaderboard = () => async (dispatch) => {
  dispatch(userSlice.actions.featchLeaderboardRequest());
  try {
    const response = await axios.get('http://localhost:5000/api/v1/user/leaderboard', {
      withCredentials: true,
    });

    dispatch(userSlice.actions.featchLeaderboardSuccess(response.data.leaderboard));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.featchLeaderboardFailed());
    dispatch(userSlice.actions.clearAllErrors());
    console.error("Fetch user error:", error);
  }
};

export const { logoutSuccess, logoutFailed, clearAllErrors } = userSlice.actions;
export default userSlice.reducer;
