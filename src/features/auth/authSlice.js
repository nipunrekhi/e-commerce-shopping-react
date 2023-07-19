import { createSlice } from "@reduxjs/toolkit";
import {
  getAllUser,
  getIpAddress,
  loginUser,
  registerUser,
  signInAsGuest,
} from "./authAction";

// initialize userToken from local storage
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;
const initialState = {
  errorMessage: "",
  isLoading: false,
  userInfo: null,
  userToken,
  isError: null,
  isSuccess: false,
  data: null,
  ipAddress: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userToken"); // delete token from storage
      localStorage.removeItem("persist:root"); // delete entire state from storage
      state.isLoading = false;
      state.userInfo = null;
      state.userToken = null;
      state.isError = null;
      state.isSuccess = false;
      state.errorMessage = "";
      state.data = null;
    },
    resetState: () => initialState,
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
      state.isSuccess = true;
      state.isError = null;
      state.isLoading = false;
    },
    clearSuccessState: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = payload.error;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.userInfo = payload;
      state.userToken = payload.token;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = payload.error;
    });
    builder.addCase(getIpAddress.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(getIpAddress.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.ipAddress = payload;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(getIpAddress.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = payload.error;
    });
    builder.addCase(signInAsGuest.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(signInAsGuest.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.userInfo = payload;
      state.userToken = payload.token;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(signInAsGuest.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = payload.error;
    });
    builder.addCase(getAllUser.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(getAllUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = payload;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(getAllUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = payload.error;
    });
  },
});

export const { clearSuccessState, logout, setCredentials, resetState } =
  authSlice.actions;

export default authSlice.reducer;
