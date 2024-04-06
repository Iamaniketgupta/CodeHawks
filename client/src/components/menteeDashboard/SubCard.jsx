import React from 'react'

export default function SubCard(props) {
  return (
<>
<div className="card col-lg-4 mb-2  taskcard">
    <div className="card-body">
      <h1 className="card-title text-title">Mentor: {props.mentor}</h1>
      <h3 className="card-text">Price: {props.price}</h3>
      <p className="text-weight-bold">
      Status: <span className="badge bg-primary">{props.status.toString().toUpperCase()}</span>
      </p>
</div>
</div>
</>
)
}
