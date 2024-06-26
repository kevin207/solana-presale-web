import DisplayLottie from "@/components/DisplayLottie";
import React from "react";
import Blockchain from "../../public/assets/lotties/blockchain.json"

const About = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-5 justify-center items-center">
      <div className="flex flex-col w-full h-fit">
        <h2 className="text-main font-semibold text-2xl mb-5 selection:bg-accent">
          About Crypto ICO
        </h2>
        <p className="text-accent font-light text-base selection:bg-main selection:text-accent">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius,
          accusamus cupiditate quae placeat nulla alias. A obcaecati est, nihil
          ducimus quia labore omnis, accusamus molestias eveniet error suscipit
          sint inventore! Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Atque error sit sunt doloribus similique quae sequi aperiam
          totam? Eveniet sapiente non mollitia ducimus eligendi ut hic veniam,
          molestias obcaecati ipsum!
        </p>

        <p className="text-accent font-light text-base selection:bg-main selection:text-accent mt-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          laudantium odit vero consectetur, doloribus sit sapiente ea, corrupti
          optio iste at possimus hic, fugiat illo. Et quia repellat ipsa quis.
        </p>
      </div>

      <div className="flex">
        <DisplayLottie 
          animationData={Blockchain}
          width="500px"
          height="500px"
        />
      </div>
    </div>
  );
};

export default About;
