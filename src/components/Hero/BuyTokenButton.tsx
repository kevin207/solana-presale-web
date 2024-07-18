import React from "react";
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
  userAddress,
  interfaceAddress,
  setTransactionHash,
}: BuyTokenButtonProps) {
  const { isConnecting, status, chainId } = useAccount();

  const buyWithNativeToken = async () => {
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
    if (amount > parseFloat(maxUsdt as string)) {
      toast.error("Insufficent Amount!");
      return;
    }

    const allowance = await checkAllowance(interfaceAddress, userAddress);

    if (allowance) {
      const result = await buyWithUSDT(`${amount}`, chainId as number);
      if (result && result.includes("0x")) {
        toast.success("Successfully Buy Token!");
        setAmount(0);
        setTransactionHash(result);
      } else {
        toast.error("Cancelled / Failed!");
      }
    } else {
      const result = await approveInterface(interfaceAddress);
      if (result && result.includes("0x")) {
        toast.success("Approval Sucess!");
        setAmount(0);
        setTransactionHash(result);
      } else {
        toast.error("Cancelled / Failed!");
      }
    }
  };

  const buyToken = async () => {
    if (!amount || amount <= 0) {
      toast.error("Invalid Amount!");
      return;
    }

    if (selected === "ETH") {
      await buyWithNativeToken();
    } else if (selected === "USDT") {
      await buyWithStableToken();
    }
  };

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
          Buy Tokens With 45% Off
        </button>
      )}
    </ConnectKitButton.Custom>
  );
}
