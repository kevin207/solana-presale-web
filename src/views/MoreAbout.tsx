import DisplayLottie from "@/components/DisplayLottie";
import Web3 from "../../public/assets/lotties/web3.json";

const MoreAbout = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-5 justify-center items-center px-5 py-20 bg-accent">
      <div className="flex">
        <DisplayLottie animationData={Web3} width="500px" height="500px" />
      </div>

      <div className="flex flex-col w-full h-full items-start justify-start space-y-10">
        <div className="flex flex-col w-full h-fit">
          <h2 className="text-secondary font-medium text-4xl mb-5 selection:bg-accent">
            Why $ICOX?
          </h2>
          <p className="font-light text-base selection:bg-main selection:text-accent mt-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            laudantium odit vero consectetur, doloribus sit sapiente ea,
            corrupti optio iste at possimus hic, fugiat illo. Et quia repellat
            ipsa quisasda.
          </p>
        </div>

        <div className="flex flex-col w-full h-fit">
          <h2 className="text-secondary font-medium text-4xl mb-5 selection:bg-accent">
            Mission
          </h2>
          <p className="font-light text-base selection:bg-main selection:text-accent mt-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            laudantium odit vero consectetur, doloribus sit sapiente ea,
            corrupti optio iste at possimus hic, fugiat illo. Et quia repellat
            ipsa quisasda.
          </p>
        </div>

        <div className="flex flex-col w-full h-fit">
          <h2 className="text-secondary font-medium text-4xl mb-5 selection:bg-accent">
            How $ICOX Works?
          </h2>
          <p className="font-light text-base selection:bg-main selection:text-accent mt-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            laudantium odit vero consectetur, doloribus sit sapiente ea,
            corrupti optio iste at possimus hic, fugiat illo. Et quia repellat
            ipsa quisasda.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MoreAbout;
