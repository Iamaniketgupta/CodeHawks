import React, { useEffect, useState } from 'react'
import ChatListElement from './ChatListElement'
import { IoPersonAdd } from "react-icons/io5";
import axios from 'axios'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { SERVER_URL } from '../../constant';
import { token } from './constants';


const ChatList = (
  {
    showchat,
    
  }
) => {

  const  navigate = useNavigate()


  const [mentors, setmentors] = useState([]);
  const [chatHistoryList, setchatHistoryList] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [relaoad, setrelaoad] = useState(0);
  
  const [selectedUser, setSelectedUser] = useState('');

  const user = useSelector((state)=>state.auth.user)
  // console.log(mentors)

  const refresh = async()=>{
    try {
      // console.log("first")
      // console.log(selectedUser)
      const response = await axios.post(SERVER_URL + "/api/v1/mentor/getMentorById" , {
        mentorId:selectedUser,headers: { Authorization: `Bearer ${token}`}
      },{ headers: { Authorization: `Bearer ${token}`}});
      // console.log(response.data.data);
      
      setchatHistoryList([...chatHistoryList , response.data.data])
      
    } catch (error) {
      console.log(error)
    }finally{
      
    }
  }

  

  
  const handleAddUser = () => {
    
    
    // console.log(window.location.href)
    const url = window.location.href;
    const l = url.substring(21 , 34);
    navigate(l + selectedUser);
    // Close the modal after adding the user
    setIsModalOpen(false);
    showchat()
    refresh()

  };


  async function fetchMentorList(){
    try {
      const response = await axios.get(SERVER_URL + "/api/v1/subscription/getMenteeSubscriptions",{ headers: { Authorization: `Bearer ${token}`}});
      // console.log(response.data);
      setmentors(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  
  async function getUsersWithHistory() {
    // setLoading(true);
    try {
      const response = await axios.post(
        SERVER_URL + "/api/v1/message/getUsersWithChatHistory",
        {
          id: user._id,headers: { Authorization: `Bearer ${token}`}
        },{ headers: { Authorization: `Bearer ${token}`}}
      );
      // console.log(response.data);
      setchatHistoryList(response.data.usersWithChatHistory);
      // console.log(response.data.data);
      // setMentees(response.data.data)
    } catch (error) {
      console.log(error);
    } finally {
      // setLoading(false);
    }
  }

  const toggleReload = ()=>{
    setrelaoad((relaoad === 0) ? 1 : 0);
  }


  useEffect(() => {
    fetchMentorList()
    getUsersWithHistory()
    
  }, [relaoad])
  
  
  
  return (
    <div className='w-full min-h-screen relative'>
        <div className='flex justify-between items-center p-3'>
        <div  className='font-bold text-lg text-black p-'>
          Messages :
        </div>
        <div onClick={()=>setIsModalOpen(true)} className=' flex w-min top-3 right-3 gap-2 justify-center items-center  border-[1px] text-white rounded-2xl mr-3  p-2 bg-indigo-500'>
        <span className=' font-bold'>Add </span><IoPersonAdd /> 
        </div>
        </div>
        <div className='flex flex-col gap-3 px-1 max-h-[500px] overflow-scroll pb-4 ' style={{scrollbarWidth:'none'}}>
          {chatHistoryList.map((user , index)=>(
            <ChatListElement
            key={index}
            name={user.fullName}
            avatar={user.avatar}
            state={user.state}
            country={user.country}
            id={user._id}
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
                {mentors.map((user) => (
                  <option key={user.mentor._id} value={user.mentor._id}>{user.mentor.fullName}</option>
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
  )
}

export default ChatList