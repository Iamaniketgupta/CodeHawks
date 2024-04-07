import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { SERVER_URL } from "../../../../constant";

const MyMentees = () => {
    
    const [loading, setLoading] = useState(false);
    const [mentees, setMentees] = useState([]);

    
    const user = useSelector((state) => state.auth.user);
    


    async function fetchMentees() {
        setLoading(true)
        try {
            const response = await axios.post(SERVER_URL+"/api/v1/subscription/getUserSubscribers", {
                mentorId: user._id
            });
            console.log(response.data.data)
            // console.log(response.data.data);
            setMentees(response.data.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMentees()
        
    }, [])
    



  return (
    <div className="p-4 sm:ml-64 text-black">
    <div className="p-4  border-gray-200 border-2 rounded-lg dark:border-gray-700 mt-14">
    <div className="w-full min-h-screen bg-white">
      <div className="font-bold text-2xl p-3 text-center">Subscribers :</div>

      <div className="w-full sm:flex flex-wrap gap-2 justify-center">

        {mentees.map((mentee)=>(
            <div key={mentee._id} className=" m-1  mx-auto sm:mx-2 p-3 w-[300px] border-[1px] border-black rounded-2xl">
            <div className="flex gap-4">
              <div className="w-10 h-10 overflow-hidden rounded-full">
                <img
                  className="w-full h-full object-cover rounded-full "
                  src={mentee.avatar}
                  alt=""
                />
              </div>
              <div>
                  <div className="text-lg font-bold">Suraj</div>
                  <div className="text-sm">
                      {mentee.state} , {mentee.country}
                  </div>
                  <br />
                  <div className="text-sm ">
                      <span className="font-semibold text-md">Interests :</span> <br />
                      <div className="flex flex-wrap gap-2">
                        {mentee.interests.map((interest , index)=>(
                            <div id={index} className="bg-gray-300 p-1 rounded-lg">{interest}</div>
                        ))}
                      </div>
                  </div>
              </div>
            </div>
          </div>
        ))}



      </div>
    </div>

      </div>
    </div>
  );
};

export default MyMentees;
