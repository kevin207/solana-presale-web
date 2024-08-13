"use client";
import { getTokenSupply } from "@/utils/solana";
import { useConnection } from "@solana/wallet-adapter-react";
import React, { useEffect, useState } from "react";

export default function TokenSupply() {
  const [totalSupply, setTotalSupply] = useState<number>(0);
  const { connection } = useConnection();

  useEffect(() => {
    const getSupply = async () => {
      const supply = await getTokenSupply(connection);
      setTotalSupply(supply);
    };
    getSupply();
  }, []);

  return (
    <div className="flex flex-row gap-4 items-center">
      <div className="text-xs text-violet-400">TOKEN SUPPLY ON PRE-SALE:</div>
      <div className="flex flex-row text-2xl">
        {totalSupply.toLocaleString("en-Us")} <span className="ml-2">TMT</span>
      </div>
    </div>
  );
}
