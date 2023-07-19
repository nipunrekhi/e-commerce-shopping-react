import { createSlice } from "@reduxjs/toolkit";
import { applyPromo, assignPromo, promo, showPromo } from "./promoAction";

// Load promoData from localStorage if available
const savedPromoData = JSON.parse(localStorage.getItem("appliedPromo"));
const initialState = {
  promocode: null,
  errorMessage: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  appliedPromo: savedPromoData || null,
};

const promocodeSlice = createSlice({
  name: "promocode",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(promo.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(promo.fulfilled, (state) => {
      (state.isLoading = false),
        (state.isSuccess = true),
        (state.isError = false);
    });
    builder.addCase(promo.rejected, (state, { payload }) => {
      (state.isLoading = false),
        (state.isError = true),
        (state.errorMessage = payload);
    });
    builder.addCase(showPromo.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(showPromo.fulfilled, (state, { payload }) => {
      (state.isLoading = false),
        (state.isSuccess = true),
        (state.promocode = payload);
      state.isError = false;
    });
    builder.addCase(showPromo.rejected, (state, { payload }) => {
      (state.isLoading = false),
        (state.isError = true),
        (state.errorMessage = payload);
    });
    builder.addCase(assignPromo.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(assignPromo.fulfilled, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(assignPromo.rejected, (state, payload) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = payload;
    });
     builder.addCase(applyPromo.pending, (state) => {
       state.isLoading = true;
       state.isError = false;
       state.isSuccess = false;
     });
     builder.addCase(applyPromo.fulfilled, (state,{payload}) => {
       state.isLoading = true;
       state.isError = false;
       state.isSuccess = true;
       state.promoData = payload; // Store the data in the state
       // Save promoData to localStorage
       localStorage.setItem("promoData", JSON.stringify(payload));
     });
     builder.addCase(applyPromo.rejected, (state, payload) => {
       state.isLoading = true;
       state.isError = false;
       state.isSuccess = false;
       state.errorMessage = payload;
     });
  },
});
export const { addPromocode } = promocodeSlice.actions;

export default promocodeSlice.reducer;
