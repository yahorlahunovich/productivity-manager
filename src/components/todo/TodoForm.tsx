import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { todoActions } from "../../redux/todoSlice";

export default function TodoForm() {
  const dispatch = useAppDispatch();
  const inputValue = useAppSelector((state) => state.todo.currentTask);

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(todoActions.addItem());
    dispatch(todoActions.setCurrentTask(""));
  };
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(todoActions.setCurrentTask(e.target.value));
  };
  return (
    <form onSubmit={submitForm}>
      <input type="text" onChange={onChangeHandler} value={inputValue} />
      <button type="submit">Add</button>
    </form>
  );
}
