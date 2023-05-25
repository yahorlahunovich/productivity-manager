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
  initialTime: 5,
  time: 5,
  pomodoroTime: 5,
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
      sessionStorage.setItem("session", state.session.toString());
    },
    setSessionStorage(state, action: PayloadAction<number>) {
      if (isNaN(action.payload)) {
        state.session = 0;
      } else {
        state.session = action.payload;
      }
    },
  },
});

export const timerActions = timerSlice.actions;
export const timerReducer = timerSlice.reducer;
