import { Card } from "flowbite-react";
import './TaskCard.css';
export default function Taskbox(props) {
  const {title,description,status,mentor}=props;
  return (
    <div className="card col-lg-4 mb-2  taskcard">
    <div className="card-body">
      <h3 className="card-title text-weight-bold">{title}</h3>
      <p className="card-text">
      {description}
      </p>
      <p className="text-weight-bold">
      Mentor: {mentor.toString().toUpperCase()}
      </p>
      <p className="text-weight-bold">
      Status: <span className="badge bg-primary">{status.toString().toUpperCase()}</span>
      </p>
    </div>
  </div>
  
  );
}
