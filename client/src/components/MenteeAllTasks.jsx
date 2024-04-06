import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskSubmissionModal from "./TaskSubmissionModal";

const MenteeAllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(0);
  const [show, setShow] = useState(false);
  const [taskId, setTaskId] = useState(null)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.post("/api/v1/task/getAllMenteeTasks");
        console.log(response.data.data);
        setTasks(response.data.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="flex flex-col text-black justify-center items-center w-full min-h-screen bg-gray-300" >
      <h2 className="text-2xl  font-bold mb-4 mt-3 bg-gray-400 rounded-xl px-4 py-2 ">
        My Tasks
      </h2>
      <div className="w-full flex flex-col items-center gap-4 p-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className=" w-full bg-gray-800 text-white rounded-lg p-4 mb-4 relative md:w-[700px]" 
            onClick={()=>{
              setTaskId(task._id)
              setTitle(task.task.title)
              setDescription(task.task.description)
              setShow(true)}}
          >
            <h3 className="text-lg font-bold h-7 mb-2">{task.task.title}</h3>
            <p className="text-gray-200 h-7 mb-2">{task.task.description}</p>
            <h3
              href={task.mentor.fullName}
              target="_blank"
              rel="noopener noreferrer"
              className=" font-bold hover:underline bg-gray-300 p-1 rounded-md   text-black absolute bottom-3 right-3 text-sm "
            >
              <span className="">Given by : </span>
              {task.mentor.fullName}
            </h3>
          </div>
        ))}
      </div>

        
      {show && (
        <TaskSubmissionModal showModal={show} setShowModal={setShow} taskId={taskId} title={title} description={description} />
      )}
    </div>
  );
};

export default MenteeAllTasks;
