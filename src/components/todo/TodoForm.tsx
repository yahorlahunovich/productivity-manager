import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { todoActions } from "../../redux/todoSlice";
import uniqid from "uniqid";
import { tasksActions } from "../../redux/tasksSlice";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TodoForm() {
  const dispatch = useAppDispatch();
  const currentMode = useAppSelector((state) => state.timer.currentMode);
  const inputValue = useAppSelector((state) => state.todo.currentTask);
  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim().length === 0) return;
    dispatch(todoActions.addItem({ id: uniqid() }));
    dispatch(todoActions.setCurrentTask(""));
    dispatch(tasksActions.setIsAdding(false));
  };
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(todoActions.setCurrentTask(e.target.value));
  };
  const closeForm = () => {
    dispatch(tasksActions.setIsAdding(false));
  };
  return (
    <form
      onSubmit={submitForm}
      contentEditable
      className="flex flex-col bg-white bg-opacity-10 rounded-lg mt-2 mb-4"
    >
      <button
        className="text-white w-8 h-8 hover:text-gray-200"
        onClick={closeForm}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <div className="flex flex-col p-5">
        <input
          type="text"
          onChange={onChangeHandler}
          value={inputValue}
          className="rounded-lg h-8 my-3 mx-1 bg-white bg-opacity-20 text-white text-2xl p-6 font-semibold"
          autoFocus
        />
        <button
          type="submit"
          className={`bg-white py-2 rounded-lg text-2xl mb-10 ${
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
      </div>
    </form>
  );
}
