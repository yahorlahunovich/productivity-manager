import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { todoActions } from "../../redux/todoSlice";
import uniqid from "uniqid";
import { tasksActions } from "../../redux/tasksSlice";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TodoForm() {
  const dispatch = useAppDispatch();
  const isAdding = useAppSelector((state) => state.tasks.isAdding);
  const currentMode = useAppSelector((state) => state.timer.currentMode);
  const inputValue = useAppSelector((state) => state.todo.currentTask);
  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim().length === 0) return;
    dispatch(todoActions.addItem({ id: uniqid() }));
    dispatch(todoActions.setCurrentTask(""));
    dispatch(tasksActions.setIsAdding());
  };
  // const onBlurHandle = () => {
  //   dispatch(tasksActions.setIsAdding());
  // };
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(todoActions.setCurrentTask(e.target.value));
  };
  return (
    <form onSubmit={submitForm} className="flex flex-col">
      <input
        type="text"
        onChange={onChangeHandler}
        value={inputValue}
        className="rounded-lg h-8 my-3 mx-1"
      />
      <button
        type="submit"
        className={`bg-white py-1 px-3 rounded-lg   ${
          currentMode === "pomodoro"
            ? "text-mainOrange"
            : currentMode === "shortBreak"
            ? "text-mainBlue"
            : currentMode === "longBreak"
            ? "text-mainGreen"
            : ""
        }`}
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </form>
  );
}
