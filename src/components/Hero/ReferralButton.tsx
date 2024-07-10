"use client";
import React from "react";
import { useAccount } from "wagmi";

export default function ReferralButton() {
  const { status, address } = useAccount();

  return (
    <div
      className={`flex flex-row w-[80%] ${status !== "connected" && "hidden"}`}
    >
      <input
        className="w-[80%] py-3 px-4 rounded-tl-sm rounded-bl-sm text-tertiary text-sm"
        type="text"
        readOnly
        value={"tokenminds-ico-demo.vercel.app?ref=" + address}
      />
      <button className="py-3 px-6 text-xs font-medium text-white bg-tertiary duration-500 ease-in-out rounded-tr-sm rounded-br-sm">
        Copy
      </button>
    </div>
  );
}
