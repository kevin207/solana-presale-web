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
import { sepolia, baseSepolia, avalancheFuji } from "viem/chains";
import { presaleAddress, tokenAddress } from "@/constants/common";
import Moralis from "moralis";
import { initializeMoralis } from "./moralis";
initializeMoralis();

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
  interfaceAddress: Address,
  walletAddress: Address | undefined
) => {
  const usdtAmountInWei = ethers.parseUnits(amountOfUSDT, 6);

  try {
    const approval = await readContract(config, {
      abi: usdtInterfaceAbi,
      address: interfaceAddress,
      functionName: "allowance",
      args: [walletAddress, presaleAddress],
    });

    if (Number(approval) <= 0) {
      const approve = await writeContract(config, {
        abi: usdtInterfaceAbi,
        address: interfaceAddress,
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
const ethPublicClient = createPublicClient({
  chain: sepolia,
  transport: http(process.env.NEXT_PUBLIC_API_URL_ETH!),
});
const avaxPublicClient = createPublicClient({
  chain: avalancheFuji,
  transport: http(process.env.NEXT_PUBLIC_API_URL_AVAX!),
});
const basePublicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(process.env.NEXT_PUBLIC_API_URL_BASE!),
});

export const getUserPurchasedToken = async (
  walletAddress: string
): Promise<number> => {
  let total = 0;

  // COUNT TOTAL ON ETH
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
  for (let i = 0; i < ethContractEvent1.length; i++) {
    const event = ethContractEvent1[i];
    const topics = decodeEventLog({
      abi: presaleAbi,
      data: event.data,
      topics: event.topics,
    });

    // @ts-expect-error
    let { ethAmount, ethPrice, tokenPrice } = topics.args;
    ethAmount = Number(formatUnits(getBigInt(ethAmount), 18));
    ethPrice = Number(formatUnits(getBigInt(ethPrice), 18));
    tokenPrice = Number(formatUnits(getBigInt(tokenPrice), 6));

    const tokenAmount = (ethAmount * ethPrice) / tokenPrice;
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
    let { usdtAmount, tokenPrice } = topics.args;
    usdtAmount = Number(formatUnits(getBigInt(usdtAmount), 6));
    tokenPrice = Number(formatUnits(getBigInt(tokenPrice), 6));

    const tokenAmount = usdtAmount / tokenPrice;
    total += tokenAmount;
  }

  // COUNT TOTAL ON AVAX
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
  for (let i = 0; i < avaxContractEvent1.length; i++) {
    const event = avaxContractEvent1[i];
    const topics = decodeEventLog({
      abi: presaleAbi,
      data: event.data,
      topics: event.topics,
    });

    // @ts-expect-error
    let { ethAmount, ethPrice, tokenPrice } = topics.args;
    ethAmount = Number(formatUnits(getBigInt(ethAmount), 18));
    ethPrice = Number(formatUnits(getBigInt(ethPrice), 18));
    tokenPrice = Number(formatUnits(getBigInt(tokenPrice), 6));

    const tokenAmount = (ethAmount * ethPrice) / tokenPrice;
    total += tokenAmount;
  }
  for (let i = 0; i < avaxContractEvent2.length; i++) {
    const event = avaxContractEvent2[i];
    const topics = decodeEventLog({
      abi: presaleAbi,
      data: event.data,
      topics: event.topics,
    });

    // @ts-expect-error
    let { usdtAmount, tokenPrice } = topics.args;
    usdtAmount = Number(formatUnits(getBigInt(usdtAmount), 6));
    tokenPrice = Number(formatUnits(getBigInt(tokenPrice), 6));

    const tokenAmount = usdtAmount / tokenPrice;
    total += tokenAmount;
  }

  // COUNT TOTAL ON BASE
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
  for (let i = 0; i < baseContractEvent1.length; i++) {
    const event = baseContractEvent1[i];
    const topics = decodeEventLog({
      abi: presaleAbi,
      data: event.data,
      topics: event.topics,
    });

    // @ts-expect-error
    let { ethAmount, ethPrice, tokenPrice } = topics.args;
    ethAmount = Number(formatUnits(getBigInt(ethAmount), 18));
    ethPrice = Number(formatUnits(getBigInt(ethPrice), 18));
    tokenPrice = Number(formatUnits(getBigInt(tokenPrice), 6));

    const tokenAmount = (ethAmount * ethPrice) / tokenPrice;
    total += tokenAmount;
  }
  for (let i = 0; i < baseContractEvent2.length; i++) {
    const event = baseContractEvent2[i];
    const topics = decodeEventLog({
      abi: presaleAbi,
      data: event.data,
      topics: event.topics,
    });

    // @ts-expect-error
    let { usdtAmount, tokenPrice } = topics.args;
    usdtAmount = Number(formatUnits(getBigInt(usdtAmount), 6));
    tokenPrice = Number(formatUnits(getBigInt(tokenPrice), 6));

    const tokenAmount = usdtAmount / tokenPrice;
    total += tokenAmount;
  }

  // COUNT TOTAL ON BSC
  const bscResponse1 = await Moralis.EvmApi.events.getContractEvents({
    chain: "0x61",
    topic: "0xb86e8a722d8c6340ecf92b17168790c6e34eed0efdbf0d26fdff24ca3e0c02ff",
    order: "DESC",
    address: presaleAddress,
    abi: {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "buyer",
          type: "address",
          internalType: "address",
        },
        {
          indexed: false,
          name: "ethAmount",
          type: "uint256",
          internalType: "uint256",
        },
        {
          indexed: false,
          name: "ethPrice",
          type: "uint256",
          internalType: "uint256",
        },
        {
          indexed: false,
          name: "tokenPrice",
          type: "uint256",
          internalType: "uint256",
        },
        {
          indexed: false,
          name: "timestamp",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      name: "TokensBoughtWithEth",
      type: "event",
    },
  });
  const bscContractEvent1 = bscResponse1?.raw.result;
  const bscResponse2 = await Moralis.EvmApi.events.getContractEvents({
    chain: "0x61",
    topic: "0x2e02b9f3fb96e8f4b432fd531dbfa9d9640f8d2f5cc3447fbc6e866143b7f50d",
    order: "DESC",
    address: presaleAddress,
    abi: {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "buyer",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "usdtAmount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "tokenPrice",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "timestamp",
          type: "uint256",
        },
      ],
      name: "TokensBoughtWithUsdt",
      type: "event",
    },
  });
  const bscContractEvent2 = bscResponse2?.raw.result;
  for (let i = 0; i < bscContractEvent1.length; i++) {
    // @ts-expect-error
    let { ethAmount, ethPrice, tokenPrice, buyer } = bscContractEvent1[i].data;

    if (buyer.toLowerCase() === walletAddress.toLowerCase()) {
      ethAmount = Number(formatUnits(BigInt(ethAmount), 18));
      ethPrice = Number(formatUnits(BigInt(ethPrice), 18));
      tokenPrice = Number(formatUnits(BigInt(tokenPrice), 6));

      const tokenAmount = (ethAmount * ethPrice) / tokenPrice;
      total += tokenAmount;
    }
  }
  for (let i = 0; i < bscContractEvent2.length; i++) {
    // @ts-expect-error
    let { usdtAmount, tokenPrice, buyer } = bscContractEvent2[i].data;

    if (buyer.toLowerCase() === walletAddress.toLowerCase()) {
      usdtAmount = Number(formatUnits(BigInt(usdtAmount), 6));
      tokenPrice = Number(formatUnits(BigInt(tokenPrice), 6));

      const tokenAmount = usdtAmount / tokenPrice;
      total += tokenAmount;
    }
  }

  return total;
};

export const getTotalRaised = async () => {
  let total = 0;

  // COUNT TOTAL ON ETH
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
  for (let i = 0; i < ethContractEvent1.length; i++) {
    const event = ethContractEvent1[i];
    const topics = decodeEventLog({
      abi: presaleAbi,
      data: event.data,
      topics: event.topics,
    });

    // @ts-expect-error
    let { ethAmount, ethPrice } = topics.args;
    ethAmount = Number(formatUnits(getBigInt(ethAmount), 18));
    ethPrice = Number(formatUnits(getBigInt(ethPrice), 18));

    const result = ethAmount * ethPrice;
    total += result;
  }
  for (let i = 0; i < ethContractEvent2.length; i++) {
    const event = ethContractEvent2[i];
    const topics = decodeEventLog({
      abi: presaleAbi,
      data: event.data,
      topics: event.topics,
    });

    // @ts-expect-error
    let { usdtAmount } = topics.args;
    usdtAmount = Number(formatUnits(getBigInt(usdtAmount), 6));
    total += usdtAmount;
  }

  // COUNT TOTAL ON AVAX
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
  for (let i = 0; i < avaxContractEvent1.length; i++) {
    const event = avaxContractEvent1[i];
    const topics = decodeEventLog({
      abi: presaleAbi,
      data: event.data,
      topics: event.topics,
    });

    // @ts-expect-error
    let { ethAmount, ethPrice } = topics.args;
    ethAmount = Number(formatUnits(getBigInt(ethAmount), 18));
    ethPrice = Number(formatUnits(getBigInt(ethPrice), 18));

    const result = ethAmount * ethPrice;
    total += result;
  }
  for (let i = 0; i < avaxContractEvent2.length; i++) {
    const event = avaxContractEvent2[i];
    const topics = decodeEventLog({
      abi: presaleAbi,
      data: event.data,
      topics: event.topics,
    });

    // @ts-expect-error
    let { usdtAmount } = topics.args;
    usdtAmount = Number(formatUnits(getBigInt(usdtAmount), 6));
    total += usdtAmount;
  }

  // COUNT TOTAL ON BASE
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
  for (let i = 0; i < baseContractEvent1.length; i++) {
    const event = baseContractEvent1[i];
    const topics = decodeEventLog({
      abi: presaleAbi,
      data: event.data,
      topics: event.topics,
    });

    // @ts-expect-error
    let { ethAmount, ethPrice } = topics.args;
    ethAmount = Number(formatUnits(getBigInt(ethAmount), 18));
    ethPrice = Number(formatUnits(getBigInt(ethPrice), 18));

    const result = ethAmount * ethPrice;
    total += result;
  }
  for (let i = 0; i < baseContractEvent2.length; i++) {
    const event = baseContractEvent2[i];
    const topics = decodeEventLog({
      abi: presaleAbi,
      data: event.data,
      topics: event.topics,
    });

    // @ts-expect-error
    let { usdtAmount } = topics.args;
    usdtAmount = Number(formatUnits(getBigInt(usdtAmount), 6));
    total += usdtAmount;
  }

  // COUNT TOTAL ON BSC
  const bscResponse1 = await Moralis.EvmApi.events.getContractEvents({
    chain: "0x61",
    topic: "0xb86e8a722d8c6340ecf92b17168790c6e34eed0efdbf0d26fdff24ca3e0c02ff",
    order: "DESC",
    address: presaleAddress,
    abi: {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "buyer",
          type: "address",
          internalType: "address",
        },
        {
          indexed: false,
          name: "ethAmount",
          type: "uint256",
          internalType: "uint256",
        },
        {
          indexed: false,
          name: "ethPrice",
          type: "uint256",
          internalType: "uint256",
        },
        {
          indexed: false,
          name: "tokenPrice",
          type: "uint256",
          internalType: "uint256",
        },
        {
          indexed: false,
          name: "timestamp",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      name: "TokensBoughtWithEth",
      type: "event",
    },
  });
  const bscContractEvent1 = bscResponse1?.raw.result;
  const bscResponse2 = await Moralis.EvmApi.events.getContractEvents({
    chain: "0x61",
    topic: "0x2e02b9f3fb96e8f4b432fd531dbfa9d9640f8d2f5cc3447fbc6e866143b7f50d",
    order: "DESC",
    address: presaleAddress,
    abi: {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "buyer",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "usdtAmount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "tokenPrice",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "timestamp",
          type: "uint256",
        },
      ],
      name: "TokensBoughtWithUsdt",
      type: "event",
    },
  });
  const bscContractEvent2 = bscResponse2?.raw.result;
  for (let i = 0; i < bscContractEvent1.length; i++) {
    // @ts-expect-error
    let { ethAmount, ethPrice } = bscContractEvent1[i].data;
    ethAmount = Number(formatUnits(getBigInt(ethAmount), 18));
    ethPrice = Number(formatUnits(getBigInt(ethPrice), 18));

    const result = ethAmount * ethPrice;
    total += result;
  }
  for (let i = 0; i < bscContractEvent2.length; i++) {
    // @ts-expect-error
    let { usdtAmount } = baseContractEvent2[i].data;
    usdtAmount = Number(formatUnits(getBigInt(usdtAmount), 6));
    total += usdtAmount;
  }

  return total;
};
