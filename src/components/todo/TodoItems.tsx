import React from "react";
import { useAppSelector } from "../../redux/hooks";

export default function TodoItems() {
  const todoItems = useAppSelector((state) => state.todo.todoItems);

  return (
    <ul>
      {todoItems.map((item) => (
        <li key={item.id}>{item.task}</li>
      ))}
    </ul>
  );
}
