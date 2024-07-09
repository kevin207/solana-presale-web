"use client";
import React, { useEffect, useState } from "react";
import { FaEthereum } from "react-icons/fa";
import { useAccount, useBalance } from "wagmi";
import { ConnectKitButton } from "connectkit";
import {
  buyWithETH,
  buyWithUSDT,
  countReceivedToken,
  getCurrentPrice,
  getUserPurchasedToken,
  getTotalSupply,
} from "@/utils/web3";
import PresaleCountdown from "./PresaleCountdown";

const PresaleForm = () => {
  const { isConnecting, status, address } = useAccount();
  const [price, setPrice] = useState<number>(0);
  const [totalSupply, setTotalSupply] = useState<number>(0);
  const [selected, setSelected] = useState<string>("ETH");
  const [received, setReceived] = useState<string>("0");
  const [purchased, setPurchased] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);

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
    if (selected === "ETH") {
      if (amount > parseFloat(maxEth as string)) {
        console.log("Insufficent Amount");
        return;
      }

      result = await buyWithETH(`${amount}`);
      if (result && result.includes("0x")) {
        console.log("Success Buy With ETH!");
        setAmount(0);
      } else {
        console.log("Cancelled / Failed");
      }
    } else if (selected === "USDT") {
      if (amount > parseFloat(maxUsdt as string)) {
        console.log("Insufficent Amount");
        return;
      }

      result = await buyWithUSDT(`${amount}`);
      if (result && result.includes("0x")) {
        console.log("Success Buy With USDT!");
        setAmount(0);
      } else {
        console.log("Cancelled / Failed");
      }
    }
  };

  useEffect(() => {
    const getTokenPrice = async () => {
      const price = await getCurrentPrice();
      setPrice(price);
    };
    const getTokenSupply = async () => {
      const supply = await getTotalSupply();
      setTotalSupply(supply);
    };

    getTokenPrice();
    getTokenSupply();
  }, []);

  useEffect(() => {
    const getReceivedToken = async () => {
      const receivedToken = await countReceivedToken(amount, selected);
      setReceived(receivedToken);
    };
    getReceivedToken();
  }, [amount, selected]);

  useEffect(() => {
    if (address) {
      const getPurchasedToken = async () => {
        const totalPurchased = await getUserPurchasedToken(address);
        setPurchased(totalPurchased);
      };

      getPurchasedToken();
    }
  }, [address]);

  return (
    <div className="h-fit bg-violet-900 rounded-md w-full font-light">
      <div className="p-8">
        <PresaleCountdown />

        {/* TOKEN PRICE & ACCEPTED CHAIN */}
        <div className="flex flex-row lg:gap-24 mt-12 justify-between lg:justify-normal">
          <div className="space-y-2">
            <div className="text-xs text-violet-400">TOKEN PRICE:</div>
            <div className="text-2xl text-white">
              1 TMT = ${price.toLocaleString("en-Us")}
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs text-violet-400">WE ACCEPT:</div>
            <div className="flex flex-row gap-1 items-center text-2xl">
              <FaEthereum />
              <div className="text-white">ETH</div>
            </div>
          </div>
        </div>

        {/* TOKEN SUPPLY */}
        <div className="flex flex-row gap-4 mt-12 items-center">
          <div className="text-xs text-violet-400">
            TOKEN AVAILABLE ON PRE-SALE:
          </div>
          <div className="flex flex-row text-2xl">
            {totalSupply.toLocaleString("en-Us")}{" "}
            <span className="ml-2">TMT</span>
          </div>
        </div>

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

        <div className={`${status !== "connected" && "hidden"}`}>
          <div className="text-xs text-violet-400">PURCHASED TOKEN</div>
          <div>{purchased.toLocaleString("en-US")} TMT</div>
        </div>
      </div>
    </div>
  );
};

export default PresaleForm;
