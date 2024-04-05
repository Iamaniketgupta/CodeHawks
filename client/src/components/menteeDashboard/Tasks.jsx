import React from 'react';
import Taskbox from './Taskbox';

export default function Tasks() {
  return (
    <>
<section className="home-section">
<div><h2 className='mt-3 text-md taskhead'><i className="fa fa-clock-o" aria-hidden="true"></i> My Tasks</h2></div>
<Taskbox type="all"/>
</section>
    </>
  )
}
