import React, { useEffect, useState } from 'react';
import SubCard from './SubCard';
import axios from 'axios';
import {Link} from 'react-router-dom';
export default function SubBox(props) {
    const [subs,setSubs]=useState([]);
function getSubs(){
    try {
      if(props.type=="top"){
          (async ()=>{
              const response = await axios.get('/api/v1/subscription/getMenteeSubscriptions');
              setSubs(response.data.data.slice(0,3));
              console.log(response.data.data);
          })();
        }
        else{
          (async ()=>{
               const response = await axios.get('/api/v1/subscription/getMenteeSubscriptions');
               setSubs(response.data.data);
               console.log(response.data.data);
            })();
        }
    } catch (error) {
      console.log(error)
    }
}
    useEffect(()=>{
 getSubs();
  },[]) 

  return (
    <>
    <br></br> 
    <div className="row justify-content-around">
    {
        subs.length === 0 && (
          <div className='w-full h-full flex justify-center items-center font-bold text-2xl text-gray-300'>
            No subscription found

          </div>
        )
      }
    {
     subs.length>0 && subs.map((sub)=>(
       <SubCard key={sub._id} price={sub.price} status={sub.status} mentor={sub.mentor.fullName} getsubs={getSubs} />
      ))
    }  
    </div>
   { props.type=="top" && <div className="card m-2 taskcard float-right">
        <Link to="/mentee/dashboard/subscription" className='badge text-dark p-2  '>View More Subscriptions...</Link>
    </div>}
    </>
  );
}