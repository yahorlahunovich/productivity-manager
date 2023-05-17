import React from "react";
import { useAppSelector } from "../../redux/hooks";

export default function TodoItems() {
  const todoItems = useAppSelector((state) => state.todo.todoItems);

  return (
    <ul>
      {todoItems.map((item) => (
        <li key={item.id} className="flex gap-4">
          <div>
            <input type="checkbox" />
            {item.task}
          </div>
          <div className="flex gap-4">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
