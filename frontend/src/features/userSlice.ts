import { createSlice } from "@reduxjs/toolkit";
import { login, signup } from "../actions/user";
import { User, Rooms } from "../types/user.type";

const userSlice = createSlice({
  name: "user",
  initialState: {
    myInfo: null as User | null,
    roomsInfo: null as Rooms | null,
    loadMyInfoLoading: false,
    loadMyInfoDone: false,
    loadMyInfoError: null as string | null,
    loginLoading: false,
    loginDone: false,
    loginError: null as any,
    signupLoading: false,
    signupDone: false,
    signupError: null as any,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loginLoading = true;
        state.loginDone = false;
        state.loginError = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.loginDone = true;
        state.myInfo = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.payload;
      })
      .addCase(signup.pending, (state) => {
        state.signupLoading = true;
        state.signupDone = false;
        state.signupError = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.signupLoading = false;
        state.signupDone = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.signupLoading = false;
        state.signupError = action.payload;
      })
      .addDefaultCase((state) => state);
  },
});

export default userSlice.reducer;
