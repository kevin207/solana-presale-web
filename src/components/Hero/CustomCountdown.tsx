"use client";
import React from "react";
import Countdown from "react-countdown";

interface CustomCountdownProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CustomCountdown = () => {
  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
  }: CustomCountdownProps) => {
    return (
      <div className="grid grid-cols-4 gap-8">
        <div className="flex flex-col gap-1 items-center justify-center">
          <div className="w-full lg:w-16 h-16 font-medium text-xl bg-[#6241AB] rounded-md flex items-center justify-center">
            {String(days).padStart(2, "0")}
          </div>
          <div className="text-xs text-violet-400">DAYS</div>
        </div>

        <div className="flex flex-col gap-1 items-center justify-center">
          <div className="w-full lg:w-16 h-16 font-medium text-xl bg-[#6241AB] rounded-md flex items-center justify-center">
            {String(hours).padStart(2, "0")}
          </div>
          <div className="text-xs text-violet-400">HOURS</div>
        </div>

        <div className="flex flex-col gap-1 items-center justify-center">
          <div className="w-full lg:w-16 h-16 font-medium text-xl bg-[#6241AB] rounded-md flex items-center justify-center">
            {String(minutes).padStart(2, "0")}
          </div>
          <div className="text-xs text-violet-400">MINUTES</div>
        </div>

        <div className="flex flex-col gap-1 items-center justify-center">
          <div className="w-full lg:w-16 h-16 font-medium text-xl bg-[#6241AB] rounded-md flex items-center justify-center">
            {String(seconds).padStart(2, "0")}
          </div>
          <div className="text-xs text-violet-400">SECONDS</div>
        </div>
      </div>
    );
  };

  // Use Countdown component from react-countdown
  return <Countdown date={Date.now() + 92358323} renderer={renderer} />;
};

export default CustomCountdown;
