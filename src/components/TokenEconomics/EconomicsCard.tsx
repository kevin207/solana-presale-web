import React from "react";

interface EconomicsCardProps {
  amount: string;
  title: string;
}

const EconomicsCard = ({ amount, title }: EconomicsCardProps) => {
  return (
    <div className="bg-white/10 py-8 px-16 justify-center items-center rounded-md flex flex-col gap-5 ease-in-out duration-300 cursor-pointer hover:-translate-y-2">
      <div className="text-teal-400 text-xl md:text-3xl lg:text-4xl font-light text-center">
        {amount}
      </div>
      <div className="text-white text-sm text-center">{title}</div>
    </div>
  );
};

export default EconomicsCard;
