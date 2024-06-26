import React from "react";

const ButtonList = () => {
  return (
    <div className="flex flex-row gap-8">
      <button className="text-xs font-bold border-violet-400 border-2 py-3 px-8 rounded-sm hover:bg-teal-400 hover:border-teal-400 ease-in-out duration-500">
        WHITE PAPER
      </button>
      <button className="text-xs font-bold border-violet-400 border-2 py-3 px-8 rounded-sm hover:bg-teal-400 hover:border-teal-400 ease-in-out duration-500">
        ONE PAGER
      </button>
    </div>
  );
};

export default ButtonList;
