import React, { useEffect, useState } from "react";
import ChatListElement from "./ChatListElement";
import { IoPersonAdd } from "react-icons/io5";
import { useSelector } from "react-redux";
import axios from "axios";

import { SERVER_URL } from '../../constant';

import { useNavigate } from 'react-router-dom';
import { token } from "./constants";

const ChatListForMentor = (
    {showchat}
) => {
  const [loading, setLoading] = useState(false);
  const [mentees, setMentees] = useState([]);
  const [chatHistory, setchatHistory] = useState([]);
  const [relaoad, setrelaoad] = useState(0);
  

  const user = useSelector((state) => state.auth.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [selectedUser, setSelectedUser] = useState('');
  
  const navigate = useNavigate()

  const refresh = async()=>{
    try {
      // console.log("first")
      const response = await axios.post(SERVER_URL + "/api/v1/mentee/getMenteeById" , {
        menteeId:selectedUser,headers: { Authorization: `Bearer ${token}`}
      },{ headers: { Authorization: `Bearer ${token}`}});
      
      // console.log(response.data.data);
      setchatHistory([...chatHistory , response.data.data])
      
    } catch (error) {
      console.log(error)
    }finally{
      
    }
  }


  
  const toggleReload = ()=>{
    setrelaoad((relaoad === 0) ? 1 : 0);
  }

  
  const handleAddUser = () => {
    // af
    
    // console.log(window.location.href)
    const url = window.location.href;
    const l = url.substring(21 , 34);
    navigate(l + selectedUser);
    // Close the modal after adding the user
    setIsModalOpen(false);

    // console.log("refre")
    refresh()
    // console.log(showchat)

  };


  async function getUsersWithHistory() {
    setLoading(true);
    try {
      const response = await axios.post(
        SERVER_URL + "/api/v1/message/getUsersWithChatHistory",
        {
          id: user._id,headers: { Authorization: `Bearer ${token}`}
        },{ headers: { Authorization: `Bearer ${token}`}}
      );
      // console.log(response.data.usersWithChatHistory);
      setchatHistory(response.data.usersWithChatHistory);

      // console.log(response.data.data);
      // setMentees(response.data.data)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchMentees() {
    setLoading(true);
    try {
      const response = await axios.post(
        SERVER_URL + "/api/v1/subscription/getUserSubscribers",
        {
          mentorId: user._id,headers: { Authorization: `Bearer ${token}`}
        },{ headers: { Authorization: `Bearer ${token}`}}
      );
      // console.log(response.data.data);
      // console.log(response.data.data);
      setMentees(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUsersWithHistory();
    fetchMentees()
  }, [loading , relaoad]);

  return (
    <div className="w-full min-h-screen relative">
      <div className="flex justify-between items-center p-3">
        <div className="font-bold text-lg text-black p-">Messages :</div>
        <div className=" flex w-min top-3 right-3 gap-2 justify-center items-center  border-[1px] text-white rounded-2xl mr-3  p-2 bg-indigo-500" onClick={()=>setIsModalOpen(true)}>
          <span className=" font-bold">Add </span>
          <IoPersonAdd />
        </div>
      </div>
      <div
        className="flex flex-col gap-3 px-1 max-h-[500px] overflow-scroll pb-4 "
        style={{ scrollbarWidth: "none" }}
      >
        {chatHistory.map((mentee) => (
          <ChatListElement
            key={mentee._id}
            name={mentee.fullName}
            avatar={mentee.avatar}
            state={mentee.state}
            country={mentee.country}
            id={mentee._id}
            showchat={showchat}
            toggleReload={toggleReload}
          />
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto ">
          <div className="flex items-center justify-center min-h-screen ">
            <div className="bg-white w-1/2 p-8 rounded shadow-md relative">
            <div className="absolute top-2 right-2 p-1 border-[1px] rounded-lg border-black" onClick={()=>setIsModalOpen(false)}> <button>close</button> </div>
              <h2 className="text-2xl font-bold mb-4">Add User</h2>
              
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="border border-gray-300 rounded mb-2 px-3 py-2 w-full"
              >
                <option value="">Select a user</option>
                {mentees.map(user => (
                  <option key={user._id} value={user._id}>{user.fullName}</option>
                ))}
              </select>

              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleAddUser}
              >
                Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatListForMentor;
