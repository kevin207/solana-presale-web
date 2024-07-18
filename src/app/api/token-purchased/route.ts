import { presaleAddress, PUBLIC_CLIENTS } from "@/constants/common";
import { getBigInt } from "ethers";
import Moralis from "moralis";
import { decodeEventLog, formatUnits } from "viem";
import presaleAbi from "../../../utils/presaleAbi.json";
import { NextRequest } from "next/server";
import { initializeMoralis } from "@/utils/moralis";

export const dynamic = "force-dynamic";

initializeMoralis();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const address = searchParams.get("address");
  let total = 0;

  const [
    ethContractEvent1,
    avaxContractEvent1,
    baseContractEvent1,
    ethContractEvent2,
    avaxContractEvent2,
    baseContractEvent2,
    bscResponse1,
    bscResponse2,
  ] = await Promise.all([
    PUBLIC_CLIENTS[0].getContractEvents({
      address: presaleAddress,
      abi: presaleAbi,
      eventName: "TokensBoughtWithEth",
      args: {
        buyer: address,
      },
      fromBlock: "earliest",
      toBlock: "latest",
    }),
    PUBLIC_CLIENTS[1].getContractEvents({
      address: presaleAddress,
      abi: presaleAbi,
      eventName: "TokensBoughtWithEth",
      args: {
        buyer: address,
      },
      fromBlock: "earliest",
      toBlock: "latest",
    }),
    PUBLIC_CLIENTS[2].getContractEvents({
      address: presaleAddress,
      abi: presaleAbi,
      eventName: "TokensBoughtWithEth",
      args: {
        buyer: address,
      },
      fromBlock: "earliest",
      toBlock: "latest",
    }),
    PUBLIC_CLIENTS[0].getContractEvents({
      address: presaleAddress,
      abi: presaleAbi,
      eventName: "TokensBoughtWithUsdt",
      args: {
        buyer: address,
      },
      fromBlock: "earliest",
      toBlock: "latest",
    }),
    PUBLIC_CLIENTS[1].getContractEvents({
      address: presaleAddress,
      abi: presaleAbi,
      eventName: "TokensBoughtWithUsdt",
      args: {
        buyer: address,
      },
      fromBlock: "earliest",
      toBlock: "latest",
    }),
    PUBLIC_CLIENTS[2].getContractEvents({
      address: presaleAddress,
      abi: presaleAbi,
      eventName: "TokensBoughtWithUsdt",
      args: {
        buyer: address,
      },
      fromBlock: "earliest",
      toBlock: "latest",
    }),
    Moralis.EvmApi.events.getContractEvents({
      chain: "0x61",
      topic:
        "0xb86e8a722d8c6340ecf92b17168790c6e34eed0efdbf0d26fdff24ca3e0c02ff",
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
    }),
    Moralis.EvmApi.events.getContractEvents({
      chain: "0x61",
      topic:
        "0x2e02b9f3fb96e8f4b432fd531dbfa9d9640f8d2f5cc3447fbc6e866143b7f50d",
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
    }),
  ]);

  // COUNT TOTAL ON ETH, AVAX, & BASE
  const combinedWithEth = ethContractEvent1.concat(
    avaxContractEvent1,
    baseContractEvent1
  );
  const combinedWithUsdt = ethContractEvent2.concat(
    avaxContractEvent2,
    baseContractEvent2
  );

  for (let i = 0; i < combinedWithEth.length; i++) {
    const event = combinedWithEth[i];
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
  for (let i = 0; i < combinedWithUsdt.length; i++) {
    const event = combinedWithUsdt[i];
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
  const bscContractEvent1 = bscResponse1?.raw.result;
  const bscContractEvent2 = bscResponse2?.raw.result;
  for (let i = 0; i < bscContractEvent1.length; i++) {
    // @ts-expect-error
    let { ethAmount, ethPrice, tokenPrice, buyer } = bscContractEvent1[i].data;

    if (buyer.toLowerCase() === address?.toLowerCase()) {
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

    if (buyer.toLowerCase() === address?.toLowerCase()) {
      usdtAmount = Number(formatUnits(BigInt(usdtAmount), 6));
      tokenPrice = Number(formatUnits(BigInt(tokenPrice), 6));

      const tokenAmount = usdtAmount / tokenPrice;
      total += tokenAmount;
    }
  }

  return Response.json(total);
}
