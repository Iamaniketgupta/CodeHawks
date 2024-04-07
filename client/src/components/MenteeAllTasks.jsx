import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskSubmissionModal from "./TaskSubmissionModal";
import { SERVER_URL } from '../../constant';


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
        const response = await axios.post(SERVER_URL + "/api/v1/task/getAllMenteeTasks");
        // console.log(response.data.data);
        setTasks(response.data.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>

      <h2 className="text-3xl text-center font-bold mb-4 mt-3 ">
        My Tasks
      </h2>
    <div className="flex flex-col gap-4 text-black justify-center items-center" >
      <div className="w-full flex max-w-[700px] flex-col border-2 items-center gap-4 p-4">
        {tasks?.map((task) => (
          <div
            key={task._id}
            className=" w-[67%] cursor-pointer shadow-xl border-blue-400 border-2 rounded-xl p-4 mb-4 relative md:w-[600px]" 
            onClick={()=>{
              setTaskId(task._id)
              setTitle(task.task.title)
              setDescription(task.task.description)
              setShow(true)}}
          >
            <h3 className="text-lg font-bold h-7 mb-2">{task.task.title}</h3>
            <p className="text-gray-500 h-7 mb-2">{task.task.description}</p>
            <h3
              href={task.mentor.fullName}
              target="_blank"
              rel="noopener noreferrer"
              className=" font-bold text-decoration-none hover:underline text-xs bg-blue-500 text-white p-1 rounded-md absolute bottom-3 right-3 "
            >
              <span className="">Assigned by : </span>
              {task.mentor.fullName}
            </h3>
          </div>
        ))}
      </div>

        
      {show && (
        <TaskSubmissionModal showModal={show} setShowModal={setShow} taskId={taskId} title={title} description={description} />
      )}
    </div>
    </div>
  );
};

export default MenteeAllTasks;
