import { readContract, writeContract } from "@wagmi/core";
import presaleAbi from "./presaleAbi.json";
import usdtInterfaceAbi from "./usdtInterfaceAbi.json";
import tokenAbi from "./tokenAbi.json";
import { ethers } from "ethers";
import { config } from "@/providers/web3-provider";
import { Address } from "viem";
import { presaleAddress, tokenAddress } from "@/constants/common";

async function getLatestEthPrice(): Promise<number> {
  const result = await readContract(config, {
    abi: presaleAbi,
    address: presaleAddress,
    functionName: "getLatestEthPrice",
  });

  const bigIntValue = BigInt(result as bigint);
  const divisor = BigInt(10 ** 18);
  const adjustedValue = Number(bigIntValue) / Number(divisor);

  // console.log("ETH PRICE IN USD", adjustedValue);

  return adjustedValue;
}

export const getCurrentPrice = async () => {
  const result = await readContract(config, {
    abi: presaleAbi,
    address: presaleAddress,
    functionName: "currentPrice",
  });

  const bigIntValue = BigInt(result as bigint);
  const divisor = BigInt(10 ** 6);
  const adjustedValue = Number(bigIntValue) / Number(divisor);

  // console.log("TMT PRICE IN USD", adjustedValue);

  return adjustedValue;
};

export const getTotalSupply = async () => {
  const result = await readContract(config, {
    abi: tokenAbi,
    address: tokenAddress,
    functionName: "totalSupply",
  });

  // Convert the result to BigInt for precise arithmetic
  const bigIntValue = BigInt(result as bigint);

  // Adjust for the decimal places by dividing by 10^18
  const divisor = BigInt(10 ** 18);
  const adjustedValue = Number(bigIntValue) / Number(divisor);

  return adjustedValue;
};

export const getPresaleEnded = async () => {
  const result = await readContract(config, {
    abi: presaleAbi,
    address: presaleAddress,
    functionName: "presaleEnded",
  });

  return result as boolean;
};

export const getCurrentChainPurchasedToken = async (address: Address) => {
  try {
    const result = await readContract(config, {
      abi: presaleAbi,
      address: presaleAddress,
      functionName: "checkAllocation",
      args: [`${address}`],
    });

    // Convert the result to BigInt for precise arithmetic
    const bigIntValue = BigInt(result as bigint);

    // Adjust for the decimal places by dividing by 10^18
    const divisor = BigInt(10 ** 18);
    const adjustedValue = Number(bigIntValue) / Number(divisor);

    return adjustedValue;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export const buyWithETH = async (amountOnEth: string) => {
  const payableAmountInWei = ethers.parseEther(amountOnEth);

  try {
    const result = await writeContract(config, {
      abi: presaleAbi,
      address: presaleAddress,
      functionName: "buyWithEth",
      value: payableAmountInWei,
    });

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const checkAllowance = async (
  interfaceAddress: Address,
  walletAddress: Address | undefined
) => {
  const approval = await readContract(config, {
    abi: usdtInterfaceAbi,
    address: interfaceAddress,
    functionName: "allowance",
    args: [walletAddress, presaleAddress],
  });

  if (Number(approval) <= 0) {
    return false;
  }

  return true;
};

export const approveInterface = async (interfaceAddress: Address) => {
  const approve = await writeContract(config, {
    abi: usdtInterfaceAbi,
    address: interfaceAddress,
    functionName: "approve",
    args: [presaleAddress, "1000000000000000000000"],
  });

  if (!approve) {
    return null;
  }

  return approve;
};

export const buyWithUSDT = async (amountOfUSDT: string) => {
  const usdtAmountInWei = ethers.parseUnits(amountOfUSDT, 6);

  try {
    const result = await writeContract(config, {
      abi: presaleAbi,
      address: presaleAddress,
      functionName: "buyWithUSDT",
      args: [`${usdtAmountInWei}`],
    });

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const claimToken = async () => {
  try {
    const result = await writeContract(config, {
      abi: presaleAbi,
      address: presaleAddress,
      functionName: "claimToken",
    });

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// CONVERSION TO TMT
const ethToTmx = async (ethAmount: number) => {
  const ethToUsdRate = await getLatestEthPrice();
  const tmxToUsdRate = await getCurrentPrice();

  const usdAmount = ethAmount * ethToUsdRate; // Convert ETH to USD
  const tmxAmount = usdAmount / tmxToUsdRate; // Convert USD to TMX

  // console.log("ETH TO TMT", tmxAmount);

  return tmxAmount.toLocaleString("en-US");
};
const usdtToTmx = async (usdtAmount: number) => {
  const tmxToUsdRate = await getCurrentPrice();
  const tmxAmount = usdtAmount / tmxToUsdRate; // Convert USDT to TMX

  // console.log("USDT TO TMT", tmxAmount);

  return tmxAmount.toLocaleString("en-US");
};

export const countReceivedToken = async (amount: number, token: string) => {
  if (!amount || amount <= 0) {
    return "0";
  }

  if (token === "ETH") {
    return ethToTmx(amount);
  } else if (token === "USDT") {
    return usdtToTmx(amount);
  } else {
    return "0";
  }
};
