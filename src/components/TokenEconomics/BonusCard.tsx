import React from "react";

interface BonusCardProps {
  percentage: number;
  label: string;
  tw_bg: string;
}

const BonusCard = ({ percentage, label, tw_bg }: BonusCardProps) => {
  return (
    <div
      className={`flex flex-col gap-7 items-center justify-center px-16 py-12 roudned-sm ease-in-out duration-300 cursor-pointer hover:-translate-y-2 ${tw_bg}`}
    >
      <div className="bg-violet-800 rounded-full py-1 px-7 text-teal-300 text-sm font-light">
        {label}
      </div>
      <div className="text-white text-6xl font-light">{percentage}%</div>
      <div className="text-violet-200 text-sm">BONUS</div>
    </div>
  );
};

export default BonusCard;
