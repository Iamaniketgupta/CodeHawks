import React, { useState } from 'react'
import ChatListElement from './ChatListElement'
import { IoPersonAdd } from "react-icons/io5";

const ChatList = () => {
  
  
  return (
    <div className='w-full min-h-screen relative'>
        <div className='flex justify-between items-center p-3'>
        <div  className='font-bold text-lg text-black p-'>
          Messages :
        </div>
        <div className=' flex w-min top-3 right-3 gap-2 justify-center items-center  border-[1px] text-white rounded-2xl mr-3  p-2 bg-indigo-500'>
        <span className=' font-bold'>Add </span><IoPersonAdd /> 
        </div>
        </div>
        <div className='flex flex-col gap-3 px-1 max-h-[500px] overflow-scroll pb-4 ' style={{scrollbarWidth:'none'}}>
          <ChatListElement/>
          <ChatListElement/>
          <ChatListElement/>
          <ChatListElement/>
          <ChatListElement/>
          <ChatListElement/>
          <ChatListElement/>
          <ChatListElement/>
          <ChatListElement/>
          <ChatListElement/>
        </div>


        


    </div>
  )
}

export default ChatList