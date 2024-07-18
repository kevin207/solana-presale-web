import { claimToken, verifyCanClaim } from "@/utils/web3";
import React from "react";
import toast from "react-hot-toast";
import { Address } from "viem";

interface ClaimTokenButtonProps {
  setTransactionHash: (address: Address) => void;
}

export default function ClaimToken({
  setTransactionHash,
}: ClaimTokenButtonProps) {
  const claimPurchasedToken = async () => {
    // REQUIRE PAUSED, PRESALE ENDED, OPEN TRADING
    const { presaleEnded, paused, tradeOpen } = await verifyCanClaim();
    if (!presaleEnded || !paused || !tradeOpen) {
      const errors = [];
      if (!presaleEnded) errors.push("Presale not ended!");
      if (!paused) errors.push("Contract is not paused!");
      if (!tradeOpen) errors.push("Trading not opened yet!");

      toast.error(errors.join(" "));
      return;
    }

    const result = await claimToken();
    if (result && result.includes("0x")) {
      toast.success("Successfully Claim Token!");
      setTransactionHash(result);
    } else {
      toast.error("Cancelled / Failed!");
    }
  };

  return (
    <button
      onClick={claimPurchasedToken}
      className="py-4 px-8 w-fit text-xs font-medium text-white bg-tertiary rounded-sm duration-500 ease-in-out"
    >
      Claim Token
    </button>
  );
}
