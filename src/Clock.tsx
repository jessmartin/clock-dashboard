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
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: timezone,
      // disable am/pm
    };
    const formattedTime = date.toLocaleTimeString([], options);
    // drop the am/pm from the end
    return formattedTime.slice(0, -3);
  };

  return (
    <div className="clock">
      <div className="leading-none text-[20rem] text-slate-900">
        {getFormattedTime(time)}
      </div>
      {/* show the day of the week and the date */}
      <div className="text-[3rem] text-slate-900 text-center">
        {time.toLocaleDateString("en-US", { weekday: "long" })},{" "}
        {time.toLocaleDateString("en-US", { month: "long", day: "numeric" })}
      </div>
    </div>
  );
};
