import Image from "next/image";
import DisplayLottie from "@/components/DisplayLottie";
import Blockchain from "../../public/assets/lotties/blockchain.json";

const About = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-5 justify-center items-center px-5 py-20">
      <div className="flex flex-col w-full h-fit">
        <h2 className="text-main font-medium text-4xl mb-5 selection:bg-accent">
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
          optio iste at possimus hic, fugiat illo. Et quia repellat ipsa
          quisasda.
        </p>

        <div className="flex flex-col lg:flex-row w-full h-full items-center justify-center space-y-5 lg:space-x-5 lg:space-y-0 mt-10">
          <div className="flex flex-col items-center justify-center space-y-5">
            <div className="flex flex-row items-center justify-center space-x-5">
              <Image
                src="/assets/icons/check.svg"
                width={50}
                height={50}
                alt="check"
                className="bg-main rounded-full p-2 ring-2 ring-white"
              />
              <p className="font-light text-accent text-base">
                Makes you the sole owner of a secure decentralize registry
              </p>
            </div>
            <div className="flex flex-row items-center justify-center space-x-5">
              <Image
                src="/assets/icons/check.svg"
                width={50}
                height={50}
                alt="check"
                className="bg-secondary rounded-full p-2 ring-2 ring-white"
              />
              <p className="font-light text-accent text-base">
                Makes you the sole owner of a secure decentralize registry
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-5">
            <div className="flex flex-row items-center justify-center space-x-5">
              <Image
                src="/assets/icons/check.svg"
                width={50}
                height={50}
                alt="check"
                className="bg-main rounded-full p-2 ring-2 ring-white"
              />
              <p className="font-light text-accent text-base">
                Makes you the sole owner of a secure decentralize registry
              </p>
            </div>
            <div className="flex flex-row items-center justify-center space-x-5">
              <Image
                src="/assets/icons/check.svg"
                width={50}
                height={50}
                alt="check"
                className="bg-secondary rounded-full p-2 ring-2 ring-white"
              />
              <p className="font-light text-accent text-base">
                Makes you the sole owner of a secure decentralize registry
              </p>
            </div>
          </div>
        </div>
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
