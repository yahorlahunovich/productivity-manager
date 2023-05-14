import React, { useEffect   } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { timerActions } from "../../redux/timerSlice";
import { useTimer } from "use-timer";

export default function Timer() {
  const dispatch = useAppDispatch();
  const initTime = useAppSelector((state) => state.timer.time);
  const isTimerOn = useAppSelector((state) => state.timer.isTimerOn);
  const { time, start, pause, reset, status } = useTimer({
    initialTime: initTime,
    timerType: "DECREMENTAL",
    endTime: 0,
    onTimeOver: () => {
      audioPlay();
    },
  });
  useEffect(() => {
    console.log("time is changed");
  }, [initTime]);
  const onTimer = () => {
    if (time === initTime) audioPlay();
    start();
    dispatch(timerActions.setIsTimerOn());
  };
  const pauseTimer = () => {
    pause();
    dispatch(timerActions.setIsTimerOn());
  };
  const onPomodoro = () => {
    if (isTimerOn) pause();
    if (isTimerOn) dispatch(timerActions.setIsTimerOn());
    dispatch(timerActions.setTime(25 * 60));
    reset();
  };
  const onShortBreak = () => {
    if (isTimerOn) pause();
    if (isTimerOn) dispatch(timerActions.setIsTimerOn());
    dispatch(timerActions.setTime(5 * 60));
    reset();
  };
  function audioPlay() {
    new Audio(require("../../assets/audio/mainSound.mp3")).play();
  }
  const minutes = Math.floor(time / 60);
  const seconds = time - 60 * minutes;
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
        <button className="bg-blue-500 text-white text-4xl rounded-md p-3 px-5 hover:bg-blue-600 m-2">
          Long Break
        </button>
      </div>
      <h1 className="text-8xl">
        {`${minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`}{" "}
      </h1>
      <div className="flex flex-row items-center">
        <div>
          {!isTimerOn ? (
            <button
              className="bg-blue-500 bg-opacity-50 text-white text-4xl rounded-md p-3 px-5 hover:bg-blue-600 m-2"
              onClick={onTimer}
            >
              Start
            </button>
          ) : (
            <button
              className="bg-blue-500 text-white text-4xl  rounded-md p-3 px-5 hover:bg-blue-600 m-2"
              onClick={pauseTimer}
            >
              Pause
            </button>
          )}
        </div>
        <div>
          <button
            className=" bg-blue-500 text-white rounded-md p-3 px-5 hover:bg-blue-600 m-2"
            onClick={reset}
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
      <p>Elapsed time: {time}</p>
      {status === "RUNNING" && <p>Running...</p>}
      <audio src="../../as" />
    </div>
  );
}
