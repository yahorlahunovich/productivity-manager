import React from "react";
import Timer from "./components/timer/Timer";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { timerActions } from "./redux/timerSlice";

function App() {
  const dispatch = useAppDispatch();
  const currentMode = useAppSelector((state) => state.timer.currentMode);
  function onBackgroundChange(mode: "pomodoro" | "shortBreak" | "longBreak") {
    dispatch(timerActions.setCurrentMode(mode));
  }

  return (
    <div
      className={`min-h-screen ${
        currentMode === "pomodoro"
          ? "bg-mainOrange"
          : currentMode === "shortBreak"
          ? "bg-mainBlue"
          : currentMode === "longBreak"
          ? "bg-mainGreen"
          : ""
      }`}
    >
      <Navbar />
      <Timer onBackgroundChange={onBackgroundChange} />
      <Footer />
    </div>
  );
}

export default App;
