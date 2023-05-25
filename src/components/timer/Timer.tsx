import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { timerActions } from "../../redux/timerSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";

export default function Timer() {
  const dispatch = useAppDispatch();
  const session = useAppSelector((state) => state.timer.session);
  const currentMode = useAppSelector((state) => state.timer.currentMode);
  const isTimerOn = useAppSelector((state) => state.timer.isTimerOn);
  const time = useAppSelector((state) => state.timer.time);
  const initialTime = useAppSelector((state) => state.timer.initialTime);
  const pomodoroTime = useAppSelector((state) => state.timer.pomodoroTime);
  const shortBreakTime = useAppSelector((state) => state.timer.shortBreakTime);
  const longBreakTime = useAppSelector((state) => state.timer.longBreakTime);
  const titleName = currentMode === "pomodoro" ? "focus!" : "relax!";
  useEffect(() => {
    document.title = `${minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    } - ${titleName}`;
  }, [time, titleName]);
  const toggleTimer = () => {
    dispatch(timerActions.setIsTimerOn(!isTimerOn));
    audioPlay();
  };
  const resetTimer = () => {
    dispatch(timerActions.setTime(initialTime));
    dispatch(timerActions.setIsTimerOn(false));
  };
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  const getTime = () => {
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };
  const onPomodoro = () => {
    dispatch(timerActions.setTime(pomodoroTime));
    dispatch(timerActions.setInitialTime(pomodoroTime));
    dispatch(timerActions.setIsTimerOn(false));
    dispatch(timerActions.setCurrentMode("pomodoro"));
  };
  const onShortBreak = () => {
    dispatch(timerActions.setTime(shortBreakTime));
    dispatch(timerActions.setInitialTime(shortBreakTime));
    dispatch(timerActions.setIsTimerOn(false));
    dispatch(timerActions.setCurrentMode("shortBreak"));
  };
  const onLongBreak = () => {
    dispatch(timerActions.setTime(longBreakTime));
    dispatch(timerActions.setInitialTime(longBreakTime));
    dispatch(timerActions.setIsTimerOn(false));
    dispatch(timerActions.setCurrentMode("longBreak"));
  };
  function audioPlay() {
    new Audio(require("../../assets/audio/mainSound.mp3")).play();
  }
  useEffect(() => {
    if (time > 0 && isTimerOn) {
      const interval = setInterval(() => {
        dispatch(timerActions.setTime(time - 1));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [time, isTimerOn, dispatch]);
  useEffect(() => {
    if (time === 0) {
      audioPlay();
      if (initialTime === pomodoroTime) {
        dispatch(timerActions.setSession());
      }
      dispatch(timerActions.setIsTimerOn(false));
      if (session === 0) onShortBreak();
      else if (currentMode === "pomodoro" && session % 2 !== 0) {
        onShortBreak();
      } else if (currentMode === "pomodoro" && session % 2 === 0) {
        onLongBreak();
      } else if (currentMode === "shortBreak" || currentMode === "longBreak") {
        onPomodoro();
      }
    }
  }, [time, dispatch]);
  useEffect(() => {
    const initSession = sessionStorage.getItem("session");
    const finalSession = parseInt(initSession || "{}");
    dispatch(timerActions.setSessionStorage(finalSession));
  }, []);
  useEffect(() => {
    const time = sessionStorage.getItem("time");
    const initialTime = sessionStorage.getItem("initialTime");
    const currentMode = sessionStorage.getItem("currentMode");
    const finalTime = parseInt(time || "{}");
    const finalInitialTime = parseInt(initialTime || "{}");
    dispatch(timerActions.setTime(finalTime));
    dispatch(timerActions.setCurrentMode(currentMode || "{}"));
    dispatch(timerActions.setInitialTime(finalInitialTime));
  }, []);
  return (
    <div className="container flex flex-col items-center max-w-2xl mx-auto mb-5 p-5 rounded-3xl bg-white bg-opacity-20">
      <div className="flex sm:flex-row flex-col mb-5 text-white text-lg">
        <button
          className={`px-2 ${
            currentMode === "pomodoro" ? "font-bold text-xl" : ""
          }`}
          onClick={onPomodoro}
        >
          Arancioro
        </button>
        <span className="sm:inline-block hidden">|</span>
        <button
          className={`px-2 ${
            currentMode === "shortBreak" ? "font-bold text-xl" : ""
          }`}
          onClick={onShortBreak}
        >
          Short Break
        </button>
        <span className="sm:inline-block hidden">|</span>
        <button
          className={`px-2 ${
            currentMode === "longBreak" ? "font-bold text-xl" : ""
          }`}
          onClick={onLongBreak}
        >
          Long Break
        </button>
      </div>
      <h1 className="text-8xl text-white font-bold">{getTime()}</h1>
      <div className="flex sm:flex-row flex-col items-center">
        <div>
          <button
            className={`animationBut h-20 ${
              currentMode === "pomodoro"
                ? "bg-mainOrange"
                : currentMode === "shortBreak"
                ? "bg-mainBlue"
                : currentMode === "longBreak"
                ? "bg-mainGreen"
                : ""
            }`}
            onClick={toggleTimer}
          >
            {!isTimerOn ? "Start" : "Pause"}
          </button>
        </div>
        <div>
          <button
            className={`animationBut h-20 ${
              currentMode === "pomodoro"
                ? "bg-mainOrange"
                : currentMode === "shortBreak"
                ? "bg-mainBlue"
                : currentMode === "longBreak"
                ? "bg-mainGreen"
                : ""
            }`}
            onClick={resetTimer}
          >
            <FontAwesomeIcon icon={faRotateRight} size="xl" />
          </button>
        </div>
      </div>
      <div className="mt-5 text-white text-xl font-bolder">
        <span>Session: {session}</span>
      </div>
    </div>
  );
}
