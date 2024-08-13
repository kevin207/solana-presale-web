"use client";
import React, { useEffect, useState } from "react";
import { Address } from "viem";
import PresaleCountdown from "./PresaleCountdown";
import RaisedAmount from "./RaisedAmount";
import PurchasedToken from "./PurchasedToken";
import TokenSupply from "./TokenSupply";
import TokenPriceAndChain from "./TokenPriceAndChain";
import BuyTokenButton from "./BuyTokenButton";
import ClaimToken from "./ClaimToken";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";

const PresaleForm = () => {
  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();

  const [selected, setSelected] = useState<string>("SOL");
  const [received, setReceived] = useState<string>("0");
  const [amount, setAmount] = useState<number>(0);
  const [refetch, setRefetch] = useState<boolean>(false);

  return (
    <div className="h-fit bg-violet-900/90 rounded-md w-full font-light">
      <div className="p-8">
        <PresaleCountdown />
        <TokenPriceAndChain />
        <RaisedAmount refetch={refetch} />
        <TokenSupply />

        {/* INPUT FIELD */}
        <div className="flex flex-row gap-8 items-center pt-8 pb-6">
          <div className="w-[50%] space-y-2">
            <label>
              Buy with{" "}
              <span
                onClick={() => {
                  setSelected("SOL");
                  setAmount(0);
                }}
                className={`${
                  selected === "SOL" && "text-main"
                } cursor-pointer hover:text-main`}
              >
                SOL
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
          refetch={refetch}
          amount={amount}
          setAmount={setAmount}
          selected={selected}
        />
      </div>

      {/* TOTAL PURCHASED & CLAIM */}
      {/* {status === "connected" && (
        <>
          <div className="w-full h-[1px] bg-violet-500" />
          <div className="flex flex-row gap-4 px-8 py-6 justify-between items-center">
            <PurchasedToken
              chainId={chainId}
              address={address}
              refetch={refetch}
              status={status}
            />
            <ClaimToken setTransactionHash={setTransactionHash} />
          </div>
        </>
      )} */}
    </div>
  );
};

export default PresaleForm;
