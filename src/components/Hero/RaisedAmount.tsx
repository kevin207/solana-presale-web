"use client";
import { getTotalRaised } from "@/utils/web3";
import React, { useEffect, useState } from "react";
import { config } from "@/providers/web3-provider";
import { getChainId } from "@wagmi/core";

export default function RaisedAmount({ refetch }: { refetch: boolean }) {
  const [raised, setRaised] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const chainId = getChainId(config);

  const calculatePercentage = () => {
    return Math.min((raised / 1000) * 100, 100);
  };
  const percentage = calculatePercentage();

  useEffect(() => {
    const getRaisedAmount = async () => {
      setLoading(true);
      const raised = await getTotalRaised();
      setRaised(raised);
      setLoading(false);
    };
    getRaisedAmount();
  }, [refetch, chainId]);

  return loading ? (
    <div className="my-8 h-[50px] animate-pulse w-full rounded-full bg-gray-400" />
  ) : (
    <div className="w-full my-8 relative h-[50px] bg-black/20 rounded-full border-white border-2 flex items-center justify-center overflow-hidden">
      <div className="text-3xl text-white z-20 flex items-center justify-center">
        ${raised.toLocaleString("en-US")}{" "}
        <span className="text-xl ml-2"> raised</span>
      </div>

      <div
        className="absolute left-0 h-full z-10 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
