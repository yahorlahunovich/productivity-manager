import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { todoActions } from "../../redux/todoSlice";
import uniqid from "uniqid";
import { tasksActions } from "../../redux/tasksSlice";

export default function TodoForm() {
  const dispatch = useAppDispatch();
  const isAdding = useAppSelector((state) => state.tasks.isAdding);
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
    <form onSubmit={submitForm}>
      <input type="text" onChange={onChangeHandler} value={inputValue} />
      <button type="submit">Add</button>
    </form>
  );
}
