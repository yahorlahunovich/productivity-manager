import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { timerActions } from "../../redux/timerSlice";

export default function Timer() {
  const dispatch = useAppDispatch();
  const currentMode = useAppSelector((state) => state.timer.currentMode);
  const isTimerOn = useAppSelector((state) => state.timer.isTimerOn);
  const time = useAppSelector((state) => state.timer.time);
  const initialTime = useAppSelector((state) => state.timer.initialTime);
  const pomodoroTime = useAppSelector((state) => state.timer.pomodoroTime);
  const shortBreakTime = useAppSelector((state) => state.timer.shortBreakTime);
  const longBreakTime = useAppSelector((state) => state.timer.longBreakTime);
  const titleName = currentMode === "pomodoro" ? "focus!" : "relax!";
  // useEffect(() => {
  //   document.title = `${minutes}:${
  //     seconds < 10 ? `0${seconds}` : seconds
  //   } - ${titleName}`;
  // }, [time, titleName]);
  // const onTimer = () => {
  //   if (time === initTime) audioPlay();
  //   start();
  //   dispatch(timerActions.setIsTimerOn());
  // };
  const toggleTimer = () => {
    dispatch(timerActions.setIsTimerOn(!isTimerOn));
  };
  const resetTimer = () => {
    dispatch(timerActions.setTime(initialTime));
    dispatch(timerActions.setIsTimerOn(false));
  };
  const getTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };
  const onPomodoro = () => {
    dispatch(timerActions.setTime(pomodoroTime));
    dispatch(timerActions.setInitialTime(pomodoroTime));
    dispatch(timerActions.setIsTimerOn(false));
    // setInitialTime(workTime);
  };
  const onShortBreak = () => {
    dispatch(timerActions.setTime(shortBreakTime));
    dispatch(timerActions.setInitialTime(shortBreakTime));
    dispatch(timerActions.setIsTimerOn(false));
  };
  const onLongBreak = () => {
    dispatch(timerActions.setTime(longBreakTime));
    dispatch(timerActions.setInitialTime(longBreakTime));
    dispatch(timerActions.setIsTimerOn(false));
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
  }, [time, isTimerOn]);
  return (
    <div className="container flex flex-col items-center">
      <div>
        <button
          className="bg-blue-500 text-white text-4xl rounded-md p-3 px-5 hover:bg-blue-600 m-2"
          onClick={onPomodoro}
        >
          Pomodoro
        </button>
        <button
          data-time="25"
          className="bg-blue-500 text-white text-4xl rounded-md p-3 px-5 hover:bg-blue-600 m-2"
          onClick={onShortBreak}
        >
          Short Break
        </button>
        <button
          className="bg-blue-500 text-white text-4xl rounded-md p-3 px-5 hover:bg-blue-600 m-2"
          onClick={onLongBreak}
        >
          Long Break
        </button>
      </div>
      <h1 className="text-8xl">{getTime()}</h1>
      <div className="flex flex-row items-center">
        <div>
          {!isTimerOn ? (
            <button
              className="bg-blue-500 bg-opacity-50 text-white text-4xl rounded-md p-3 px-5 hover:bg-blue-600 m-2"
              onClick={toggleTimer}
            >
              Start
            </button>
          ) : (
            <button
              className="bg-blue-500 text-white text-4xl  rounded-md p-3 px-5 hover:bg-blue-600 m-2"
              onClick={toggleTimer}
            >
              Pause
            </button>
          )}
        </div>
        <div>
          <button
            className=" bg-blue-500 text-white rounded-md p-3 px-5 hover:bg-blue-600 m-2"
            onClick={resetTimer}
          >
            <svg
              width="45px"
              height="45px"
              viewBox="0 0 21 21"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
              stroke="#000000"
              strokeWidth="1.722"
              transform="rotate(0)"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g
                  fill="none"
                  fillRule="evenodd"
                  stroke="#ffffff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  transform="matrix(0 1 1 0 2.5 2.5)"
                >
                  {" "}
                  <path d="m3.98652376 1.07807068c-2.38377179 1.38514556-3.98652376 3.96636605-3.98652376 6.92192932 0 4.418278 3.581722 8 8 8s8-3.581722 8-8-3.581722-8-8-8"></path>{" "}
                  <path d="m4 1v4h-4" transform="matrix(1 0 0 -1 0 6)"></path>{" "}
                </g>{" "}
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
