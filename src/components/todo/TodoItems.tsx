import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { todoActions } from "../../redux/todoSlice";

export default function TodoItems() {
  const todoItems = useAppSelector((state) => state.todo.todoItems);
  const isEditing = useAppSelector((state) => state.todo.isEditing);
  const editingTask = useAppSelector((state) => state.todo.editingTask);
  const dispatch = useAppDispatch();
  const deleteItem = (id: string) => {
    dispatch(todoActions.deleteItem(id));
  };
  const editItem = (id: string) => {
    dispatch(todoActions.editItem(id));
  };
  const setEditItem = (e: React.FormEvent) => {};
  const confirmTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
    }
  };
  return (
    <ul>
      {todoItems.map((item) => (
        <li key={item.id} className="flex gap-4">
          {!isEditing ? (
            <>
              <div>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    confirmTask(e);
                  }}
                />
                {item.task}
              </div>
              <div className="flex gap-4">
                <button onClick={() => editItem(item.id)}>Edit</button>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
              </div>
            </>
          ) : (
            <div>
              <input type="text" value={editingTask} onChange={setEditItem} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
