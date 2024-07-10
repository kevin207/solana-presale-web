"use client";
import { getCurrentPrice } from "@/utils/web3";
import React, { useEffect, useState } from "react";
import { Config } from "wagmi";
import { getChainId } from "@wagmi/core";
import Image from "next/image";
import { Chain } from "wagmi/chains";
import { SwitchChainMutate } from "wagmi/query";
import { config } from "@/providers/web3-provider";

interface TokenPriceAndChainProps {
  chains: readonly [Chain, ...Chain[]];
  switchChain: SwitchChainMutate<Config, unknown>;
}

export default function TokenPriceAndChain({
  chains,
  switchChain,
}: TokenPriceAndChainProps) {
  const [price, setPrice] = useState<number>(0);
  const chainId = getChainId(config);
  const availableChains = [
    {
      name: "Ethereum",
      chainId: chains[0].id,
      imageUrl: "/assets/icons/ethereum.svg",
    },
    {
      name: "Avalanche",
      chainId: chains[1].id,
      imageUrl: "/assets/icons/avalanche.svg",
    },
    {
      name: "Binance",
      chainId: chains[2].id,
      imageUrl: "/assets/icons/binance.svg",
    },
    {
      name: "Base",
      chainId: chains[3].id,
      imageUrl: "/assets/icons/base.svg",
    },
  ];

  useEffect(() => {
    const getTokenPrice = async () => {
      const price = await getCurrentPrice();
      setPrice(price);
    };
    getTokenPrice();
  }, []);

  return (
    <div className="flex flex-row lg:gap-24 mt-10 justify-between xl:justify-normal items-center">
      <div className="space-y-2">
        <div className="text-xs text-violet-400">TOKEN PRICE:</div>
        <div className="text-2xl text-white">
          1 TMT = ${price.toLocaleString("en-Us")}
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-xs text-violet-400">WE ACCEPT:</div>
        <div className="flex flex-row gap-5">
          {availableChains.map((chain, index) => (
            <button
              key={index}
              className={`border-b-2 pb-1 ${
                chainId === chain.chainId
                  ? "border-secondary"
                  : "border-transparent"
              }`}
              onClick={() => switchChain({ chainId: chain.chainId })}
            >
              <Image
                src={chain.imageUrl}
                width={chain.name === "Ethereum" ? 25 : 32}
                height={chain.name === "Ethereum" ? 25 : 32}
                alt="Menu"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
