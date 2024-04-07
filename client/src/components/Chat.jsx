import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import ChatList from "./ChatList";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import { MdMessage } from "react-icons/md";
import { SERVER_URL } from '../../constant';


const Chat = () => {
  const [socket, setSocket] = useState(null);
  const { recipientId } = useParams();
  const [chatShow, setchatShow] = useState(false)

  const user = useSelector((state) => state.auth.user);

  

  const showchat = ()=>{
    setchatShow((prev)=>!prev)
  }

  

  return (
    <div className="w-full md:flex">
      <div className={`md:w-1/2 min-h-screen ${chatShow ? "block" : "hidden"} md:block`} >
        {recipientId === "id" ? (
          <div className="w-full min-h-screen flex-col text-[100px] bg-gray-300 flex justify-center items-center">
            <MdMessage />
            <span className="text-xl font-bold">Choose to message</span>
          </div>
        ) : (
          <ChatMessage togglechat={showchat} />
        )}
      </div>
      <div className={`w-full md:w-1/2 ${!chatShow ? "block" : "hidden"} md:block`}>
        <ChatList showchat={showchat}  />
      </div>
    </div>
  );
};

export default Chat;
