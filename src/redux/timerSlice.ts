import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  initialTime: number;
  time: number;
  pomodoroTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  isTimerOn: boolean;
  currentMode: string;
  session: number;
};

interface InitialTime {
  initialTime: number;
  time: number;
  currentMode: string;
}

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
      if (isNaN(action.payload)) {
        state.time = 25 * 60;
      } else {
        state.time = action.payload;
      }
      sessionStorage.setItem("time", state.time.toString());
    },
    setIsTimerOn(state, action: PayloadAction<boolean>) {
      state.isTimerOn = action.payload;
    },
    setCurrentMode(state, action: PayloadAction<string>) {
      if (action.payload === null) {
        state.currentMode = "pomodoro";
      } else {
        state.currentMode = action.payload;
      }
      sessionStorage.setItem("currentMode", state.currentMode);
    },
    setInitialTime(state, action: PayloadAction<number>) {
      if (isNaN(action.payload)) {
        state.initialTime = 25 * 60;
      } else {
        state.initialTime = action.payload;
      }
      sessionStorage.setItem("initialTime", state.initialTime.toString());
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
    setSessionTime(state, action: PayloadAction<InitialTime>) {
      state.currentMode = action.payload.currentMode;
      state.initialTime = action.payload.initialTime;
      state.time = action.payload.time;
    },
  },
});

export const timerActions = timerSlice.actions;
export const timerReducer = timerSlice.reducer;
