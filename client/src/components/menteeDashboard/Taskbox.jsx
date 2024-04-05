import React, { useEffect, useState } from 'react';
import TaskCard from './TaskCard';
import axios from 'axios';
import {Link} from 'react-router-dom';
export default function Taskbox(props) {
  const [tasks,setTasks]=useState([]);
  useEffect(()=>{
    if(props.type=="top"){
    (async ()=>{
    const response = await axios.get('/api/v1/task/get-top-task');
    setTasks(response.data);
    })();
  }
  else{
    (async ()=>{
      const response = await axios.get('/api/v1/task/get-all-task');
      setTasks(response.data);
      })();
  }
  },[])

  return (
    <>
    <br></br>
    <div className="row justify-content-around">
    {
     tasks.length>0 && tasks.map((task)=>(
       <TaskCard key={task._id} title={task.title} description={task.description} status={task.status} mentor={task.mentor}/>
      ))
    }  
    </div>
   { props.type=="top" && <div className="card m-2 taskcard float-right">
        <Link to="/mentee/dashboard/tasks" className='badge text-dark p-2  '>View More Tasks...</Link>
    </div>}
    </>
  );
}
