import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface TodoItem {
  task: string;
  id: string;
  isCompleted: boolean;
}

type InitialState = {
  todoItems: TodoItem[];
  currentTask: string;
};

const initialState: InitialState = {
  todoItems: [],
  currentTask: "",
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setCurrentTask(state, action: PayloadAction<string>) {
      state.currentTask = action.payload;
    },
    addItem(state, action: PayloadAction<{ id: string }>) {
      state.todoItems = [
        {
          task: state.currentTask,
          id: action.payload.id,
          isCompleted: false,
        },
        ...state.todoItems,
      ];
    },
    deleteItem(state, action: PayloadAction<string>) {
      state.todoItems = state.todoItems.filter(
        (item) => item.id !== action.payload
      );
    },
    confirmTask(state, action: PayloadAction<string>) {
      let index: number = state.todoItems.findIndex(
        (item) => item.id === action.payload
      );
      state.todoItems[index].isCompleted = true;
    },
    unconfirmTask(state, action: PayloadAction<string>) {
      let index: number = state.todoItems.findIndex(
        (item) => item.id === action.payload
      );
      state.todoItems[index].isCompleted = false;
    },
  },
});

export const todoActions = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
