import React, { useEffect, useState } from "react";
import { useQuery, useSpaces } from "@dxos/react-client";
import { Expando } from "@dxos/react-client";

export const Pomodoro = () => {
  const [space] = useSpaces();
  const [timer] = useQuery(space, { type: "timer" });

  const remainingTime = (timer: Expando) => {
    const elapsed = Date.now() - timer.startedAt;
    const remaining = timer.duration - elapsed;
    return remaining > 0 ? remaining : 0;
  };
  const remainingTimeString = (timer: Expando) => {
    return new Date(remainingTime(timer)).toISOString().substr(14, 5);
  };

  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pomodoro">
      {!timer && (
        <button
          className="button"
          onClick={() => {
            const timer = new Expando({
              startedAt: Date.now(),
              duration: 2500, //25 * 60 * 1000,
              type: "timer",
            });
            space!.db.add(timer);
          }}
        >
          Start Pomodoro
        </button>
      )}
      {timer && (
        <div className="flex justify-center flex-col">
          <div className="text-[10vh]">{remainingTimeString(timer)}</div>
          {remainingTime(timer) > 0 ? (
            <button
              className="button bg-red-400"
              onClick={() => {
                timer.duration = 0;
              }}
            >
              Stop
            </button>
          ) : (
            <button
              className="button"
              onClick={() => {
                timer.duration = 2500; //25 * 60 * 1000;
                timer.startedAt = Date.now();
              }}
            >
              Next Pomodoro
            </button>
          )}
        </div>
      )}
    </div>
  );
};
