import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { timerActions } from "../../redux/timerSlice";
import { useTimer } from "use-timer";

export default function Timer() {
  const initialTime = useAppSelector((state) => state.timer.time);
  const { time, start, pause, reset, status } = useTimer({
    initialTime,
    timerType: "DECREMENTAL",
    endTime: 0,
  });
  const minutes = Math.floor(time / 60);
  const seconds = time - 60 * minutes;
  return (
    <>
      <h1 className="text-5xl">
        {`${minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`}{" "}
      </h1>
      <div>
        <button onClick={start}>Start</button>
        <button onClick={pause}>Pause</button>
        <button onClick={reset}>Reset</button>
      </div>
      <p>Elapsed time: {time}</p>
      {status === "RUNNING" && <p>Running...</p>}
    </>
  );
}
