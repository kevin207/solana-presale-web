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
            className="h-10 px-6 text-xs font-medium text-white bg-main rounded-md hover:bg-secondary duration-500 ease-in-out"
          >
            {isConnected ? (
              <div className="flex flex-row gap-2 items-center justify-center">
                <div className="w-6 h-6 bg-secondary rounded-full" />
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
