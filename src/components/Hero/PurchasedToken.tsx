"use client";
import { config } from "@/providers/web3-provider";
import { getUserPurchasedToken } from "@/utils/web3";
import React, { useEffect, useState } from "react";
import { Address } from "viem";
import { getChainId } from "@wagmi/core";

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
  const chainId = getChainId(config);

  useEffect(() => {
    if (address) {
      const getPurchasedToken = async () => {
        const totalPurchased = await getUserPurchasedToken(address);
        setPurchased(totalPurchased);
      };
      getPurchasedToken();
    }
  }, [address, refetch, chainId]);

  return (
    <div className={`${status !== "connected" && "hidden"}`}>
      <div className="text-xs text-violet-400">PURCHASED TOKEN</div>
      <div>{purchased.toLocaleString("en-US")} TMT</div>
    </div>
  );
}
