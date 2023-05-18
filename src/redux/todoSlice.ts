import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

interface TodoItem {
  task: string;
  id: string;
}

type InitialState = {
  todoItems: TodoItem[];
  currentTask: string;
  isEditing: boolean;
  editingTask: string;
};

const initialState: InitialState = {
  todoItems: [],
  currentTask: "",
  isEditing: false,
  editingTask: "",
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
        },
        ...state.todoItems,
      ];
    },
    deleteItem(state, action: PayloadAction<string>) {
      state.todoItems = state.todoItems.filter(
        (item) => item.id !== action.payload
      );
    },
    editItem(state, action: PayloadAction<string>) {
      state.isEditing = true;
      let index = state.todoItems.findIndex(
        (item) => item.id === action.payload
      );
      console.log((state.editingTask = state.todoItems[index].task));
    },
    confirmTask(state, action: PayloadAction<string>) {},
  },
});

export const todoActions = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
