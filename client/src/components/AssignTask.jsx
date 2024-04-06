import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { useSelector } from "react-redux";
import axios from 'axios';
const AssignTask = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [mentees, setmentees] = useState([])
  const [loading, setLoading] = useState(false); 


  const user = useSelector((state)=>state.auth.user);
  // console.log(mentees)

// console.log(user._id)
  const getMentees = async()=>{
    setLoading(true)
    try {
      const response = await axios.post("/api/v1/subscription/getUserSubscribers" , {
        mentorId:user._id
      });
      // console.log(response.data.data)
      setmentees(response.data.data)
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }



  // console.log(selectedUsers)
  // Function to handle form submission
  const handleSubmit =async (e) => {
    setLoading(true)

    e.preventDefault();

    try {
      // console.log(selectedUsers)
      const response = await axios.post("/api/v1/task/assign-task" , {
          title,
          description,
          githubLink,
          mentor:user._id,
          menteeIds:selectedUsers
      });
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  };


  const handleChange = (selectedOptions) => {
    setSelectedUsers(selectedOptions.map(option => option.value));
  };

  // console.log(mentees)

  const options = mentees.map(user => ({ value: user.id, label: user.name }));

  useEffect(() => {
    getMentees()
  }, [])
  

  return (
    <div className="max-w-md mx-auto mt-8 p-6  rounded-lg shadow-md w-full min-h-screen bg-gray-300">
      <form onSubmit={handleSubmit}>
        {/* Select Mentees */}
        <h2 className="text-2xl font-bold mb-4">Assign Task</h2>

        <label
          htmlFor="mentees"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Select Mentees:
        </label>
        <Select
        
          id="mentees"
          name="mentees"
          options={options}
          isMulti
          onChange={handleChange}
          className="mb-4"
        />

        {/* Task Title */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 rounded-md shadow-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        {/* Task Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            rows="3"
            className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 rounded-md shadow-sm"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        
        {/* Github Link */}
        <div className="mb-4">
          <label
            htmlFor="githubLink"
            className="block text-sm font-medium text-gray-700"
          >
            Github Link:
          </label>
          <input
            type="text"
            id="githubLink"
            name="githubLink"
            className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 rounded-md shadow-sm"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            required
          />
        </div>
        
        {/* Submit Button */}
         <div className="mt-6">
          <button
            type="submit"
            className="inline-block bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
            disabled={loading} // Disable button when loading is true
          >
            {loading ? 'Assigning Task...' : 'Assign Task'}
          </button>
          {loading && <div className="loader">Loading...</div>} {/* Render loader if loading is true */}
        </div>
      </form>
    </div>
  );
};

export default AssignTask;
