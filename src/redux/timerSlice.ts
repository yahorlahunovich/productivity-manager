import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  time: number;
};

const initialState: InitialState = {
  time: 72
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    timeIncrement(state) {
      state.time = state.time - 1;
      console.log("increment");
    },
  },
});

export const timerActions = timerSlice.actions;
export const timerReducer = timerSlice.reducer;
