"use client";
import React from "react";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";

export default function ReferralButton() {
  const { status, address } = useAccount();

  const copyReferral = async () => {
    await navigator.clipboard.writeText(
      "tokenminds-ico-demo.vercel.app?ref=" + address
    );
    toast.success("Referral copied to clipboard!");
  };

  return (
    <div
      className={`w-full xl:w-[80%] space-y-1  ${
        status !== "connected" && "hidden"
      }`}
    >
      <div className="ml-[1px]">Referral Link</div>
      <div className="flex flex-row">
        <input
          className="w-full py-3 px-4 rounded-tl-sm rounded-bl-sm text-tertiary text-sm"
          type="text"
          readOnly
          value={"tokenminds-ico-demo.vercel.app?ref=" + address}
        />
        <button
          onClick={copyReferral}
          className="py-3 px-6 text-xs font-medium text-white bg-tertiary duration-500 ease-in-out rounded-tr-sm rounded-br-sm"
        >
          Copy
        </button>
      </div>
    </div>
  );
}
