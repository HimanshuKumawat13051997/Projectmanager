import { createSlice } from "@reduxjs/toolkit";
import {
  currentUser,
  userLogin,
  userLogout,
} from "../extrafeature/authActions";

const initialState = {
  loading: false,
  userInfo: null,
  error: null,
  success: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userSet: (state, action) => {
      state.userInfo = action.payload;
      state.loading = false;
      state.error = null;
      state.success = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.userInfo = payload; // Store the userInfo from payload if needed
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(userLogout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.userInfo = null;
      })
      .addCase(userLogout.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(currentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(currentUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.userInfo = payload;
      })
      .addCase(currentUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.userInfo = null;
      });
  },
});

export const { userSet } = authSlice.actions;

export default authSlice.reducer;
