import { readContract, writeContract } from "@wagmi/core";
import presaleAbi from "./presaleAbi.json";
import usdtInterfaceAbi from "./usdtInterfaceAbi.json";
import tokenAbi from "./tokenAbi.json";
import { BigNumberish, ethers } from "ethers";
import { config } from "@/providers/web3-provider";

async function convertToUsd(wei: BigNumberish) {
  const eth = ethers.formatUnits(wei, "ether");
  const rate = await getLatestEthPrice();
  const usdValue = parseFloat(eth) * rate;

  const factor = Math.pow(10, 4);
  const result = Math.floor(usdValue * factor) / factor;

  return result;
}

async function getLatestEthPrice(): Promise<number> {
  const result = await readContract(config, {
    abi: presaleAbi,
    address: "0xf34192DeEbB702a08aB048A8940938e6CF85522e",
    functionName: "getLatestEthPrice",
  });

  const bigIntValue = BigInt(result as bigint);

  const divisor = BigInt(10 ** 18);
  const adjustedValue = Number(bigIntValue) / Number(divisor);

  const finalValue = adjustedValue.toFixed(2); // Already on USD
  return parseFloat(finalValue);
}

export const getCurrentPrice = async () => {
  const result = await readContract(config, {
    abi: presaleAbi,
    address: "0xf34192DeEbB702a08aB048A8940938e6CF85522e",
    functionName: "currentPrice",
  }); //on wei

  const usd = await convertToUsd(result as BigNumberish);
  return usd;
};

export const getTotalSupply = async () => {
  const result = await readContract(config, {
    abi: tokenAbi,
    address: "0xB865b5e25D0399cac0243F5F9d8f970B4441B71a",
    functionName: "totalSupply",
  });

  // Convert the result to BigInt for precise arithmetic
  const bigIntValue = BigInt(result as bigint);

  // Adjust for the decimal places by dividing by 10^18
  const divisor = BigInt(10 ** 18);
  const adjustedValue = bigIntValue / divisor;

  // Format the number with commas as thousand separators
  const formatted = adjustedValue.toLocaleString("en-US");

  return formatted;
};

export const buyWithETH = async (amountOnEth: string) => {
  const payableAmountInWei = ethers.parseEther(amountOnEth);

  try {
    const result = await writeContract(config, {
      abi: presaleAbi,
      address: "0xf34192DeEbB702a08aB048A8940938e6CF85522e",
      functionName: "buyWithEth",
      value: payableAmountInWei,
    });

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const buyWithUSDT = async (amountOfUSDT: string) => {
  const usdtAmountInWei = ethers.parseUnits(amountOfUSDT, 6);

  try {
    const approval = await writeContract(config, {
      abi: usdtInterfaceAbi,
      address: "0xbDeaD2A70Fe794D2f97b37EFDE497e68974a296d",
      functionName: "approve",
      args: [
        "0xf34192DeEbB702a08aB048A8940938e6CF85522e",
        "1000000000000000000000",
      ],
    });

    if (!approval) {
      return null;
    }

    const result = await writeContract(config, {
      abi: presaleAbi,
      address: "0xf34192DeEbB702a08aB048A8940938e6CF85522e",
      functionName: "buyWithUSDT",
      args: [`${usdtAmountInWei}`],
    });

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// CONVERSION TO TMT
const ethToTmx = async (ethAmount: number) => {
  const ethToUsdRate = await getLatestEthPrice(); // 1 ETH = Around $2842.66 (08/07/2024)
  const tmxToUsdRate = await getCurrentPrice(); // 1 TMX = $0.4208

  const usdAmount = ethAmount * ethToUsdRate; // Convert ETH to USD
  const tmxAmount = usdAmount / tmxToUsdRate; // Convert USD to TMX

  // Round to the specified precision (3 decimal places)
  const factor = Math.pow(10, 3);
  const result = Math.round(tmxAmount * factor) / factor;
  return result.toLocaleString("en-US");
};

const usdtToTmx = async (usdtAmount: number) => {
  const tmxToUsdRate = await getCurrentPrice();
  const tmxAmount = usdtAmount / tmxToUsdRate; // Convert USDT to TMX

  // Round to the specified precision (3 decimal places)
  const factor = Math.pow(10, 3);
  const result = Math.round(tmxAmount * factor) / factor;
  return result.toLocaleString("en-US");
};

export const countReceivedToken = async (amount: number, token: string) => {
  if (token === "ETH") {
    return ethToTmx(amount);
  } else if (token === "USDT") {
    return usdtToTmx(amount);
  } else {
    return "0";
  }
};
