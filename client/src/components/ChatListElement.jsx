import React from "react";
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import {useSelector} from 'react-redux'
import axios from "axios";
import { useParams } from "react-router-dom";


const ChatListElement = (
  {
    name,
    avatar,
    state,
    country,
    id,
    showchat,
    toggleReload
  }
) => {
  const user = useSelector((state)=>state.auth.user);

  const { recipientId } = useParams();
  const navigate = useNavigate()


  

  const chat = ()=>{
    console.log(window.location.href)
    const url = window.location.href;
    const l = url.substring(21 , 34);
    navigate(l + id);
    showchat();
  }

  const deleteChat = async()=>{
    try {
      const response = await axios.post("/api/v1/message/deleteMessagesByUserId" , {
        userId:user._id,
        personId:id
      });
      console.log(response.data)
      console.log(recipientId)
      console.log(id)

      if(String(recipientId) == String(id)){
        console.log(window.location.href)
        const url = window.location.href;
        const l = url.substring(21 , 34);
        navigate(l + "id" );
      }

      toggleReload()
    } catch (error) {
      console.log(error)
    }
  }
  

  return (
    <div className="w-full bg-gray-100 rounded-xl px-2 py-2 flex gap-3 items-center relative" onClick={chat}>
      <div className="absolute top-2 right-2" onClick={deleteChat}><MdDelete /></div>
      <div className="overflow-hidden  w-10 h-10 rounded-full">
        <img
          className="h-full w-full object-cover rounded-full"
          src={avatar}
          alt=""
        />
      </div>
      <div className="flex flex-col ">
        <div className="text-black font-bold text-lg ">{name}</div>
        <div className="text-gray-400 text-sm "> {state} , {country}</div>
      </div>
    </div>
  );
};

export default ChatListElement;
