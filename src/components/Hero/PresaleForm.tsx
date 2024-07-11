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

const PresaleForm = () => {
  const { status, address } = useAccount();
  const [selected, setSelected] = useState<string>("ETH");
  const [received, setReceived] = useState<string>("0");
  const [amount, setAmount] = useState<number>(0);
  const [transactionHash, setTransactionHash] = useState<Address | undefined>();
  const [refetch, setRefetch] = useState<boolean>(false);
  const { chains, switchChain } = useSwitchChain();
  const chainId = getChainId(config);

  const addressMap: { [key: number]: Address } = {
    [chains[0].id]: "0xbDeaD2A70Fe794D2f97b37EFDE497e68974a296d",
    [chains[1].id]: "0x4c45893f54b52faB271A6b0B78770b891fBfD336",
    [chains[2].id]: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
    [chains[3].id]: "0x22F2D35C812Ad4Fe5B8AA3658a5E3Fc1c3D7bA27",
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
                ETH
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
              address={address}
              refetch={refetch}
              status={status}
            />
            <button className="py-4 px-8 w-fit text-xs font-medium text-white bg-tertiary rounded-sm duration-500 ease-in-out">
              Claim Token
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PresaleForm;
