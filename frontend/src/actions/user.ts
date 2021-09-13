import { createAsyncThunk } from "@reduxjs/toolkit";
import anony from "../lib/anony";

export interface SignUser {
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  "user/login",
  async (data: SignUser, { rejectWithValue }) => {
    try {
      const response = await anony.post("auth/login", data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const signup = createAsyncThunk(
  "user/signup",
  async (data: SignUser, { rejectWithValue }) => {
    try {
      const response = await anony.post("auth", data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);
