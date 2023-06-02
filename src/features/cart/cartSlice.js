import { createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  decrementItem,
  deleteItem,
  incrementItem,
  showCartItems,
} from "./cartAction";

const initialState = {
  errorMessage: "",
  isLoading: false,
  isError: null,
  isSuccess: false,
  cartItem: null,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToCart.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(addToCart.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(addToCart.rejected, (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = "";
    });
    builder.addCase(incrementItem.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(incrementItem.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(incrementItem.rejected, (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = "";
    });
    builder.addCase(decrementItem.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(decrementItem.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(decrementItem.rejected, (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = "";
    });
    builder.addCase(deleteItem.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(deleteItem.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(deleteItem.rejected, (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = "";
    });
    builder.addCase(showCartItems.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(showCartItems.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.cartItem = payload;
      state.errorMessage = "";
    });
    builder.addCase(showCartItems.rejected, (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = "";
    });
  },
});

export default cartSlice.reducer;
