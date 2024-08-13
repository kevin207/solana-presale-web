"use client";
import { getCurrentPrice } from "@/utils/web3";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function TokenPriceAndChain({}) {
  const [price, setPrice] = useState<number>(0);

  // useEffect(() => {
  //   const getTokenPrice = async () => {
  //     const price = await getCurrentPrice();
  //     setPrice(price);
  //   };
  //   getTokenPrice();
  // }, [chainId]);

  // useEffect(() => {
  //   setSelectedChain(chainId);
  // }, [chainId]);

  return (
    <div className="flex flex-row lg:gap-24 mt-10 justify-between xl:justify-normal items-center">
      <div className="space-y-2">
        <div className="text-xs text-violet-400">TOKEN PRICE:</div>
        <div className="text-2xl text-white">
          1 TMT = ${price.toLocaleString("en-Us")}
        </div>
      </div>
    </div>
  );
}
