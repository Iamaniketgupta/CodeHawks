import React, { useEffect, useState } from 'react';
import { Card } from "flowbite-react";
import './TaskCard.css';
import { FaShoppingBag } from "react-icons/fa";
import TaskSubmissionModal from './TaskSubmissionModal'

export default function TaskCard(props) {
  const {title,description,status,mentor,github,id,getTasks}=props;
  const [showModal, setshowModal] = useState(false);
  return (
    <div className="card col-lg-4 mb-2 text-xs taskcard">
    <div className="card-body">
      <h3 className="card-title text-title">{title}</h3>
      <p className="card-text">
      {description}
      </p>
      <p className="text-weight-bold">
      Mentor: {mentor.toString().toUpperCase()}
      </p>
      <p className="text-weight-bold">
      Status: <span className="badge bg-primary">{status.toString().toUpperCase()}</span>
      </p>
      <a href={github} target="_blank" className="text-weight-bold">
      GitHub: {github}
      <i className="fa fa-link" aria-hidden="true"></i>
      </a>
      <br/>
      <br/>
      <div className="badge bg-primary p-2" onClick={()=>{
        setshowModal(true)
      }}>Submit</div>
    </div>
    <TaskSubmissionModal showModal={showModal} getTasks={getTasks} setShowModal={setshowModal}  taskId={id} title={title} description={description} />
  </div>
  
  );
}
