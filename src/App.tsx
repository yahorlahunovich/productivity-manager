import React from "react";
import Timer from "./components/timer/Timer";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { useAppSelector } from "./redux/hooks";

function App() {
  const currentMode = useAppSelector((state) => state.timer.currentMode);
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
      <Timer />
      <Footer />
    </div>
  );
}

export default App;
