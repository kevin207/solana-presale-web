"use client";
import React, { useEffect, useState } from "react";
import { useAccount, useBalance, useSwitchChain } from "wagmi";
import { ConnectKitButton } from "connectkit";
import { buyWithETH, buyWithUSDT, countReceivedToken } from "@/utils/web3";
import { Address } from "viem";
import PresaleCountdown from "./PresaleCountdown";
import RaisedAmount from "./RaisedAmount";
import useWaitForTxAction from "@/hooks/waitTransaction";
import PurchasedToken from "./PurchasedToken";
import TokenSupply from "./TokenSupply";
import TokenPriceAndChain from "./TokenPriceAndChain";

const PresaleForm = () => {
  const { isConnecting, status, address } = useAccount();
  const [selected, setSelected] = useState<string>("ETH");
  const [received, setReceived] = useState<string>("0");
  const [amount, setAmount] = useState<number>(0);
  const [transactionHash, setTransactionHash] = useState<Address | undefined>();
  const [refetch, setRefetch] = useState<boolean>(false);
  const { chains, switchChain } = useSwitchChain();

  const maxUsdt = useBalance({
    address: address,
    token: "0xbDeaD2A70Fe794D2f97b37EFDE497e68974a296d",
  }).data?.formatted;
  const maxEth = useBalance({
    address: address,
  }).data?.formatted;

  const buyToken = async () => {
    if (!amount || amount <= 0) return;
    let result;

    // ETH
    if (selected === "ETH") {
      if (amount > parseFloat(maxEth as string)) {
        console.log("Insufficent Amount");
        return;
      }
      result = await buyWithETH(`${amount}`);
      if (result && result.includes("0x")) {
        console.log("Success Buy With ETH!");
        setAmount(0);
        setTransactionHash(result);
      } else {
        console.log("Cancelled / Failed");
      }
    }
    // USDT
    else if (selected === "USDT") {
      if (amount > parseFloat(maxUsdt as string)) {
        console.log("Insufficent Amount");
        return;
      }
      result = await buyWithUSDT(`${amount}`, address);
      if (result && result.includes("0x")) {
        console.log("Success Buy With USDT!");
        setAmount(0);
        setTransactionHash(result);
      } else {
        console.log("Cancelled / Failed");
      }
    }
  };
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
        <div className="flex flex-row gap-8 items-center pt-8">
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
      </div>

      {/* DIVIDER */}
      <div className="w-full h-[1px] bg-violet-500" />

      {/* BUY BUTTON & TOTAL PURCHASED */}
      <div className="flex flex-row gap-6 p-8 items-center">
        {status === "disconnected" || isConnecting ? (
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
                className="py-4 px-6 text-xs font-medium text-white bg-main rounded-sm hover:bg-secondary duration-500 ease-in-out"
              >
                Buy Tokens With 45% Off
              </button>
            )}
          </ConnectKitButton.Custom>
        )}

        <PurchasedToken address={address} refetch={refetch} status={status} />
      </div>
    </div>
  );
};

export default PresaleForm;
