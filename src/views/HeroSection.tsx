import ButtonList from "@/components/Hero/ButtonList";
import CommunityList from "@/components/Hero/CommunityList";
import PresaleForm from "@/components/Hero/PresaleForm";
import React from "react";

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-violet-800 flex items-center pt-28 pb-20 lg:pt-0 lg:pb-0 px-8 ">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24 lg:gap-40 h-full text-white items-center">
        {/* TITLE */}
        <div className="flex flex-col gap-7 items-center lg:items-start">
          <h1 className="text-4xl leading-snug font-light text-center lg:text-left">
            Algorithmic & Blockchain Solutions for Crypto-Trading and Protect
            your Investments
          </h1>
          <p className="font-extralight text-violet-100 text-md text-center lg:text-left">
            Full transparency. More trust, Minimize risk, maximize rewards.
          </p>
          <ButtonList />
          <CommunityList />
        </div>

        {/* FORM */}
        <PresaleForm />
      </div>
    </section>
  );
};

export default HeroSection;
