import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../lib/client";

export interface SignUser {
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  "user/login",
  async (data: SignUser, { rejectWithValue }) => {
    try {
      const response = await client.post("auth/login", data);
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
      const response = await client.post("auth", data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  try {
    const response = await client.post("auth/logout");
    return response.data;
  } catch (err: any) {
    return err.response.data;
  }
});

export const createRoom = createAsyncThunk(
  "user/createRoom",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await client.post("channel", { channelName: data });
      return response.data;
    } catch (err: any) {
      console.log(err.response.data.data.message);
      return rejectWithValue(err.response.data);
    }
  }
);

export const joinRoom = createAsyncThunk(
  "user/joinRoom",
  async (channelId: number, { rejectWithValue }) => {
    try {
      const response = await client.post(`channel/${channelId}`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const searchRoom = createAsyncThunk(
  "user/searchRoom",
  async (channelName: string, { rejectWithValue }) => {
    try {
      const response = await client.get(`channel?name=${channelName}`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const loadRooms = createAsyncThunk("user/loadRooms", async () => {
  try {
    const response = await client.get("channel");
    return response.data;
  } catch (err: any) {
    return err.response.data;
  }
});

export const loadRoom = createAsyncThunk(
  "user/loadRoom",
  async (channelId, { rejectWithValue }) => {
    try {
      const response = await client.get(`channel/${channelId}`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const loadRoomChats = createAsyncThunk(
  "user/loadRoomChats",
  async (channelId: number, { rejectWithValue }) => {
    try {
      const response = await client.get(`channel/${channelId}/chats`);
      return response.data;
    } catch (err: any) {
      rejectWithValue(err.response.data);
    }
  }
);  
