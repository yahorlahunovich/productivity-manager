import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface TodoItem {
  task: string;
  id: number;
}

type InitialState = {
  todoItems: TodoItem[];
  currentTask: string;
};

const initialState: InitialState = {
  todoItems: [
    {
      task: "dasdsa",
      id: 2,
    },
  ],
  currentTask: "",
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setCurrentTask(state, action: PayloadAction<string>) {
      state.currentTask = action.payload;
    },
    addItem(state) {
      state.todoItems.unshift({
        task: state.currentTask,
        id: 1,
      });
    },
  },
});

export const todoActions = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
