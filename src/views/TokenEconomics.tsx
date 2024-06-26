import BonusDetails from "@/components/TokenEconomics/BonusDetails";
import EconomicsData from "@/components/TokenEconomics/EconomicsData";
import React from "react";

const TokenEconomics = () => {
  return (
    <section className="min-h-screen w-full bg-violet-800    flex flex-col items-center py-40 px-8 gap-24">
      <EconomicsData />
      <BonusDetails />

      <button className="bg-teal-400 text-white font-medium px-10 py-4 rounded-sm hover:bg-violet-400 duration-300 ease-in-out">
        Buy ICO Crypto Tokens Now
      </button>
    </section>
  );
};

export default TokenEconomics;
