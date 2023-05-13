import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  time: number;
};

const initialState: InitialState = {
  time: 0,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {},
});

export default timerSlice.reducer;
