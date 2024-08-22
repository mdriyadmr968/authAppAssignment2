import {
  AppSliceInitialState,
  User,
  walletAddress,
} from "../../src/misc/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const appSliceInitialState: AppSliceInitialState = {
  userDetails: {},
  isLoggedinUsingEmailPass: false,
 
};

const appSlice = createSlice({
  name: "app",
  initialState: appSliceInitialState,
  reducers: {
   
    updateUsersDetails(
      state: AppSliceInitialState,
      action: PayloadAction<string>
    ) {
      state.userDetails = action.payload;
    },
    updateLoginUsingEmailPass(
      state: AppSliceInitialState,
      action: PayloadAction<string>
    ) {
      state.isLoggedinUsingEmailPass = action.payload;
    },
   
  },
});

export const appActions = appSlice.actions;
export const appReducer = appSlice.reducer;
