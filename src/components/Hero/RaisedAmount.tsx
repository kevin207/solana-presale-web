"use client";
import React, { useEffect, useState } from "react";

export default function RaisedAmount({ refetch }: { refetch: boolean }) {
  const [raised, setRaised] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const calculatePercentage = () => {
    return Math.min((raised / 1000) * 100, 100);
  };
  const percentage = calculatePercentage();

  // useEffect(() => {
  //   const getRaisedAmount = async () => {
  //     setLoading(true);

  //     const res = await fetch("/api/raised-amount", {
  //       cache: "no-cache",
  //       method: "GET",
  //     });
  //     const result = await res.json();
  //     setRaised(result);

  //     setLoading(false);
  //   };
  //   getRaisedAmount();
  // }, [refetch]);

  return loading ? (
    <div className="my-8 h-[50px] animate-pulse w-full rounded-full bg-gray-300" />
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
