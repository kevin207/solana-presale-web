import { claimToken, getPresaleEnded } from "@/utils/web3";
import React from "react";
import toast from "react-hot-toast";

export default function ClaimToken() {
  const claimPurchasedToken = async () => {
    // REQUIRE PAUSED, PRESALE ENDED, OPEN TRADING
    const presaleEnded = await getPresaleEnded();
    if (!presaleEnded) {
      toast.error("Presale not ended!");
      return;
    }

    try {
      await claimToken();
    } catch (error) {
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
