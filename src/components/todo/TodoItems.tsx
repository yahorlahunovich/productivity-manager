import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { todoActions } from "../../redux/todoSlice";

export default function TodoItems() {
  const todoItems = useAppSelector((state) => state.todo.todoItems);
  const dispatch = useAppDispatch();
  const deleteItem = (id: string) => {
    dispatch(todoActions.deleteItem(id));
  };
  const confirmTask = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (e.target.checked) {
      dispatch(todoActions.confirmTask(id));
    } else {
      dispatch(todoActions.unconfirmTask(id));
    }
  };
  const clearAllTasks = () => {
    dispatch(todoActions.clearAll());
  };
  const clearCompletedTasks = () => {
    dispatch(todoActions.clearCompletedTasks());
  };
  return (
    <>
      <ul>
        {todoItems.map((item) => (
          <li key={item.id} className="flex gap-4">
            <>
              <div>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    confirmTask(e, item.id);
                  }}
                />
                <span className={`${item.isCompleted ? "line-through" : ""}`}>
                  {item.task}
                </span>
              </div>
              <div className="flex gap-4">
                <button onClick={() => deleteItem(item.id)}>Delete</button>
              </div>
            </>
          </li>
        ))}
      </ul>
      {todoItems.length > 0 ? (
        <div>
          <button onClick={clearCompletedTasks}>Clear Completed Tasks</button>
          <button onClick={clearAllTasks}>Clear All Tasks</button>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
