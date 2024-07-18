"use client";
import React, { useEffect, useState } from "react";
import { useAccount, useBalance, useSwitchChain } from "wagmi";
import { countReceivedToken } from "@/utils/web3";
import { Address } from "viem";
import PresaleCountdown from "./PresaleCountdown";
import RaisedAmount from "./RaisedAmount";
import useWaitForTxAction from "@/hooks/waitTransaction";
import PurchasedToken from "./PurchasedToken";
import TokenSupply from "./TokenSupply";
import TokenPriceAndChain from "./TokenPriceAndChain";
import { getChainId } from "@wagmi/core";
import { config } from "@/providers/web3-provider";
import BuyTokenButton from "./BuyTokenButton";
import ClaimToken from "./ClaimToken";

const PresaleForm = () => {
  const { status, address } = useAccount();
  const [selected, setSelected] = useState<string>("ETH");
  const [received, setReceived] = useState<string>("0");
  const [amount, setAmount] = useState<number>(0);
  const [transactionHash, setTransactionHash] = useState<Address | undefined>();
  const [refetch, setRefetch] = useState<boolean>(false);
  const { chains, switchChain } = useSwitchChain();
  const chainId = getChainId(config);
  const [activeChain, setActiveChain] = useState<number>();

  const addressMap: { [key: number]: Address } = {
    [chains[0].id]: "0x937d3C2aB9C83E06e9731C674743c8a5872DF5B5",
    [chains[1].id]: "0xCa7bA25356a7c9A4ea881bE7Fb716b1CB85B020e",
    [chains[2].id]: "0xa328acE32066A143Ba30a4767a24C0408EAA618B",
    [chains[3].id]: "0xCa7bA25356a7c9A4ea881bE7Fb716b1CB85B020e",
  };
  const interfaceAddress = addressMap[chainId];

  const maxUsdt = useBalance({
    address: address,
    token: interfaceAddress,
  }).data?.formatted;
  const maxEth = useBalance({
    address: address,
  }).data?.formatted;

  const action = () => {
    setRefetch(!refetch);
    setTransactionHash(undefined);
  };
  useWaitForTxAction({ txHash: transactionHash, action });

  useEffect(() => {
    const getReceivedToken = async () => {
      const receivedToken = await countReceivedToken(amount, selected);
      setReceived(receivedToken);
    };
    getReceivedToken();
  }, [amount, selected]);

  useEffect(() => {
    setActiveChain(chainId);
  }, [chainId]);

  return (
    <div className="h-fit bg-violet-900/90 rounded-md w-full font-light">
      <div className="p-8">
        <PresaleCountdown />
        <TokenPriceAndChain chains={chains} switchChain={switchChain} />
        <RaisedAmount refetch={refetch} />
        <TokenSupply />

        {/* INPUT FIELD */}
        <div className="flex flex-row gap-8 items-center pt-8 pb-6">
          <div className="w-[50%] space-y-2">
            <label>
              Buy with{" "}
              <span
                onClick={() => {
                  setSelected("ETH");
                  setAmount(0);
                }}
                className={`${
                  selected === "ETH" && "text-main"
                } cursor-pointer hover:text-main`}
              >
                {activeChain === chains[1].id
                  ? "AVAX"
                  : activeChain === chains[2].id
                  ? "BNB"
                  : "ETH"}
              </span>{" "}
              /{" "}
              <span
                onClick={() => {
                  setSelected("USDT");
                  setAmount(0);
                }}
                className={`${
                  selected === "USDT" && "text-main"
                } cursor-pointer hover:text-main`}
              >
                USDT
              </span>
            </label>
            <input
              max={
                selected === "ETH"
                  ? parseFloat(maxEth as string) || 0
                  : parseFloat(maxUsdt as string) || 0
              }
              min={0}
              type="number"
              value={amount}
              step="0.01"
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              className="py-2 px-4 rounded-md outline-none text-black w-full"
            />
          </div>

          <div className="w-[50%] space-y-2">
            <label>Received TMT</label>
            <input
              readOnly
              value={received}
              type="text"
              className="pointer-events-non py-2 px-4 rounded-md outline-none text-black w-full"
            />
          </div>
        </div>
        <BuyTokenButton
          maxEth={maxEth}
          maxUsdt={maxUsdt}
          amount={amount}
          setAmount={setAmount}
          userAddress={address}
          interfaceAddress={interfaceAddress}
          selected={selected}
          setTransactionHash={setTransactionHash}
        />
      </div>

      {/* TOTAL PURCHASED & CLAIM */}
      {status === "connected" && (
        <>
          <div className="w-full h-[1px] bg-violet-500" />
          <div className="flex flex-row gap-4 px-8 py-6 justify-between items-center">
            <PurchasedToken
              chainId={chainId}
              address={address}
              refetch={refetch}
              status={status}
            />
            <ClaimToken />
          </div>
        </>
      )}
    </div>
  );
};

export default PresaleForm;
