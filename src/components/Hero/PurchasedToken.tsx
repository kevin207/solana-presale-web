"use client";
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
        setPurchased(result);

        setLoading(false);
      };
      getPurchasedToken();
    }
  }, [address, refetch]);

  return loading ? (
    <div className="h-[40px] w-[150px] animate-pulse rounded-sm bg-gray-300" />
  ) : (
    <div className={`${status !== "connected" && "hidden"}`}>
      <div className="text-xs text-violet-400">PURCHASED TOKEN</div>
      <div>{purchased.toLocaleString("en-US")} TMT</div>
    </div>
  );
}
