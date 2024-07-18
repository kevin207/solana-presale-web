import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";
import { Address } from "viem";
import {
  approveInterface,
  buyWithETH,
  buyWithUSDT,
  checkAllowance,
} from "@/utils/web3";
import toast from "react-hot-toast";

interface BuyTokenButtonProps {
  selected: string;
  amount: number;
  refetch: boolean;
  setAmount: any;
  maxEth: string | undefined;
  maxUsdt: string | undefined;
  userAddress: Address | undefined;
  interfaceAddress: Address;
  setTransactionHash: (address: Address) => void;
}

export default function BuyTokenButton({
  selected,
  amount,
  setAmount,
  maxEth,
  maxUsdt,
  refetch,
  userAddress,
  interfaceAddress,
  setTransactionHash,
}: BuyTokenButtonProps) {
  const { isConnecting, status, chainId } = useAccount();
  const [allowance, setAllowance] = useState<boolean>(false);

  const buyWithNativeToken = async () => {
    if (!amount || amount <= 0) {
      toast.error("Invalid Amount!");
      return;
    }
    if (amount > parseFloat(maxEth as string)) {
      toast.error("Insufficent Amount!");
      return;
    }

    const result = await buyWithETH(`${amount}`);
    if (result && result.includes("0x")) {
      toast.success("Successfully Buy Token!");
      setAmount(0);
      setTransactionHash(result);
    } else {
      toast.error("Cancelled / Failed!");
    }
  };

  const buyWithStableToken = async () => {
    if (!amount || amount <= 0) {
      toast.error("Invalid Amount!");
      return;
    }
    if (amount > parseFloat(maxUsdt as string)) {
      toast.error("Insufficent Amount!");
      return;
    }

    const result = await buyWithUSDT(`${amount}`, chainId as number);
    if (result && result.includes("0x")) {
      toast.success("Successfully Buy Token!");
      setAmount(0);
      setTransactionHash(result);
    } else {
      toast.error("Cancelled / Failed!");
    }
  };

  const makeApproval = async () => {
    const result = await approveInterface(interfaceAddress);
    if (result && result.includes("0x")) {
      toast.success("Approval Success!");
      setTransactionHash(result);
    } else {
      toast.error("Cancelled / Failed!");
    }
  };

  const buyToken = async () => {
    if (selected === "ETH") {
      await buyWithNativeToken();
    } else if (selected === "USDT") {
      if (!allowance) {
        await makeApproval();
      } else {
        await buyWithStableToken();
      }
    }
  };

  useEffect(() => {
    if (interfaceAddress && userAddress) {
      const getAllowance = async () => {
        const result = await checkAllowance(interfaceAddress, userAddress);
        setAllowance(result);
      };
      getAllowance();
    }
  }, [chainId, refetch, userAddress, selected]);

  return status === "disconnected" || isConnecting ? (
    <ConnectKitButton.Custom>
      {({ show }) => (
        <button
          onClick={show}
          className="py-4 px-6 text-xs font-medium text-white bg-main rounded-sm hover:bg-secondary duration-500 ease-in-out w-full"
        >
          Connect Wallet To Buy Token
        </button>
      )}
    </ConnectKitButton.Custom>
  ) : (
    <ConnectKitButton.Custom>
      {() => (
        <button
          onClick={buyToken}
          className="py-4 px-6 w-full text-xs font-medium text-white bg-main rounded-sm hover:bg-secondary duration-500 ease-in-out"
        >
          {selected === "USDT" && !allowance
            ? "Approve Interface"
            : "Buy Tokens With 45% Off"}
        </button>
      )}
    </ConnectKitButton.Custom>
  );
}
