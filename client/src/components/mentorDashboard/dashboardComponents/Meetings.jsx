import { Axios } from 'axios';
import { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import { useSelector } from "react-redux";
import { IoRefreshCircle } from 'react-icons/io5';
import { SERVER_URL } from '../../../../constant';

const Meetings = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [menteeId, setMenteeId] = useState(null);
    const [query, setQuery] = useState('');
    const [meetings, setMeetings] = useState([]);
    const [mentees, setMentees] = useState([]);

    const user = useSelector((state) => state.auth.user);



    useEffect(() => {
        fetchMeetings();
        fetchMentees();
    }, []);

    const [data, setData] = useState({
        date: '',
        time: '',
        roomId: ''
    });
    // console.log(data);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (!menteeId) {
                toast.error("Please Select a Mentee");
                return;
            }
            setLoading(true);
            const date = data.date?.split("-")[2] || '';
            let month = data.date?.split("-")[1] || '';
            let monthName;

            switch (month) {
                case "01":
                    monthName = "Jan";
                    break;
                case "02":
                    monthName = "Feb";
                    break;
                case "03":
                    monthName = "Mar";
                    break;
                case "04":
                    monthName = "Apr";
                    break;
                case "05":
                    monthName = "May";
                    break;
                case "06":
                    monthName = "Jun";
                    break;
                case "07":
                    monthName = "Jul";
                    break;
                case "08":
                    monthName = "Aug";
                    break;
                case "09":
                    monthName = "Sep";
                    break;
                case "10":
                    monthName = "Oct";
                    break;
                case "11":
                    monthName = "Nov";
                    break;
                case "12":
                    monthName = "Dec";
                    break;
                default:
                    monthName = "";
                    break;
            }

            const time = data?.time;
            const roomId = data?.roomId;


            if (!date || !month || !time || !roomId) {
                toast.error("Date and Time is Required");
                setLoading(false);
                return;
            }
            const response = await axios.post(SERVER_URL+'/api/v1/meeting/create/new', { date, month, monthName, time, roomId, menteeId });
            // console.log(response.data);
            toast.success("Meeting Added");
            setData({ date: '', time: '', roomId: '' });
            setLoading(false);
            fetchMeetings();

        } catch (error) {
            setLoading(false);
            toast.error("Something went wrong!!");

        }

    }
    // console.log(meetings);

    async function handleDeleteMeeting(meetingId) {
        if (!meetingId) {
            toast.error("Oops something wrong!");
            return;
        }
        if (!confirm("Are You Sure ?"))
            return;
        try {

            const res = await Axios.delete(SERVER_URL+`/api/v1/meeting/${menteeId}`);
            if (res) {
                toast.success("Delete Success");
            }

        } catch (error) {
            toast.error(error.response.data.message || "Failed to delete");
        }
    }

    async function fetchMeetings() {
        try {
            const res = await axios.get(SERVER_URL+"/api/v1/meeting/allMentorMeetings");
            console.log(res.data);
            setMeetings(res.data.meetings);

        } catch (error) {
            setMeetings([]);
        }

    }


    async function fetchMentees() {
        setLoading(true)
        try {
            const response = await axios.post(SERVER_URL+"/api/v1/subscription/getUserSubscribers", {
                mentorId: user._id
            });
            // console.log(response.data.data)
            // console.log(response.data.data);
            setMentees(response.data.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    // console.log(menteeId); 

    function handleDataChange(e) {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    }

    function handleSearchMentee() {

    }

    function handleJoinMeeting(roomId) {
        navigate(`/room/${roomId}`);
    }

    return (
        <div className="p-4 sm:ml-64 text-black">
            <div className="p-4  border-gray-200 border-2 rounded-lg dark:border-gray-700 mt-14">


                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3'>
                    <div className='lg:col-span-2'>
                        <h1 className='text-3xl font-bold text-center p-2 m-2'>Meetings</h1>

                        {/* Create Meetings */}
                        <div className=' m-2 my-3 p-3'>
                            <div className='flex flex-wrap p-2 gap-3 items-center justify-center'>
                                <form className="w-full pl-4 text-center" onSubmit={handleSubmit}>
                                    <h3 className="text-2xl font-semibold"> Create Your Meetings</h3>
                                    <hr />
                                    <div className="flex flex-wrap gap-5 my-4 text-center items-center justify-center">

                                        <div>
                                            <h3 className="my-2">Select Date </h3>
                                            <input onChange={handleDataChange} value={data.date}
                                                type="date" name="date" id="date" />
                                        </div>
                                        <div>

                                            <h3 className="my-2">Select Time Slot</h3>
                                            <input onChange={handleDataChange} value={data.time}
                                                type="time" name="time" id="" />
                                        </div>
                                        <div>

                                            <h3 className="my-2">Make Room ID </h3>
                                            <input onChange={handleDataChange} value={data.roomId}
                                                type="text" name="roomId" id="" placeholder='e.g. myRoom121' />
                                        </div>

                                    </div>
                                    <button type="submit" className="btn btn-primary btn ">
                                        {loading ?
                                            <div className="animate-spin inline-block size-6 border-[5px] border-current border-t-transparent text-ehite rounded-full" role="status" aria-label="loading">
                                            </div> : ''}
                                        {!loading && "Create"}
                                    </button>

                                </form>
                                <hr className="my-3" />
                            </div>
                        </div>

                        {/* My meetings */}
                        <div className='border-2\ m-2 relative my-3 p-3'>
                            <div className="text-blue-500 absolute right-7 top-10 cursor-pointer hover:text-blue-800">
                                <IoRefreshCircle onClick={fetchMeetings} size={30} title={"Refresh slots"} />
                            </div>
                            <h3 className="text-2xl font-semibold text-center">My 1:1 Meetings</h3>
                            <div className='flex flex-wrap gap-3 justify-center items-center my-3'>
                                {meetings && meetings?.map(item =>
                                    <div key={item?._id} className='p-2 relative min-w-[260px] border-2 shadow-lg rounded-xl px-4 m-2'>

                                        <div className='p-1 text-xs'>
                                            <span className='text-blue-500'>With : </span>
                                            <p className='inline-block text-red-500 font-semibold'>{item.mentee?.fullName}</p>

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
                            </div>
                        </div>

                    </div>

                    {/* My Mentees */}
                    <div className='border-2 m-2 my-3 p-3'>
                        {/* <div className='p-2 my-2 border-2'>
                <CiSearch size={30} className='inline-block text-xl font-bold mx-2' />
                <input onChange={handleSearchMentee}
                    placeholder='Search Mentee Name'
                    type="search" name="" id="" value={query} />

            </div> */}
                        <div className='flex flex-col justify-center items-center my-2 py-2 '>
                            My Mentees
                            {
                                mentees?.map((item) =>
                                    <div key={item?._id} onClick={() => {
                                        return setMenteeId((prev) => prev !== item?._id ? item._id : null)
                                    }}

                                        className={`p-1 my-2  inline-flex border-2 border-blue-500 cursor-pointer
                         bg-white shadow-lg rounded-md items-center 
                         gap-2 flex-nowrap overflow-hidden text-sm min-w-[270px]
                         ${menteeId === item?._id ? "border-4 border-blue-500 bg-blue-100" : ''}`}>
                                        <img src={item?.avatar} alt={item?.fullName} className='w-10 h-10 rounded-full bg-contain' />
                                        <p className='font-semibold text-blue-600'>{item.fullName}</p>

                                    </div>
                                )
                            }
                        </div>
                    </div>

                </div>


            </div>
        </div>
    );
}

export default Meetings;
