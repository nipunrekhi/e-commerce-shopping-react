import axios from "axios";
import {  createAsyncThunk } from "@reduxjs/toolkit";
const backendURL = "http://localhost:8089";

export const addProducts = createAsyncThunk(
  "products/addProducts",
  async (productData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        `${backendURL}/addProduct`,
        productData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const addCategory = createAsyncThunk(
  "products/addCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${backendURL}/addCategory`,
        categoryData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const addVariant = createAsyncThunk(
  "products/addVariant",
  async (variantData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${backendURL}/addVariant`,
        variantData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const addAttributes = createAsyncThunk(
  "products/addAttributes",
  async ({productId,attributes}, { rejectWithValue }) => {
    console.log(attributes);
    try {
      const response = await axios.post(
        `${backendURL}/addAttributes`,
        {productId,attributes}
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendURL}/getProducts/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const showProduct = createAsyncThunk(
  "products/showProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendURL}/showProduct/${productId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const productDropdown = createAsyncThunk(
  "products/productDropdown",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendURL}/productDropdown`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getCategory = createAsyncThunk(
  "products/getCategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendURL}/getCategory`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const subCategory = createAsyncThunk(
  "products/subCategory",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendURL}/subCategory/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getVariants = createAsyncThunk(
  "products/getVariants",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendURL}/getVariants/${productId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const showAttribute = createAsyncThunk(
  "products/showAttribute",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendURL}/showAttribute/${productId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);




