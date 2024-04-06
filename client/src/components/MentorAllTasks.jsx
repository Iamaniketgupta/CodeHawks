import React, { useEffect, useState } from 'react';
import axios from 'axios';

import toast from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";import { MdDelete } from "react-icons/md";

const MentorAllTasks = () => {

  const [tasks, setTasks] = useState([]);
  const [showModal, setshowModal] = useState(false);
  const [taskId, settaskId] = useState(null)
  const [onConfirm, setonConfirm] = useState(false)

  const handleConfirm = async() => {
    // Call the onConfirm function passed as prop
  
      try {
        const response = await axios.post("api/v1/task/deleteTask" , {taskId})
        console.log(response.data);
        toast.success("Task deleted successfully");
        
      } catch (error) {
        toast.error("Error while deleting task");
      }
      
    

    // Close the modal
    setshowModal(false);
  };

  const closeModal = () => {
    setshowModal(false);
  };
  

  useEffect(() => {
    // Fetch tasks assigned by the mentor to mentees
    const fetchTasks = async () => {
      try {
        const response = await axios.post('/api/v1/task/getAllTasks');
        console.log(response.data)
        setTasks(response.data.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [showModal]);

  return (
    <div className='flex flex-col text-black justify-center items-center w-full min-h-screen bg-gray-300'>
      <h2 className="text-2xl  font-bold mb-4 mt-3 bg-gray-400 rounded-xl px-4 py-2 ">Mentor Tasks</h2>
      {tasks.map(task => (
        <div key={task._id} className="mb-4 w-[70%] p-4 border rounded-xl bg-gray-800 text-white relative">
          <div className='absolute top-3 right-3 text-white text-xl' onClick={()=>{
            settaskId(task._id)
            setshowModal(true)
          }} ><MdDelete /></div>
          <h3 className="text-lg font-bold mb-2 h-7 overflow-hidden">{task.title}</h3>
          <p className="text-gray-200 mb-2 h-7 overflow-hidden">{task.description}</p>
          <a
            href={task.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className= " font-bold hover:underline text-blue-400 "
          >
            GitHub Link
          </a>
        </div>
      ))}


{showModal && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg relative">
            <div className="absolute top-2 right-2 z-20">
              <button
                onClick={closeModal}
                className="text-gray-600 hover:text-gray-800 focus:outline-none text-3xl"
              >
                ×
              </button>
            </div>

            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p className="mb-4">Are you sure you want to delete?</p>
            <div className="text-right">
              <button
                onClick={handleConfirm}
                className="inline-block bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-500 mr-2"
              >
                Confirm
              </button>
              <button
                onClick={closeModal}
                className="inline-block bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorAllTasks;
