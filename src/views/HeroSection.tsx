import ButtonList from "@/components/Hero/ButtonList";
import CommunityList from "@/components/Hero/CommunityList";
import PresaleForm from "@/components/Hero/PresaleForm";
import ReferralButton from "@/components/Hero/ReferralButton";
import BGParticles from "@/components/Particles";
import React from "react";

const HeroSection = () => {
  return (
    <>
      <section className="min-h-screen flex items-center pt-28 pb-20 xl:pt-0 xl:pb-0 px-8 z-20">
        <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-24 xl:gap-40 h-full text-white items-center">
          {/* TITLE */}
          <div className="flex flex-col gap-7 items-center xl:items-start">
            <h1 className="text-4xl leading-snug font-light text-center xl:text-left">
              Algorithmic & Blockchain Solutions for Crypto-Trading and Protect
              your Investments
            </h1>
            <p className="font-extralight text-violet-100 text-md text-center xl:text-left">
              Full transparency. More trust, Minimize risk, maximize rewards.
            </p>
            <ButtonList />
            <CommunityList />
            {/* <ReferralButton /> */}
          </div>

          {/* FORM */}
          <PresaleForm />
        </div>
      </section>
      <BGParticles />
    </>
  );
};

export default HeroSection;
