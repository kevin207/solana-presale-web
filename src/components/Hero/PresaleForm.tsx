import React from "react";
import CustomCountdown from "./CustomCountdown";
import { FaEthereum } from "react-icons/fa";

const PresaleForm = () => {
  return (
    <div className="h-fit bg-violet-900 rounded-md w-full font-light">
      <div className="p-8">
        <div className="text-center text-2xl mb-5 font-light">
          Pre-sale Ends In
        </div>
        <CustomCountdown />

        <div className="flex flex-row lg:gap-24 mt-12 justify-between lg:justify-normal">
          <div className="space-y-2">
            <div className="text-xs text-violet-400">TOKEN PRICE:</div>
            <div className="text-2xl text-white">1 TMX=$0.02</div>
          </div>

          <div className="space-y-2">
            <div className="text-xs text-violet-400">WE ACCEPT:</div>
            <div className="flex flex-row gap-1 items-center text-2xl">
              <FaEthereum />
              <div className="text-white">ETH</div>
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-4 mt-12 items-center">
          <div className="text-xs text-violet-400">
            TOKEN AVAILABLE ON PRE-SALE:
          </div>
          <div className="flex flex-row text-2xl">
            90,000,000 <span className="ml-2">TMX</span>
          </div>
        </div>
      </div>

      <div className="w-full h-[1px] bg-violet-500" />

      <div className="flex flex-row gap-6 p-8 items-center">
        <button className="py-4 px-6 text-xs font-medium text-white bg-main rounded-sm hover:bg-secondary duration-500 ease-in-out">
          Buy Tokens With 45% Off
        </button>
        <div>
          <div className="text-xs text-violet-400">MINUMUM PURCHASE</div>
          <div>10,000 TMX</div>
        </div>
      </div>
    </div>
  );
};

export default PresaleForm;
