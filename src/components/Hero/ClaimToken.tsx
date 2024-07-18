import { claimToken, getPresaleEnded } from "@/utils/web3";
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
    const presaleEnded = await getPresaleEnded();
    if (!presaleEnded) {
      toast.error("Presale not ended!");
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
