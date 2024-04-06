import React from 'react'

export default function SubCard(props) {
  return (
<>
<div className="card col-lg-4 mb-2  taskcard">
  
    <div className="card-body">
      <p className="card-title text-md">Mentor: {props?.mentor}</p>
      <h3 className="card-text">Price: {props.price}</h3>
      <p className="text-weight-bold">
      Status: <span className="badge bg-primary">{props.status.toString().toUpperCase()}</span>
      </p>
</div>
</div>
</>
)
}
