"use client";
import { getTotalSupply } from "@/utils/web3";
import React, { useEffect, useState } from "react";

export default function TokenSupply() {
  const [totalSupply, setTotalSupply] = useState<number>(0);

  useEffect(() => {
    const getTokenSupply = async () => {
      const supply = await getTotalSupply();
      setTotalSupply(supply);
    };
    getTokenSupply();
  }, []);

  return (
    <div className="flex flex-row gap-4 items-center">
      <div className="text-xs text-violet-400">
        TOKEN AVAILABLE ON PRE-SALE:
      </div>
      <div className="flex flex-row text-2xl">
        {totalSupply.toLocaleString("en-Us")} <span className="ml-2">TMT</span>
      </div>
    </div>
  );
}
