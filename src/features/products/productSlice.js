import { createSlice } from "@reduxjs/toolkit";
import {
  addAttributes,
  addCategory,
  addProducts,
  addVariant,
  getCategory,
  getProducts,
  getVariants,
  productDropdown,
  showAttribute,
  showProduct,
  subCategory,
} from "./productsAction";

const initialState = {
  errorMessage: "",
  isLoading: false,
  isError: null,
  isSuccess: false,
  productData: null,
  categoryData: null,
  subCategoryData: null,
  nestedSubCategoryData: null,
  variantData: null,
  attributeData:null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addProducts.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(addProducts.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(addProducts.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = payload.error;
    });
    builder.addCase(addCategory.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(addCategory.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(addCategory.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = payload.error;
    });
    builder.addCase(addVariant.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(addVariant.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(addVariant.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = payload.error;
    });
    builder.addCase(addAttributes.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(addAttributes.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(addAttributes.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = payload.error;
    });
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.productData = payload;
      state.errorMessage = "";
    });
    builder.addCase(getProducts.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = payload.error;
    });
    builder.addCase(showProduct.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(showProduct.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.productData = payload;
      state.errorMessage = "";
    });
    builder.addCase(showProduct.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = payload.error;
    });
    builder.addCase(productDropdown.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(productDropdown.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.productData = payload;
      state.errorMessage = "";
    });
    builder.addCase(productDropdown.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = payload.error;
    });
    builder.addCase(getCategory.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(getCategory.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.categoryData = payload;
      state.errorMessage = "";
    });
    builder.addCase(getCategory.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = payload.error;
    });
    builder.addCase(subCategory.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(subCategory.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.subCategoryData = payload;
      state.errorMessage = "";
    });
    builder.addCase(subCategory.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = payload.error;
    });
    builder.addCase(getVariants.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(getVariants.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.variantData = payload;
      state.errorMessage = "";
    });
    builder.addCase(getVariants.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = payload.error;
    });
    builder.addCase(showAttribute.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(showAttribute.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.attributeData = payload;
      state.errorMessage = "";
    });
    builder.addCase(showAttribute.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = payload.error;
    });
  },
});

export default productSlice.reducer;
