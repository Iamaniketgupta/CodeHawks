import React, { useEffect, useState } from 'react';
import SubCard from './SubCard';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { SERVER_URL } from '../../../constant';

export default function SubBox(props) {
  const [subs, setSubs] = useState([]);

  async function getSubs() {
    try {
      const endpoint = SERVER_URL + '/api/v1/subscription/getMenteeSubscriptions';
      const response = await axios.get(endpoint);
      if (props?.type === "top") {
        setSubs(response.data.data.slice(0, 3));
      } else {
        setSubs(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getSubs();
  }, [props.type]); 

  return (
    <>
      <br />
      <div className="row justify-content-around">
        {subs.length === 0 && (
          <div className='w-full h-full flex justify-center items-center font-bold text-2xl text-gray-300'>
            No subscription found
          </div>
        )}
        {subs.length > 0 && subs.map((sub) => (
          <SubCard key={sub._id} price={sub.price} status={sub.status} mentor={sub.mentor.fullName} getsubs={getSubs} />
        ))}
      </div>
      {props.type === "top" && (
        <div className="card m-2 taskcard float-right">
          <Link to="/mentee/dashboard/subscription" className='badge text-dark p-2'>View More Subscriptions...</Link>
        </div>
      )}
    </>
  );
}
