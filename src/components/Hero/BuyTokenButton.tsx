import { buyWithSol, buyWithUsdt } from "@/utils/solana";
import {
  AnchorWallet,
  useAnchorWallet,
  useConnection,
} from "@solana/wallet-adapter-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface BuyTokenButtonProps {
  selected: string;
  amount: number;
  refetch: boolean;
  setAmount: any;
}

export default function BuyTokenButton({
  selected,
  amount,
  setAmount,
  refetch,
}: BuyTokenButtonProps) {
  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();

  const buyToken = async () => {
    console.log(selected);

    if (selected === "SOL") {
      await buyWithSol(connection, anchorWallet as AnchorWallet, amount);
      toast.success("Succesfully buy with SOL");
      setAmount(0);
    } else if (selected === "USDT") {
      const transaction = await buyWithUsdt(
        connection,
        anchorWallet as AnchorWallet,
        amount
      );

      if (transaction) {
        toast.success("Succesfully buy with USDT");
        setAmount(0);
      } else {
        toast.error("Failed to buy with USDT");
      }
    }
  };

  return (
    <button
      onClick={buyToken}
      disabled={!anchorWallet?.publicKey}
      className="py-4 px-6 w-full text-xs font-medium text-white bg-main rounded-sm hover:bg-secondary duration-500 ease-in-out"
    >
      {anchorWallet?.publicKey
        ? "Buy Tokens With 45% Off"
        : "Connect Wallet First"}
    </button>
  );
}
