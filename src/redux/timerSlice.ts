import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  initialTime: number;
  time: number;
  pomodoroTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  isTimerOn: boolean;
  currentMode: "pomodoro" | "shortBreak" | "longBreak";
  session: number;
};

const initialState: InitialState = {
  initialTime: 25 * 60,
  time: 25 * 60,
  pomodoroTime: 25 * 60,
  shortBreakTime: 5 * 60,
  longBreakTime: 15 * 60,
  isTimerOn: false,
  currentMode: "pomodoro",
  session: 0,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setTime(state, action: PayloadAction<number>) {
      state.time = action.payload;
    },
    setIsTimerOn(state, action: PayloadAction<boolean>) {
      state.isTimerOn = action.payload;
    },
    setCurrentMode(
      state,
      action: PayloadAction<"pomodoro" | "shortBreak" | "longBreak">
    ) {
      state.currentMode = action.payload;
    },
    setInitialTime(state, action: PayloadAction<number>) {
      state.initialTime = action.payload;
    },
    setSession(state) {
      state.session++;
    },
  },
});

export const timerActions = timerSlice.actions;
export const timerReducer = timerSlice.reducer;
