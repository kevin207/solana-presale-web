import React from "react";
import EconomicsCard from "./EconomicsCard";
import { economicsCardData } from "@/constants/common";

const EconomicsData = () => {
  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="text-center text-4xl font-light text-white leading-snug">
          ICO Crypto <br /> Token Economics
        </div>
        <div className="text-center text-lg font-light text-violet-300 w-[80%] lg:2-[60%] mx-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
          dolores dicta temporibus soluta rerum ea aspernatur quam, consectetur
          cumque sint reprehenderit suscipit expedita earum iste, eaque id
          inventore consequuntur nam!
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-12">
        {economicsCardData.map((card, index) => (
          <EconomicsCard key={index} amount={card.amount} title={card.title} />
        ))}
      </div>
    </>
  );
};

export default EconomicsData;
