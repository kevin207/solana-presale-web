"use client";
import { getUserPurchasedToken } from "@/utils/web3";
import React, { useEffect, useState } from "react";
import { Address } from "viem";

interface PurchasedTokenProps {
  address: Address | undefined;
  refetch: boolean;
  status: "disconnected" | "connected" | "reconnecting" | "connecting";
}

export default function PurchasedToken({
  address,
  refetch,
  status,
}: PurchasedTokenProps) {
  const [purchased, setPurchased] = useState<number>(0);

  useEffect(() => {
    if (address) {
      const getPurchasedToken = async () => {
        const totalPurchased = await getUserPurchasedToken(address);
        setPurchased(totalPurchased);
      };
      getPurchasedToken();
    }
  }, [address, refetch]);

  return (
    <div className={`${status !== "connected" && "hidden"}`}>
      <div className="text-xs text-violet-400">PURCHASED TOKEN</div>
      <div>{purchased.toLocaleString("en-US")} TMT</div>
    </div>
  );
}
