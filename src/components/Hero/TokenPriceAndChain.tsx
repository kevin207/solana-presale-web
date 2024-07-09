"use client";
import { getCurrentPrice } from "@/utils/web3";
import React, { useEffect, useState } from "react";
import { FaEthereum } from "react-icons/fa";

export default function TokenPriceAndChain() {
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    const getTokenPrice = async () => {
      const price = await getCurrentPrice();
      setPrice(price);
    };
    getTokenPrice();
  }, []);

  return (
    <div className="flex flex-row lg:gap-24 mt-12 justify-between lg:justify-normal">
      <div className="space-y-2">
        <div className="text-xs text-violet-400">TOKEN PRICE:</div>
        <div className="text-2xl text-white">
          1 TMT = ${price.toLocaleString("en-Us")}
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-xs text-violet-400">WE ACCEPT:</div>
        <div className="flex flex-row gap-1 items-center text-2xl">
          <FaEthereum />
          <div className="text-white">ETH</div>
        </div>
      </div>
    </div>
  );
}
