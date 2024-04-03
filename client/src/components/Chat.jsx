import React, { useEffect, useState } from 'react'
import ChatMessage from './ChatMessage'
import ChatList from './ChatList'
import {useSelector} from 'react-redux'
import io from 'socket.io-client';

const Chat = () => {
  
  const [socket, setSocket] = useState(null);
  
  

  const user = useSelector((state)=>state.auth.user);




  return (
    <div className='flex' >
        <div className='w-1/2 min-h-screen' >
            <ChatMessage />
        </div>
        <div className='w-1/2' >
            <ChatList/>
        </div>
    </div>
  )
}

export default Chat