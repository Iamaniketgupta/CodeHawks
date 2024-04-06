import React, { useEffect, useState } from 'react';
import TaskCard from './TaskCard';
import axios from 'axios';
import {Link} from 'react-router-dom';
export default function Taskbox(props) {
  const [tasks,setTasks]=useState([]);
  function getTasks(){
    if(props.type=="top"){
      (async ()=>{
      const response = await axios.post('/api/v1/task/getAllMenteeTasks');
      setTasks(response.data.data.slice(0,3));
      console.log(response.data.data);
      })();
    }
    else{
      (async ()=>{
        const response = await axios.post('/api/v1/task/getAllMenteeTasks');
        setTasks(response.data.data);
        })();
    }
  }
  useEffect(()=>{
    getTasks();
  },[])

  return (
    <>
    <br></br> 
    <div className="row justify-content-around">
    {
     tasks.length>0 && tasks.map((task)=>(
       <TaskCard key={task._id} getTasks={getTasks} id={task._id} title={task.task.title} github={task.task.githubLink} description={task.task.description} status={task.status} mentor={task.mentor.fullName}/>
      ))
    }  
    </div>
   { props.type=="top" && <div className="card m-2 taskcard float-right">
        <Link to="/mentee/dashboard/tasks" className='badge text-dark p-2  '>View More Tasks...</Link>
    </div>}
    </>
  );
}
