import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  isAdding: boolean;
};

const initialState: InitialState = {
  isAdding: false,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setIsAdding(state) {
      state.isAdding = !state.isAdding;
    },
  },
});

export const tasksActions = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
