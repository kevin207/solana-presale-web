import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaGithub,
  FaTelegramPlane,
} from "react-icons/fa";
import { IoLogoBitcoin } from "react-icons/io";

const CommunityList = () => {
  const comumunities = [
    {
      label: "Telegram",
      icon: <FaTelegramPlane />,
    },
    {
      label: "Facebook",
      icon: <FaFacebookF />,
    },
    {
      label: "Twitter",
      icon: <FaTwitter />,
    },
    {
      label: "Instagram",
      icon: <FaInstagram />,
    },
    {
      label: "Github",
      icon: <FaGithub />,
    },
    {
      label: "Bitcoin",
      icon: <IoLogoBitcoin />,
    },
  ];

  return (
    <div className="mt-4 flex flex-col gap-3">
      <div className="tracking-wider text-sm font-medium">
        JOIN OUR COMMUNITY
      </div>
      <div className="flex flex-row gap-2">
        {comumunities.map((community) => (
          <div
            className="h-8 w-8 cursor-pointer bg-violet-700  rounded-full flex items-center justify-center hover:bg-teal-400 ease-in-out duration-500"
            key={community.label}
          >
            {community.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityList;
