import React from "react";

const ChatListElement = () => {
  return (
    <div className="w-full bg-gray-100 rounded-xl px-2 py-2 flex gap-3 items-center">
      <div className="overflow-hidden  w-10 h-10 rounded-full">
        <img
          className="h-full w-full object-cover rounded-full"
          src="https://res.cloudinary.com/surajgsn/image/upload/v1709554953/fkzh0a9sgc4rik8mqju6.png"
          alt=""
        />
      </div>
      <div className="flex flex-col ">
        <div className="text-black font-bold text-lg ">suraj singh</div>
        <div className="text-gray-400 text-sm "> hello</div>
      </div>
    </div>
  );
};

export default ChatListElement;
