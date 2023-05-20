import React from "react";
import TodoItems from "../todo/TodoItems";
import TodoForm from "../todo/TodoForm";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { tasksActions } from "../../redux/tasksSlice";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Tasks() {
  const dispatch = useAppDispatch();
  const isAdding = useAppSelector((state) => state.tasks.isAdding);
  const addTask = () => {
    dispatch(tasksActions.setIsAdding());
  };
  return (
    <div className="container flex flex-col justify-center mx-auto max-w-xl p-5 text-center">
      <h1 className="text-white text-4xl mb-2">Tasks</h1>
      {isAdding ? (
        <TodoForm />
      ) : (
        <button className="text-white py-4 px-10 bg-white bg-opacity-20 hover:bg-opacity-30 mb-5 mt-1" onClick={addTask}>
          <FontAwesomeIcon icon={faPlus} size="2xl" />
        </button>
      )}
      <TodoItems />
    </div>
  );
}
