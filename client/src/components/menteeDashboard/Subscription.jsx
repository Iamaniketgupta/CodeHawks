import React, { useEffect, useState } from 'react';
import SubBox from './SubBox';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { SERVER_URL } from '../../../constant';
import { token } from '../constants';
export default function Subscription(props) {
  const [subs,setSubs]=useState([]);
  useEffect(()=>{
    (async ()=>{
      const response = await axios.get(SERVER_URL + '/api/v1/subscription/getMenteeSubscriptions',{ headers: { Authorization: `Bearer ${token}`}});
      setSubs(response.data.data);
       console.log(response.data.data);
    })();
  },[])
  return (
    <>
    <section className="home-section">
        <div className='font-bold text-center text-3xl mt-4 mb-2'>My Subscriptions</div>
        <div className='text-black px-4 font-bold'><hr /></div>
        <SubBox type="all"/>
    </section>
    </>
  )
}
