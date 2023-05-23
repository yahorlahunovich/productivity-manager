import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
    setIsAdding(state, action: PayloadAction<boolean>) {
      state.isAdding = action.payload;
    },
  },
});

export const tasksActions = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
