import React, { useEffect, useState } from "react";
import { useIdentity } from "@dxos/react-client/halo";
import { Clock } from "./Clock";
import { Pomodoro } from "./Pomodoro";

export const Welcome = ({ name }: { name: string }) => {
  const isDark = document.documentElement.classList.contains("dark");
  const identity = useIdentity();
  const [timezone, setTimezone] = useState("");
  useEffect(() => {
    if (identity) {
      console.log("logged in as", identity);
    }
    const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone(localTimezone);
  }, [identity]);
  return (
    <div className="flex justify-center h-full items-center flex-col">
      {timezone && <Clock timezone={timezone} />}
      <Pomodoro />
    </div>
  );
};
