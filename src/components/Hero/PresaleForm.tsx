"use client";
import React, { useEffect, useState } from "react";
import CustomCountdown from "./CustomCountdown";
import { FaEthereum } from "react-icons/fa";
import { useAccount, useBalance } from "wagmi";
import { ConnectKitButton } from "connectkit";
import {
  buyWithETH,
  buyWithUSDT,
  getCurrentPrice,
  getTotalSupply,
} from "@/utils/web3";

const PresaleForm = () => {
  const { isConnecting, status, address } = useAccount();
  const [price, setPrice] = useState<number>(0);
  const [totalSupply, setTotalSupply] = useState<string>("0");
  const [selected, setSelected] = useState<string>("ETH");
  const [amount, setAmount] = useState<number>(0);
  const [received, setReceived] = useState<number>(0);

  const maxUsdt = useBalance({
    address: address,
    token: "0xbDeaD2A70Fe794D2f97b37EFDE497e68974a296d",
  }).data?.formatted;
  const maxEth = useBalance({
    address: address,
  }).data?.formatted;

  const buyToken = async () => {
    if (amount <= 0) {
      console.log("Invalid Value");
      return;
    }

    let result;
    if (selected === "ETH") {
      result = await buyWithETH(`${amount}`);
      if (result && result.includes("0x")) {
        console.log("Success Buy With ETH!");
      } else {
        console.log("Cancelled / Failed");
      }
    } else if (selected === "USDT") {
      result = await buyWithUSDT(`${amount}`);
      if (result && result.includes("0x")) {
        console.log("Success Buy With USDT!");
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

  return (
    <div className="h-fit bg-violet-900 rounded-md w-full font-light">
      <div className="p-8">
        <div className="text-center text-2xl mb-5 font-light">
          Pre-sale Ends In
        </div>
        <CustomCountdown />

        <div className="flex flex-row lg:gap-24 mt-12 justify-between lg:justify-normal">
          <div className="space-y-2">
            <div className="text-xs text-violet-400">TOKEN PRICE:</div>
            <div className="text-2xl text-white">1 TMX = ${price}</div>
          </div>

          <div className="space-y-2">
            <div className="text-xs text-violet-400">WE ACCEPT:</div>
            <div className="flex flex-row gap-1 items-center text-2xl">
              <FaEthereum />
              <div className="text-white">ETH</div>
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-4 mt-12 items-center">
          <div className="text-xs text-violet-400">
            TOKEN AVAILABLE ON PRE-SALE:
          </div>
          <div className="flex flex-row text-2xl">
            {totalSupply} <span className="ml-2">TMX</span>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-8 items-center px-8 pb-8">
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
                ? parseFloat(maxEth as string)
                : parseFloat(maxUsdt as string)
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
          <label>Received TMX</label>
          <input
            value={0}
            type="text"
            className="pointer-events-none py-2 px-4 rounded-md outline-none text-black w-full"
          />
        </div>
      </div>

      {/* DIVIDER */}
      <div className="w-full h-[1px] bg-violet-500" />

      <div className="flex flex-row gap-6 p-8 items-center">
        {status === "disconnected" || isConnecting ? (
          <ConnectKitButton.Custom>
            {({ show }) => (
              <button
                onClick={show}
                className="py-4 px-6 text-xs font-medium text-white bg-main rounded-sm hover:bg-secondary duration-500 ease-in-out"
              >
                Connect Wallet
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

        <div>
          <div className="text-xs text-violet-400">MINUMUM PURCHASE</div>
          <div>10,000 TMX</div>
        </div>
      </div>
    </div>
  );
};

export default PresaleForm;
