import React, { useEffect, useState } from "react";
import { useQuery, useSpaces } from "@dxos/react-client";
import { Expando } from "@dxos/react-client";

export const Pomodoro = () => {
  const [space] = useSpaces();
  const [timer] = useQuery(space, { type: "timer" });
  console.log(timer);

  const getRemainingTimeInMinutesAndSeconds = (timer: Expando) => {
    const elapsed = Date.now() - timer.startedAt;
    const remaining = timer.duration - elapsed;
    // returns the remaining time as "MM:ss"
    return new Date(remaining).toISOString().substr(14, 5);
  };

  // trigger a re-render every second
  const [now, setNow] = useState(Date.now());

  // clear the interval on unmount
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {!timer && (
        <div
          className="text-slate-900"
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
        </div>
      )}
      {timer && getRemainingTimeInMinutesAndSeconds(timer)}
    </div>
  );
};
