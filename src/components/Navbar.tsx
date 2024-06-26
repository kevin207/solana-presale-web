import Link from "next/link";
import React from "react";
import Image from "next/image";
import MobileNav from "./MobileNav";
import { navigations } from "@/constants/common";

const Navbar = () => {
  
  return (
    <nav className="flex flex-row w-full max-w-7xl justify-between items-center">
      <Link href="/" className="hidden lg:flex items-center gap-1">
        <Image src="/assets/icon-full.svg" width={300} height={60} alt="logo" />
      </Link>
      <Link href="/" className="flex: lg:hidden flex items-center gap-1">
        <Image src="/assets/icon-only.svg" width={60} height={60} alt="logo" />
      </Link>

      <ul className="hidden lg:flex flex-row gap-4">
        {navigations.map((nav, index: number) => (
          <li key={index}>
            <Link href={nav.path}>
              <span className="text-accent text-lg whitespace-nowrap">
                {nav.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex flex-row items-center justify-center">
        <button className="bg-main text-accent px-4 py-3 rounded-lg font-semibold whitespace-nowrap mr-2">
          Connect Wallet
        </button>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
