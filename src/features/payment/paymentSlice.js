import { createSlice } from "@reduxjs/toolkit";
import { orderAddress } from "./paymentAction";
const initialState = {
  errorMessage: "",
  isLoading: false,
  isError: null,
  isSuccess: false,
  cartItem: null,
};
const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(orderAddress.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(orderAddress.fulfilled, (state) => {
      state.isLoading = false;
      state.isError=null;
      state.isSuccess = true;
      state.isError = null;
    });
    builder.addCase(orderAddress.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = payload.message;
    });
  },
});


export default paymentSlice.reducer;