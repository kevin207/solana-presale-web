import { buyWithSol } from "@/utils/solana";
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

  // useEffect(() => {
  //   if (interfaceAddress && userAddress) {
  //     const getAllowance = async () => {
  //       const result = await checkAllowance(interfaceAddress, userAddress);
  //       setAllowance(result);
  //     };
  //     getAllowance();
  //   }
  // }, [chainId, refetch, userAddress, selected]);

  const buyToken = async () => {
    await buyWithSol(connection, anchorWallet as AnchorWallet, amount);
    toast.success("Succesfully buy with SOL");
    setAmount(0);
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
