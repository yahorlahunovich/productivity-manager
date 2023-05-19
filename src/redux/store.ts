import { tasksReducer } from "./tasksSlice";
import { configureStore } from "@reduxjs/toolkit";
import { timerReducer } from "./timerSlice";
import { todoReducer } from "./todoSlice";

const store = configureStore({
  reducer: { timer: timerReducer, todo: todoReducer, tasks: tasksReducer },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
