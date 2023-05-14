import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  time: number;
  isTimerOn: boolean;
};

const initialState: InitialState = {
  time: 25*60,
  isTimerOn: false,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setTime(state, action: PayloadAction<number>) {
      console.log("click");
      state.time = action.payload;
      console.log(`state time =${state.time}`);
    },
    setIsTimerOn(state) {
      state.isTimerOn = !state.isTimerOn;
    },
  },
});

export const timerActions = timerSlice.actions;
export const timerReducer = timerSlice.reducer;
