import Link from "next/link";
import React from "react";
import Image from "next/image";
import MobileNav from "./MobileNav";
import { navigations } from "@/constants/common";
import ConnectWallet from "./ConnectWallet";

const Navbar = () => {
  return (
    <nav className="bg-violet-800 z-10 fixed top-0 py-4 flex flex-row w-full max-w-7xl justify-between px-8 lg:px-0 items-center">
      <Link href="/" className="hidden lg:flex items-center gap-1">
        <Image
          src="/assets/icons/icon-full.svg"
          width={250}
          height={60}
          alt="logo"
        />
      </Link>
      <Link href="/" className="flex: lg:hidden flex items-center gap-1">
        <Image
          src="/assets/icons/icon-only.svg"
          width={60}
          height={60}
          alt="logo"
        />
      </Link>

      <ul className="hidden lg:flex flex-row gap-8">
        {navigations.map((nav, index: number) => (
          <li key={index}>
            <Link href={nav.path}>
              <span className="text-accent text-sm font-medium whitespace-nowrap hover:text-main duration-300">
                {nav.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex flex-row items-center justify-center">
        <ConnectWallet />
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
