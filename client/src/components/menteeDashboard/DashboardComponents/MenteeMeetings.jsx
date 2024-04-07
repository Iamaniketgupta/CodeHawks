

import axios from "axios";
import Spinner from "../../../common/Spinner";
import { useNavigate } from 'react-router-dom';

import { useSelector } from "react-redux";
import { IoRefreshCircle } from 'react-icons/io5';
import { useEffect, useState } from "react";
const MenteeMeetings = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [meetings, setMeetings] = useState([]);

    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        fetchMeetings();
    }, []);

    async function fetchMeetings() {
        try {
            setLoading(true);

            const res = await axios.get("/api/v1/meeting/allMenteeMeetings");
            // console.log(res.data);
            setMeetings(res.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setMeetings([]);
        }

    }

    function handleJoinMeeting(roomId) {
        navigate(`/room/${roomId}`);
    }

    return (
        <div className="p-4 sm:ml-20 text-black">
        <div className="p-4  border-gray-200 ml-20 rounded-lg dark:border-gray-700 ">
                <div className="text-blue-500 absolute right-7 top-20 cursor-pointer hover:text-blue-800">
                    <IoRefreshCircle onClick={fetchMeetings} size={30} title={"Refresh"} />
                </div>
            <div className=' m-2 relative my-3 p-3'>
                <h3 className="text-2xl font-semibold text-center">My 1:1 Meetings</h3>
                {loading ? <Spinner />:
                    <div className='flex flex-wrap gap-3 justify-center items-center my-3'>
                        {meetings && meetings?.map(item =>
                            <div key={item?._id} className='p-2 relative min-w-[260px] border-2 shadow-lg rounded-xl px-4 m-2'>

                                <div className='p-1 text-xs'>
                                    <span className='text-blue-500'>With : </span>
                                    <p className='inline-block text-red-500 font-semibold'>{item.mentor?.fullName}</p>

                                </div>
                                <div className='my-1 text-xs px-1'>
                                    <span className='text-blue-500'>Room Id : </span>
                                    <p className='inline-block text-red-500 font-semibold'>{item?.roomId}</p>

                                </div>
                                <div className='text-sm'>
                                    <span>At : </span>
                                    <p className='inline-block text-indigo-500 font-semibold'>{item?.time}</p>
                                    <span className='ml-2'>On : </span>
                                    <p className='inline-block text-indigo-500 font-semibold'>{item?.date + ","} {item?.monthName}</p>
                                </div>
                                <button
                                    onClick={() => handleJoinMeeting(item.roomId)}
                                    className={`bg-indigo-500  hover:bg-indigo-700 px-4 py-2 mx-auto inline-block my-2 text-xs font-bold text-white rounded-lg 
        ${item?.isExpired ? "cursor-not-allowed opacity-30" : 'cursor-pointer'}`}
                                    disabled={item?.isExpired}
                                >
                                    Join
                                </button>
                                {
                                    !item?.isExpired ? <div className='bg-green-500 rounded-lg px-2 absolute top-2 right-2 text-white text-xs'>
                                        Active
                                    </div>
                                        : <div className='bg-red-500 rounded-lg px-2 absolute top-2 right-2 text-white text-xs'>
                                            Expired
                                        </div>

                                }
                            </div>
                        )
                        }
                    </div>}
            </div>
        </div>
        </div>
    );
}

export default MenteeMeetings;
