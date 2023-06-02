import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
const backendURL = "http://localhost:8089";

export const orderAddress = createAsyncThunk(
  "payment/orderAddress",
  async (address, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${backendURL}/orderAddress`, address);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
