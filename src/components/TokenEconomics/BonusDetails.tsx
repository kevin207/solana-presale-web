import React from "react";
import BonusCard from "./BonusCard";

const BonusDetails = () => {
  return (
    <div className="flex flex-col gap-16">
      <div className="text-center text-4xl font-light text-white">
        Bonus Details
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center justify-center">
        <BonusCard label="PRE-SALE" percentage={25} tw_bg="bg-indigo-400" />
        <BonusCard
          label="ICO SALE-WEEK 1"
          percentage={15}
          tw_bg="bg-purple-500"
        />
        <BonusCard
          label="ICO SALE-WEEK 2"
          percentage={0}
          tw_bg="bg-violet-500"
        />
      </div>
    </div>
  );
};

export default BonusDetails;
