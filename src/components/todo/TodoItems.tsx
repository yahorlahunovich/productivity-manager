import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { todoActions } from "../../redux/todoSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


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

  useEffect(() => {
    const initItems = localStorage.getItem("items");
    const finalItems = JSON.parse(initItems || "{}");
    dispatch(todoActions.setItems(finalItems));
  }, []);
  return (
    <>
      <ul>
        {todoItems.map((item) => (
          <li
            key={item.id}
            className={`flex flex-row items-center justify-between gap-4 text-2xl bg-white bg-opacity-20 text-white py-3 px-5 rounded-xl mb-2 ${
              item.isCompleted ? "bg-opacity-40" : ""
            }`}
          >
            <>
              <div className="flex flex-row items-center">
                <div className="round ">
                  <input
                    type="checkbox"
                    id="checkbox"
                    className="mr-5"
                    onChange={(e) => {
                      confirmTask(e, item.id);
                    }}
                    checked={true ? item.isCompleted : false}
                  />
                  <label htmlFor="checkbox"></label>
                </div>

                <p
                  className={`break-all ${
                    item.isCompleted ? "line-through" : ""
                  }`}
                >
                  {item.task}
                </p>
              </div>
              <div className="flex gap-4">
                <button onClick={() => deleteItem(item.id)}>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="hover:text-gray-200"
                  />
                </button>
              </div>
            </>
          </li>
        ))}
      </ul>
      {todoItems.length > 0 ? (
        <div className="text-white flex flex-row justify-between gap-2">
          <button onClick={clearCompletedTasks} className="hover:text-gray-200">
            Clear Completed Tasks
          </button>
          <button onClick={clearAllTasks} className="hover:text-gray-200">
            Clear All Tasks
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
