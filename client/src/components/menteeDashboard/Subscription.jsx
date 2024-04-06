import React, { useEffect, useState } from 'react';
import SubBox from './SubBox';
import axios from 'axios';
import {Link} from 'react-router-dom';
export default function Subscription(props) {
  const [subs,setSubs]=useState([]);
  useEffect(()=>{
    (async ()=>{
      const response = await axios.get('/api/v1/subscription/getMenteeSubscriptions');
      setSubs(response.data.data);
       console.log(response.data.data);
    })();
  },[])
  return (
    <>
    <section className="home-section">
        <div><h1>My Subscription</h1></div>
        <SubBox type="all"/>
    </section>
    </>
  )
}
