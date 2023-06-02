import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://localhost:8089";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${backendURL}/register`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${backendURL}/login`, userData);
      localStorage.setItem("userToken", response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getIpAddress = createAsyncThunk(
  "auth/getIpAddress",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendURL}/reqIp`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const signInAsGuest = createAsyncThunk(
  "auth/signInAsGuest",
  async ({guestEmail,guestPassword} ,{ rejectWithValue }) => {
    try {
      const response = await axios.post(`${backendURL}/signInGuest`, {guestEmail,guestPassword});
      localStorage.setItem("userToken", response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
