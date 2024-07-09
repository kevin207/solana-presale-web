"use client";

import { useWaitForTransactionReceipt } from "wagmi";
import { config } from "@/providers/web3-provider";
import { useEffect } from "react";

interface UseWaitForTxActionProps {
  txHash: `0x${string}` | undefined;
  action: (() => void) | (() => Promise<void>);
}

const useWaitForTxAction = ({ action, txHash }: UseWaitForTxActionProps) => {
  const waitTx = useWaitForTransactionReceipt({
    hash: txHash,
    config,
  });

  useEffect(() => {
    if (waitTx?.status === "success") {
      action();
    }
  }, [action, waitTx]);
};

export default useWaitForTxAction;
