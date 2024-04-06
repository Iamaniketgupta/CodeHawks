import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MentorAllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const dummyTasks = [
    {
      _id: '1',
      title: 'Task 1',
      description: 'Description for Task 1',
      githubLink: 'https://github.com/user1/repo1',
    },
    {
      _id: '2',
      title: 'Task 2',
      description: 'Description for Task 2',
      githubLink: 'https://github.com/user2/repo2',
    },
    {
      _id: '3',
      title: 'Task 3',
      description: 'Description for Task 3',
      githubLink: 'https://github.com/user3/repo3',
    },
  ];
  

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
  }, []);

  return (
    <div className='flex flex-col text-black justify-center items-center w-full min-h-screen bg-gray-300'>
      <h2 className="text-2xl  font-bold mb-4 mt-3 bg-gray-400 rounded-xl px-4 py-2 ">Mentor Tasks</h2>
      {tasks.map(task => (
        <div key={task._id} className="mb-4 w-[70%] p-4 border rounded-xl bg-gray-800 text-white">
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
    </div>
  );
};

export default MentorAllTasks;
