import {createSlice} from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";

const initialState = {
  confirm: false,
};

export const confirmUserSlice = createSlice({
  name: "confirmUserReducer",
  initialState,
  reducers: {
    isUserConfirming: (state, action) => {
      state.confirm = action.payload;
    },
  },
});

export const { isUserConfirming } = confirmUserSlice.actions;
