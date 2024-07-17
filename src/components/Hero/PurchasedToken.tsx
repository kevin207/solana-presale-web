"use client";
import { getCurrentChainPurchasedToken } from "@/utils/web3";
import React, { useEffect, useState } from "react";
import { Address } from "viem";

interface PurchasedTokenProps {
  address: Address | undefined;
  refetch: boolean;
  status: "disconnected" | "connected" | "reconnecting" | "connecting";
  chainId: number;
}

export default function PurchasedToken({
  address,
  refetch,
  status,
  chainId,
}: PurchasedTokenProps) {
  const [currentPurchased, setCurrentPurchased] = useState<number>(0);
  const [totalPurchased, setTotalPurchased] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (address) {
      const getPurchasedToken = async () => {
        setLoading(true);
        const res = await fetch(`/api/token-purchased?address=${address}`, {
          cache: "no-cache",
          method: "GET",
        });
        const result = await res.json();
        setTotalPurchased(result);
        setLoading(false);
      };

      getPurchasedToken();
    }
  }, [address, refetch]);

  useEffect(() => {
    if (address) {
      const getActiveChainPurchasedToken = async () => {
        setLoading(true);
        const currentPurchased = await getCurrentChainPurchasedToken(address);
        setCurrentPurchased(currentPurchased);
        setLoading(false);
      };
      getActiveChainPurchasedToken();
    }
  }, [address, chainId]);

  return loading ? (
    <div className="h-[45px] w-[150px] animate-pulse rounded-sm bg-gray-300" />
  ) : (
    <div className={`${status !== "connected" && "hidden"} `}>
      <div className="text-xs text-violet-400">PURCHASED TOKEN (Current)</div>
      <div className="flex items-center">
        {totalPurchased.toLocaleString("en-US")} TMT
        <span className="text-xs ml-1">
          ({currentPurchased.toLocaleString("en-US")})
        </span>
      </div>
    </div>
  );
}
