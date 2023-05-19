import React from "react";
import TodoItems from "../todo/TodoItems";
import TodoForm from "../todo/TodoForm";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { tasksActions } from "../../redux/tasksSlice";

export default function Tasks() {
  const dispatch = useAppDispatch();
  const isAdding = useAppSelector((state) => state.tasks.isAdding);
  const addTask = () => {
    dispatch(tasksActions.setIsAdding());
  };
  return (
    <div className="flex flex-col items-center justify-center mx-auto max-w-xl">
      <h1 className="text-white text-4xl">Tasks</h1>
      {isAdding ? (
        <TodoForm />
      ) : (
        <button className="bg-orange-100" onClick={addTask}>
          Add Task
        </button>
      )}
      <TodoItems />
    </div>
  );
}
