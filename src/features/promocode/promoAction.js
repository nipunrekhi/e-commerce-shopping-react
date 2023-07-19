import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { showCartItems } from "../cart/cartAction";
const backendURL = "http://localhost:8089";

export const promo = createAsyncThunk(
  "promocode/addPromocode",
  async ({ name, promocode, discount }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${backendURL}/addPromocode`, {
        name,
        promocode,
        discount,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const showPromo = createAsyncThunk(
  "promocode/showPromoCode",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendURL}/showPromocodes`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const assignPromo = createAsyncThunk(
  "promocode/assignPromo",
  async ({ userId, promo }, { rejectWithValue }) => {
    try {
      console.log(promo, "promo");
      const response = await axios.post(`${backendURL}/assignPromo`, {
        userId,
        promo,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const applyPromo = createAsyncThunk(
  "promocode/applyPromo",
  async (promoName, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`${backendURL}/applyPromo`, {
        promoName,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
