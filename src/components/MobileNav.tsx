"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { navigations } from "@/constants/common";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <button onClick={handleMenu}>
        <Image
          src="/assets/icons/hamburger.svg"
          width={36}
          height={36}
          alt="Menu"
          className="invert-colors md:hidden ml-2"
        />
      </button>
      <nav
        className={`flex lg:hidden flex-col left-0 top-0 w-full items-center justify-start h-fit py-5 bg-main ${
          isOpen ? "absolute" : "hidden"
        }`}
      >
        <div className="flex flex-row w-full h-full items-center justify-between px-3">
          <Link href="/" className="flex justify-center gap-1">
            <Image
              src="/assets/icons/icon-full.svg"
              width={300}
              height={60}
              alt="logo"
            />
          </Link>
          <button onClick={handleMenu} className="relative right-0">
            <Image
              src="/assets/icons/close.svg"
              width={36}
              height={36}
              alt="Menu"
              className=""
            />
          </button>
        </div>

        <ul className="flex flex-col w-full h-full items-start justify-start p-5 space-y-2">
          {navigations.map((nav, index: number) => (
            <li key={index}>
              <Link href={nav.path} onClick={handleMenu}>
                <span className="text-accent text-xl whitespace-nowrap">
                  {nav.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default MobileNav;
