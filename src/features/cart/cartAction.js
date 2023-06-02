import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearSuccessState } from "../auth/authSlice";
const backendURL = "http://localhost:8089";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (cartItem, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`${backendURL}/addToCart`, cartItem);
      dispatch(showCartItems())
      dispatch(clearSuccessState())
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const incrementItem = createAsyncThunk(
  "cart/incrementItem",
  async (itemId, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`${backendURL}/increment/${itemId}`);
      dispatch(showCartItems());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const decrementItem = createAsyncThunk(
  "cart/decrementItem",
  async (itemId, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`${backendURL}/decrement/${itemId}`);
      dispatch(showCartItems());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteItem = createAsyncThunk(
  "cart/deleteItem",
  async (itemId, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`${backendURL}/deleteItem/${itemId}`);
      dispatch(showCartItems());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const showCartItems = createAsyncThunk(
  "cart/showCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get(`${backendURL}/showCartItems`, config);
      return res.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

