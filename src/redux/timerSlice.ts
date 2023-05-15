import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  time: number;
  isTimerOn: boolean;
  currentMode: "pomodoro" | "shortBreak" | "longBreak";
};

const initialState: InitialState = {
  time: 25 * 60,
  isTimerOn: false,
  currentMode: "pomodoro",
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
    setCurrentMode(
      state,
      action: PayloadAction<"pomodoro" | "shortBreak" | "longBreak">
    ) {
      state.currentMode = action.payload;
    },
  },
});

export const timerActions = timerSlice.actions;
export const timerReducer = timerSlice.reducer;
