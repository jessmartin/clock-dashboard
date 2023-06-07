import React, { useEffect, useState } from "react";

interface ClockProps {
  timezone: string;
}

export const Clock: React.FC<ClockProps> = ({ timezone }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getFormattedTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: timezone,
    };
    return date.toLocaleTimeString([], options);
  };

  return (
    <div className="clock">
      <div className="leading-none text-[30vw] text-slate-900">
        {getFormattedTime(time)}
      </div>
    </div>
  );
};
