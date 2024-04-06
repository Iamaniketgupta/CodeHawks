import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import axios from 'axios'
import { MdMessage } from "react-icons/md";

const ChatMessage = ({
  togglechat
}) => {
  const user = useSelector((state) => state.auth.user);
  console.log(user);

  const close =()=>{
    togglechat()
  }

  


  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [myId, setmyId] = useState("");
  const { recipientId } = useParams();
  const [Socket, setSocket] = useState(null);
  const [recipient, setrecipient] = useState('');


  const getAllMsg = async()=>{
    try {
      const msg = await axios.post('http://localhost:8000/api/v1/message/getAllMessagesByUserId', {userId : user._id , personId : recipientId });
      console.log(msg.data.data)
      setMessages(msg.data.data)
    } catch (error) {
      console.log(error)
    }
  }


  const recipientDetails = async()=>{
    try {
      const response = await axios.post("/api/v1/message/getPersonById",{
        id:recipientId
      })
      console.log(response.data)
      setrecipient(response.data.data)
      
    } catch (error) {
      console.log(error)
      
    }

  }

  useEffect(() => {
    getAllMsg()
    const newSocket = io("http://localhost:8000"); // Replace with your server URL
    setSocket(newSocket);
    recipientDetails()

    

    return () => {
      newSocket.disconnect(); // Clean up socket connection when component unmounts
    };
  }, [recipientId]);

  useEffect(() => {
    if (Socket) {
      Socket.emit("login", user._id);
      // Listen for incoming messages
      Socket.on("message", (newMessage) => {
        console.log(newMessage);
        setMessages((prev) => [...prev, newMessage]);
      });
    }
  }, [Socket, user._id , recipientId]);

  const sendMessage = (e) => {
    e.preventDefault();

    if (message.trim() !== "") {
      // Emit message to server
      const msg = {
        senderId:user._id,
        message:message
      }
      setMessages((prev) => [...prev, msg]);

      Socket.emit("message", {
        senderId: user._id,
        recipientId: recipientId,
        message,
      });
      setMessage("");
    }
  };


  return (
    <div className="w-full p-1 min-h-screen ">
      <div className="w-full bg-white my-2 flex  items-center gap-2 relative">
        <div onClick={close} className=" md:hidden absolute top-1 right-2 px-2 py-1 border-[1px] border-black rounded-xl">
          <button>Close</button>
        </div>

        <div className="overflow-hidden rounded-full w-[30px] h-[30px] ">
          <img
            className="w-full object-cover h-full rounded-full "
            src="https://res.cloudinary.com/surajgsn/image/upload/v1709554953/fkzh0a9sgc4rik8mqju6.png"
            alt=""
          />
        </div>
        <div className="font-bold text-lg ">Suraj singh</div>
      </div>
      <div className="flex flex-col flex-auto min-h-sceen ">
        <div className="flex flex-col flex-auto flex-shrink-0  bg-gray-100 h-full p-2 relative min-h-screen ">
          <div
            className="flex flex-col h-screen overflow-x-auto pb-14 overflow-scroll  "
            style={{ scrollbarWidth: "none" }}
          >
            <div className="flex flex-col h-full ">
              <div className="grid grid-cols-12 gap-y-2 pb-14">

                {messages.map((msg, index) => {
                  
                    if(user._id != msg.senderId) return(
                      <div
                        key={index}
                        className="col-start-1 col-end-11 p-3 rounded-lg"
                      >
                        <div className="flex flex-row items-center">
                          <div className="flex items-center overflow-hidden justify-center h-8 w-8 rounded-full bg-indigo-500 flex-shrink-0">
                            <img
                              className="w-full h-full object-cover"
                              src={recipient.avatar}
                              alt=""
                            />
                          </div>
                          <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                            <div>{msg.message}</div>
                          </div>
                        </div>
                      </div>
                    );
                  
                  
                    return (
                      <div
                        key={index}
                        className="col-start-2 col-end-13 p-3 rounded-lg"
                      >
                        <div className="flex items-center justify-start flex-row-reverse">
                          <div className="flex items-center overflow-hidden justify-center h-8 w-8 rounded-full bg-indigo-500 flex-shrink-0">
                            <img
                              className={user.avatar}
                              alt=""
                            />
                          </div>
                          <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                            <div>{msg.message}</div>
                          </div>
                        </div>
                      </div>
                    );
                  
                })}
              </div>
            </div>
          </div>
          
          <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4 absolute bottom-2 right-0">
            <div className="flex-grow ml-4">
              <div className="relative w-full">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  type="text"
                  className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                />
              </div>
            </div>
            <div className="ml-4">
              <button
                className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                onClick={sendMessage}
              >
                <span>Send</span>
                <span className="ml-2">
                  <svg
                    className="w-4 h-4 transform rotate-45 -mt-px"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
