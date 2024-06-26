"use client";

import { ConnectKitButton } from "connectkit";
import React from "react";

const ConnectWallet = () => {
  return (
    <>
      <ConnectKitButton.Custom>
        {({ show, truncatedAddress, isConnected }) => (
          <button
            onClick={show}
            className="h-10 px-4 text-xs font-medium text-white bg-main rounded-md hover:bg-secondary duration-500 ease-in-out"
          >
            {isConnected ? (
              <div className="flex flex-row gap-3 items-center justify-center">
                <div className="w-6 h-6 bg-gradient-to-b from-pink-800 from-0% via-purple-500 via-0% to-fuchsia-500 rounded-full" />
                <div>{truncatedAddress}</div>
              </div>
            ) : (
              "Connect Wallet"
            )}
          </button>
        )}
      </ConnectKitButton.Custom>
    </>
  );
};

export default ConnectWallet;
