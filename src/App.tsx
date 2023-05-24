import React from "react";
import Timer from "./components/timer/Timer";
import { useAppSelector } from "./redux/hooks";
import Todo from "./components/todo/Todo";
import Tasks from "./components/tasks/Tasks";

function App() {
  const currentMode = useAppSelector((state) => state.timer.currentMode);
  return (
    <div
      className={`min-h-screen p-10 flex flex-col justify-normal items-center ${
        currentMode === "pomodoro"
          ? "bg-mainOrange"
          : currentMode === "shortBreak"
          ? "bg-mainBlue"
          : currentMode === "longBreak"
          ? "bg-mainGreen"
          : ""
      }`}
    >
      <Timer />
      <Tasks />
    </div>
  );
}

export default App;
