import Image from "next/image";
import { features, companies, resources } from "@/constants/common";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaGithub,
  FaTelegramPlane,
} from "react-icons/fa";
import { IoLogoBitcoin } from "react-icons/io";

const Footer = () => {
  const comumunities = [
    {
      label: "Telegram",
      icon: <FaTelegramPlane color="white" />,
    },
    {
      label: "Facebook",
      icon: <FaFacebookF color="white" />,
    },
    {
      label: "Twitter",
      icon: <FaTwitter color="white" />,
    },
    {
      label: "Instagram",
      icon: <FaInstagram color="white" />,
    },
    {
      label: "Github",
      icon: <FaGithub color="white" />,
    },
    {
      label: "Bitcoin",
      icon: <IoLogoBitcoin color="white" />,
    },
  ];

  return (
    <div className="flex flex-col w-full max-w-7xl gap-5 justify-start items-start px-5 pt-20">
      <div className="flex flex-col lg:flex-row w-full space-y-10 lg:space-y-0">
        <div className="flex flex-col w-full h-full space-y-2">
          <h3 className="text-2xl text-accent uppercase mb-5">Features</h3>
          {features.map((item, idx) => (
            <Link
              href={item.path}
              className="font-normal text-lg text-accent/80 hover:text-main duration-300"
              key={idx}
            >
              <span>{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="flex flex-col w-full h-full space-y-2">
          <h3 className="text-2xl text-accent uppercase mb-5">Resources</h3>
          {resources.map((item, idx) => (
            <Link
              href={item.path}
              className="font-normal text-lg text-accent/80 hover:text-main duration-300"
              key={idx}
            >
              <span>{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="flex flex-col w-full h-full space-y-2">
          <h3 className="text-2xl text-accent uppercase mb-5">Company</h3>
          {companies.map((item, idx) => (
            <Link
              href={item.path}
              className="font-normal text-lg text-accent/80 hover:text-main duration-300"
              key={idx}
            >
              <span>{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="flex flex-col w-full h-full space-y-5">
          <Link href="/">
            <Image
              src="/assets/icons/icon-full.svg"
              width={300}
              height={60}
              alt="logo"
            />
          </Link>

          <p className="font-normal text-lg text-accent/80 text-pretty">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem nulla.
          </p>

          <div className="flex flex-row gap-2">
            {comumunities.map((community) => (
              <div
                className="h-8 w-8 cursor-pointer bg-violet-700  rounded-full flex items-center justify-center hover:bg-main ease-in-out duration-300"
                key={community.label}
              >
                {community.icon}
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="w-full text-center text-accent my-10">
        <span>© 2024</span> All rights reserved
      </p>
    </div>
  );
};

export default Footer;
