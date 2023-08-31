import React, { useEffect, useState } from "react";
import { Expando, useQuery, useSpace } from "@dxos/react-client/echo";
import { ShellProvider } from "@dxos/react-shell";

export const Pomodoro = () => {
  const space = useSpace();
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
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <ShellProvider space={space}>
      <div className="pomodoro">
        {!timer && (
          <button
            className="button"
            onClick={() => {
              const timer = new Expando({
                startedAt: Date.now(),
                duration: 25 * 60 * 1000,
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
            <div className="text-[5rem]">{remainingTimeString(timer)}</div>
            {remainingTime(timer) > 0 ? (
              <button
                className="cancel-button"
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
                  timer.duration = 25 * 60 * 1000;
                  timer.startedAt = Date.now();
                }}
              >
                Next Pomodoro
              </button>
            )}
          </div>
        )}
      </div>
    </ShellProvider>
  );
};
