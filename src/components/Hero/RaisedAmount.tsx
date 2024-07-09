"use client";
import { getTotalRaised } from "@/utils/web3";
import React, { useEffect, useState } from "react";

export default function RaisedAmount({ refetch }: { refetch: boolean }) {
  const [raised, setRaised] = useState<number>(0);

  const calculatePercentage = () => {
    return Math.min((raised / 200) * 100, 100);
  };
  const percentage = calculatePercentage();

  useEffect(() => {
    const getRaisedAmount = async () => {
      const raised = await getTotalRaised();
      setRaised(raised);
    };
    getRaisedAmount();
  }, [refetch]);

  return (
    <div className="w-full my-8 relative py-2 bg-black/20 rounded-full border-white border-2 flex items-center justify-center overflow-hidden">
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
