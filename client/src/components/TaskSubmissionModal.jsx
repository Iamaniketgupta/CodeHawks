import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

import { SERVER_URL } from '../../constant';
import { token } from "./constants";


const TaskSubmissionModal = ({
  showModal,
  setShowModal,
  taskId,
  title,
  description,
}) => {

  // asda
  const [githubLink, setGithubLink] = useState("");

  const [loading, setloading] = useState(false);

  const handleSubmit = async (e) => {
    setloading(true)
    e.preventDefault();
    if (
      title.trim() == "" ||
      description.trim() == "" ||
      githubLink.trim() == ""
    ) {
      alert("ALl fields required");
      return;
    }
    try {
      const response = await axios.post( SERVER_URL +"/api/v1/task//submit-task", {
        githubLink: githubLink,
        submitTaskId: taskId,
      },{ headers: { Authorization: `Bearer ${token}`}});
      // console.log(response.data)
      if(response){
        toast.success("Submitted successfully")
      }
    } catch (error) {
        
      toast.error("Error in submission . Please try again later");
      console.error("Error submitting task:", error);
    }finally{
        setloading(false);
        setShowModal(false)
    }
  };

  const closeModal = () => {
    // console.log(showModal);
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50" style={{zIndex:100}}>
          <div className="bg-gray-900 text-white w-[500px]  p-6 rounded-lg relative">
            <div className="absolute top-2 right-2 z-20">
              <button
                onClick={closeModal}
                className="text-gray-200 hover:text-red-500 focus:outline-none text-3xl"
              >
                ×
              </button>
            </div>

            <h2 className="text-xl font-bold mb-4">Submit Task</h2>
            <form onSubmit={handleSubmit} className="">
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-200"
                >
                  Title:
                </label>
                <div
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
                />
                {title}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-200"
                >
                  Description:
                </label>
                <div
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="3"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
                >
                  {description}
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="githubLink"
                  className="block text-sm font-medium text-gray-200"
                >
                  GitHub Link:
                </label>
                <input
                  type="text"
                  id="githubLink"
                  value={githubLink}
                  onChange={(e) => setGithubLink(e.target.value)}
                  className="mt-1 block text-black w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
                />
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  className="inline-block bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskSubmissionModal;
