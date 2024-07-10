import { readContract, writeContract } from "@wagmi/core";
import presaleAbi from "./presaleAbi.json";
import usdtInterfaceAbi from "./usdtInterfaceAbi.json";
import tokenAbi from "./tokenAbi.json";
import { ethers, getBigInt } from "ethers";
import { config } from "@/providers/web3-provider";
import {
  Address,
  createPublicClient,
  decodeEventLog,
  formatUnits,
  http,
} from "viem";
import { sepolia, baseSepolia, bscTestnet, avalancheFuji } from "viem/chains";
import { presaleAddress, tokenAddress } from "@/constants/common";

async function convertEthToUsd(eth: number) {
  const rate = await getLatestEthPrice();
  const usdValue = eth * rate;
  return usdValue;
}

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

export const buyWithUSDT = async (
  amountOfUSDT: string,
  walletAddress: Address | undefined
) => {
  const usdtAmountInWei = ethers.parseUnits(amountOfUSDT, 6);

  try {
    const approval = await readContract(config, {
      abi: usdtInterfaceAbi,
      address: "0xbDeaD2A70Fe794D2f97b37EFDE497e68974a296d",
      functionName: "allowance",
      args: [walletAddress, presaleAddress],
    });

    if (Number(approval) <= 0) {
      const approve = await writeContract(config, {
        abi: usdtInterfaceAbi,
        address: "0xbDeaD2A70Fe794D2f97b37EFDE497e68974a296d",
        functionName: "approve",
        args: [presaleAddress, "1000000000000000000000"],
      });

      if (!approve) {
        return null;
      }
    }

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

// PURCHASED TOKEN & TOTAL RAISED
const ENDPOINT_ETH = process.env.NEXT_PUBLIC_API_URL_ETH!;
const ENDPOINT_AVAX = process.env.NEXT_PUBLIC_API_URL_AVAX!;
const ENDPOINT_BSC = process.env.NEXT_PUBLIC_API_URL_BSC!;
const ENDPOINT_BASE = process.env.NEXT_PUBLIC_API_URL_BASE!;

const ethPublicClient = createPublicClient({
  chain: sepolia,
  transport: http(ENDPOINT_ETH),
});
const avaxPublicClient = createPublicClient({
  chain: avalancheFuji,
  transport: http(ENDPOINT_AVAX),
});
const bscPublicClient = createPublicClient({
  chain: bscTestnet,
  transport: http(ENDPOINT_BSC),
});
const basePublicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(ENDPOINT_BASE),
});

export const getUserPurchasedToken = async (
  walletAddress: string
): Promise<number> => {
  let total = 0;

  const ethContractEvent1 = await ethPublicClient.getContractEvents({
    address: presaleAddress,
    abi: presaleAbi,
    eventName: "TokensBoughtWithEth",
    args: {
      buyer: walletAddress,
    },
    fromBlock: "earliest",
    toBlock: "latest",
  });
  const ethContractEvent2 = await ethPublicClient.getContractEvents({
    address: presaleAddress,
    abi: presaleAbi,
    eventName: "TokensBoughtWithUsdt",
    args: {
      buyer: walletAddress,
    },
    fromBlock: "earliest",
    toBlock: "latest",
  });
  const avaxContractEvent1 = await avaxPublicClient.getContractEvents({
    address: presaleAddress,
    abi: presaleAbi,
    eventName: "TokensBoughtWithEth",
    args: {
      buyer: walletAddress,
    },
    fromBlock: "earliest",
    toBlock: "latest",
  });
  const avaxContractEvent2 = await avaxPublicClient.getContractEvents({
    address: presaleAddress,
    abi: presaleAbi,
    eventName: "TokensBoughtWithUsdt",
    args: {
      buyer: walletAddress,
    },
    fromBlock: "earliest",
    toBlock: "latest",
  });
  const baseContractEvent1 = await basePublicClient.getContractEvents({
    address: presaleAddress,
    abi: presaleAbi,
    eventName: "TokensBoughtWithEth",
    args: {
      buyer: walletAddress,
    },
    fromBlock: "earliest",
    toBlock: "latest",
  });
  const baseContractEvent2 = await basePublicClient.getContractEvents({
    address: presaleAddress,
    abi: presaleAbi,
    eventName: "TokensBoughtWithUsdt",
    args: {
      buyer: walletAddress,
    },
    fromBlock: "earliest",
    toBlock: "latest",
  });

  for (let i = 0; i < ethContractEvent1.length; i++) {
    const event = ethContractEvent1[i];
    const topics = decodeEventLog({
      abi: presaleAbi,
      data: event.data,
      topics: event.topics,
    });

    // @ts-expect-error
    const { ethAmount, tokenPrice } = topics.args;
    const eth = Number(formatUnits(getBigInt(ethAmount), 18)); // ON ETH

    const ethPrice = await convertEthToUsd(eth); // CONVERT TO USD
    const tmtPrice = Number(formatUnits(getBigInt(tokenPrice), 6));

    const tokenAmount = ethPrice / tmtPrice;
    total += tokenAmount;
  }
  for (let i = 0; i < ethContractEvent2.length; i++) {
    const event = ethContractEvent2[i];
    const topics = decodeEventLog({
      abi: presaleAbi,
      data: event.data,
      topics: event.topics,
    });

    // @ts-expect-error
    const { usdtAmount, tokenPrice } = topics.args;
    const usdt = Number(formatUnits(getBigInt(usdtAmount), 6));
    const tmtPrice = Number(formatUnits(getBigInt(tokenPrice), 6));

    const tokenAmount = usdt / tmtPrice;
    total += tokenAmount;
  }
  for (let i = 0; i < avaxContractEvent1.length; i++) {
    const event = ethContractEvent1[i];
    const topics = decodeEventLog({
      abi: presaleAbi,
      data: event.data,
      topics: event.topics,
    });

    // @ts-expect-error
    const { ethAmount, tokenPrice } = topics.args;
    const eth = Number(formatUnits(getBigInt(ethAmount), 18)); // ON ETH

    const ethPrice = await convertEthToUsd(eth); // CONVERT TO USD
    const tmtPrice = Number(formatUnits(getBigInt(tokenPrice), 6));

    const tokenAmount = ethPrice / tmtPrice;
    total += tokenAmount;
  }
  for (let i = 0; i < avaxContractEvent2.length; i++) {
    const event = ethContractEvent2[i];
    const topics = decodeEventLog({
      abi: presaleAbi,
      data: event.data,
      topics: event.topics,
    });

    // @ts-expect-error
    const { usdtAmount, tokenPrice } = topics.args;
    const usdt = Number(formatUnits(getBigInt(usdtAmount), 6));
    const tmtPrice = Number(formatUnits(getBigInt(tokenPrice), 6));

    const tokenAmount = usdt / tmtPrice;
    total += tokenAmount;
  }
  for (let i = 0; i < baseContractEvent1.length; i++) {
    const event = ethContractEvent1[i];
    const topics = decodeEventLog({
      abi: presaleAbi,
      data: event.data,
      topics: event.topics,
    });

    // @ts-expect-error
    const { ethAmount, tokenPrice } = topics.args;
    const eth = Number(formatUnits(getBigInt(ethAmount), 18)); // ON ETH

    const ethPrice = await convertEthToUsd(eth); // CONVERT TO USD
    const tmtPrice = Number(formatUnits(getBigInt(tokenPrice), 6));

    const tokenAmount = ethPrice / tmtPrice;
    total += tokenAmount;
  }
  for (let i = 0; i < baseContractEvent2.length; i++) {
    const event = ethContractEvent2[i];
    const topics = decodeEventLog({
      abi: presaleAbi,
      data: event.data,
      topics: event.topics,
    });

    // @ts-expect-error
    const { usdtAmount, tokenPrice } = topics.args;
    const usdt = Number(formatUnits(getBigInt(usdtAmount), 6));
    const tmtPrice = Number(formatUnits(getBigInt(tokenPrice), 6));

    const tokenAmount = usdt / tmtPrice;
    total += tokenAmount;
  }

  return total;
};

export const getTotalRaised = async () => {
  let total = 0;

  const ethContractEvent1 = await ethPublicClient.getContractEvents({
    address: presaleAddress,
    abi: presaleAbi,
    eventName: "TokensBoughtWithEth",
    fromBlock: "earliest",
    toBlock: "latest",
  });
  const ethContractEvent2 = await ethPublicClient.getContractEvents({
    address: presaleAddress,
    abi: presaleAbi,
    eventName: "TokensBoughtWithUsdt",
    fromBlock: "earliest",
    toBlock: "latest",
  });
  const avaxContractEvent1 = await avaxPublicClient.getContractEvents({
    address: presaleAddress,
    abi: presaleAbi,
    eventName: "TokensBoughtWithEth",
    fromBlock: "earliest",
    toBlock: "latest",
  });
  const avaxContractEvent2 = await avaxPublicClient.getContractEvents({
    address: presaleAddress,
    abi: presaleAbi,
    eventName: "TokensBoughtWithUsdt",
    fromBlock: "earliest",
    toBlock: "latest",
  });
  const baseContractEvent1 = await basePublicClient.getContractEvents({
    address: presaleAddress,
    abi: presaleAbi,
    eventName: "TokensBoughtWithEth",
    fromBlock: "earliest",
    toBlock: "latest",
  });
  const baseContractEvent2 = await basePublicClient.getContractEvents({
    address: presaleAddress,
    abi: presaleAbi,
    eventName: "TokensBoughtWithUsdt",
    fromBlock: "earliest",
    toBlock: "latest",
  });

  for (let i = 0; i < ethContractEvent1.length; i++) {
    const event = ethContractEvent1[i];
    const topics = decodeEventLog({
      abi: presaleAbi,
      data: event.data,
      topics: event.topics,
    });

    // @ts-expect-error
    const { ethAmount } = topics.args;
    const eth = Number(formatUnits(getBigInt(ethAmount), 18)); // ON ETH
    const ethPrice = await convertEthToUsd(eth); // CONVERT TO USD

    total += ethPrice;
  }
  for (let i = 0; i < ethContractEvent2.length; i++) {
    const event = ethContractEvent2[i];
    const topics = decodeEventLog({
      abi: presaleAbi,
      data: event.data,
      topics: event.topics,
    });

    // @ts-expect-error
    const { usdtAmount } = topics.args;
    const usdt = Number(formatUnits(getBigInt(usdtAmount), 6));

    total += usdt;
  }
  for (let i = 0; i < avaxContractEvent1.length; i++) {
    const event = avaxContractEvent1[i];
    const topics = decodeEventLog({
      abi: presaleAbi,
      data: event.data,
      topics: event.topics,
    });

    // @ts-expect-error
    const { ethAmount } = topics.args;
    const eth = Number(formatUnits(getBigInt(ethAmount), 18)); // ON ETH
    const ethPrice = await convertEthToUsd(eth); // CONVERT TO USD

    total += ethPrice;
  }
  for (let i = 0; i < avaxContractEvent2.length; i++) {
    const event = avaxContractEvent2[i];
    const topics = decodeEventLog({
      abi: presaleAbi,
      data: event.data,
      topics: event.topics,
    });

    // @ts-expect-error
    const { usdtAmount } = topics.args;
    const usdt = Number(formatUnits(getBigInt(usdtAmount), 6));

    total += usdt;
  }
  for (let i = 0; i < baseContractEvent1.length; i++) {
    const event = baseContractEvent1[i];
    const topics = decodeEventLog({
      abi: presaleAbi,
      data: event.data,
      topics: event.topics,
    });

    // @ts-expect-error
    const { ethAmount } = topics.args;
    const eth = Number(formatUnits(getBigInt(ethAmount), 18)); // ON ETH
    const ethPrice = await convertEthToUsd(eth); // CONVERT TO USD

    total += ethPrice;
  }
  for (let i = 0; i < baseContractEvent2.length; i++) {
    const event = baseContractEvent2[i];
    const topics = decodeEventLog({
      abi: presaleAbi,
      data: event.data,
      topics: event.topics,
    });

    // @ts-expect-error
    const { usdtAmount } = topics.args;
    const usdt = Number(formatUnits(getBigInt(usdtAmount), 6));

    total += usdt;
  }

  return total;
};
