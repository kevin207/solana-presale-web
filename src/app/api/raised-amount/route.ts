import { presaleAddress } from "@/constants/common";
import { getBigInt } from "ethers";
import Moralis from "moralis";
import { createPublicClient, decodeEventLog, formatUnits, http } from "viem";
import { sepolia, avalancheFuji, baseSepolia } from "viem/chains";
import presaleAbi from "../../../utils/presaleAbi.json";
import { initializeMoralis } from "@/utils/moralis";

initializeMoralis();

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

export async function GET() {
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

  return Response.json(total);
}
