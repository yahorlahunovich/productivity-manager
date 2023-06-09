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
  const isEmpty = useAppSelector((state) => state.todo.isEmpty);
  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim().length === 0) {
      dispatch(todoActions.setIsEmpty(true));
      return;
    }
    dispatch(todoActions.addItem({ id: uniqid() }));
    dispatch(todoActions.setCurrentTask(""));
    dispatch(tasksActions.setIsAdding(false));
  };
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isEmpty === true) dispatch(todoActions.setIsEmpty(false));
    dispatch(todoActions.setCurrentTask(e.target.value));
  };
  const closeForm = () => {
    dispatch(tasksActions.setIsAdding(false));
    if (isEmpty === true) dispatch(todoActions.setIsEmpty(false));
  };
  return (
    <form
      onSubmit={submitForm}
      className="flex flex-col bg-white bg-opacity-10 rounded-lg mt-2 mb-4"
    >
      <button
        className="text-white w-8 h-8 hover:text-gray-200"
        type="button"
        onClick={closeForm}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <div className="flex flex-col content-center p-5">
        <input
          type="text"
          onChange={onChangeHandler}
          value={inputValue}
          className={`rounded-lg h-8 my-3 bg-white bg-opacity-20 text-white text-2xl p-6 ${
            isEmpty ? "border-2 border-red-600" : ""
          }`}
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
